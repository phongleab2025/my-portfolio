import VisitLog from '../models/VisitLog.js';

export const getVisitLogs = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 50));
    const skip = (page - 1) * limit;

    const [logs, totalCount] = await Promise.all([
      VisitLog.find()
        .sort({ timestamp: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      VisitLog.countDocuments(),
    ]);

    // Thống kê nhanh cho Dashboard
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const [todayCount, uniqueIps] = await Promise.all([
      VisitLog.countDocuments({ timestamp: { $gte: startOfToday } }),
      VisitLog.distinct('ip'),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        logs,
        pagination: {
          page,
          limit,
          total: totalCount,
          totalPages: Math.ceil(totalCount / limit) || 1,
        },
        stats: {
          totalVisits: totalCount,
          todayVisits: todayCount,
          uniqueVisitors: uniqueIps.length,
        },
      },
    });
  } catch (error) {
    console.error('Get visit logs error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve visit logs.',
    });
  }
};

// Xoá log nếu cần dọn dẹp
export const clearLogs = async (req, res) => {
  try {
    await VisitLog.deleteMany({});
    return res.status(200).json({
      success: true,
      message: 'All visit logs cleared successfully.',
    });
  } catch (error) {
    console.error('Clear logs error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to clear logs.',
    });
  }
};
