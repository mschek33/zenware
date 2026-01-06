import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import AuditHeroSection from '@/components/sections/audit-hero-section';
import DreamFrameworkSection from '@/components/sections/dream-framework-section';
import StartAuditSection from '@/components/sections/start-audit-section';
import TrustIndicators from '@/components/sections/trust-indicators';
import CallToAction from '@/components/sections/call-to-action';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <AuditHeroSection />
        <DreamFrameworkSection />
        <StartAuditSection />
        <TrustIndicators />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
