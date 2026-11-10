import React, { useEffect, useRef } from 'react';

export default function ScrollReveal({ children, direction = 'up', delay = 0, className = '' }) {
  const domRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              if (entry.target) entry.target.classList.add('reveal-active');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [delay]);

  const getDirectionClass = () => {
    if (direction === 'left') return 'reveal-init-left';
    if (direction === 'right') return 'reveal-init-right';
    return 'reveal-init-up';
  };

  return (
    <div ref={domRef} className={`${getDirectionClass()} ${className}`}>
      {children}
    </div>
  );
}