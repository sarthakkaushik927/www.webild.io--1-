import { supabase } from '../lib/supabase.js';

const defaultFaq = [
  { q: 'What makes Kruxnut snacks different from other brands?', a: 'Our snacks are made using 100% natural ingredients with no artificial flavors, no palm oil, and no chemicals. Every product is roasted to perfection for extra crunch and nutrition.' },
  { q: 'Are your products suitable for people with allergies?', a: 'We clearly label all allergens on our packaging. Our products may contain nuts and seeds. Please check individual product labels for specific allergen information.' },
  { q: 'How fresh are your products?', a: 'All Kruxnut products are freshly prepared and packed. We ensure minimal shelf time and use premium packaging to lock in freshness and crunch for every bite.' },
  { q: 'Do you offer free shipping?', a: 'Yes! We offer free shipping on all orders above ₹500. Orders are typically dispatched within 24 hours and delivered within 3-5 business days.' },
  { q: 'Are your snacks healthy for weight management?', a: 'Absolutely! Our roasted nuts and makhanas are rich in protein, fiber, and essential nutrients — making them an ideal alternative to chips and junk food for weight management and heart health.' },
  { q: 'Where can I buy Kruxnut products?', a: 'You can order directly from our website or find us on major e-commerce platforms. For bulk orders, please contact us at Care@kruxnut.com.' },
];

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
  faq: defaultFaq,
};

export class CraftModel {
  static async get() {
    const { data, error } = await supabase
      .from('cms_sections')
      .select('*')
      .eq('section_key', 'craft')
      .single();

    if (error || !data) {
      return defaultCraft;
    }

    const content = (data.content && typeof data.content === 'object') ? data.content : {};
    return {
      title: data.title || defaultCraft.title,
      subtitle: data.subtitle || defaultCraft.subtitle,
      faqImage: data.faq_image || defaultCraft.faqImage,
      steps: Array.isArray(data.steps) && data.steps.length > 0 ? data.steps : defaultCraft.steps,
      faq: Array.isArray(content.faq) && content.faq.length > 0 ? content.faq : defaultFaq,
    };
  }

  static async update(data) {
    const { faq, ...rest } = data || {};
    const payload = {
      ...rest,
      content: { faq: Array.isArray(faq) ? faq : defaultFaq },
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('cms_sections')
      .upsert({ section_key: 'craft', ...payload }, { onConflict: 'section_key' });

    if (error) throw error;
    return data;
  }
}
