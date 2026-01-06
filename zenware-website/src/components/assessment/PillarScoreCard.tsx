'use client';

import {
  Target,
  DollarSign,
  Cog,
  FileText,
  Megaphone,
  TrendingUp,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { DreamPillar, PILLAR_INFO } from '@/types/assessment';
import { getScoreRating } from '@/lib/scoring';

interface PillarScoreCardProps {
  pillar: DreamPillar;
  score: number;
  recommendations: string[];
  expanded?: boolean;
  onToggle?: () => void;
}

const PILLAR_ICONS = {
  demand: Target,
  revenue: DollarSign,
  engine: Cog,
  admin: FileText,
  marketing: Megaphone,
};

const PILLAR_COLORS = {
  demand: {
    bg: 'bg-purple-100 dark:bg-purple-900/30',
    text: 'text-purple-700 dark:text-purple-400',
    border: 'border-purple-200 dark:border-purple-800',
    progress: 'bg-purple-500',
  },
  revenue: {
    bg: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-700 dark:text-green-400',
    border: 'border-green-200 dark:border-green-800',
    progress: 'bg-green-500',
  },
  engine: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-700 dark:text-blue-400',
    border: 'border-blue-200 dark:border-blue-800',
    progress: 'bg-blue-500',
  },
  admin: {
    bg: 'bg-orange-100 dark:bg-orange-900/30',
    text: 'text-orange-700 dark:text-orange-400',
    border: 'border-orange-200 dark:border-orange-800',
    progress: 'bg-orange-500',
  },
  marketing: {
    bg: 'bg-pink-100 dark:bg-pink-900/30',
    text: 'text-pink-700 dark:text-pink-400',
    border: 'border-pink-200 dark:border-pink-800',
    progress: 'bg-pink-500',
  },
};

function getScoreIcon(score: number) {
  if (score >= 7) return CheckCircle;
  if (score >= 4) return TrendingUp;
  return AlertCircle;
}

function getScoreIconColor(score: number) {
  if (score >= 7) return 'text-green-500';
  if (score >= 4) return 'text-yellow-500';
  return 'text-red-500';
}

export default function PillarScoreCard({
  pillar,
  score,
  recommendations,
  expanded = false,
  onToggle,
}: PillarScoreCardProps) {
  const Icon = PILLAR_ICONS[pillar];
  const ScoreIcon = getScoreIcon(score);
  const info = PILLAR_INFO[pillar];
  const colors = PILLAR_COLORS[pillar];
  const rating = getScoreRating(score);
  const progressPercent = (score / 10) * 100;

  return (
    <div
      className={`
        rounded-2xl border bg-white overflow-hidden
        transition-all duration-300
        dark:bg-zinc-900/50
        ${colors.border}
      `}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full p-6 flex items-center gap-4 hover:bg-zinc-50 transition-colors dark:hover:bg-zinc-800/50"
      >
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors.bg} ${colors.text}`}>
          <Icon className="w-6 h-6" />
        </div>

        <div className="flex-1 text-left">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-zinc-900 dark:text-white">{info.name}</h3>
            <ScoreIcon className={`w-4 h-4 ${getScoreIconColor(score)}`} />
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{info.description}</p>
        </div>

        <div className="text-right">
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">
            {score.toFixed(1)}
          </div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">{rating}</div>
        </div>
      </button>

      {/* Progress bar */}
      <div className="px-6 pb-4">
        <div className="h-2 bg-zinc-100 rounded-full overflow-hidden dark:bg-zinc-800">
          <div
            className={`h-full ${colors.progress} transition-all duration-1000 ease-out`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Expandable recommendations */}
      {expanded && recommendations.length > 0 && (
        <div className="px-6 pb-6 border-t border-zinc-100 dark:border-zinc-800">
          <h4 className="text-sm font-medium text-zinc-900 mt-4 mb-3 dark:text-white">
            Recommended Actions
          </h4>
          <ul className="space-y-2">
            {recommendations.map((rec, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400"
              >
                <div className={`w-1.5 h-1.5 rounded-full ${colors.progress} mt-1.5 flex-shrink-0`} />
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
