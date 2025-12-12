import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-100/40 rounded-full blur-3xl animate-float dark:bg-purple-900/10" />
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-3xl animate-float-delayed dark:bg-blue-900/10" />
      </div>

      <div className="container relative z-10 px-4 mx-auto text-center">
        <FadeIn delay={0.1} direction="up" className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-sm font-medium rounded-full bg-zinc-100/80 backdrop-blur-sm border border-black/5 text-zinc-600 dark:bg-my-dark-void/50 dark:border-white/10 dark:text-zinc-300">
          <Sparkles className="w-4 h-4 text-amber-500/80" />
          <span>The Future of Conscious Technology</span>
        </FadeIn>

        <FadeIn delay={0.2} direction="up">
          <h1 className="max-w-4xl mx-auto mb-6 text-5xl font-light tracking-tight leading-tight md:text-7xl lg:text-8xl text-zinc-900 dark:text-my-white">
            Technology that{' '}
            <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-500 animate-pulse-slow dark:from-white dark:via-white/80 dark:to-white/50">
              Breathes
            </span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.3} direction="up">
          <p className="max-w-2xl mx-auto mb-10 text-xl font-light leading-relaxed text-zinc-600 md:text-2xl text-balance dark:text-zinc-400">
            We build digital ecosystems that harmonize innovation with awareness.
            Software that feels alive, responsive, and deeply aligned with your purpose.
          </p>
        </FadeIn>

        <FadeIn delay={0.4} direction="up" className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/contact" className="group">
            <button className="relative px-8 py-4 text-lg font-medium text-white transition-all duration-300 rounded-full bg-zinc-900 hover:bg-black hover:scale-105 shadow-lg shadow-zinc-900/10 dark:bg-white dark:text-black dark:hover:bg-zinc-200 dark:shadow-white/5">
              Start Your Journey
              <ArrowRight className="inline-block w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </Link>
          <Link href="/about">
            <button className="px-8 py-4 text-lg font-medium transition-colors bg-white border rounded-full text-zinc-600 border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300 dark:bg-transparent dark:text-white dark:border-white/20 dark:hover:bg-white/5">
              Our Philosophy
            </button>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}