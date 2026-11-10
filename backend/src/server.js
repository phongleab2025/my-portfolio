import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import authRoutes from './routes/authRoutes.js';
import trackRoutes from './routes/trackRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

// Load biến môi trường
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/profiledientu';
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// 1. Trust proxy để lấy đúng IP từ reverse proxy (Nginx, Cloudflare, Vercel...)
app.set('trust proxy', 1);

// 2. Bảo mật HTTP headers với Helmet
app.use(
  helmet({
    contentSecurityPolicy: false, // Để frontend và CDN asset hoạt động linh hoạt nếu cùng host
    crossOriginEmbedderPolicy: false,
  })
);

// 3. CORS: Giới hạn origin được phép truy cập
const allowedOrigins = [
  CLIENT_URL,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Cho phép requests không có origin (ví dụ: mobile apps, curl, server-to-server) hoặc thuộc allowedOrigins
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('CORS policy: Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// 4. Giới hạn dung lượng body để chống tấn công DoS payload lớn
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// 5. Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date(),
  });
});

// 6. Routes
app.use('/api/auth', authRoutes);
app.use('/api/track', trackRoutes);
app.use('/api/admin', adminRoutes);

// 7. Route 404 cho các endpoint không tồn tại
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
  });
});

// 8. Global Error Handler (Không làm rò rỉ stack trace ra ngoài client)
app.use((err, req, res, next) => {
  console.error('[Server Error]', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' ? 'An unexpected error occurred.' : err.message,
  });
});

// 9. Kết nối MongoDB và Khởi động Server
async function startServer() {
  try {
    console.log('[Database] Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('[Database] Connected to MongoDB successfully.');

    app.listen(PORT, () => {
      console.log(`[Server] Secure backend is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('[Database Error] Failed to connect to MongoDB:', error.message);
    console.log('[Server] Starting server without DB (Database features will fail until DB is connected)...');
    app.listen(PORT, () => {
      console.log(`[Server] Server listening on http://localhost:${PORT} (Waiting for valid DB connection)`);
    });
  }
}

startServer();
