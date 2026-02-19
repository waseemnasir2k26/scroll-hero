'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

// Floating orbs that move with mouse parallax
export function FloatingOrbs() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const orbs = container.querySelectorAll('.floating-orb');

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.02;
        const x = (clientX - centerX) * speed;
        const y = (clientY - centerY) * speed;

        gsap.to(orb, {
          x,
          y,
          duration: 1,
          ease: 'power2.out',
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const orbs = [
    { size: 300, color: 'rgba(59, 130, 246, 0.15)', top: '10%', left: '10%', blur: 80 },
    { size: 400, color: 'rgba(139, 92, 246, 0.12)', top: '60%', right: '5%', blur: 100 },
    { size: 250, color: 'rgba(6, 182, 212, 0.1)', top: '30%', right: '20%', blur: 60 },
    { size: 350, color: 'rgba(236, 72, 153, 0.08)', bottom: '10%', left: '20%', blur: 90 },
    { size: 200, color: 'rgba(59, 130, 246, 0.1)', top: '50%', left: '40%', blur: 70 },
  ];

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {orbs.map((orb, i) => (
        <div
          key={i}
          className="floating-orb absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            background: orb.color,
            filter: `blur(${orb.blur}px)`,
            top: orb.top,
            left: orb.left,
            right: orb.right,
            bottom: orb.bottom,
          }}
        />
      ))}
    </div>
  );
}

// Animated grid lines
export function AnimatedGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
      <svg className="w-full h-full">
        <defs>
          <pattern
            id="grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="rgba(59, 130, 246, 0.1)"
              strokeWidth="1"
            />
          </pattern>
          <linearGradient id="grid-fade" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="30%" stopColor="white" stopOpacity="1" />
            <stop offset="70%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="grid-mask">
            <rect width="100%" height="100%" fill="url(#grid-fade)" />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#grid)"
          mask="url(#grid-mask)"
        />
      </svg>
    </div>
  );
}

// Sparkle effect component
export function Sparkles({ count = 50 }: { count?: number }) {
  const sparkles = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    duration: 2 + Math.random() * 3,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute rounded-full animate-sparkle"
          style={{
            width: sparkle.size,
            height: sparkle.size,
            left: sparkle.left,
            top: sparkle.top,
            background: 'white',
            boxShadow: '0 0 6px 2px rgba(255,255,255,0.3)',
            animationDelay: `${sparkle.delay}s`,
            animationDuration: `${sparkle.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

// Meteor shower effect
export function MeteorShower() {
  const meteors = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 10,
    duration: 1 + Math.random() * 2,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="meteor absolute w-[2px] h-[80px]"
          style={{
            left: meteor.left,
            top: '-80px',
            background: 'linear-gradient(to bottom, rgba(59, 130, 246, 0), rgba(59, 130, 246, 1))',
            animationDelay: `${meteor.delay}s`,
            animationDuration: `${meteor.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
