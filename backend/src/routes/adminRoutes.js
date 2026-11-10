import { Router } from 'express';
import { getVisitLogs, clearLogs } from '../controllers/adminController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = Router();

// Tất cả routes trong /api/admin đều yêu cầu JWT Token hợp lệ
router.use(verifyToken);

router.get('/logs', getVisitLogs);
router.delete('/logs', clearLogs);

export default router;
