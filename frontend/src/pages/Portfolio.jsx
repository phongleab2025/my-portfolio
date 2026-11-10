import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Footer from '../components/Footer';
import AudioPlayer from '../components/AudioPlayer';
import FlowerEffect from '../components/FlowerEffect';
import Preloader from '../components/Preloader';
import ScrollReveal from '../components/ScrollReveal';
import api from '../utils/api';

export default function Portfolio() {
  // Tracking ngầm: Gửi thông tin truy cập bất đồng bộ, không làm chậm quá trình render UI
  useEffect(() => {
    // Trì hoãn nhẹ 600ms để nhường CPU cho việc render và animation trang chủ
    const timer = setTimeout(() => {
      api.post('/track', {
        endpoint: window.location.pathname,
      }).catch((err) => {
        // Nuốt lỗi ngầm để không ảnh hưởng đến trải nghiệm người xem portfolio
        console.debug('Tracking request completed.');
      });
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#fdfbf7] text-[#332521] selection:bg-[#e07a75] selection:text-white flex flex-col justify-between m-0 p-0 relative">
      {/* 1. Preloader Hello iOS */}
      <Preloader />

      {/* 2. Hiệu ứng hoa rơi */}
      <FlowerEffect />

      {/* 3. Thanh Menu Ghim Cố Định Đỉnh Màn Hình */}
      <Navbar />

      {/* 4. Nội dung chính (pt-16 để không bị menu đè lên đầu) */}
      <main className="flex-1 space-y-16 w-full pt-16 sm:pt-20">
        <ScrollReveal direction="up">
          <Hero />
        </ScrollReveal>

        <ScrollReveal direction="left">
          <About />
        </ScrollReveal>

        <ScrollReveal direction="right">
          <Skills />
        </ScrollReveal>

        <ScrollReveal direction="up">
          <Projects />
        </ScrollReveal>
      </main>

      {/* 5. Footer & Nhạc */}
      <Footer />
      <AudioPlayer />
    </div>
  );
}
