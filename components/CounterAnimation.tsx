'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}

export default function Counter({
  end,
  duration = 2,
  suffix = '',
  prefix = '',
  decimals = 0,
  className = '',
}: CounterProps) {
  const counterRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = counterRef.current;
    if (!element || hasAnimated) return;

    const counter = { value: 0 };

    ScrollTrigger.create({
      trigger: element,
      start: 'top 85%',
      onEnter: () => {
        if (hasAnimated) return;
        setHasAnimated(true);

        gsap.to(counter, {
          value: end,
          duration: duration,
          ease: 'power2.out',
          onUpdate: () => {
            if (element) {
              element.textContent = `${prefix}${counter.value.toFixed(decimals)}${suffix}`;
            }
          },
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [end, duration, suffix, prefix, decimals, hasAnimated]);

  return (
    <span ref={counterRef} className={`counter-number ${className}`}>
      {prefix}0{suffix}
    </span>
  );
}

// Pre-configured stat counters
export function StatCounter({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  // Parse the value to extract number and suffix
  const numMatch = value.match(/^([\d.]+)(.*)$/);
  const num = numMatch ? parseFloat(numMatch[1]) : 0;
  const suffix = numMatch ? numMatch[2] : value;

  return (
    <div className="stat-item text-center p-6 rounded-2xl hover:bg-electric-blue/5 transition-colors group">
      <div className="stat-number">
        {numMatch ? (
          <Counter
            end={num}
            suffix={suffix}
            decimals={value.includes('.') ? 1 : 0}
            duration={2.5}
          />
        ) : (
          value
        )}
      </div>
      <div className="font-mono text-xs text-near-white/40 mt-3 uppercase tracking-widest group-hover:text-near-white/60 transition-colors">
        {label}
      </div>
    </div>
  );
}
