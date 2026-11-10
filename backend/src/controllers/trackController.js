import { UAParser } from 'ua-parser-js';
import VisitLog from '../models/VisitLog.js';

export const trackVisit = async (req, res) => {
  try {
    // Lấy địa chỉ IP chính xác, hỗ trợ cả proxy / reverse proxy
    const forwarded = req.headers['x-forwarded-for'];
    let ip = forwarded ? forwarded.split(',')[0].trim() : (req.socket?.remoteAddress || req.ip || '127.0.0.1');
    if (ip.startsWith('::ffff:')) {
      ip = ip.substring(7);
    } else if (ip === '::1') {
      ip = '127.0.0.1';
    }

    const rawUserAgent = (typeof req.headers['user-agent'] === 'string')
      ? req.headers['user-agent'].substring(0, 1000)
      : 'Unknown';

    // Parse thông tin OS, Browser, Device an toàn
    const parser = new UAParser(rawUserAgent);
    const parsed = parser.getResult();

    const osName = parsed.os.name ? `${parsed.os.name} ${parsed.os.version || ''}`.trim() : 'Unknown OS';
    const browserName = parsed.browser.name ? `${parsed.browser.name} ${parsed.browser.major || ''}`.trim() : 'Unknown Browser';
    const deviceType = parsed.device.type || (['iOS', 'Android'].includes(parsed.os.name) ? 'Mobile' : 'Desktop');

    let endpoint = '/';
    if (req.body && typeof req.body.endpoint === 'string') {
      endpoint = req.body.endpoint.substring(0, 200).trim();
    }

    // Lưu vào database
    await VisitLog.create({
      ip,
      userAgent: rawUserAgent,
      os: osName,
      browser: browserName,
      device: deviceType,
      endpoint,
      timestamp: new Date(),
    });

    return res.status(201).json({
      success: true,
      message: 'Visit tracked successfully.',
    });
  } catch (error) {
    console.error('Track visit error:', error);
    // Luôn trả về 200/204 để không gây ảnh hưởng đến trải nghiệm người dùng frontend nếu tracking lỗi
    return res.status(200).json({
      success: false,
      message: 'Failed to record visit log.',
    });
  }
};
