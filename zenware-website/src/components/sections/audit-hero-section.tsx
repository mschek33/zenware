'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, Clock, CheckCircle } from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';

export default function AuditHeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-100/40 rounded-full blur-3xl animate-float dark:bg-purple-900/10" />
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-pink-100/40 rounded-full blur-3xl animate-float-delayed dark:bg-pink-900/10" />
      </div>

      <div className="container relative z-10 px-4 mx-auto text-center">
        <FadeIn delay={0.1} direction="up">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-sm font-medium rounded-full bg-purple-100/80 backdrop-blur-sm border border-purple-200/50 text-purple-700 dark:bg-purple-900/50 dark:border-purple-500/30 dark:text-purple-300">
            <Sparkles className="w-4 h-4" />
            <span>Free AI Automation Assessment</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.2} direction="up">
          <h1 className="max-w-4xl mx-auto mb-6 text-5xl font-light tracking-tight leading-tight md:text-7xl lg:text-8xl text-zinc-900 dark:text-white">
            Discover Your{' '}
            <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500">
              AI Potential
            </span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.3} direction="up">
          <p className="max-w-2xl mx-auto mb-10 text-xl font-light leading-relaxed text-zinc-600 md:text-2xl text-balance dark:text-zinc-400">
            Take our DREAM Framework assessment to uncover exactly where AI automation
            can transform your business — across Demand, Revenue, Engine, Admin, and Marketing.
          </p>
        </FadeIn>

        <FadeIn delay={0.4} direction="up" className="flex flex-col items-center justify-center gap-6">
          <Link href="/assessment" className="group">
            <button className="relative px-10 py-5 text-lg font-medium text-white transition-all duration-300 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 hover:scale-105 shadow-lg shadow-purple-500/25">
              Start Free Assessment
              <ArrowRight className="inline-block w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </Link>

          {/* Trust indicators */}
          <div className="flex items-center gap-6 text-sm text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>10-40 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Instant results</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>No credit card</span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
