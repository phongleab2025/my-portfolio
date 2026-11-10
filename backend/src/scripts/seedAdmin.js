import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import User from '../models/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env từ thư mục backend
dotenv.config({ path: resolve(__dirname, '../../.env') });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/profiledientu';
const ADMIN_USERNAME = process.env.ADMIN_DEFAULT_USER || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_DEFAULT_PASS || 'Admin@Secure2026!';

async function seedAdmin() {
  try {
    console.log('[Seed] Connecting to MongoDB at:', MONGO_URI);
    await mongoose.connect(MONGO_URI);
    console.log('[Seed] Database connected successfully.');

    const cleanUsername = ADMIN_USERNAME.toLowerCase().trim();
    const existingAdmin = await User.findOne({ username: cleanUsername });

    // Băm mật khẩu bằng bcrypt với salt rounds = 12 (độ an toàn cao)
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, saltRounds);

    if (existingAdmin) {
      console.log(`[Seed] Admin user "${cleanUsername}" already exists. Updating password hash...`);
      existingAdmin.password = hashedPassword;
      await existingAdmin.save();
      console.log(`[Seed] Password hash updated successfully.`);
    } else {
      console.log(`[Seed] Creating new default admin user: "${cleanUsername}"...`);
      await User.create({
        username: cleanUsername,
        password: hashedPassword,
        role: 'admin',
      });
      console.log(`[Seed] Default admin created successfully.`);
    }

    console.log('----------------------------------------------------');
    console.log(`[SUCCESS] Admin credentials initialized:`);
    console.log(`Username: ${cleanUsername}`);
    console.log(`Password: ${ADMIN_PASSWORD}`);
    console.log(`(Password has been securely hashed with bcrypt in the database)`);
    console.log('----------------------------------------------------');
  } catch (error) {
    console.error('[Seed Error] Failed to seed admin user:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('[Seed] Disconnected from database.');
    process.exit(0);
  }
}

seedAdmin();
