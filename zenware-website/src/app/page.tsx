import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/sections/hero-section';
import ValuePropositions from '@/components/sections/value-propositions';
import FeaturedProjects from '@/components/sections/featured-projects';
import TrustIndicators from '@/components/sections/trust-indicators';
import CallToAction from '@/components/sections/call-to-action';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ValuePropositions />
        <FeaturedProjects />
        <TrustIndicators />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}