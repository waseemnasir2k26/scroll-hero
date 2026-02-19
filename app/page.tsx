import ScrollHero from '@/components/ScrollHero';
import Navbar from '@/components/Navbar';
import {
  FeatureGrid,
  StatsSection,
  CTASection,
  Footer,
} from '@/components/ContentSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <ScrollHero />
      <FeatureGrid />
      <StatsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
