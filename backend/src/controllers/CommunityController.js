import { supabase } from '../lib/supabase.js';

const defaultCommunity = {
  title: 'Loved By Snack Enthusiasts Everywhere',
  subtitle: 'Health-conscious foodies trust Kruxnut for their daily crunch.',
  influencers: [
    { name: 'Amara Osei', videoUrl: 'https://storage.googleapis.com/webild/default/templates/skincare-luxury/influencer-amara.mp4' },
    { name: 'Chloe Marchand', videoUrl: 'https://storage.googleapis.com/webild/default/templates/skincare-luxury/influencer-chloe.mp4' },
    { name: 'Elena Vasquez', videoUrl: 'https://storage.googleapis.com/webild/default/templates/skincare-luxury/influencer-elena.mp4' },
  ],
};

export const getCommunity = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('cms_sections')
      .select('*')
      .eq('section_key', 'community')
      .single();

    if (error || !data) {
      return res.json(defaultCommunity);
    }

    res.json({
      title: data.title || defaultCommunity.title,
      subtitle: data.subtitle || defaultCommunity.subtitle,
      influencers: Array.isArray(data.influencers) && data.influencers.length > 0 ? data.influencers : defaultCommunity.influencers,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCommunity = async (req, res) => {
  try {
    const data = req.body;
    const { data: result, error } = await supabase
      .from('cms_sections')
      .upsert({
        section_key: 'community',
        title: data.title,
        subtitle: data.subtitle,
        influencers: data.influencers || [],
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
