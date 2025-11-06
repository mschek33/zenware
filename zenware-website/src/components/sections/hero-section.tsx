import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="kortex-hero bg-noise">
      <div className="container mx-auto max-w-6xl text-center">
        {/* Hero Visual - Animated Logo Placeholder */}
        <div className="mb-12">
          <div className="w-32 h-32 mx-auto bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg animate-float kortex-glow">
            <Sparkles className="w-16 h-16 text-white" />
          </div>
        </div>

        {/* Headlines */}
        <div className="mb-12">
          <h1 className="kortex-hero-title text-white mb-8">
            Conscious Technology for{' '}
            <span className="kortex-text-gradient">
              New Earth Systems
            </span>
          </h1>
          <p className="kortex-subtitle max-w-4xl mx-auto mb-8">
            Bridging ancient wisdom with cutting-edge AI to create regenerative, sovereign, and decentralized systems
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
          <button className="kortex-button-primary text-lg px-8 py-4">
            <Link href="/solutions" className="flex items-center justify-center">
              Explore Solutions
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </button>
          <button className="kortex-button text-lg px-8 py-4">
            <Link href="/ai-automation" className="flex items-center justify-center">
              AI Automation Services
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </button>
        </div>
      </div>
    </section>
  );
}