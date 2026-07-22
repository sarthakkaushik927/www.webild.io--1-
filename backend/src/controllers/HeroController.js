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

export const getHeroContent = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('cms_sections')
      .select('*')
      .eq('section_key', 'hero')
      .single();

    if (error || !data) {
      return res.json({
        title: defaultHero.title,
        subtitle: defaultHero.subtitle,
        images: defaultHero.images,
      });
    }

    res.json({
      title: data.title || defaultHero.title,
      subtitle: data.subtitle || defaultHero.subtitle,
      images: Array.isArray(data.images) && data.images.length > 0 ? data.images : defaultHero.images,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateHeroContent = async (req, res) => {
  try {
    const data = req.body;

    const { data: existing } = await supabase
      .from('cms_sections')
      .select('title, subtitle')
      .eq('section_key', 'hero')
      .single();

    const lockedTitle = existing?.title || defaultHero.title;
    const lockedSubtitle = existing?.subtitle || defaultHero.subtitle;

    const { data: result, error } = await supabase
      .from('cms_sections')
      .upsert({
        section_key: 'hero',
        title: lockedTitle,
        subtitle: lockedSubtitle,
        images: data.images || [],
        updated_at: new Date().toISOString(),
      }, { onConflict: 'section_key' })
      .select()
      .single();

    if (error) throw error;
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
