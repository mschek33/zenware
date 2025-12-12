'use client';

import { Shield, Award, Network } from 'lucide-react';
import { FadeIn, StaggerContainer } from '@/components/animations/fade-in';

export default function TrustIndicators() {
  const indicators = [
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-grade encryption and ISO-compliant security protocols protecting your data.',
    },
    {
      icon: Award,
      title: 'Industry Recognition',
      description: 'Award-winning solutions recognized for innovation and technical excellence.',
    },
    {
      icon: Network,
      title: 'Global Scalability',
      description: 'Infrastructure designed to scale seamlessly across regions and timezones.',
    },
  ];

  return (
    <section className="py-24 bg-zinc-50 dark:bg-black/20">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="relative p-12 overflow-hidden bg-white border shadow-sm rounded-3xl border-black/5 dark:bg-zinc-900 dark:border-white/5">
          <div className="absolute top-0 right-0 p-32 bg-purple-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 dark:bg-purple-900/10" />
          <div className="absolute bottom-0 left-0 p-32 bg-blue-100/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 dark:bg-blue-900/10" />

          <div className="relative z-10 text-center mb-16">
            <FadeIn>
              <h2 className="mb-6 text-3xl font-light tracking-tight text-zinc-900 md:text-4xl dark:text-white">
                Trusted by Industry <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Leaders</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="max-w-2xl mx-auto text-lg font-light text-zinc-600 dark:text-zinc-400">
                Building the backbone of modern enterprises with reliability and consciousness.
              </p>
            </FadeIn>
          </div>

          <StaggerContainer className="relative z-10 grid gap-12 md:grid-cols-3">
            {indicators.map((indicator, index) => (
              <FadeIn key={index} direction="up" className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 transition-all duration-300 bg-zinc-50 rounded-2xl group-hover:scale-110 group-hover:bg-zinc-100 dark:bg-white/5 dark:group-hover:bg-white/10">
                  <indicator.icon className="w-8 h-8 text-zinc-900 dark:text-white" strokeWidth={1.5} />
                </div>
                <h3 className="mb-3 text-xl font-medium text-zinc-900 dark:text-white">{indicator.title}</h3>
                <p className="font-light leading-relaxed text-zinc-600 text-pretty dark:text-zinc-400">
                  {indicator.description}
                </p>
              </FadeIn>
            ))}
          </StaggerContainer>

          {/* Trust Stats */}
          <FadeIn delay={0.4} className="relative z-10 mt-16 text-center">
            <div className="bg-zinc-50/50 backdrop-blur-sm border border-black/5 rounded-3xl p-12 max-w-4xl mx-auto dark:bg-white/5 dark:border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-light text-zinc-900 mb-2 dark:text-white">500M+</div>
                  <div className="text-zinc-500 font-medium text-sm uppercase tracking-wide dark:text-zinc-400">Assets Protected</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-light text-zinc-900 mb-2 dark:text-white">15+</div>
                  <div className="text-zinc-500 font-medium text-sm uppercase tracking-wide dark:text-zinc-400">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-light text-zinc-900 mb-2 dark:text-white">24/7</div>
                  <div className="text-zinc-500 font-medium text-sm uppercase tracking-wide dark:text-zinc-400">System Reliability</div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}