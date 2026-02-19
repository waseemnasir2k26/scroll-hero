'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    // Check if device supports hover (not touch)
    const hasHover = window.matchMedia('(hover: hover)').matches;
    if (!hasHover) {
      cursor.style.display = 'none';
      cursorDot.style.display = 'none';
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power2.out',
      });
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Detect hoverable elements
    const addHoverListeners = () => {
      const hoverables = document.querySelectorAll('a, button, [data-cursor-hover]');
      hoverables.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Add hover listeners after a delay to catch dynamic elements
    setTimeout(addHoverListeners, 1000);

    // Re-add listeners when DOM changes
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        className={`fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-all duration-300 ${
          isHovering ? 'w-16 h-16' : 'w-10 h-10'
        } ${isClicking ? 'scale-75' : 'scale-100'}`}
        style={{ left: 0, top: 0 }}
      >
        <div
          className={`w-full h-full rounded-full border-2 transition-colors duration-300 ${
            isHovering ? 'border-white bg-white/10' : 'border-white/50'
          }`}
        />
      </div>
      {/* Cursor dot */}
      <div
        ref={cursorDotRef}
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full mix-blend-difference"
        style={{ left: 0, top: 0 }}
      />
    </>
  );
}
