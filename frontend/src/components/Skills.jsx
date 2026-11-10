import React from 'react';
import { 
  Wrench, 
  Code2, 
  Server, 
  Palette, 
  Sparkles
} from 'lucide-react';

export default function Skills() {
  const skillCategories = [
    {
      title: "Frontend & Web Architecture",
      icon: Code2,
      tag: "Client-side",
      desc: "Xây dựng giao diện ứng dụng web tối ưu trải nghiệm người dùng, tốc độ tải trang cao và responsive đa nền tảng.",
      skills: [
        { name: "React.js", level: "Thành thạo" },
        { name: "JavaScript (ES6+)", level: "Nền tảng vững" },
        { name: "Tailwind CSS", level: "Thành thạo" },
        { name: "HTML5 / Modern CSS", level: "Chuẩn Semantic" },
        { name: "Web Audio API", level: "Thực chiến" },
        { name: "Vite Tooling", level: "Tối ưu Build" }
      ]
    },
    {
      title: "Backend, Database & Security",
      icon: Server,
      tag: "Server-side",
      desc: "Thiết kế kiến trúc API, xử lý luồng dữ liệu, tích hợp xác thực bảo mật tài khoản người dùng theo chuẩn công nghiệp.",
      skills: [
        { name: "Node.js & Express", level: "Xây dựng REST API" },
        { name: "Python", level: "Scripting & Backend" },
        { name: "PostgreSQL / SQL", level: "Relational DB" },
        { name: "MongoDB", level: "NoSQL DB" },
        { name: "OAuth 2.0 / Google Auth", level: "Xác thực 2 lớp" },
        { name: "JWT & API Security", level: "Bảo mật phiên" }
      ]
    },
    {
      title: "Visual Design & AI Generation",
      icon: Palette,
      tag: "Creative Tech",
      desc: "Tư duy thẩm mỹ thị giác kết hợp công cụ sinh AI thế hệ mới để xây dựng tài sản số và định hình nhận diện thương hiệu.",
      skills: [
        { name: "Photoshop (Cinematic)", level: "Trầm Concept" },
        { name: "Figma UI/UX", level: "Wireframe / Mockup" },
        { name: "Canva Pro", level: "Ấn phẩm số" },
        { name: "Suno AI Music", level: "Sản xuất Audio BGM" },
        { name: "Generative AI Workflow", level: "Tối ưu hiệu suất" }
      ]
    }
  ];

  return (
    <section id="skills" className="py-16 px-6 max-w-5xl mx-auto text-[#4a3b37]">
      {/* Tiêu đề mục chuẩn Light Mode Minimal */}
      <div className="flex items-center justify-between mb-12 border-b border-[#ebdcd5] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#fceae6] border border-[#f3cac6] flex items-center justify-center text-[#e07a75]">
            <Wrench className="w-4 h-4" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-wide font-serif text-[#4a2621]">Kỹ Năng Chuyên Môn</h2>
        </div>
        <span className="text-xs font-mono text-[#8f7068] uppercase tracking-widest font-bold">Core Capabilities</span>
      </div>

      {/* Grid 3 cột chi tiết */}
      <div className="grid md:grid-cols-3 gap-6">
        {skillCategories.map((group, idx) => {
          const Icon = group.icon;
          return (
            <div 
              key={idx}
              className="group relative rounded-2xl bg-white/80 border border-[#f0ded8] p-6 flex flex-col justify-between hover:border-[#e07a75]/60 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <div>
                {/* Header Card */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#fceae6] border border-[#f3cac6] flex items-center justify-center text-[#e07a75] group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#fceae6] text-[#b85047] border border-[#f3cac6]">
                    {group.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#4a2621] mb-2 group-hover:text-[#b85047] transition-colors font-serif">
                  {group.title}
                </h3>
                
                <p className="text-xs text-[#6e5752] leading-relaxed mb-6 font-normal">
                  {group.desc}
                </p>
              </div>

              {/* Danh sách Skills dạng Item Bar */}
              <div className="space-y-2 pt-4 border-t border-[#ebdcd5]">
                {group.skills.map((skill, sIdx) => (
                  <div 
                    key={sIdx}
                    className="flex items-center justify-between p-2 rounded-lg bg-[#fcf8f2] border border-[#f0ded8] hover:border-[#e8c8c2] transition"
                  >
                    <span className="text-xs font-semibold text-[#3d2b27]">
                      {skill.name}
                    </span>
                    <span className="text-[10px] font-mono font-semibold text-[#8f3833] bg-[#fceae6] px-2 py-0.5 rounded border border-[#f3cac6]">
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Thanh cam kết tiêu chuẩn kỹ thuật phía dưới */}
      <div className="mt-8 p-4 rounded-xl bg-white/80 border border-[#f0ded8] flex flex-wrap items-center justify-between gap-4 text-xs text-[#6e5752] font-mono shadow-sm">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#e07a75]" />
          <span>Tư duy sản phẩm: Tối ưu hiệu năng • Bảo mật dữ liệu • Trải nghiệm thị giác sắc nét</span>
        </div>
        <span className="text-[#b85047] font-bold">#CleanCode #FullStack #CreativeMindset</span>
      </div>
    </section>
  );
}