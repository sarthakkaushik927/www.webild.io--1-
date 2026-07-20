import express from 'express';
import { getCraft, updateCraft } from '../controllers/CraftController.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getCraft);
router.put('/', requireAdmin, updateCraft);

export default router;
