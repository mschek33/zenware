'use client';

import {
  Target,
  DollarSign,
  Cog,
  FileText,
  Megaphone,
} from 'lucide-react';
import { DreamPillar, PILLAR_INFO } from '@/types/assessment';

interface QuizProgressProps {
  currentPillar: DreamPillar;
  currentQuestionIndex: number;
  totalQuestions: number;
  questionsPerPillar: number;
}

const PILLAR_ICONS: Record<DreamPillar, React.ElementType> = {
  demand: Target,
  revenue: DollarSign,
  engine: Cog,
  admin: FileText,
  marketing: Megaphone,
};

const PILLAR_COLORS: Record<DreamPillar, string> = {
  demand: 'purple',
  revenue: 'green',
  engine: 'blue',
  admin: 'orange',
  marketing: 'pink',
};

export default function QuizProgress({
  currentPillar,
  currentQuestionIndex,
  totalQuestions,
  questionsPerPillar,
}: QuizProgressProps) {
  const pillars: DreamPillar[] = ['demand', 'revenue', 'engine', 'admin', 'marketing'];
  const currentPillarIndex = pillars.indexOf(currentPillar);
  const progressPercent = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  // Calculate which question within the current pillar
  const questionInPillar = (currentQuestionIndex % questionsPerPillar) + 1;

  return (
    <div className="space-y-4">
      {/* Overall progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-zinc-600 dark:text-zinc-400">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </span>
          <span className="text-zinc-600 dark:text-zinc-400">
            {Math.round(progressPercent)}% complete
          </span>
        </div>
        <div className="h-2 bg-zinc-100 rounded-full overflow-hidden dark:bg-zinc-800">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Pillar indicators */}
      <div className="flex items-center justify-between gap-2">
        {pillars.map((pillar, index) => {
          const Icon = PILLAR_ICONS[pillar];
          const info = PILLAR_INFO[pillar];
          const isActive = pillar === currentPillar;
          const isComplete = index < currentPillarIndex;
          const color = PILLAR_COLORS[pillar];

          return (
            <div
              key={pillar}
              className={`
                flex-1 flex flex-col items-center gap-1 p-2 rounded-xl
                transition-all duration-300
                ${isActive ? 'scale-105' : ''}
              `}
            >
              <div
                className={`
                  w-10 h-10 rounded-xl flex items-center justify-center
                  transition-all duration-300
                  ${
                    isActive
                      ? `bg-${color}-100 text-${color}-600 ring-2 ring-${color}-500 dark:bg-${color}-900/30 dark:text-${color}-400`
                      : isComplete
                      ? `bg-${color}-100 text-${color}-600 dark:bg-${color}-900/30 dark:text-${color}-400`
                      : 'bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500'
                  }
                `}
                style={{
                  backgroundColor: isActive
                    ? `var(--${color}-100, #f3e8ff)`
                    : isComplete
                    ? `var(--${color}-50, #faf5ff)`
                    : undefined,
                }}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span
                className={`
                  text-xs font-medium hidden sm:block
                  ${
                    isActive
                      ? 'text-zinc-900 dark:text-white'
                      : 'text-zinc-500 dark:text-zinc-400'
                  }
                `}
              >
                {info.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Current pillar info */}
      <div className="flex items-center justify-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
        <span className="font-medium text-zinc-900 dark:text-white">
          {PILLAR_INFO[currentPillar].name}
        </span>
        <span>-</span>
        <span>
          Question {questionInPillar} of {questionsPerPillar}
        </span>
      </div>
    </div>
  );
}
