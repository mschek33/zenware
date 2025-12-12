'use client';

import { Brain, Heart, Zap } from 'lucide-react';
import { StaggerContainer, ScaleIn } from '@/components/animations/fade-in';

export default function ValuePropositions() {
  const values = [
    {
      icon: Brain,
      title: 'Conscious Intelligence',
      description: 'AI solutions that amplify human potential rather than replacing it.',
      color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300',
    },
    {
      icon: Heart,
      title: 'Human-Centric Design',
      description: 'Interfaces that respect user attention and promote digital wellbeing.',
      color: 'bg-pink-100 text-pink-700 dark:bg-pink-900/20 dark:text-pink-300',
    },
    {
      icon: Zap,
      title: 'Regenerative Performance',
      description: 'Efficient, scalable systems designed for long-term sustainability.',
      color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300',
    },
  ];

  return (
    <section className="py-24 bg-zinc-50 dark:bg-black/20">
      <div className="container px-4 mx-auto">
        <StaggerContainer className="grid gap-8 md:grid-cols-3" staggerDelay={0.2}>
          {values.map((value, index) => (
            <ScaleIn
              key={index}
              className="group relative p-8 rounded-3xl bg-white border border-black/5 hover:bg-zinc-50 transition-all duration-500 hover:border-black/10 overflow-hidden shadow-sm dark:bg-zinc-900/50 dark:border-white/5 dark:hover:bg-white/5 dark:hover:border-white/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 dark:from-white/5" />

              <div className="relative z-10">
                <div className={`mb-6 w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 ${value.color}`}>
                  <value.icon className="w-6 h-6 stroke-1.5" />
                </div>

                <h3 className="text-xl font-medium text-zinc-900 mb-3 tracking-wide dark:text-white">
                  {value.title}
                </h3>

                <p className="text-zinc-600 font-light leading-relaxed group-hover:text-zinc-800 transition-colors dark:text-zinc-400 dark:group-hover:text-zinc-300">
                  {value.description}
                </p>
              </div>
            </ScaleIn>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}