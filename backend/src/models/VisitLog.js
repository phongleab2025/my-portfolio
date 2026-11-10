import mongoose from 'mongoose';

const visitLogSchema = new mongoose.Schema(
  {
    ip: {
      type: String,
      required: true,
      trim: true,
    },
    userAgent: {
      type: String,
      default: 'Unknown',
      trim: true,
      maxlength: 1000,
    },
    os: {
      type: String,
      default: 'Unknown',
      trim: true,
    },
    browser: {
      type: String,
      default: 'Unknown',
      trim: true,
    },
    device: {
      type: String,
      default: 'Desktop',
      trim: true,
    },
    endpoint: {
      type: String,
      default: '/',
      trim: true,
      maxlength: 200,
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: false,
  }
);

// Tạo index để query log nhanh chóng theo thời gian giảm dần
visitLogSchema.index({ timestamp: -1 });

const VisitLog = mongoose.model('VisitLog', visitLogSchema);
export default VisitLog;
