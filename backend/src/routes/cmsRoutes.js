import { Router } from 'express';
import { CmsController } from '../controllers/CmsController.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', CmsController.getAll);
router.get('/:key', CmsController.getByKey);
router.post('/', requireAdmin, CmsController.create);
router.put('/:key', requireAdmin, CmsController.update);
router.delete('/:key', requireAdmin, CmsController.delete);

export default router;
