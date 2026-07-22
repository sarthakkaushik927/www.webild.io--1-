import { supabase } from '../lib/supabase.js';

export class OrderModel {
  static getCollectionRef() {
    return 'orders';
  }

  static getItemsRef() {
    return 'order_items';
  }

  static async getAll() {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  static async getById(id) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return null;
    return data;
  }

  static async getByTrackingToken(token) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('tracking_token', token)
      .single();

    if (error || !data) return null;
    return data;
  }

  static async create(orderData) {
    const { data: result, error } = await supabase
      .from('orders')
      .insert([{
        ...orderData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }])
      .select()
      .single();

    if (error) throw error;
    return result;
  }

  static async update(id, data) {
    const { data: result, error } = await supabase
      .from('orders')
      .update({
        ...data,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return result;
  }

  static async getItemsByOrderId(orderId) {
    const { data, error } = await supabase
      .from('order_items')
      .select('*')
      .eq('order_id', orderId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  }
}
