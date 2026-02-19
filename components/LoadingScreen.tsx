'use client';

import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  progress: number;
  isComplete: boolean;
}

export default function LoadingScreen({ progress, isComplete }: LoadingScreenProps) {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (isComplete) {
      // Start fade out animation
      setFadeOut(true);
      // Remove from DOM after animation
      const timer = setTimeout(() => {
        setVisible(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isComplete]);

  if (!visible) return null;

  return (
    <div
      className={`loading-screen transition-opacity duration-700 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Logo or brand */}
      <div className="flex flex-col items-center relative z-10">
        <div className="w-20 h-20 mb-8 relative">
          {/* Animated logo with glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-electric-blue to-violet-accent opacity-20 animate-pulse blur-xl" />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-electric-blue to-violet-accent opacity-30 animate-pulse" />
          <div className="absolute inset-2 rounded-xl bg-gradient-to-br from-electric-blue to-violet-accent opacity-50 animate-pulse-slow" />
          <div className="absolute inset-4 rounded-lg bg-gradient-to-br from-electric-blue to-violet-accent shadow-lg shadow-electric-blue/30" />
        </div>

        {/* Loading text */}
        <p className="font-mono text-sm text-near-white/50 tracking-widest uppercase mb-8">
          Loading Experience
        </p>

        {/* Progress bar */}
        <div className="loading-bar-container">
          <div
            className="loading-bar"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        {/* Progress percentage */}
        <p className="font-mono text-sm text-electric-blue/80 mt-4 tabular-nums">
          {Math.round(progress)}%
        </p>
      </div>

      {/* Floating particles in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              background: i % 2 === 0 ? 'rgba(59, 130, 246, 0.4)' : 'rgba(139, 92, 246, 0.3)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
              boxShadow: '0 0 10px currentColor',
            }}
          />
        ))}
      </div>
    </div>
  );
}
