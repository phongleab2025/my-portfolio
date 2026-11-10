import React, { useState, useRef } from 'react';
import { projectsData } from '../data/projectsData';
import { ExternalLink, Layers, X, CheckCircle2, ChevronLeft, ChevronRight, MoveHorizontal } from 'lucide-react';

export default function Projects() {
  const [activeModal, setActiveModal] = useState(null);
  const sliderRef = useRef(null);

  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isMoved, setIsMoved] = useState(false);

  // Bắt đầu nhấp chuột xuống để kéo
  const handleMouseDown = (e) => {
    setIsDown(true);
    setIsMoved(false);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  // Thả chuột hoặc rời khỏi khung
  const handleMouseUpOrLeave = () => {
    setIsDown(false);
  };

  // Di chuột để trượt danh sách
  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Tốc độ trượt
    if (Math.abs(walk) > 8) {
      setIsMoved(true); // Đang kéo thật sự -> không mở popup modal
    }
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  // Nút bấm cuộn nhanh trái/phải
  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 450;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="projects" className="py-20 px-6 max-w-7xl mx-auto text-[#4a3b37] select-none">
      {/* Tiêu đề & Cụm nút điều hướng */}
      <div className="flex items-center justify-between mb-8 border-b border-[#ebdcd5] pb-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#4a2621] flex items-center gap-3">
            <Layers className="text-[#e07a75] w-6 h-6" /> Dự án nổi bật
          </h2>
          <div className="flex items-center gap-2 text-xs font-mono text-[#b85047] font-bold mt-2">
            <MoveHorizontal className="w-4 h-4 animate-pulse" />
            <span>Kéo chuột trái - phải để xem các dự án</span>
          </div>
        </div>

        {/* 2 nút bấm chuyển nhanh */}
        <div className="flex items-center gap-2">
          <button 
            type="button"
            onClick={() => scroll('left')}
            className="p-2.5 rounded-xl bg-white border border-[#f0ded8] text-[#6e5752] hover:text-[#e07a75] hover:border-[#e07a75]/60 transition cursor-pointer shadow-sm"
            title="Cuộn sang trái"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            type="button"
            onClick={() => scroll('right')}
            className="p-2.5 rounded-xl bg-white border border-[#f0ded8] text-[#6e5752] hover:text-[#e07a75] hover:border-[#e07a75]/60 transition cursor-pointer shadow-sm"
            title="Cuộn sang phải"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* KHUNG DẢI CARD TRƯỢT KÉO TRÁI - PHẢI */}
      <div 
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseUpOrLeave}
        onMouseUp={handleMouseUpOrLeave}
        onMouseMove={handleMouseMove}
        className={`flex gap-6 overflow-x-auto pb-8 pt-2 select-none ${
          isDown ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {projectsData.map((project) => (
          <div 
            key={project.id} 
            onClick={() => {
              if (!isMoved) setActiveModal(project);
            }}
            className="group relative rounded-2xl bg-white/80 border border-[#f0ded8] hover:border-[#e07a75]/60 transition-all duration-300 overflow-hidden flex flex-col justify-between hover:shadow-md shrink-0 w-[350px] sm:w-[420px] md:w-[460px]"
          >
            {/* Ảnh đại diện dự án */}
            <div className="h-56 w-full bg-[#faece9] border-b border-[#f0ded8] relative overflow-hidden pointer-events-none">
              {project.image ? (
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#faece9]">
                  <span className="font-mono text-xs text-[#8f7068] tracking-widest uppercase">
                    [ {project.previewText} ]
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#4a2621]/30 via-transparent to-transparent opacity-60" />
            </div>

            {/* Nội dung card */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-mono text-[#b85047] font-bold">{project.tagline}</span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#fceae6] border border-[#f3cac6] text-[#8f3833] font-mono font-bold">
                    {project.status}
                  </span>
                </div>

                <h3 className="text-lg font-bold font-serif text-[#4a2621] mb-3 flex items-center justify-between group-hover:text-[#b85047] transition-colors">
                  {project.title}
                  <ExternalLink className="w-4 h-4 text-[#8f7068] group-hover:text-[#e07a75] transition-colors" />
                </h3>

                <p className="text-xs text-[#6e5752] mb-6 leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#ebdcd5]">
                {project.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="text-[11px] font-mono text-[#6e5752] bg-[#fcf8f2] px-2 py-0.5 rounded border border-[#f0ded8]">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL CHI TIẾT DỰ ÁN (Chuẩn tông màu sáng pastel) */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-[#fcf8f2] border border-[#f0ded8] rounded-2xl max-w-xl w-full p-6 relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button 
              type="button"
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-[#8f7068] hover:text-[#4a2621] hover:bg-[#f4e6e2] transition cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {activeModal.image && (
              <div className="w-full h-48 rounded-xl overflow-hidden mb-5 border border-[#f0ded8]">
                <img 
                  src={activeModal.image} 
                  alt={activeModal.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <span className="text-xs font-mono text-[#b85047] font-bold uppercase tracking-wider">{activeModal.tagline}</span>
            <h3 className="text-2xl font-bold font-serif mt-1 mb-4 text-[#4a2621]">{activeModal.title}</h3>
            
            <p className="text-sm text-[#5c4742] leading-relaxed mb-6">
              {activeModal.description}
            </p>

            <h4 className="text-xs font-bold font-mono uppercase text-[#8f7068] tracking-wider mb-3">Tính năng & Kỹ thuật chính:</h4>
            <div className="space-y-2.5 mb-6">
              {activeModal.features.map((feat, fIdx) => (
                <div key={fIdx} className="flex items-start gap-2.5 text-xs text-[#3d2b27]">
                  <CheckCircle2 className="w-4 h-4 text-[#e07a75] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#ebdcd5]">
              <div className="flex flex-wrap gap-2">
                {activeModal.tags.map((tag, idx) => (
                  <span key={idx} className="text-[11px] font-mono text-[#b85047] bg-[#fceae6] px-2 py-0.5 rounded border border-[#f3cac6] font-bold">
                    {tag}
                  </span>
                ))}
              </div>
              <button 
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-4 py-1.5 rounded-lg bg-[#e07a75] hover:bg-[#c9625d] text-xs text-white font-bold transition cursor-pointer shadow-sm"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}