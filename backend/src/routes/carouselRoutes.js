import { Router } from 'express';
import { getCarousel, updateCarousel } from '../controllers/CarouselController.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', getCarousel);
router.put('/', requireAdmin, updateCarousel);

export default router;
