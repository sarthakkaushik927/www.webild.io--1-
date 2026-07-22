import { supabase, type Profile } from '../lib/supabase';
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

export const authService = {
  async signUp(email: string, password: string, fullName: string, role: 'customer' | 'admin' | 'chef' | 'waiter' = 'customer') {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, role } },
    });

    if (error || !data.user) {
      console.error('Signup error:', error?.message);
      return { data: null, error: error?.message || 'Signup failed' };
    }

    return {
      data: {
        id: data.user.id,
        email: data.user.email || email,
        full_name: fullName,
        phone: null,
        role,
        status: role === 'customer' ? 'active' : 'pending',
        loyalty_coins: 0,
        createdAt: new Date(),
      },
      error: null,
    };
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      return { data: null, error: error?.message || 'Invalid credentials' };
    }

    return { data: data.user, error: null };
  },

  async signOut() {
    await supabase.auth.signOut();
  },

  async getSession() {
    const { data: { session } } = await supabase.auth.getSession();
    return session ? { user: session.user } : null;
  },

  async getProfile(userId: string): Promise<{ data: Profile | null; error: any }> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) return { data: null, error };
    return { data: data as Profile, error: null };
  },

  async updateProfile(userId: string, updates: Partial<Profile>) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    return { data: data as Profile, error };
  },
};

export const productService = {
  async getAll() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase product fetch failed, trying API fallback:', error.message);
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const apiData = await response.json();
          return { data: apiData.map(mapBackendProduct), error: null };
        }
      } catch {
        // Ignore API fallback errors
      }
      return { data: [], error };
    }

    return { data: (data || []).map(mapBackendProduct), error: null };
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (response.ok) {
          const apiData = await response.json();
          return { data: mapBackendProduct(apiData), error: null };
        }
      } catch {
        // Ignore
      }
      return { data: null, error: 'Product not found' };
    }
    return { data: mapBackendProduct(data), error: null };
  },

  async create(product: any) {
    const token = adminAuthService.getToken();
    if (!token) throw new Error('Admin session missing');

    const { data, error } = await supabase
      .from('products')
      .insert([{
        ...product,
        image_url: product.image_url || product.imageUrl,
        created_at: new Date().toISOString(),
      }])
      .select()
      .single();

    if (error) throw error;
    return { data: mapBackendProduct(data), error: null };
  },

  async update(id: string, updates: any) {
    const token = adminAuthService.getToken();
    if (!token) throw new Error('Admin session missing');

    const { data, error } = await supabase
      .from('products')
      .update({
        ...updates,
        image_url: updates.image_url || updates.imageUrl,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data: mapBackendProduct(data), error: null };
  },

  async delete(id: string) {
    const token = adminAuthService.getToken();
    if (!token) throw new Error('Admin session missing');

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { error: null };
  },
};

export const categoryService = {
  async getAll() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('display_order', { ascending: true })
      .order('name', { ascending: true });

    if (error) throw error;
    return { data: (data || []).map((c: any) => ({ id: c.id, ...c })), error: null };
  },

  async getAllAdmin() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('display_order', { ascending: true })
      .order('name', { ascending: true });

    if (error) throw error;
    return { data: (data || []).map((c: any) => ({ id: c.id, ...c })), error: null };
  },

  async create(category: any) {
    const token = adminAuthService.getToken();
    if (!token) throw new Error('Admin session missing');

    const { data, error } = await supabase
      .from('categories')
      .insert([{ ...category, created_at: new Date().toISOString() }])
      .select()
      .single();

    if (error) throw error;
    return { data: { id: data.id, ...data }, error: null };
  },

  async update(id: string, updates: any) {
    const token = adminAuthService.getToken();
    if (!token) throw new Error('Admin session missing');

    const { data, error } = await supabase
      .from('categories')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data: { id: data.id, ...data }, error: null };
  },

  async delete(id: string) {
    const token = adminAuthService.getToken();
    if (!token) throw new Error('Admin session missing');

    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { error: null };
  },
};

export const adminService = {
  async getPendingUsers() {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: true });

    if (error) throw error;
    return { data: (data || []).map((u: any) => ({ id: u.id, ...u })), error: null };
  },

  async approveUser(userId: string) {
    const token = adminAuthService.getToken();
    if (!token) throw new Error('Admin session missing');

    const { data, error } = await supabase
      .from('profiles')
      .update({ status: 'active', updated_at: new Date().toISOString() })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return { data: { id: data.id, ...data }, error: null };
  },

  async rejectUser(userId: string) {
    const token = adminAuthService.getToken();
    if (!token) throw new Error('Admin session missing');

    const { data, error } = await supabase
      .from('profiles')
      .update({ status: 'rejected', updated_at: new Date().toISOString() })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return { data: { id: data.id, ...data }, error: null };
  },

  async getAllUsers() {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data: (data || []).map((u: any) => ({ id: u.id, ...u })), error: null };
  },
};
