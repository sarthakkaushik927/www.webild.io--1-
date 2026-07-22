import { supabase } from '../lib/supabase.js';

export class CarouselModel {
  static async get() {
    const { data, error } = await supabase
      .from('carousel')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) throw error;
    return { images: (data || []).map(item => item.image_url) };
  }

  static async update(data) {
    await supabase
      .from('carousel')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');

    const items = Array.isArray(data.images)
      ? data.images.map((url, i) => ({ image_url: url, display_order: i, is_active: true }))
      : [];

    if (items.length > 0) {
      const { error: insertError } = await supabase
        .from('carousel')
        .insert(items);

      if (insertError) throw insertError;
    }

    return data;
  }
}

