'use client';

import { DreamQuestion, PILLAR_INFO } from '@/types/assessment';
import {
  Target,
  DollarSign,
  Cog,
  FileText,
  Megaphone,
} from 'lucide-react';
import SingleChoice from './question-types/SingleChoice';
import ScaleSlider from './question-types/ScaleSlider';
import MultiChoice from './question-types/MultiChoice';

interface QuestionCardProps {
  question: DreamQuestion;
  value: string | number | string[] | undefined;
  onChange: (value: string | number | string[]) => void;
}

const PILLAR_ICONS = {
  demand: Target,
  revenue: DollarSign,
  engine: Cog,
  admin: FileText,
  marketing: Megaphone,
};

const PILLAR_COLORS = {
  demand: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  revenue: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  engine: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  admin: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  marketing: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
};

export default function QuestionCard({ question, value, onChange }: QuestionCardProps) {
  const Icon = PILLAR_ICONS[question.pillar];
  const pillarInfo = PILLAR_INFO[question.pillar];
  const colorClasses = PILLAR_COLORS[question.pillar];

  const renderQuestionInput = () => {
    switch (question.type) {
      case 'single-choice':
        return (
          <SingleChoice
            question={question}
            value={value as string | undefined}
            onChange={(v) => onChange(v)}
          />
        );
      case 'scale':
        return (
          <ScaleSlider
            question={question}
            value={value as number | undefined}
            onChange={(v) => onChange(v)}
          />
        );
      case 'multi-choice':
        return (
          <MultiChoice
            question={question}
            value={value as string[] | undefined}
            onChange={(v) => onChange(v)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Pillar badge */}
      <div className="flex items-center gap-2">
        <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${colorClasses}`}>
          <Icon className="w-4 h-4" />
          {pillarInfo.name}
        </span>
      </div>

      {/* Question text */}
      <div className="space-y-2">
        <h3 className="text-2xl font-light text-zinc-900 leading-relaxed dark:text-white">
          {question.question}
        </h3>
        {question.description && (
          <p className="text-zinc-500 dark:text-zinc-400">{question.description}</p>
        )}
      </div>

      {/* Answer input */}
      <div className="pt-4">{renderQuestionInput()}</div>
    </div>
  );
}
