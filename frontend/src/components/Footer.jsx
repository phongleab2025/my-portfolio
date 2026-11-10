import React, { useState } from 'react';
import { Mail, Check, Copy } from 'lucide-react';
import { personalInfo } from '../data/projectsData';

export default function Footer() {
  const [copiedEmail, setCopiedEmail] = useState(null);

  const emails = [
    { label: "Personal", value: personalInfo?.email1 || "phongleab143@gmail.com" },
    { label: "Studio", value: personalInfo?.email2 || "goccreative1@gmail.com" }
  ];

  const handleCopy = (email) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  return (
    <footer id="contact" className="py-16 px-6 border-t border-[#ebdcd5] bg-[#fcf8f2] text-[#4a3b37]">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Tiêu đề liên hệ */}
        <h3 className="text-2xl md:text-3xl font-bold font-serif mb-3 tracking-tight text-[#4a2621]">
          Bắt đầu một dự án mới?
        </h3>
        <p className="text-xs md:text-sm text-[#6e5752] mb-8 max-w-md mx-auto leading-relaxed">
          Liên hệ trực tiếp để trao đổi về công việc, dự án phần mềm hoặc cơ hội hợp tác sáng tạo.
        </p>

        {/* Khối nút sao chép Email */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {emails.map((item, index) => {
            const isCopied = copiedEmail === item.value;
            return (
              <button
                key={index}
                onClick={() => handleCopy(item.value)}
                className="group flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white border border-[#f0ded8] hover:border-[#e07a75]/60 hover:bg-[#fceae6]/50 text-xs font-mono transition-all duration-300 shadow-sm hover:shadow cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-[#e07a75]" />
                <span className="text-[#3d2b27] group-hover:text-[#4a2621] font-semibold transition-colors">
                  {item.value}
                </span>
                {isCopied ? (
                  <Check className="w-3.5 h-3.5 text-[#e07a75] animate-in fade-in zoom-in" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-[#8f7068] group-hover:text-[#e07a75] transition-colors" />
                )}
              </button>
            );
          })}
        </div>

        {/* Dòng bản quyền dưới cùng */}
        <div className="text-[11px] font-mono text-[#8f7068] border-t border-[#ebdcd5] pt-8">
          © {new Date().getFullYear()} {personalInfo?.name || "Lê Trung Phong"}. Được thiết kế &amp; xây dựng trên nền tảng React + Vite.
        </div>

      </div>
    </footer>
  );
}