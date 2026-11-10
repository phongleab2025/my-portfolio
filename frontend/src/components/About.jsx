import React from 'react';
import { personalInfo } from '../data/projectsData';
import { User, Sparkles, MapPin, GraduationCap, Code2, Briefcase, Terminal } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-16 md:py-24 px-4 sm:px-6 max-w-5xl mx-auto text-[#4a3b37]">
      {/* Tiêu đề mục */}
      <div className="flex items-center justify-between mb-8 md:mb-12 border-b border-[#ebdcd5] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#fceae6] border border-[#f3cac6] flex items-center justify-center text-[#e07a75]">
            <User className="w-4 h-4" />
          </div>
          <h2 className="text-xl md:text-3xl font-bold text-[#4a2621] tracking-wide font-serif">Giới thiệu</h2>
        </div>
        <span className="text-[10px] sm:text-xs font-mono text-[#8f7068] uppercase tracking-widest font-bold">About Me</span>
      </div>

      <div className="grid md:grid-cols-12 gap-8 lg:gap-14 items-center">
        
        {/* CỘT TRÁI: KHUNG POLAROID */}
        <div className="md:col-span-5 flex justify-center items-center">
          <div className="relative group w-[300px] sm:w-[350px] md:w-[380px] max-w-full aspect-[380/500] flex items-center justify-center select-none">
            
            {/* Hiệu ứng hào quang hồng pastel */}
            <div className="absolute inset-4 md:inset-6 bg-[#f7deda] rounded-3xl blur-2xl md:blur-3xl opacity-70 group-hover:opacity-100 transition duration-700 pointer-events-none" />

            {/* Ô ẢNH NẰM TRONG KHUNG POLAROID */}
            <div 
              className="absolute overflow-hidden bg-[#faece9] z-10 shadow-inner rounded-sm"
              style={{
                top: '13.8%',
                left: '11.6%',
                width: '76.8%',
                height: '65.5%'
              }}
            >
              <img 
                src="images/avatar.jpg" 
                alt={personalInfo?.name || "Lê Trung Phong"} 
                className="w-full h-full object-cover object-top filter contrast-[1.05] brightness-95 group-hover:scale-105 transition-transform duration-500 ease-out"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden w-full h-full flex-col items-center justify-center bg-[#faece9] text-[#8f7068]">
                <Terminal className="w-8 h-8 md:w-10 md:h-10 mb-2 text-[#e07a75]" />
                <span className="text-xs font-mono">avatar.jpg</span>
              </div>
            </div>

            {/* KHUNG DECOR POLAROID */}
            <img 
              src="images/decoravatar.png" 
              alt="Polaroid Decor Frame" 
              className="absolute inset-0 w-full h-full object-fill pointer-events-none z-20 drop-shadow-[0_15px_35px_rgba(224,122,117,0.25)] group-hover:scale-[1.01] transition-transform duration-300"
            />

            {/* Badge thông tin dưới chân khung ảnh */}
            <div className="absolute -bottom-3 z-30 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/95 border border-[#ebdcd5] backdrop-blur-md shadow-lg text-[10px] sm:text-xs font-mono text-[#4a2621]">
              <span className="w-2 h-2 rounded-full bg-[#e07a75] animate-pulse" />
              <span className="text-[#b85047] font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Full-Stack Dev
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-[#6e5752]">Dak Lak</span>
            </div>

          </div>
        </div>

        {/* CỘT PHẢI: NỘI DUNG VĂN BẢN */}
        <div className="md:col-span-7 flex flex-col justify-center text-center md:text-left mt-4 md:mt-0">
          
          <div className="inline-block mb-3">
            <span className="text-[11px] sm:text-xs font-mono font-bold text-[#b85047] tracking-wider uppercase bg-[#fceae6] px-3 py-1 rounded-full border border-[#f3cac6]">
              Engineering with Aesthetic Vision
            </span>
          </div>

          <h3 className="font-handwriting text-2xl sm:text-3xl md:text-4xl font-bold text-[#b85047] mb-4 leading-relaxed tracking-wide">
            "Xây dựng sản phẩm web hiện đại kết hợp thẩm mỹ thị giác và công nghệ AI."
          </h3>

          <p className="font-casual text-lg sm:text-xl md:text-2xl text-[#3d2b27] leading-relaxed mb-3 font-semibold">
            {personalInfo?.bio || "Định hướng Full-Stack Web kết hợp thẩm mỹ thị giác và AI thế hệ mới."}
          </p>

          <p className="font-casual text-base sm:text-lg md:text-xl text-[#5c4742] leading-relaxed mb-4">
            Đam mê kết hợp tư duy logic Backend với phong cách mỹ thuật thị giác độc lập (Trầm Concept). Chú trọng vào hiệu năng tải trang, trải nghiệm tương tác mượt mà và khả năng thương mại hóa thực tế.
          </p>

          <div className="font-handwriting text-xl md:text-2xl text-[#b85047] text-right pr-2 md:pr-4 mb-6 font-bold">
            ~ Lê Trung Phong
          </div>

          {/* Lưới 4 ô tóm tắt: Nền Kem Trắng Pastel viền Hồng Đỏ nhẹ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-[#ebdcd5] text-left">
            
            <div className="p-3.5 rounded-xl bg-white/80 border border-[#f0ded8] shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-2 text-[#b85047] text-xs font-mono mb-1 font-bold">
                <GraduationCap className="w-4 h-4" /> Chuyên ngành & Học vấn
              </div>
              <p className="text-xs font-bold text-[#4a2621]">Kỹ sư Phần mềm (Web App)</p>
              <p className="text-[11px] text-[#7a625b]">Đại học Đông Á • CNTT</p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/80 border border-[#f0ded8] shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-2 text-[#b85047] text-xs font-mono mb-1 font-bold">
                <MapPin className="w-4 h-4" /> Khu vực làm việc
              </div>
              <p className="text-xs font-bold text-[#4a2621]">Buôn Ma Thuột, Đắk Lắk</p>
              <p className="text-[11px] text-[#7a625b]">Onsite / Remote toàn quốc</p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/80 border border-[#f0ded8] shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-2 text-[#b85047] text-xs font-mono mb-1 font-bold">
                <Code2 className="w-4 h-4" /> Nền tảng cốt lõi
              </div>
              <p className="text-xs font-bold text-[#4a2621]">Full-Stack Web Application</p>
              <p className="text-[11px] text-[#7a625b]">React, Node.js, REST API, DB</p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/80 border border-[#f0ded8] shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-2 text-[#b85047] text-xs font-mono mb-1 font-bold">
                <Briefcase className="w-4 h-4" /> Vai trò & Trạng thái
              </div>
              <p className="text-xs font-bold text-[#b85047]">Software Engineer</p>
              <p className="text-[11px] text-[#7a625b]">Sẵn sàng nhận dự án mới</p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}