import { supabase } from '../lib/supabase.js';

const defaultHero = {
  title: 'Swad Sang Sehat - Taste with a Twist of Health!',
  subtitle: '100% Fresh & Organic Foods',
  images: [
    'https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-2.webp',
    'https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-3.webp',
    'https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-4.webp',
    'https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-5.webp',
    'https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-6.webp',
  ],
};

export class HeroModel {
  static async getHeroContent() {
    const { data, error } = await supabase
      .from('cms_sections')
      .select('*')
      .eq('section_key', 'hero')
      .single();

    if (error || !data) return defaultHero;

    return {
      title: data.title || defaultHero.title,
      subtitle: data.subtitle || defaultHero.subtitle,
      images: Array.isArray(data.images) && data.images.length > 0 ? data.images : defaultHero.images,
    };
  }

  static async updateHeroContent(data) {
    const { data: result, error } = await supabase
      .from('cms_sections')
      .upsert({
        section_key: 'hero',
        title: data.title,
        subtitle: data.subtitle,
        images: data.images,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'section_key' })
      .select()
      .single();

    if (error) throw error;
    return result;
  }
}
