import { Router } from 'express';
import { SettingsController } from '../controllers/SettingsController.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/settings', SettingsController.getSettings);
router.put('/settings', SettingsController.updateSettings);
router.get('/api-configs', SettingsController.getApiConfigs);
router.post('/api-configs', requireAdmin, SettingsController.createApiConfig);
router.put('/api-configs/:id', requireAdmin, SettingsController.updateApiConfig);
router.delete('/api-configs/:id', requireAdmin, SettingsController.deleteApiConfig);

export default router;
