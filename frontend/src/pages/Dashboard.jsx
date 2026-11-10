import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  Users,
  Activity,
  Globe,
  RefreshCw,
  LogOut,
  Search,
  Monitor,
  Smartphone,
  Calendar,
  Clock,
  Trash2,
} from 'lucide-react';
import api from '../utils/api';

export default function Dashboard() {
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({
    totalVisits: 0,
    todayVisits: 0,
    uniqueVisitors: 0,
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 50,
    total: 0,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const navigate = useNavigate();

  const fetchLogs = useCallback(async (page = 1) => {
    setIsRefreshing(true);
    try {
      const res = await api.get(`/admin/logs?page=${page}&limit=50`);
      if (res.data && res.data.success) {
        setLogs(res.data.data.logs || []);
        if (res.data.data.pagination) {
          setPagination(res.data.data.pagination);
        }
        if (res.data.data.stats) {
          setStats(res.data.data.stats);
        }
      }
    } catch (err) {
      console.error('Failed to load logs:', err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        navigate('/', { replace: true });
      }
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchLogs(1);
  }, [fetchLogs]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    sessionStorage.removeItem('admin_token');
    sessionStorage.removeItem('admin_user');
    navigate('/', { replace: true });
  };

  const handleClearLogs = async () => {
    if (!window.confirm('CẢNH BÁO BẢO MẬT: Bạn có chắc chắn muốn xóa toàn bộ lịch sử truy cập?')) {
      return;
    }
    try {
      await api.delete('/admin/logs');
      fetchLogs(1);
    } catch (err) {
      alert('Không thể xóa logs: ' + (err.response?.data?.message || err.message));
    }
  };

  const filteredLogs = logs.filter((log) => {
    const term = searchTerm.toLowerCase();
    return (
      (log.ip && log.ip.toLowerCase().includes(term)) ||
      (log.os && log.os.toLowerCase().includes(term)) ||
      (log.browser && log.browser.toLowerCase().includes(term)) ||
      (log.endpoint && log.endpoint.toLowerCase().includes(term))
    );
  });

  const formatDate = (isoStr) => {
    if (!isoStr) return 'N/A';
    const date = new Date(isoStr);
    return date.toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 flex flex-col">
      {/* Header Bar */}
      <header className="bg-[#1e293b]/90 border-b border-slate-700/60 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-rose-400" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white tracking-wide flex items-center gap-2">
                Audit Log Dashboard
                <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  REAL-TIME
                </span>
              </h1>
              <p className="text-xs text-slate-400">Theo dõi vết truy cập & phân tích bảo mật</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => fetchLogs(pagination.page)}
              disabled={isRefreshing}
              className="p-2 text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded-lg transition-all"
              title="Làm mới dữ liệu"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-rose-400' : ''}`} />
            </button>

            <button
              onClick={handleClearLogs}
              className="p-2 text-rose-400 hover:text-rose-300 bg-rose-950/30 hover:bg-rose-900/40 border border-rose-800/50 rounded-lg transition-all"
              title="Xóa toàn bộ logs"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-rose-600/80 border border-slate-700 hover:border-rose-500 rounded-lg transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Đăng xuất</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-[#1e293b]/70 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Tổng Lượt Truy Cập</p>
                <h3 className="text-2xl font-bold text-white mt-1">{stats.totalVisits.toLocaleString()}</h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <Activity className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mt-3 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> Ghi nhận từ thời điểm khởi tạo
            </p>
          </div>

          <div className="bg-[#1e293b]/70 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Truy Cập Hôm Nay</p>
                <h3 className="text-2xl font-bold text-emerald-400 mt-1">{stats.todayVisits.toLocaleString()}</h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Clock className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mt-3 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Hoạt động trong 24 giờ qua
            </p>
          </div>

          <div className="bg-[#1e293b]/70 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Địa Chỉ IP Độc Nhất</p>
                <h3 className="text-2xl font-bold text-purple-400 mt-1">{stats.uniqueVisitors.toLocaleString()}</h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mt-3 flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" /> Phân biệt theo định danh IP duy nhất
            </p>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#1e293b]/50 p-4 border border-slate-800 rounded-2xl">
          <div className="relative w-full sm:w-96">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Tìm theo IP, Hệ điều hành, Trình duyệt..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900/80 border border-slate-700/80 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-all"
            />
          </div>

          <div className="text-xs text-slate-400 font-mono">
            Hiển thị <span className="text-rose-400 font-semibold">{filteredLogs.length}</span> / {stats.totalVisits} bản ghi
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-[#1e293b]/70 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider font-mono border-b border-slate-800">
                <tr>
                  <th scope="col" className="px-5 py-3.5 font-semibold">Thời Gian</th>
                  <th scope="col" className="px-5 py-3.5 font-semibold">Địa Chỉ IP</th>
                  <th scope="col" className="px-5 py-3.5 font-semibold">Hệ Điều Hành</th>
                  <th scope="col" className="px-5 py-3.5 font-semibold">Trình Duyệt</th>
                  <th scope="col" className="px-5 py-3.5 font-semibold">Thiết Bị</th>
                  <th scope="col" className="px-5 py-3.5 font-semibold">Trang Đích</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                      <div className="inline-block w-6 h-6 border-2 border-rose-500/30 border-t-rose-500 rounded-full animate-spin mb-2" />
                      <p>Đang tải dữ liệu lịch sử truy cập...</p>
                    </td>
                  </tr>
                ) : filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                      Chưa có dữ liệu lịch sử truy cập nào phù hợp.
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-slate-800/50 transition-colors font-sans"
                    >
                      <td className="px-5 py-3.5 whitespace-nowrap text-slate-300 font-mono text-[11px]">
                        {formatDate(item.timestamp)}
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <span className="font-mono bg-slate-900 border border-slate-700/80 text-rose-300 px-2 py-0.5 rounded text-[11px]">
                          {item.ip}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap font-medium text-slate-200">
                        {item.os || 'Unknown'}
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap text-slate-300">
                        {item.browser || 'Unknown'}
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                          {item.device === 'Mobile' ? (
                            <Smartphone className="w-3 h-3 text-amber-400" />
                          ) : (
                            <Monitor className="w-3 h-3 text-sky-400" />
                          )}
                          {item.device || 'Desktop'}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap font-mono text-slate-400 text-[11px]">
                        {item.endpoint || '/'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="px-5 py-3.5 bg-slate-900/60 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>
                Trang {pagination.page} / {pagination.totalPages}
              </span>
              <div className="flex gap-2">
                <button
                  disabled={pagination.page <= 1}
                  onClick={() => fetchLogs(pagination.page - 1)}
                  className="px-3 py-1 bg-slate-800 border border-slate-700 rounded hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Trước
                </button>
                <button
                  disabled={pagination.page >= pagination.totalPages}
                  onClick={() => fetchLogs(pagination.page + 1)}
                  className="px-3 py-1 bg-slate-800 border border-slate-700 rounded hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Sau
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
