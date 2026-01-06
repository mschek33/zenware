'use client';

import { Clock, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { QuizTier, TIER_CONFIGS } from '@/types/assessment';

interface TierSelectorProps {
  onSelect: (tier: QuizTier) => void;
}

export default function TierSelector({ onSelect }: TierSelectorProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-light text-zinc-900 mb-4 dark:text-white">
          Choose Your Assessment Depth
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          The more thorough your assessment, the more actionable your AI transformation roadmap.
          Select the depth that fits your schedule.
        </p>
      </div>

      {/* Tier Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {TIER_CONFIGS.map((config) => (
          <button
            key={config.tier}
            onClick={() => onSelect(config.tier)}
            className={`
              group relative p-6 rounded-3xl text-left
              border transition-all duration-300
              ${
                config.tier === 'medium'
                  ? 'bg-gradient-to-b from-purple-50 to-white border-purple-200 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-500/10 dark:from-purple-900/20 dark:to-zinc-900 dark:border-purple-500/50'
                  : 'bg-white border-zinc-200 hover:border-zinc-300 hover:shadow-md dark:bg-zinc-900/50 dark:border-zinc-700 dark:hover:border-zinc-600'
              }
            `}
          >
            {/* Recommended badge for Medium */}
            {config.tier === 'medium' && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-500 text-white text-xs font-medium">
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
              {config.benefits.map((benefit, index) => (
                <li
                  key={index}
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
                  config.tier === 'medium'
                    ? 'text-purple-600 dark:text-purple-400'
                    : 'text-zinc-900 dark:text-white'
                }
              `}
            >
              <span>Start Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        ))}
      </div>

      {/* Bottom note */}
      <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
        Your responses are saved automatically. You can pause and return anytime.
      </p>
    </div>
  );
}
