import rateLimit from 'express-rate-limit';

// Rate limit cho API tracking công khai: tối đa 5 requests / 1 phút mỗi IP
export const trackLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 phút
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many tracking requests from this IP, please try again after 1 minute.',
  },
});

// Rate limit chống Brute-force mật khẩu trang Admin: tối đa 5 lần đăng nhập / 15 phút
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many login attempts from this IP, please try again after 15 minutes.',
  },
});
