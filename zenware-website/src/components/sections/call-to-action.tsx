import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';

export default function CallToAction() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-transparent via-zinc-50/50 to-transparent dark:via-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-100/30 rounded-full blur-3xl dark:bg-indigo-900/10" />
      </div>

      <div className="container relative z-10 mx-auto max-w-4xl px-4">
        <div className="text-center">
          <FadeIn className="mb-12">
            <div className="w-20 h-20 bg-white border border-black/5 rounded-full flex items-center justify-center mx-auto mb-8 animate-float shadow-lg dark:bg-white/10 dark:border-white/10">
              <MessageCircle className="w-8 h-8 text-zinc-900 dark:text-white" strokeWidth={1} />
            </div>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight text-zinc-900 mb-6 dark:text-white">
              Ready to Build{' '}
              <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-500 dark:from-white dark:via-white/80 dark:to-white/50">Conscious Technology?</span>
            </h2>
            <p className="text-xl text-zinc-600 max-w-3xl mx-auto leading-relaxed font-light dark:text-zinc-400">
              Whether you need AI automation for your business or want to create regenerative systems,
              let&apos;s explore how technology can serve consciousness.
            </p>
          </FadeIn>

          <FadeIn delay={0.2} className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link href="/contact">
              <button className="w-full sm:w-auto px-8 py-4 bg-zinc-900 text-white rounded-full font-medium text-lg transition-all duration-300 hover:bg-black hover:scale-105 shadow-sm dark:bg-white dark:text-black dark:hover:bg-zinc-200">
                <span className="flex items-center justify-center">
                  Start a Conversation
                  <ArrowRight className="ml-2 w-4 h-4" />
                </span>
              </button>
            </Link>
            <Link href="/ai-automation">
              <button className="w-full sm:w-auto px-8 py-4 bg-transparent border border-zinc-200 text-zinc-900 rounded-full font-medium text-lg transition-all duration-300 hover:bg-zinc-50 hover:border-zinc-300 dark:border-white/20 dark:text-white dark:hover:bg-white/5 dark:hover:border-white/40">
                <span className="flex items-center justify-center">
                  Explore AI Services
                  <ArrowRight className="ml-2 w-4 h-4" />
                </span>
              </button>
            </Link>
          </FadeIn>

          <FadeIn delay={0.4} className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-black/5 dark:bg-white/5 dark:border-white/10">
            <div className="p-4">
              <h3 className="text-lg font-medium text-zinc-900 mb-2 dark:text-white">Quick Response</h3>
              <p className="text-zinc-500 text-sm font-light dark:text-zinc-400">Get a response within 24 hours</p>
            </div>
            <div className="p-4 border-t md:border-t-0 md:border-l border-black/5 dark:border-white/10">
              <h3 className="text-lg font-medium text-zinc-900 mb-2 dark:text-white">Free Consultation</h3>
              <p className="text-zinc-500 text-sm font-light dark:text-zinc-400">No obligation discovery call</p>
            </div>
            <div className="p-4 border-t md:border-t-0 md:border-l border-black/5 dark:border-white/10">
              <h3 className="text-lg font-medium text-zinc-900 mb-2 dark:text-white">Custom Solutions</h3>
              <p className="text-zinc-500 text-sm font-light dark:text-zinc-400">Tailored to your unique needs</p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}