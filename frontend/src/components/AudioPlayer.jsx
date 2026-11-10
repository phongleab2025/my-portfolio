import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Disc3 } from 'lucide-react';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.3;

    // 1. Hàm cố gắng phát nhạc
    const playAudio = () => {
      if (audio.paused) {
        audio.play()
          .then(() => {
            setIsPlaying(true);
            removeTouchListeners();
          })
          .catch((err) => {
            console.log("Mobile/Trình duyệt chặn autoplay:", err);
          });
      }
    };

    // Gỡ các sự kiện lắng nghe chạm sau khi đã phát thành công
    const removeTouchListeners = () => {
      window.removeEventListener('touchstart', playAudio);
      window.removeEventListener('click', playAudio);
      window.removeEventListener('user-interacted', playAudio);
    };

    // Thử phát ngay (nếu trình duyệt cấp quyền)
    playAudio();

    // Lắng nghe thao tác chạm (Touch) đầu tiên trên Mobile
    window.addEventListener('touchstart', playAudio, { once: true });
    window.addEventListener('click', playAudio, { once: true });
    window.addEventListener('user-interacted', playAudio, { once: true });

    // 2. ✅ XỬ LÝ NGẮT NHẠC KHÍ THOÁT/ẨN APP TRÊN MOBILE (Page Visibility API)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Nếu người dùng chuyển tab, vuốt thoát app hoặc khóa màn hình -> DỪNG NHẠC
        if (!audio.paused) {
          audio.pause();
          setIsPlaying(false);
        }
      } else {
        // Khi quay lại tab -> TỰ ĐỘNG PHÁT TIẾP
        if (audio.paused && isPlaying) {
          audio.play().catch(() => {});
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      removeTouchListeners();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Lỗi phát nhạc:", err));
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio 
        ref={audioRef} 
        src="audio/bg-music.mp3" 
        loop 
        preload="auto"
      />

      <button 
        onClick={togglePlay}
        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full border transition-all duration-300 shadow-lg cursor-pointer backdrop-blur-md ${
          isPlaying 
            ? 'bg-[#fceae6]/95 border-[#e07a75] text-[#b85047] shadow-[0_4px_20px_rgba(224,122,117,0.3)]' 
            : 'bg-white/90 border-[#f0ded8] text-[#8f7068] hover:text-[#4a2621] hover:border-[#e07a75]/60 hover:bg-[#fceae6]/50'
        }`}
      >
        <Disc3 className={`w-4 h-4 ${isPlaying ? 'animate-spin text-[#e07a75]' : 'text-[#8f7068]'}`} />
        <span className="text-xs font-mono font-bold">
          {isPlaying ? "Ambient Playing..." : "Bật Nhạc Nền"}
        </span>
        {isPlaying ? (
          <Volume2 className="w-3.5 h-3.5 text-[#e07a75] animate-pulse" />
        ) : (
          <VolumeX className="w-3.5 h-3.5 text-[#8f7068]" />
        )}
      </button>
    </div>
  );
}