import React, { useState, useEffect } from 'react';

// Mảng 3 ảnh bg1.jpg, bg2.jpg, bg3.jpg trong public/images/
const heroImages = [
  'images/bg1.jpg',
  'images/bg2.jpg',
  'images/bg3.jpg'
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Tự động chuyển slide ảnh mỗi 3 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative w-full bg-[#fcf8f2] text-[#332521] pt-4 sm:pt-6 pb-12 sm:pb-16 px-4 sm:px-8 md:px-12 overflow-hidden rounded-b-[32px] sm:rounded-b-[40px] md:rounded-b-[60px]">
      
      {/* Họa tiết trang trí */}
      <div className="absolute top-8 left-[40%] text-[#e07a75] opacity-80 text-lg animate-pulse">✦</div>
      <div className="absolute top-20 left-[50%] text-[#a34843] opacity-60 text-xs">✦</div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-12 gap-6 md:gap-8 items-center">
        
        {/* CỘT TRÁI: Văn bản thông tin */}
        <div className="sm:col-span-7 space-y-3 sm:space-y-4 md:space-y-5 text-left flex flex-col items-start">
          
          {/* 1. BADGE CẮT GỌN NỀN MOBILE */}
          <div className="inline-flex items-center gap-1.5 bg-[#f4e6e2] border border-[#e8c8c2] px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold text-[#8f3833] max-w-full">
            <span className="w-2 h-2 rounded-full bg-[#d9534f] animate-pulse shrink-0"></span>
            <span className="truncate">Available for freelance &amp; full-time roles</span>
          </div>

          {/* 2. TEN.PNG: TỐI ƯU KÍCH THƯỚC CHUẨN TỪ MOBILE RỘNG 375PX TỚI PC */}
          <div className="relative inline-block overflow-hidden my-1 -ml-1 w-full sm:w-auto max-w-full group text-left">
            <img 
              src="images/ten.png" 
              alt="Lê Trung Phong" 
              className="h-28 xs:h-36 sm:h-52 md:h-64 lg:h-[320px] w-auto max-w-full object-contain object-left filter drop-shadow-[0_6px_18px_rgba(224,122,117,0.4)] transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.src = '/images/ten.png';
              }}
            />
            {/* Vệt sáng kim loại */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="w-32 h-full bg-gradient-to-r from-transparent via-white/80 to-transparent animate-metallic-shimmer mix-blend-overlay" />
            </div>
          </div>

          {/* 3. CHỨC DANH */}
          <p className="text-base sm:text-xl md:text-2xl font-bold text-[#b85047] tracking-wide">
            Software Engineer <span className="text-gray-500 font-normal">&amp;</span> Visual Creative
          </p>

          {/* 4. MÔ TẢ */}
          <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed font-normal max-w-xl">
            "Biến ý tưởng phức tạp thành trải nghiệm số đơn giản, tinh tế. Thiết kế và phát triển ứng dụng Web với góc nhìn thẩm mỹ hiện đại."
          </p>

          {/* 5. VỊ TRÍ */}
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-600 font-mono">
            <span>📍</span>
            <span>Buôn Ma Thuột, Đắk Lắk, Việt Nam</span>
          </div>

          {/* 6. CỤM NÚT BẤM */}
          <div className="flex items-center gap-2.5 pt-2 w-full sm:w-auto">
            <button 
              onClick={() => scrollToSection('projects')}
              className="bg-[#e07a75] hover:bg-[#c9625d] text-white font-bold text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 rounded-full transition shadow-md shadow-red-200 flex items-center justify-center gap-2 flex-1 sm:flex-none"
            >
              Khám phá dự án ➔
            </button>
            
            <button 
              onClick={() => scrollToSection('contact')}
              className="w-10 h-10 rounded-full border border-[#e6d0cb] bg-white hover:bg-[#f9ecea] text-[#6b2d28] flex items-center justify-center transition shadow-sm shrink-0"
              title="Kết nối"
            >
              ▶
            </button>
          </div>
        </div>

        {/* CỘT PHẢI: Khung Slider 3 hình ảnh */}
        <div className="sm:col-span-5 flex justify-center sm:justify-end relative mt-6 sm:mt-0">
          <div className="relative w-full max-w-[300px] xs:max-w-[340px] md:max-w-md">
            
            {/* Phông nền trang trí hồng pastel */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#f3cac6] to-[#f7deda] rounded-3xl transform rotate-2 scale-105" />

            {/* Khung chứa hình ảnh slider */}
            <div className="relative z-10 w-full h-[240px] xs:h-[280px] sm:h-[320px] md:h-[380px] rounded-3xl overflow-hidden border-2 border-white shadow-xl bg-[#faece9]">
              {heroImages.map((imgSrc, index) => (
                <img
                  key={index}
                  src={imgSrc}
                  alt={`Slide ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                    index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                  }`}
                  onError={(e) => {
                    e.currentTarget.src = 'images/avatar.jpg';
                  }}
                />
              ))}
            </div>

            {/* 3 vạch chỉ số slider */}
            <div className="absolute -bottom-3 -right-2 z-20 flex gap-2 bg-white/90 p-2 rounded-full shadow-md border border-[#f0ded8]">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Chuyển sang ảnh ${index + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-7 bg-[#e07a75]'
                      : 'w-2.5 bg-[#f3cac6] hover:bg-[#e07a75]/60'
                  }`}
                />
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}