import { CarouselModel } from '../models/CarouselModel.js';

export const getCarousel = async (req, res) => {
  try {
    const carousel = await CarouselModel.get();
    res.json(carousel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCarousel = async (req, res) => {
  try {
    const carousel = await CarouselModel.update(req.body);
    res.json(carousel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
