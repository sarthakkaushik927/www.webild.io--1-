import { HeroModel } from '../models/HeroModel.js';

export class HeroService {
  static async getHeroData() {
    return await HeroModel.getHeroContent();
  }

  static async updateHeroData(heroData) {
    if (!heroData.title || !heroData.subtitle) {
      throw new Error("Hero data must include title and subtitle.");
    }
    return await HeroModel.updateHeroContent(heroData);
  }
}
