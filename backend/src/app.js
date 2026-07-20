import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import heroRoutes from './routes/heroRoutes.js';
import craftRoutes from './routes/craftRoutes.js';
import communityRoutes from './routes/communityRoutes.js';
import carouselRoutes from './routes/carouselRoutes.js';
import mediaRoutes from './routes/mediaRoutes.js';

const app = express();

// Environment-based CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/hero', heroRoutes);
app.use('/api/craft', craftRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/carousel', carouselRoutes);
app.use('/api/media', mediaRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Backend is running' });
});

export default app;
