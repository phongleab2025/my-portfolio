import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Eye, EyeOff, ShieldCheck, AlertCircle } from 'lucide-react';
import api from '../utils/api';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username.trim() || !password) {
      setErrorMsg('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/auth/login', {
        username: username.trim(),
        password,
      });

      if (response.data && response.data.success) {
        const { token, user } = response.data;

        // Lưu JWT vào storage theo lựa chọn Ghi nhớ đăng nhập
        if (rememberMe) {
          localStorage.setItem('admin_token', token);
          localStorage.setItem('admin_user', JSON.stringify(user));
        } else {
          sessionStorage.setItem('admin_token', token);
          sessionStorage.setItem('admin_user', JSON.stringify(user));
        }

        // Chuyển hướng tới bảng điều khiển ẩn
        navigate('/hidden-admin', { replace: true });
      } else {
        setErrorMsg(response.data?.message || 'Đăng nhập không thành công.');
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Đăng nhập thất bại. Kiểm tra lại thông tin hoặc kết nối máy chủ.';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111827] flex items-center justify-center p-4 selection:bg-rose-500 selection:text-white">
      <div className="w-full max-w-md bg-[#1f2937] border border-gray-700/60 rounded-2xl shadow-2xl p-8 backdrop-blur-xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-center justify-center mb-3">
            <ShieldCheck className="w-9 h-9 text-rose-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-100 tracking-wide">Admin Portal</h1>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-mono">
            Hệ Thống Quản Trị Bảo Mật
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3.5 bg-rose-950/60 border border-rose-500/40 rounded-xl flex items-center gap-3 text-rose-300 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Tài khoản
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <User className="w-5 h-5" />
              </div>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nhập tên đăng nhập"
                className="w-full pl-11 pr-4 py-2.5 bg-gray-900/80 border border-gray-700 rounded-xl text-gray-100 text-sm focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all placeholder-gray-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Mật khẩu
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu an toàn"
                className="w-full pl-11 pr-11 py-2.5 bg-gray-900/80 border border-gray-700 rounded-xl text-gray-100 text-sm focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all placeholder-gray-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-200 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer text-gray-300">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded bg-gray-900 border-gray-700 text-rose-500 focus:ring-rose-500/30"
              />
              <span className="text-xs">Ghi nhớ phiên đăng nhập</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-medium rounded-xl shadow-lg shadow-rose-500/20 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <span>Xác Thực & Đăng Nhập</span>
            )}
          </button>
        </form>

        <div className="mt-8 pt-4 border-t border-gray-800 text-center">
          <p className="text-[11px] text-gray-500">
            Hệ thống giám sát bảo mật chống brute-force và ghi nhật ký truy cập IP.
          </p>
        </div>
      </div>
    </div>
  );
}
