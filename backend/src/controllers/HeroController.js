import { HeroModel } from '../models/HeroModel.js';

export const getHeroContent = async (req, res) => {
  try {
    const hero = await HeroModel.getHeroContent();
    res.json(hero);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateHeroContent = async (req, res) => {
  try {
    const data = req.body;
    const hero = await HeroModel.updateHeroContent(data);
    res.json(hero);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
