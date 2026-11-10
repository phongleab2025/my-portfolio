import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Portfolio from './pages/Portfolio';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. Trang chủ Portfolio */}
        <Route path="/" element={<Portfolio />} />

        {/* 2. Cổng đăng nhập Admin ẩn (Hỗ trợ cả /admin-login và /login) */}
        <Route path="/admin-login" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* 3. Trang Admin Dashboard bí mật (Được bảo vệ bởi PrivateRoute) */}
        <Route
          path="/hidden-admin"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* 4. Mọi URL lạ hoặc 404 đều chuyển hướng âm thầm về trang chủ "/" */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
