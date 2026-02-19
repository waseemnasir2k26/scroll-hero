'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedTextProps {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
  type?: 'chars' | 'words' | 'lines';
}

export function AnimatedHeadline({
  children,
  className = '',
  delay = 0,
  stagger = 0.03,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const chars = containerRef.current?.querySelectorAll('.char');
      if (!chars) return;

      gsap.fromTo(
        chars,
        {
          opacity: 0,
          y: 100,
          rotateX: -90,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: stagger,
          delay: delay,
        }
      );
    },
    { scope: containerRef }
  );

  // Split text into characters
  const splitText = children.split('').map((char, i) => (
    <span
      key={i}
      className="char inline-block"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  return (
    <h1 ref={containerRef} className={`${className} overflow-hidden`}>
      {splitText}
    </h1>
  );
}

export function AnimatedWords({
  children,
  className = '',
  delay = 0,
  stagger = 0.1,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const words = containerRef.current?.querySelectorAll('.word');
      if (!words) return;

      gsap.fromTo(
        words,
        {
          opacity: 0,
          y: 40,
          filter: 'blur(10px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power3.out',
          stagger: stagger,
          delay: delay,
        }
      );
    },
    { scope: containerRef }
  );

  const splitWords = children.split(' ').map((word, i) => (
    <span key={i} className="word inline-block mr-[0.25em]">
      {word}
    </span>
  ));

  return (
    <div ref={containerRef} className={className}>
      {splitWords}
    </div>
  );
}

export function GlitchText({ children, className = '' }: { children: string; className?: string }) {
  return (
    <span className={`glitch-text relative ${className}`} data-text={children}>
      {children}
    </span>
  );
}

export function TypewriterText({
  children,
  className = '',
  speed = 50,
}: {
  children: string;
  className?: string;
  speed?: number;
}) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const text = children;
      let currentIndex = 0;

      const interval = setInterval(() => {
        if (containerRef.current && currentIndex <= text.length) {
          containerRef.current.textContent = text.slice(0, currentIndex);
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    },
    { scope: containerRef }
  );

  return (
    <span ref={containerRef} className={className}>
      {children}
    </span>
  );
}
