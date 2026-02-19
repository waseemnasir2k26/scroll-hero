'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ============================================
// FEATURE GRID SECTION
// ============================================
const features = [
  {
    icon: '01',
    title: 'Seamless Integration',
    description:
      'Connect with your existing tools and workflows. Our platform adapts to your needs, not the other way around.',
  },
  {
    icon: '02',
    title: 'Real-time Analytics',
    description:
      'Monitor performance metrics in real-time. Make data-driven decisions with actionable insights.',
  },
  {
    icon: '03',
    title: 'Enterprise Security',
    description:
      'Bank-level encryption and compliance. Your data is protected with industry-leading security protocols.',
  },
  {
    icon: '04',
    title: 'Global Scale',
    description:
      'Deploy worldwide instantly. Our infrastructure scales automatically to meet demand.',
  },
  {
    icon: '05',
    title: 'AI-Powered',
    description:
      'Intelligent automation that learns and adapts. Let AI handle the repetitive tasks.',
  },
  {
    icon: '06',
    title: '24/7 Support',
    description:
      'Expert support around the clock. Our team is always here to help you succeed.',
  },
];

export function FeatureGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = containerRef.current?.querySelectorAll('.feature-card');
      if (!cards) return;

      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 60,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
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
    <section
      ref={containerRef}
      id="features"
      className="py-24 md:py-32 px-6 relative z-10"
    >
      {/* Section glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle 800px at 20% 50%, rgba(59,130,246,0.08), transparent)',
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Section header */}
        <div className="text-center mb-20">
          <span className="inline-block font-mono text-electric-blue text-sm uppercase tracking-widest mb-4 px-4 py-2 rounded-full border border-electric-blue/20 bg-electric-blue/5">
            Features
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-6 tracking-tight">
            Built for the{' '}
            <span className="gradient-text">modern era</span>
          </h2>
          <p className="text-near-white/50 max-w-2xl mx-auto text-lg">
            Everything you need to build, deploy, and scale your next big idea.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.icon} className="feature-card group">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-electric-blue/10 font-mono text-electric-blue text-sm font-bold mb-6 group-hover:bg-electric-blue/20 transition-colors">
                {feature.icon}
              </span>
              <h3 className="text-xl font-bold mb-3 group-hover:text-electric-blue-light transition-colors">{feature.title}</h3>
              <p className="text-near-white/50 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// STATS SECTION
// ============================================
const stats = [
  { value: '10M+', label: 'Active Users' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '150+', label: 'Countries' },
  { value: '24/7', label: 'Support' },
];

export function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const statItems = containerRef.current?.querySelectorAll('.stat-item');
      if (!statItems) return;

      statItems.forEach((item, index) => {
        gsap.fromTo(
          item,
          {
            opacity: 0,
            scale: 0.8,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: item,
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
    <section ref={containerRef} className="py-24 md:py-40 px-6 relative z-10">
      {/* Decorative line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent via-electric-blue/30 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="stat-item text-center p-6 rounded-2xl hover:bg-electric-blue/5 transition-colors"
            >
              <div className="stat-number">{stat.value}</div>
              <div className="font-mono text-xs text-near-white/40 mt-3 uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent via-violet-accent/30 to-transparent" />
    </section>
  );
}

// ============================================
// CTA SECTION
// ============================================
export function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        containerRef.current,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-32 md:py-48 px-6 cta-section relative z-10 overflow-hidden">
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-electric-blue/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-violet-accent/10 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto text-center relative">
        <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
          Ready to get started?
        </h2>
        <p className="text-near-white/50 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
          Join thousands of companies already using our platform to build
          amazing experiences.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn-primary text-lg px-10">
            Start Free Trial
          </button>
          <button className="btn-secondary text-lg px-10">
            Schedule Demo
          </button>
        </div>
        <p className="font-mono text-xs text-near-white/30 mt-10 tracking-wider">
          No credit card required &bull; 14-day free trial &bull; Cancel anytime
        </p>
      </div>
    </section>
  );
}

// ============================================
// FOOTER
// ============================================
export function Footer() {
  const footerLinks = {
    Product: ['Features', 'Pricing', 'Integrations', 'API'],
    Company: ['About', 'Blog', 'Careers', 'Press'],
    Resources: ['Documentation', 'Help Center', 'Community', 'Status'],
    Legal: ['Privacy', 'Terms', 'Security', 'Cookies'],
  };

  return (
    <footer className="py-20 px-6 border-t border-electric-blue/10 relative z-10 bg-space-darker/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-5 gap-12 mb-16">
          {/* Brand column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric-blue to-violet-accent shadow-lg shadow-electric-blue/20" />
              <span className="font-display font-bold text-xl tracking-tight">ScrollHero</span>
            </div>
            <p className="text-sm text-near-white/40 leading-relaxed">
              Building the future of interactive experiences.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-mono text-xs uppercase tracking-widest text-near-white/30 mb-5">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-near-white/50 hover:text-electric-blue transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-near-white/40">
            &copy; {new Date().getFullYear()} ScrollHero. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Twitter', 'GitHub', 'LinkedIn', 'Discord'].map((social) => (
              <a
                key={social}
                href="#"
                className="text-sm text-near-white/50 hover:text-near-white transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
