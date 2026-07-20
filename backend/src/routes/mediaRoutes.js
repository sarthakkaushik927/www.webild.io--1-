import { Router } from 'express';
import { getAllMedia, getMediaById, createMedia, updateMedia, deleteMedia } from '../controllers/MediaController.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', getAllMedia);
router.get('/:id', getMediaById);
router.post('/', requireAdmin, createMedia);
router.put('/:id', requireAdmin, updateMedia);
router.delete('/:id', requireAdmin, deleteMedia);

export default router;
