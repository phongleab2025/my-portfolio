import { Router } from 'express';
import { login } from '../controllers/authController.js';
import { loginLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// Áp dụng loginLimiter chống brute-force
router.post('/login', loginLimiter, login);

export default router;
