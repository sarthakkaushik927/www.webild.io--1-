import { Router } from 'express';
import { ProductController } from '../controllers/ProductController.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', ProductController.getAll);
router.get('/:id', ProductController.getById);
router.post('/', requireAdmin, ProductController.create);
router.put('/:id', requireAdmin, ProductController.update);
router.delete('/:id', requireAdmin, ProductController.delete);

export default router;
