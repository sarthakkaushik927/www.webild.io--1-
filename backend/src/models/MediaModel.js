import { supabase } from '../lib/supabase.js';

export class MediaModel {
  static getRef() {
    return 'media';
  }

  static async getAll() {
    const { data, error } = await supabase
      .from('media')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  static async getById(id) {
    const { data, error } = await supabase
      .from('media')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return null;
    return data;
  }

  static async create(data) {
    const { data: result, error } = await supabase
      .from('media')
      .insert([{
        ...data,
        created_at: new Date().toISOString(),
      }])
      .select()
      .single();

    if (error) throw error;
    return result;
  }

  static async update(id, data) {
    const { data: result, error } = await supabase
      .from('media')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return result;
  }

  static async delete(id) {
    const { error } = await supabase
      .from('media')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { id };
  }
}
