'use client';

import { DreamQuestion } from '@/types/assessment';

interface SingleChoiceProps {
  question: DreamQuestion;
  value: string | undefined;
  onChange: (value: string) => void;
}

export default function SingleChoice({ question, value, onChange }: SingleChoiceProps) {
  if (!question.options) return null;

  return (
    <div className="space-y-3">
      {question.options.map((option) => (
        <label
          key={option.value}
          className={`
            flex items-start gap-4 p-4 rounded-2xl border cursor-pointer
            transition-all duration-200
            ${
              value === option.value
                ? 'bg-purple-50 border-purple-300 ring-2 ring-purple-200 dark:bg-purple-900/20 dark:border-purple-500 dark:ring-purple-500/30'
                : 'bg-white border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 dark:bg-zinc-900/50 dark:border-zinc-700 dark:hover:border-zinc-600 dark:hover:bg-zinc-800/50'
            }
          `}
        >
          <div className="flex-shrink-0 pt-0.5">
            <div
              className={`
                w-5 h-5 rounded-full border-2 flex items-center justify-center
                transition-all duration-200
                ${
                  value === option.value
                    ? 'border-purple-500 bg-purple-500'
                    : 'border-zinc-300 dark:border-zinc-600'
                }
              `}
            >
              {value === option.value && (
                <div className="w-2 h-2 rounded-full bg-white" />
              )}
            </div>
          </div>
          <div className="flex-1">
            <input
              type="radio"
              name={question.id}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            <span className="text-zinc-900 font-medium dark:text-white">
              {option.label}
            </span>
          </div>
        </label>
      ))}
    </div>
  );
}
