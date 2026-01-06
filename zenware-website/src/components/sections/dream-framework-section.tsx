'use client';

import {
  Target,
  DollarSign,
  Cog,
  FileText,
  Megaphone,
} from 'lucide-react';
import { FadeIn, StaggerContainer, ScaleIn } from '@/components/animations/fade-in';

const pillars = [
  {
    letter: 'D',
    name: 'Demand',
    description: 'Lead generation, funnel optimization, and conversion',
    icon: Target,
    color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300',
    examples: ['AI lead scoring', 'Intent detection', 'Personalized funnels'],
  },
  {
    letter: 'R',
    name: 'Revenue',
    description: 'Sales processes, pricing strategy, and pipeline',
    icon: DollarSign,
    color: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300',
    examples: ['Sales intelligence', 'Deal prediction', 'Automated follow-ups'],
  },
  {
    letter: 'E',
    name: 'Engine',
    description: 'Operations, workflows, and automation',
    icon: Cog,
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300',
    examples: ['Workflow automation', 'Process mining', 'AI agents'],
  },
  {
    letter: 'A',
    name: 'Admin',
    description: 'Finance, HR, compliance, and internal ops',
    icon: FileText,
    color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300',
    examples: ['Document processing', 'Expense automation', 'Smart reporting'],
  },
  {
    letter: 'M',
    name: 'Marketing',
    description: 'Brand, content, and campaign strategy',
    icon: Megaphone,
    color: 'bg-pink-100 text-pink-700 dark:bg-pink-900/20 dark:text-pink-300',
    examples: ['Content generation', 'Personalization', 'Campaign optimization'],
  },
];

export default function DreamFrameworkSection() {
  return (
    <section className="py-24 bg-white dark:bg-zinc-950">
      <div className="container px-4 mx-auto">
        <FadeIn direction="up" className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-zinc-900 mb-6 dark:text-white">
            The{' '}
            <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              DREAM Framework
            </span>
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Our comprehensive assessment evaluates your AI readiness across five critical business pillars,
            providing actionable insights for transformation.
          </p>
        </FadeIn>

        <StaggerContainer className="grid gap-6 md:grid-cols-5" staggerDelay={0.1}>
          {pillars.map((pillar) => (
            <ScaleIn
              key={pillar.letter}
              className="group relative p-6 rounded-3xl bg-zinc-50 border border-black/5 hover:bg-white hover:shadow-lg transition-[background-color,box-shadow,border-color] duration-300 dark:bg-zinc-900/50 dark:border-white/5 dark:hover:bg-zinc-800/50"
            >
              {/* Letter badge */}
              <div className="absolute -top-3 left-6">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-sm shadow-lg shadow-purple-500/30">
                  {pillar.letter}
                </span>
              </div>

              <div className="pt-4">
                <div className={`mb-4 w-12 h-12 rounded-xl flex items-center justify-center ${pillar.color}`}>
                  <pillar.icon className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-semibold text-zinc-900 mb-2 dark:text-white">
                  {pillar.name}
                </h3>
                <p className="text-sm text-zinc-600 mb-4 dark:text-zinc-400">
                  {pillar.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {pillar.examples.map((example) => (
                    <span
                      key={example}
                      className="text-xs px-2 py-1 rounded-full bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </div>
            </ScaleIn>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
