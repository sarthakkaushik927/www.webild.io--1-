import { supabase } from '../lib/supabase.js';

const defaultCommunity = {
  title: 'Loved By Snack Enthusiasts Everywhere',
  subtitle: 'Health-conscious foodies trust Kruxnut for their daily crunch.',
  influencers: [],
};

export class CommunityModel {
  static async get() {
    const { data, error } = await supabase
      .from('cms_sections')
      .select('*')
      .eq('section_key', 'community')
      .single();

    if (error || !data) {
      return defaultCommunity;
    }

    return {
      title: data.title || defaultCommunity.title,
      subtitle: data.subtitle || defaultCommunity.subtitle,
      influencers: Array.isArray(data.influencers) && data.influencers.length > 0 ? data.influencers : defaultCommunity.influencers,
    };
  }

  static async update(data) {
    return data;
  }
}
