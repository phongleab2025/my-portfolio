import { Router } from 'express';
import { trackVisit } from '../controllers/trackController.js';
import { trackLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// Endpoint công khai để frontend gửi tracking, giới hạn 5 requests/phút mỗi IP
router.post('/', trackLimiter, trackVisit);

export default router;
