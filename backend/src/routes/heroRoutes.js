import express from 'express';
import { getHeroContent, updateHeroContent } from '../controllers/HeroController.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getHeroContent);
router.put('/', requireAdmin, updateHeroContent);

export default router;
