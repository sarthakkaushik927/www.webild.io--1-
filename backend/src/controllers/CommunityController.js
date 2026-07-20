import { CommunityModel } from '../models/CommunityModel.js';

export const getCommunity = async (req, res) => {
  try {
    const community = await CommunityModel.get();
    res.json(community || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCommunity = async (req, res) => {
  try {
    const community = await CommunityModel.update(req.body);
    res.json(community);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
