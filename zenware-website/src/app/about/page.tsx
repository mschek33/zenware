import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Award, Code, Heart, Zap } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Heart,
      title: 'Consciousness First',
      description: 'Aware, intentional, purposeful technology that serves human evolution',
      color: 'from-pink-500 to-rose-500',
    },
    {
      icon: Zap,
      title: 'Regenerative Impact',
      description: 'Solutions that heal rather than extract, contributing to planetary wellbeing',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Award,
      title: 'Sovereign Freedom',
      description: 'Decentralized tools for independent communities and autonomous systems',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Code,
      title: 'Enterprise Quality',
      description: 'Mission-critical reliability in every solution we deliver',
      color: 'from-purple-500 to-indigo-500',
    },
  ];

  const credentials = [
    'Microsoft Certified Solutions Developer',
    'Enterprise Software Architecture',
    'AI/ML Implementation Specialist',
    'Blockchain & Web3 Development',
    'Superyacht Industry Experience',
    'Conscious Technology Pioneer',
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="kortex-hero-short bg-noise">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="kortex-hero-title text-white mb-6">
              Where Enterprise Meets{' '}
              <span className="kortex-text-gradient">
                Consciousness
              </span>
            </h1>
            <p className="kortex-subtitle mb-8 max-w-3xl mx-auto">
              Bridging the gap between mission-critical enterprise software and conscious technology for a regenerative future
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {credentials.map((credential, index) => (
                <span key={index} className="kortex-badge-primary px-3 py-1">
                  {credential}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Journey Section */}
        <section className="kortex-section-alt bg-grid-pattern">
          <div className="container mx-auto max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="kortex-section-title text-white mb-6">The Journey</h2>
                <div className="space-y-6">
                  <div className="border-l-4 border-blue-500 pl-6">
                    <h3 className="text-xl font-semibold text-white mb-2">From Superyachts to Sacred Systems</h3>
                    <p className="text-gray-300">
                      Beginning with mission-critical software for the world's largest superyachts, 
                      I learned that technology must be both reliable and purposeful.
                    </p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-6">
                    <h3 className="text-xl font-semibold text-white mb-2">The Conscious Awakening</h3>
                    <p className="text-gray-300">
                      A deep dive into personal transformation and spiritual practices revealed 
                      technology's potential to serve consciousness rather than distract from it.
                    </p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-6">
                    <h3 className="text-xl font-semibold text-white mb-2">AI for Human Evolution</h3>
                    <p className="text-gray-300">
                      Now integrating cutting-edge AI with ancient wisdom to create systems 
                      that support human growth and planetary healing.
                    </p>
                  </div>
                </div>
              </div>
              <div className="kortex-card p-8">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 kortex-glow">
                    <span className="text-white font-bold text-2xl">Z</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">The Mission</h3>
                  <p className="text-gray-300 mb-6">
                    To create technology that serves consciousness, supports regeneration, 
                    and enables sovereign communities to thrive.
                  </p>
                  <button className="kortex-button-primary">
                    <Link href="/contact" className="flex items-center justify-center">
                      Let's Work Together
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="kortex-section">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="kortex-section-title text-white mb-4">
                Values & Principles
              </h2>
              <p className="kortex-subtitle max-w-2xl mx-auto">
                The guiding principles that shape every project and decision
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div key={index} className="kortex-feature-card p-8 group">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${value.color} rounded-lg flex items-center justify-center mr-4 kortex-glow`}>
                      <value.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{value.title}</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="kortex-section-alt bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-purple-600/20">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="kortex-section-title text-white mb-6">
              Ready to Create{' '}
              <span className="kortex-text-gradient">Conscious Technology?</span>
            </h2>
            <p className="kortex-subtitle mb-8 max-w-2xl mx-auto">
              Let's explore how we can work together to build technology that serves your mission and values.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="kortex-button-primary text-lg px-8 py-4">
                <Link href="/contact" className="flex items-center justify-center">
                  Start a Conversation
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </button>
              <button className="kortex-button text-lg px-8 py-4">
                <Link href="/solutions" className="flex items-center justify-center">
                  Explore Solutions
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}