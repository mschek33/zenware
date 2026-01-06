'use client';

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { DreamScores, PILLAR_INFO } from '@/types/assessment';

interface DreamScoreChartProps {
  scores: DreamScores;
}

export default function DreamScoreChart({ scores }: DreamScoreChartProps) {
  const data = [
    {
      pillar: PILLAR_INFO.demand.name,
      score: scores.demand,
      fullMark: 10,
    },
    {
      pillar: PILLAR_INFO.revenue.name,
      score: scores.revenue,
      fullMark: 10,
    },
    {
      pillar: PILLAR_INFO.engine.name,
      score: scores.engine,
      fullMark: 10,
    },
    {
      pillar: PILLAR_INFO.admin.name,
      score: scores.admin,
      fullMark: 10,
    },
    {
      pillar: PILLAR_INFO.marketing.name,
      score: scores.marketing,
      fullMark: 10,
    },
  ];

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid
            stroke="#e4e4e7"
            strokeDasharray="3 3"
          />
          <PolarAngleAxis
            dataKey="pillar"
            tick={{ fill: '#71717a', fontSize: 12 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 10]}
            tick={{ fill: '#a1a1aa', fontSize: 10 }}
            tickCount={6}
          />
          <Radar
            name="Your Score"
            dataKey="score"
            stroke="#8b5cf6"
            fill="#8b5cf6"
            fillOpacity={0.3}
            strokeWidth={2}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e4e4e7',
              borderRadius: '12px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
            formatter={(value) => [`${value}/10`, 'Score']}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
