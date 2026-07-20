import { CraftModel } from '../models/CraftModel.js';

export const getCraft = async (req, res) => {
  try {
    const craft = await CraftModel.get();
    res.json(craft || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCraft = async (req, res) => {
  try {
    const craft = await CraftModel.update(req.body);
    res.json(craft);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
