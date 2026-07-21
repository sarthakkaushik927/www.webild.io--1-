import { Router } from 'express';
import { CategoryController } from '../controllers/CategoryController.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', CategoryController.getAll);
router.post('/', requireAdmin, CategoryController.create);
router.put('/:id', requireAdmin, CategoryController.update);
router.delete('/:id', requireAdmin, CategoryController.delete);

export default router;
