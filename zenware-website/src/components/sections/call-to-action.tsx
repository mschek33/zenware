import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';

export default function CallToAction() {
  return (
    <section className="kortex-section bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-purple-600/20">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center">
          <div className="mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-float kortex-glow">
              <MessageCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="kortex-section-title text-white mb-6">
              Ready to Build{' '}
              <span className="kortex-text-gradient">Conscious Technology?</span>
            </h2>
            <p className="kortex-subtitle max-w-3xl mx-auto leading-relaxed">
              Whether you need AI automation for your business or want to create regenerative systems, 
              let's explore how technology can serve consciousness.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <button className="kortex-button-primary text-lg px-8 py-4">
              <Link href="/contact" className="flex items-center justify-center">
                Start a Conversation
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </button>
            <button className="kortex-button text-lg px-8 py-4">
              <Link href="/ai-automation" className="flex items-center justify-center">
                Explore AI Services
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="kortex-card p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Quick Response</h3>
              <p className="text-gray-300 text-sm">Get a response within 24 hours</p>
            </div>
            <div className="kortex-card p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Free Consultation</h3>
              <p className="text-gray-300 text-sm">No obligation discovery call</p>
            </div>
            <div className="kortex-card p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Custom Solutions</h3>
              <p className="text-gray-300 text-sm">Tailored to your unique needs</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}