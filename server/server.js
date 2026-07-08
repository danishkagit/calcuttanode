import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

dotenv.config();

if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = 'uXKNLJoa1nQW9zVsItBbOdAHZmrE4p8MG32cYyU70f6qR5TjkiSxvCwhDgePlF';
}
if (!process.env.JWT_REFRESH_SECRET) {
  process.env.JWT_REFRESH_SECRET = 'SFcQHAUJi1rj4NMB0XLG2mso7Ohbvqx85EZtTp9wdlfayuDIRnC36WkVzKPegY';
}
if (!process.env.OPENCODE_ZEN_KEY) {
  console.warn('WARNING: OPENCODE_ZEN_KEY not set. AI chat will not work. Set it in Render dashboard.');
}

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'http://localhost:5173',
  'http://localhost:3000',
  'https://calcuttanode.vercel.app',
].filter(Boolean);
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(cookieParser());

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use('/api/auth', limiter);
app.use('/api/payments', limiter);

import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import productRoutes from './routes/productRoutes.js';
import subscriptionRoutes from './routes/subscriptionRoutes.js';
import referralRoutes from './routes/referralRoutes.js';
import loyaltyRoutes from './routes/loyaltyRoutes.js';
import couponRoutes from './routes/couponRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import wishlistRoutes from './routes/wishlistRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import seoRoutes from './routes/seoRoutes.js';

app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/products', productRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/referral', referralRoutes);
app.use('/api/loyalty', loyaltyRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/seo', seoRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/ai', aiRoutes);

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const APK_DOWNLOAD_URL = 'https://github.com/danishkagit/calcuttanode/releases/download/v1.0.0/calcuttanode-app.apk';

app.get('/api/app/download/android', (req, res) => {
  res.redirect(302, APK_DOWNLOAD_URL);
});

app.get('/sitemap.xml', (req, res) => {
  res.redirect(301, 'https://calcuttanode-api.onrender.com/api/seo/sitemap');
});

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running', timestamp: new Date().toISOString() });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });
