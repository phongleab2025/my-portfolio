import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Component bảo vệ các tuyến đường Admin ẩn.
 * Nếu không có JWT hợp lệ trong storage, điều hướng âm thầm về trang chủ "/"
 * để tránh kẻ xấu dò quét đường dẫn admin.
 */
export default function PrivateRoute({ children }) {
  const token = localStorage.getItem('admin_token') || sessionStorage.getItem('admin_token');

  if (!token) {
    // Điều hướng ngầm về trang chủ
    return <Navigate to="/" replace />;
  }

  return children;
}
