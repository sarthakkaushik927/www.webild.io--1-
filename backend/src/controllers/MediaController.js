import { MediaModel } from '../models/MediaModel.js';

export const getAllMedia = async (req, res) => {
  try {
    const media = await MediaModel.getAll();
    res.json(media);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMediaById = async (req, res) => {
  try {
    const media = await MediaModel.getById(req.params.id);
    if (media) {
      res.json(media);
    } else {
      res.status(404).json({ error: "Media not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createMedia = async (req, res) => {
  try {
    const newMedia = await MediaModel.create(req.body);
    res.status(201).json(newMedia);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateMedia = async (req, res) => {
  try {
    const updatedMedia = await MediaModel.update(req.params.id, req.body);
    res.json(updatedMedia);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteMedia = async (req, res) => {
  try {
    await MediaModel.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
