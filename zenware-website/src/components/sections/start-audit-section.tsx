'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Clock,
  CheckCircle,
  BarChart3,
  Sparkles,
} from 'lucide-react';
import { FadeIn, StaggerContainer, ScaleIn } from '@/components/animations/fade-in';
import { TIER_CONFIGS } from '@/types/assessment';

export default function StartAuditSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950">
      <div className="container px-4 mx-auto">
        <FadeIn direction="up" className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-zinc-900 mb-6 dark:text-white">
            Choose Your Assessment Depth
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            The more thorough your assessment, the more actionable your AI transformation roadmap.
            <span className="block mt-2 font-medium text-purple-600 dark:text-purple-400">
              Deeper assessment = Better insights
            </span>
          </p>
        </FadeIn>

        <StaggerContainer className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto" staggerDelay={0.1}>
          {TIER_CONFIGS.map((config, index) => (
            <ScaleIn key={config.tier}>
              <Link href={`/assessment?tier=${config.tier}`}>
                <div
                  className={`
                    group relative p-8 rounded-3xl h-full
                    border transition-[border-color,box-shadow] duration-300 cursor-pointer
                    ${
                      index === 1
                        ? 'bg-gradient-to-b from-purple-50 to-white border-purple-200 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-500/10 dark:from-purple-900/20 dark:to-zinc-900 dark:border-purple-500/50'
                        : 'bg-white border-zinc-200 hover:border-zinc-300 hover:shadow-lg dark:bg-zinc-900/50 dark:border-zinc-700 dark:hover:border-zinc-600'
                    }
                  `}
                >
                  {/* Recommended badge */}
                  {index === 1 && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-500 text-white text-xs font-medium shadow-lg shadow-purple-500/30">
                        <Sparkles className="w-3 h-3" />
                        Recommended
                      </span>
                    </div>
                  )}

                  {/* Duration */}
                  <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                    <Clock className="w-4 h-4" />
                    <span>{config.duration}</span>
                    <span className="text-zinc-300 dark:text-zinc-600">|</span>
                    <BarChart3 className="w-4 h-4" />
                    <span>{config.questionCount} questions</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-zinc-900 mb-2 dark:text-white">
                    {config.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-zinc-600 mb-6 dark:text-zinc-400">
                    {config.description}
                  </p>

                  {/* Benefits */}
                  <ul className="space-y-2 mb-6">
                    {config.benefits.map((benefit, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div
                    className={`
                      flex items-center gap-2 text-sm font-medium
                      transition-all duration-300 group-hover:gap-3
                      ${
                        index === 1
                          ? 'text-purple-600 dark:text-purple-400'
                          : 'text-zinc-900 dark:text-white'
                      }
                    `}
                  >
                    <span>Start Assessment</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </ScaleIn>
          ))}
        </StaggerContainer>

        {/* Bottom note */}
        <FadeIn delay={0.5} className="text-center mt-8">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Your responses are saved automatically. You can pause and return anytime.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
