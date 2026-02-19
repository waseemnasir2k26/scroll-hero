'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface BentoItem {
  title: string;
  description: string;
  icon: string;
  className?: string;
  gradient?: string;
}

const bentoItems: BentoItem[] = [
  {
    title: 'Lightning Fast',
    description: 'Built on edge infrastructure for instant global response times.',
    icon: '⚡',
    className: 'md:col-span-2 md:row-span-2',
    gradient: 'from-blue-500/20 to-cyan-500/10',
  },
  {
    title: 'AI Powered',
    description: 'Intelligent automation that learns and adapts.',
    icon: '🤖',
    className: 'md:col-span-1',
    gradient: 'from-violet-500/20 to-purple-500/10',
  },
  {
    title: 'Secure',
    description: 'Enterprise-grade security built in.',
    icon: '🔒',
    className: 'md:col-span-1',
    gradient: 'from-green-500/20 to-emerald-500/10',
  },
  {
    title: 'Analytics Dashboard',
    description: 'Real-time insights and metrics at your fingertips.',
    icon: '📊',
    className: 'md:col-span-2',
    gradient: 'from-orange-500/20 to-amber-500/10',
  },
  {
    title: 'Team Collaboration',
    description: 'Work together seamlessly with your team.',
    icon: '👥',
    className: 'md:col-span-1',
    gradient: 'from-pink-500/20 to-rose-500/10',
  },
  {
    title: 'API First',
    description: 'Powerful APIs for ultimate flexibility.',
    icon: '🔌',
    className: 'md:col-span-1',
    gradient: 'from-indigo-500/20 to-blue-500/10',
  },
];

export default function BentoGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = containerRef.current?.querySelectorAll('.bento-item');
      if (!items) return;

      items.forEach((item, index) => {
        gsap.fromTo(
          item,
          {
            opacity: 0,
            y: 50,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.1,
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-24 md:py-32 px-6 relative z-10">
      {/* Section glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle 600px at 80% 50%, rgba(139, 92, 246, 0.08), transparent)',
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block font-mono text-violet-accent text-sm uppercase tracking-widest mb-4 px-4 py-2 rounded-full border border-violet-accent/20 bg-violet-accent/5">
            Capabilities
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-6 tracking-tight">
            Everything you need,{' '}
            <span className="gradient-text">nothing you don&apos;t</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-4 gap-4 md:gap-6">
          {bentoItems.map((item, index) => (
            <div
              key={index}
              className={`bento-item group relative overflow-hidden rounded-3xl border border-white/10 p-6 md:p-8 transition-all duration-500 hover:border-white/20 ${item.className}`}
            >
              {/* Background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              {/* Animated border glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-[-2px] bg-gradient-to-r from-electric-blue via-violet-accent to-electric-blue rounded-3xl blur-sm animate-border-glow" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-electric-blue-light transition-colors">
                  {item.title}
                </h3>
                <p className="text-near-white/50 text-sm md:text-base leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Hover shine effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
