import React, { useMemo } from 'react';

export default function FlowerEffect() {
  // Tạo 15 bông hoa với kích thước to hơn và độ đậm rõ nét hơn
  const flowers = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 96 + 2, // Vị trí ngang (%)
      size: Math.random() * 20 + 28, // KÍCH THƯỚC TO HƠN: 28px - 48px
      duration: Math.random() * 6 + 9, // Thời gian rơi tự nhiên (9s - 15s)
      delay: Math.random() * 6, // Độ trễ xuất hiện
      opacity: Math.random() * 0.25 + 0.6, // ĐỘ RÕ HƠN: 0.6 - 0.85
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {flowers.map((flower) => (
        <img
          key={flower.id}
          src="images/Hieuung.png"
          alt="flower effect"
          className="absolute animate-falling-flower drop-shadow-md"
          style={{
            left: `${flower.left}%`,
            width: `${flower.size}px`,
            height: `${flower.size}px`,
            opacity: flower.opacity,
            animationDuration: `${flower.duration}s`,
            animationDelay: `${flower.delay}s`,
          }}
          onError={(e) => {
            e.currentTarget.src = '/images/Hieuung.png';
          }}
        />
      ))}
    </div>
  );
}