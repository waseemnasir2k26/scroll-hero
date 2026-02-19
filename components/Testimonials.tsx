'use client';

import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "This platform completely transformed how we build products. The speed and reliability are unmatched.",
    author: "Sarah Chen",
    role: "CTO",
    company: "TechFlow",
    avatar: "SC",
  },
  {
    quote: "We've cut our development time in half. The team collaboration features are incredible.",
    author: "Marcus Johnson",
    role: "Engineering Lead",
    company: "Innovate Labs",
    avatar: "MJ",
  },
  {
    quote: "The best investment we've made for our engineering team. Support is phenomenal.",
    author: "Emily Rodriguez",
    role: "VP Engineering",
    company: "ScaleUp Inc",
    avatar: "ER",
  },
  {
    quote: "Finally, a platform that understands what developers actually need. Game changer.",
    author: "David Kim",
    role: "Founder",
    company: "DevFirst",
    avatar: "DK",
  },
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      const cards = containerRef.current?.querySelectorAll('.testimonial-card');
      if (!cards) return;

      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 60,
            rotateY: -15,
          },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.15,
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-24 md:py-32 px-6 relative z-10 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-electric-blue/5 to-violet-accent/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block font-mono text-cyan-accent text-sm uppercase tracking-widest mb-4 px-4 py-2 rounded-full border border-cyan-accent/20 bg-cyan-accent/5">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-6 tracking-tight">
            Loved by{' '}
            <span className="gradient-text">developers</span>
          </h2>
          <p className="text-near-white/50 max-w-2xl mx-auto text-lg">
            See what teams are saying about their experience.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`testimonial-card group relative p-8 rounded-3xl border transition-all duration-500 cursor-pointer ${
                activeIndex === index
                  ? 'border-electric-blue/50 bg-electric-blue/5'
                  : 'border-white/10 hover:border-white/20 bg-white/[0.02]'
              }`}
              onClick={() => setActiveIndex(index)}
              style={{ perspective: '1000px' }}
            >
              {/* Quote mark */}
              <div className="absolute top-6 right-6 text-6xl font-serif text-electric-blue/10 group-hover:text-electric-blue/20 transition-colors">
                &ldquo;
              </div>

              {/* Quote */}
              <p className="text-lg md:text-xl text-near-white/80 leading-relaxed mb-8 relative z-10">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-electric-blue to-violet-accent flex items-center justify-center font-bold text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-near-white/50">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-electric-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

        {/* Rating */}
        <div className="mt-16 text-center">
          <div className="flex items-center justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-6 h-6 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-near-white/50">
            Rated <span className="text-near-white font-semibold">4.9/5</span> from over{' '}
            <span className="text-near-white font-semibold">2,000+</span> reviews
          </p>
        </div>
      </div>
    </section>
  );
}
