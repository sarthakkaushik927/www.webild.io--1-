import { apiGet, apiPostAuth, apiPutAuth, apiDeleteAuth } from '../utils/api';

const mapBackendProduct = (product: any): any => ({
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

export const productService = {
  async getAll() {
    const data = await apiGet<any[]>('/api/products');
    return { data: data.map(mapBackendProduct), error: null };
  },

  async getById(id: string) {
    try {
      const data = await apiGet<any>(`/api/products/${id}`);
      return { data: mapBackendProduct(data), error: null };
    } catch {
      return { data: null, error: 'Product not found' };
    }
  },

  async create(product: any) {
    const { adminAuthService } = await import('./adminAuthService');
    const token = adminAuthService.getToken();
    if (!token) throw new Error('Admin session missing');
    const created = await apiPostAuth<any>('/api/products', {
      ...product,
      imageUrl: product.image_url || product.imageUrl,
    }, token);
    return { data: mapBackendProduct(created), error: null };
  },

  async update(id: string, updates: any) {
    const { adminAuthService } = await import('./adminAuthService');
    const token = adminAuthService.getToken();
    if (!token) throw new Error('Admin session missing');
    const updated = await apiPutAuth<any>(`/api/products/${id}`, {
      ...updates,
      imageUrl: updates.image_url || updates.imageUrl,
    }, token);
    return { data: mapBackendProduct(updated), error: null };
  },

  async delete(id: string) {
    const { adminAuthService } = await import('./adminAuthService');
    const token = adminAuthService.getToken();
    if (!token) throw new Error('Admin session missing');
    await apiDeleteAuth(`/api/products/${id}`, token);
    return { error: null };
  },
};
