'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    number: '01',
    title: 'Connect',
    description: 'Link your existing tools and data sources in minutes. No complex setup required.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    number: '02',
    title: 'Configure',
    description: 'Customize workflows and automation rules to match your team\'s needs.',
    color: 'from-violet-500 to-purple-500',
  },
  {
    number: '03',
    title: 'Deploy',
    description: 'Push to production with confidence. Built-in CI/CD and monitoring.',
    color: 'from-pink-500 to-rose-500',
  },
  {
    number: '04',
    title: 'Scale',
    description: 'Grow without limits. Our infrastructure scales automatically with you.',
    color: 'from-orange-500 to-amber-500',
  },
];

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Animate the connecting line
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 60%',
              end: 'bottom 60%',
              scrub: 1,
            },
          }
        );
      }

      // Animate each step
      const steps = containerRef.current?.querySelectorAll('.process-step');
      steps?.forEach((step, index) => {
        gsap.fromTo(
          step,
          {
            opacity: 0,
            x: index % 2 === 0 ? -50 : 50,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-24 md:py-32 px-6 relative z-10 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-electric-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative">
        {/* Section header */}
        <div className="text-center mb-20">
          <span className="inline-block font-mono text-electric-blue text-sm uppercase tracking-widest mb-4 px-4 py-2 rounded-full border border-electric-blue/20 bg-electric-blue/5">
            How it works
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-6 tracking-tight">
            Get started in{' '}
            <span className="gradient-text">4 simple steps</span>
          </h2>
        </div>

        {/* Process timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block">
            <div
              ref={lineRef}
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-electric-blue via-violet-accent to-pink-500 origin-top"
              style={{ height: '100%' }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-12 md:space-y-24">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`process-step flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div
                    className={`inline-block text-sm font-mono mb-2 px-3 py-1 rounded-full bg-gradient-to-r ${step.color} bg-opacity-20`}
                  >
                    Step {step.number}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">{step.title}</h3>
                  <p className="text-near-white/50 text-lg leading-relaxed max-w-md">
                    {step.description}
                  </p>
                </div>

                {/* Center dot */}
                <div className="relative z-10">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center font-bold text-xl shadow-lg`}
                    style={{
                      boxShadow: `0 0 40px rgba(59, 130, 246, 0.3)`,
                    }}
                  >
                    {step.number}
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
