import express from 'express';
import { getCommunity, updateCommunity } from '../controllers/CommunityController.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getCommunity);
router.put('/', requireAdmin, updateCommunity);

export default router;
