'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

interface MarqueeProps {
  items: string[];
  speed?: number;
  direction?: 'left' | 'right';
  className?: string;
}

export function LogoMarquee({ items, speed = 30, direction = 'left', className = '' }: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const inner = innerRef.current;
      if (!inner) return;

      const totalWidth = inner.scrollWidth / 2;
      const directionMultiplier = direction === 'left' ? -1 : 1;

      gsap.to(inner, {
        x: directionMultiplier * totalWidth,
        duration: speed,
        ease: 'none',
        repeat: -1,
      });
    },
    { scope: containerRef }
  );

  // Duplicate items for seamless loop
  const duplicatedItems = [...items, ...items];

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={innerRef} className="flex items-center gap-16 w-fit">
        {duplicatedItems.map((item, i) => (
          <div
            key={i}
            className="flex-shrink-0 text-2xl md:text-3xl font-bold text-near-white/20 hover:text-near-white/40 transition-colors whitespace-nowrap"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export function TextMarquee({
  text,
  speed = 20,
  direction = 'left',
}: {
  text: string;
  speed?: number;
  direction?: 'left' | 'right';
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const inner = innerRef.current;
      if (!inner) return;

      const totalWidth = inner.scrollWidth / 2;
      const directionMultiplier = direction === 'left' ? -1 : 1;

      gsap.to(inner, {
        x: directionMultiplier * totalWidth,
        duration: speed,
        ease: 'none',
        repeat: -1,
      });
    },
    { scope: containerRef }
  );

  const repeatedText = `${text} • `.repeat(10);

  return (
    <div ref={containerRef} className="overflow-hidden py-8">
      <div
        ref={innerRef}
        className="flex items-center w-fit text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-electric-blue via-violet-accent to-electric-blue whitespace-nowrap opacity-10"
      >
        <span>{repeatedText}</span>
        <span>{repeatedText}</span>
      </div>
    </div>
  );
}

// Trusted by logos section
export function TrustedBy() {
  const logos = [
    'Vercel',
    'Stripe',
    'Notion',
    'Linear',
    'Figma',
    'Framer',
    'Raycast',
    'Supabase',
  ];

  return (
    <section className="py-16 relative z-10 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <p className="text-center font-mono text-xs uppercase tracking-widest text-near-white/30">
          Trusted by innovative teams worldwide
        </p>
      </div>
      <LogoMarquee items={logos} speed={40} />
    </section>
  );
}
