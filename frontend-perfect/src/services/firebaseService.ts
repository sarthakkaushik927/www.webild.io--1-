import { auth, realtimeDb } from '../lib/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { get, ref } from 'firebase/database';
import type { Profile } from '../lib/firebase';
import { apiDeleteAuth, apiGet, apiPost, apiPutAuth, apiPostAuth } from '../utils/api';
import { adminAuthService } from './adminAuthService';

type BackendProduct = {
  id: string;
  name: string;
  description?: string;
  price?: string | number;
  tag?: string;
  imageUrl?: string;
  image_url?: string;
  is_available?: boolean;
  category_id?: string | null;
  tags?: string[] | null;
  created_at?: string | Date;
};

const mapBackendProduct = (product: BackendProduct) => ({
  id: product.id,
  name: product.name,
  description: product.description || null,
  price: typeof product.price === 'string' ? Number(product.price) : product.price || 0,
  image_url: product.image_url || product.imageUrl || null,
  is_available: product.is_available ?? true,
  tags: product.tags || (product.tag ? [product.tag] : null),
  created_at: product.created_at ? new Date(product.created_at) : new Date(),
  category_id: product.category_id ?? null,
});

async function getRealtimeProducts() {
  const snapshot = await get(ref(realtimeDb, 'products'));
  if (!snapshot.exists()) return [];

  return Object.entries(snapshot.val() as Record<string, BackendProduct>).map(([id, product]) => {
    const { id: _ignored, ...rest } = product;
    return mapBackendProduct({ ...rest, id });
  });
}

async function getRealtimeProductById(id: string) {
  const snapshot = await get(ref(realtimeDb, `products/${id}`));
  if (!snapshot.exists()) return null;

  const { id: _ignored, ...product } = snapshot.val() as BackendProduct;
  return mapBackendProduct({ ...product, id });
}

export const authService = {
  async signUp(email: string, password: string, fullName: string, role: 'customer' | 'admin' | 'chef' | 'waiter' = 'customer') {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const profile = {
      id: user.uid,
      email,
      full_name: fullName,
      phone: null,
      role,
      status: role === 'customer' ? 'approved' : 'pending',
      loyalty_coins: 0,
      createdAt: new Date().toISOString(),
    };

    await apiPost('/api/users', profile);

    await updateProfile(user, { displayName: fullName });

    return { data: user, error: null };
  },

  async signIn(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { data: userCredential.user, error: null };
  },

  async signOut() {
    await signOut(auth);
  },

  async getSession() {
    return new Promise<{ user: any } | null>((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();
        resolve(user ? { user } : null);
      });
    });
  },

  async getProfile(userId: string): Promise<{ data: Profile | null; error: any }> {
    try {
      const data = await apiGet<any>(`/api/users/${userId}`);
      return { data: data as Profile, error: null };
    } catch (error) {
      console.error('Failed to load profile:', error);
      return { data: null, error };
    }
  },

  async updateProfile(userId: string, updates: Partial<Profile>) {
    const token = adminAuthService.getToken();
    if (!token) throw new Error('Admin session missing');
    const updated = await apiPutAuth<Profile>(`/api/users/${userId}`, updates, token);
    return { data: updated as Profile, error: null };
  },
};

export const productService = {
  async getAll() {
    try {
      const data = await apiGet<BackendProduct[]>('/api/products');
      return { data: data.map(mapBackendProduct), error: null };
    } catch (error) {
      const data = await getRealtimeProducts();
      return { data, error: data.length > 0 ? null : error };
    }
  },

  async getById(id: string) {
    try {
      const data = await apiGet<BackendProduct>(`/api/products/${id}`);
      return { data: mapBackendProduct(data), error: null };
    } catch {
      const data = await getRealtimeProductById(id);
      return { data, error: data ? null : 'Product not found' };
    }
  },

  async create(product: any) {
    const token = adminAuthService.getToken();
    if (!token) throw new Error('Admin session missing');
    const created = await apiPostAuth<BackendProduct>('/api/products', {
      ...product,
      imageUrl: product.image_url || product.imageUrl,
    }, token);
    return { data: mapBackendProduct(created), error: null };
  },

  async update(id: string, updates: any) {
    const token = adminAuthService.getToken();
    if (!token) throw new Error('Admin session missing');
    const updated = await apiPutAuth<BackendProduct>(`/api/products/${id}`, {
      ...updates,
      imageUrl: updates.image_url || updates.imageUrl,
    }, token);
    return { data: mapBackendProduct(updated), error: null };
  },

  async delete(id: string) {
    const token = adminAuthService.getToken();
    if (!token) throw new Error('Admin session missing');
    await apiDeleteAuth(`/api/products/${id}`, token);
    return { error: null };
  },
};

export const categoryService = {
  async getAll() {
    const data = await apiGet<any[]>('/api/categories');
    return { data: data.map((c: any) => ({ id: c.id, ...c })), error: null };
  },

  async getAllAdmin() {
    const data = await apiGet<any[]>('/api/categories');
    return { data: data.map((c: any) => ({ id: c.id, ...c })), error: null };
  },

  async create(category: any) {
    const token = adminAuthService.getToken();
    if (!token) throw new Error('Admin session missing');
    const created = await apiPostAuth<any>('/api/categories', category, token);
    return { data: { id: created.id, ...created }, error: null };
  },

  async update(id: string, updates: any) {
    const token = adminAuthService.getToken();
    if (!token) throw new Error('Admin session missing');
    const updated = await apiPutAuth<any>(`/api/categories/${id}`, updates, token);
    return { data: { id: updated.id, ...updated }, error: null };
  },

  async delete(id: string) {
    const token = adminAuthService.getToken();
    if (!token) throw new Error('Admin session missing');
    await apiDeleteAuth(`/api/categories/${id}`, token);
    return { error: null };
  },
};

export const adminService = {
  async getPendingUsers() {
    const data = await apiGet<any[]>('/api/users/pending');
    return { data: data.map((u: any) => ({ id: u.id, ...u })), error: null };
  },

  async approveUser(userId: string) {
    const token = adminAuthService.getToken();
    if (!token) throw new Error('Admin session missing');
    const updated = await apiPutAuth<any>(`/api/users/${userId}/approve`, {}, token);
    return { data: { id: updated.id, ...updated }, error: null };
  },

  async rejectUser(userId: string) {
    const token = adminAuthService.getToken();
    if (!token) throw new Error('Admin session missing');
    const updated = await apiPutAuth<any>(`/api/users/${userId}/reject`, {}, token);
    return { data: { id: updated.id, ...updated }, error: null };
  },

  async getAllUsers() {
    const data = await apiGet<any[]>('/api/users');
    return { data: data.map((u: any) => ({ id: u.id, ...u })), error: null };
  },
};
