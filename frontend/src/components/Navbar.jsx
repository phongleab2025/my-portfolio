import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#fcf8f2]/85 backdrop-blur-md shadow-sm border-b border-[#e8c8c2]/50 py-3' 
          : 'bg-[#fcf8f2] py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-12 flex items-center justify-between">
        
        {/* LOGO TRÁI */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="cursor-pointer flex items-center gap-1.5 group"
        >
          <span className="text-[#e07a75] text-lg transition-transform group-hover:rotate-45">✦</span>
          <span className="font-extrabold tracking-wider text-base md:text-lg text-[#332521] uppercase">
            Phong<span className="text-[#e07a75]">.Dev</span>
          </span>
        </div>

        {/* MENU TRÊN PC */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-[#6b5854]">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-[#e07a75] transition-colors"
          >
            Trang chủ
          </button>
          <button 
            onClick={() => scrollToSection('about')}
            className="hover:text-[#e07a75] transition-colors"
          >
            Về tôi
          </button>
          <button 
            onClick={() => scrollToSection('skills')}
            className="hover:text-[#e07a75] transition-colors"
          >
            Kỹ năng
          </button>
          <button 
            onClick={() => scrollToSection('projects')}
            className="hover:text-[#e07a75] transition-colors"
          >
            Dự án
          </button>
        </nav>

        {/* NÚT LIÊN HỆ PHẢI */}
        <div className="hidden md:block">
          <button 
            onClick={() => scrollToSection('contact')}
            className="bg-[#e07a75] hover:bg-[#c9625d] text-white text-xs font-bold px-5 py-2 rounded-full transition shadow-sm shadow-red-200"
          >
            Liên hệ
          </button>
        </div>

        {/* NÚT MENU MOBILE */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#332521] focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* DROPDOWN MENU MOBILE */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#fcf8f2]/95 backdrop-blur-md border-b border-[#e8c8c2] px-6 py-4 space-y-3 flex flex-col text-sm font-medium text-[#6b5854]">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-left py-1 hover:text-[#e07a75]">
            Trang chủ
          </button>
          <button onClick={() => scrollToSection('about')} className="text-left py-1 hover:text-[#e07a75]">
            Về tôi
          </button>
          <button onClick={() => scrollToSection('skills')} className="text-left py-1 hover:text-[#e07a75]">
            Kỹ năng
          </button>
          <button onClick={() => scrollToSection('projects')} className="text-left py-1 hover:text-[#e07a75]">
            Dự án
          </button>
          <button onClick={() => scrollToSection('contact')} className="text-left py-1 text-[#e07a75] font-bold">
            Liên hệ ➔
          </button>
        </div>
      )}
    </header>
  );
}