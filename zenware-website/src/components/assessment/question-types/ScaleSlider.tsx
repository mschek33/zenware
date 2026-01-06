'use client';

import { DreamQuestion } from '@/types/assessment';

interface ScaleSliderProps {
  question: DreamQuestion;
  value: number | undefined;
  onChange: (value: number) => void;
}

export default function ScaleSlider({ question, value, onChange }: ScaleSliderProps) {
  const min = question.scaleMin ?? 1;
  const max = question.scaleMax ?? 10;
  const currentValue = value ?? Math.floor((min + max) / 2);
  const labels = question.scaleLabels ?? { min: 'Low', max: 'High' };

  const steps = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  return (
    <div className="space-y-6">
      {/* Visual scale selector */}
      <div className="flex gap-2 justify-center">
        {steps.map((step) => (
          <button
            key={step}
            type="button"
            onClick={() => onChange(step)}
            className={`
              w-10 h-10 rounded-xl font-medium text-sm
              transition-all duration-200
              ${
                currentValue === step
                  ? 'bg-purple-500 text-white scale-110 shadow-lg shadow-purple-500/30'
                  : currentValue > step
                  ? 'bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700'
              }
            `}
          >
            {step}
          </button>
        ))}
      </div>

      {/* Labels */}
      <div className="flex justify-between text-sm text-zinc-500 dark:text-zinc-400 px-2">
        <span>{labels.min}</span>
        <span>{labels.max}</span>
      </div>

      {/* Current value display */}
      {value !== undefined && (
        <div className="text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 text-purple-700 font-medium dark:bg-purple-900/20 dark:text-purple-300">
            Your rating: {value}/10
          </span>
        </div>
      )}
    </div>
  );
}
