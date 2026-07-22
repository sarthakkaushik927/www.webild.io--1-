import { supabase } from '../lib/supabase.js';

const defaultCraft = {
  title: 'Health & Happiness with Kruxnut',
  subtitle: 'At Kruxnut, we believe snacking should be smart, satisfying, and full of life.',
  faqImage: 'https://storage.googleapis.com/webild/default/templates/skincare-luxury/faq-image.webp',
  steps: [
    { title: 'Power of Protein', description: 'Every bite gives you natural plant-based strength.', imageUrl: 'https://storage.googleapis.com/webild/default/templates/skincare-luxury/features/feature-1.webp' },
    { title: 'Pure Ingredients', description: 'No palm oil, no chemicals, no compromise.', imageUrl: 'https://storage.googleapis.com/webild/default/templates/skincare-luxury/features/feature-2.webp' },
    { title: 'Eco Friendly', description: 'Sustainability is at the heart of every Kruxnut creation.', imageUrl: 'https://storage.googleapis.com/webild/default/templates/skincare-luxury/features/feature-3.webp' },
    { title: 'Energy & Joy', description: 'Healthy snacking that fuels your day.', imageUrl: 'https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-2.webp' },
  ],
};

export const getCraft = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('cms_sections')
      .select('*')
      .eq('section_key', 'craft')
      .single();

    if (error || !data) {
      return res.json(defaultCraft);
    }

    res.json({
      title: data.title || defaultCraft.title,
      subtitle: data.subtitle || defaultCraft.subtitle,
      faqImage: data.faq_image || defaultCraft.faqImage,
      steps: Array.isArray(data.steps) && data.steps.length > 0 ? data.steps : defaultCraft.steps,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCraft = async (req, res) => {
  try {
    const data = req.body;
    const { data: result, error } = await supabase
      .from('cms_sections')
      .upsert({
        section_key: 'craft',
        title: data.title,
        subtitle: data.subtitle,
        faq_image: data.faqImage,
        steps: data.steps || [],
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
