import ScrollHero from '@/components/ScrollHero';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import { FloatingOrbs } from '@/components/FloatingElements';
import { TrustedBy } from '@/components/Marquee';
import BentoGrid from '@/components/BentoGrid';
import Testimonials from '@/components/Testimonials';
import ProcessSection from '@/components/ProcessSection';
import {
  FeatureGrid,
  StatsSection,
  CTASection,
  Footer,
} from '@/components/ContentSection';

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* Custom cursor (desktop only) */}
      <CustomCursor />

      {/* Floating background orbs */}
      <FloatingOrbs />

      {/* Navigation */}
      <Navbar />

      {/* Hero with scroll animation */}
      <ScrollHero />

      {/* Trusted by logos marquee */}
      <TrustedBy />

      {/* Features grid with animations */}
      <FeatureGrid />

      {/* Bento grid showcase */}
      <BentoGrid />

      {/* Process/Timeline section */}
      <ProcessSection />

      {/* Stats with counting animation */}
      <StatsSection />

      {/* Testimonials */}
      <Testimonials />

      {/* CTA section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
