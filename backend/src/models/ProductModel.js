import { supabase } from '../lib/supabase.js';

const PRODUCTS_PATH = 'products';

function normalizeProduct(id, data = {}) {
  return {
    id,
    ...data,
    image_url: data.image_url || data.imageUrl || null,
    imageUrl: data.imageUrl || data.image_url || null,
    tags: data.tags || (data.tag ? [data.tag] : []),
    category_id: data.category_id ?? null,
    is_available: data.is_available ?? true,
    created_at: data.created_at || data.createdAt || null,
    price: typeof data.price === 'string' ? Number(data.price) : (data.price ?? 0),
  };
}

function sortProducts(products) {
  return products.sort((a, b) => {
    const aTime = a.created_at ? new Date(a.created_at).getTime() : 0;
    const bTime = b.created_at ? new Date(b.created_at).getTime() : 0;
    return bTime - aTime;
  });
}

export class ProductModel {
  static async getAll() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) throw error;
    return sortProducts((data || []).map((p) => normalizeProduct(p.id, p)));
  }

  static async getById(id) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return null;
    return normalizeProduct(data.id, data);
  }

  static async create(data) {
    const payload = normalizeProduct(null, {
      ...data,
      imageUrl: data.imageUrl || data.image_url || null,
      image_url: data.image_url || data.imageUrl || null,
      created_at: new Date().toISOString(),
      category_id: data.category_id || null,
    });

    const { data: result, error } = await supabase
      .from('products')
      .insert([payload])
      .select()
      .single();

    if (error) throw error;
    return normalizeProduct(result.id, result);
  }

  static async update(id, data) {
    const payload = normalizeProduct(id, {
      ...data,
      imageUrl: data.imageUrl || data.image_url || null,
      image_url: data.image_url || data.imageUrl || null,
      updated_at: new Date().toISOString(),
      category_id: data.category_id || null,
    });

    const { data: result, error } = await supabase
      .from('products')
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return normalizeProduct(result.id, result);
  }

  static async delete(id) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { id };
  }
}
