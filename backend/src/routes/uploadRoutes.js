import { Router } from 'express';
import multer from 'multer';
import { supabase } from '../lib/supabase.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.'));
    }
  },
});

router.post('/', requireAdmin, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileName = `${Date.now()}_${req.file.originalname}`;
    const { data, error } = await supabase.storage
      .from('media')
      .upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: true,
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('media')
      .getPublicUrl(fileName);

    return res.json({
      id: data.path,
      url: publicUrl,
      name: req.file.originalname,
      type: req.file.mimetype.split('/')[0],
      created_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Upload failed:', error);
    res.status(500).json({ error: error.message || 'Upload failed' });
  }
});

export default router;
