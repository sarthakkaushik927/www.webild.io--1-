import { realtimeRequest } from '../utils/realtimeDatabase.js';

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

export class CraftModel {
  static async get() {
    const craft = await realtimeRequest('craft');
    return craft ? { ...defaultCraft, ...craft } : defaultCraft;
  }

  static async update(data) {
    return data;
  }
}
