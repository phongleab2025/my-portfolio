import React, { useState, useEffect } from 'react';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // 1. Giữ màn hình 2.2 giây để diễn trọn vẹn animation Hello iOS
    const timer1 = setTimeout(() => {
      setFadeOut(true);
    }, 2200);

    // 2. Mờ dần toàn bộ màn hình chờ và kết thúc
    const timer2 = setTimeout(() => {
      setLoading(false);
    }, 2800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (!loading) return null;

  return (
    <div 
      /* Click vào Preloader cũng kích hoạt tương tác để bật nhạc */
      onClick={() => {
        window.dispatchEvent(new Event('user-interacted'));
      }}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#fcf8f2] cursor-pointer transition-all duration-700 ease-in-out ${
        fadeOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Khối chữ hiện kiểu iOS Hello */}
      <div className="relative overflow-hidden p-6 flex flex-col items-center">
        <img 
          src="images/ten.png" 
          alt="Lê Trung Phong" 
          className="h-32 sm:h-44 md:h-56 w-auto object-contain animate-ios-hello filter drop-shadow-[0_10px_30px_rgba(224,122,117,0.35)]"
          onError={(e) => {
            e.currentTarget.src = '/images/ten.png';
          }}
        />

        {/* Vệt sáng quét mượt kiểu Apple */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="w-40 h-full bg-gradient-to-r from-transparent via-white/90 to-transparent animate-ios-glow mix-blend-overlay" />
        </div>
      </div>

      {/* Dải chấm mờ phong cách tối giản iOS */}
      <div className="flex items-center gap-2 mt-4 opacity-70">
        <span className="w-1.5 h-1.5 rounded-full bg-[#e07a75] animate-ping" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#e07a75] opacity-60" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#e07a75] opacity-30" />
      </div>
    </div>
  );
}