import { realtimeRequest } from '../utils/realtimeDatabase.js';

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
    const hero = await realtimeRequest('hero');
    return hero ? { ...defaultHero, ...hero } : defaultHero;
  }

  static async updateHeroContent(data) {
    return data;
  }
}
