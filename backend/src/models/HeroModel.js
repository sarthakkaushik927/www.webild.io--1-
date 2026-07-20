import { db, ref, get, set, update } from '../config/firebase.js';

export class HeroModel {
  static getRef() {
    return ref(db, 'hero');
  }

  static async getHeroContent() {
    const snapshot = await get(this.getRef());
    if (snapshot.exists()) {
      return snapshot.val();
    }
    // Default hero content if none exists
    const defaultHero = {
      title: "Discover UMBRA",
      subtitle: "The Pinnacle of Luxury",
      images: [
        "https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-1.webp",
        "https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-2.webp"
      ]
    };
    await this.updateHeroContent(defaultHero);
    return defaultHero;
  }

  static async updateHeroContent(data) {
    await set(this.getRef(), data);
    return data;
  }
}
