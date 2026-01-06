'use client';

import { Check } from 'lucide-react';
import { DreamQuestion } from '@/types/assessment';

interface MultiChoiceProps {
  question: DreamQuestion;
  value: string[] | undefined;
  onChange: (value: string[]) => void;
}

export default function MultiChoice({ question, value = [], onChange }: MultiChoiceProps) {
  if (!question.options) return null;

  const handleToggle = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  return (
    <div className="space-y-3">
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
        Select all that apply
      </p>
      {question.options.map((option) => {
        const isSelected = value.includes(option.value);
        return (
          <label
            key={option.value}
            className={`
              flex items-start gap-4 p-4 rounded-2xl border cursor-pointer
              transition-all duration-200
              ${
                isSelected
                  ? 'bg-purple-50 border-purple-300 ring-2 ring-purple-200 dark:bg-purple-900/20 dark:border-purple-500 dark:ring-purple-500/30'
                  : 'bg-white border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 dark:bg-zinc-900/50 dark:border-zinc-700 dark:hover:border-zinc-600 dark:hover:bg-zinc-800/50'
              }
            `}
          >
            <div className="flex-shrink-0 pt-0.5">
              <div
                className={`
                  w-5 h-5 rounded-md border-2 flex items-center justify-center
                  transition-all duration-200
                  ${
                    isSelected
                      ? 'border-purple-500 bg-purple-500'
                      : 'border-zinc-300 dark:border-zinc-600'
                  }
                `}
              >
                {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
              </div>
            </div>
            <div className="flex-1">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => handleToggle(option.value)}
                className="sr-only"
              />
              <span className="text-zinc-900 font-medium dark:text-white">
                {option.label}
              </span>
            </div>
          </label>
        );
      })}
    </div>
  );
}
