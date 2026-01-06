// DREAM Framework Assessment Types

export type QuizTier = 'mini' | 'medium' | 'indepth';

export type DreamPillar = 'demand' | 'revenue' | 'engine' | 'admin' | 'marketing';

export type QuestionType = 'single-choice' | 'scale' | 'multi-choice';

export type AssessmentStatus = 'in_progress' | 'completed' | 'abandoned';

export interface QuestionOption {
  value: string;
  label: string;
  score: number; // 0-10 contribution to pillar score
}

export interface DreamQuestion {
  id: string;
  pillar: DreamPillar;
  order: number; // 1-20, determines which tiers include this question
  type: QuestionType;
  question: string;
  description?: string;
  options?: QuestionOption[];
  scaleMin?: number;
  scaleMax?: number;
  scaleLabels?: { min: string; max: string };
  weight: number; // Importance factor for scoring (default 1.0)
}

export interface DreamScores {
  demand: number;
  revenue: number;
  engine: number;
  admin: number;
  marketing: number;
  overall: number;
}

export interface AssessmentResponses {
  [questionId: string]: string | number | string[];
}

export interface Assessment {
  id: string;
  tier: QuizTier;
  status: AssessmentStatus;

  // Contact Info
  name?: string;
  email?: string;
  company?: string;
  phone?: string;

  // DREAM Scores
  demandScore?: number;
  revenueScore?: number;
  engineScore?: number;
  adminScore?: number;
  marketingScore?: number;
  overallScore?: number;

  // Responses
  responses?: AssessmentResponses;

  // Timestamps
  startedAt: Date;
  completedAt?: Date;

  // Flags
  pdfRequested: boolean;
  consultationRequested: boolean;

  createdAt: Date;
  updatedAt: Date;
}

export interface AssessmentSubmission {
  tier: QuizTier;
  responses: AssessmentResponses;
  scores: DreamScores;
  contact?: {
    name?: string;
    email?: string;
    company?: string;
    phone?: string;
  };
}

export interface TierConfig {
  tier: QuizTier;
  title: string;
  duration: string;
  questionCount: number;
  questionsPerPillar: number;
  description: string;
  benefits: string[];
}

export interface PillarInfo {
  id: DreamPillar;
  name: string;
  description: string;
  icon: string; // Lucide icon name
  color: string; // Tailwind color class
}

// Tier configuration constants
export const TIER_CONFIGS: TierConfig[] = [
  {
    tier: 'mini',
    title: 'Quick Scan',
    duration: '~10 minutes',
    questionCount: 40,
    questionsPerPillar: 8,
    description: 'A rapid overview of your AI automation potential across all five DREAM pillars.',
    benefits: [
      'High-level assessment',
      'Immediate insights',
      'Perfect for busy executives',
    ],
  },
  {
    tier: 'medium',
    title: 'Standard Assessment',
    duration: '~20 minutes',
    questionCount: 70,
    questionsPerPillar: 14,
    description: 'A thorough evaluation with actionable recommendations for each business area.',
    benefits: [
      'Detailed pillar analysis',
      'Specific recommendations',
      'Priority action items',
    ],
  },
  {
    tier: 'indepth',
    title: 'Comprehensive Audit',
    duration: '~40 minutes',
    questionCount: 100,
    questionsPerPillar: 20,
    description: 'Our most detailed assessment for organizations serious about AI transformation.',
    benefits: [
      'Complete business analysis',
      'Strategic roadmap',
      'ROI projections',
      'Implementation priorities',
    ],
  },
];

export const PILLAR_INFO: Record<DreamPillar, PillarInfo> = {
  demand: {
    id: 'demand',
    name: 'Demand',
    description: 'Lead generation, funnel optimization, and conversion',
    icon: 'Target',
    color: 'purple',
  },
  revenue: {
    id: 'revenue',
    name: 'Revenue',
    description: 'Sales processes, pricing strategy, and pipeline',
    icon: 'DollarSign',
    color: 'green',
  },
  engine: {
    id: 'engine',
    name: 'Engine',
    description: 'Operations, workflows, and automation',
    icon: 'Cog',
    color: 'blue',
  },
  admin: {
    id: 'admin',
    name: 'Admin',
    description: 'Finance, HR, compliance, and internal ops',
    icon: 'FileText',
    color: 'orange',
  },
  marketing: {
    id: 'marketing',
    name: 'Marketing',
    description: 'Brand, content, and campaign strategy',
    icon: 'Megaphone',
    color: 'pink',
  },
};

// Helper to get questions for a specific tier
export function getQuestionsForTier(
  allQuestions: DreamQuestion[],
  tier: QuizTier
): DreamQuestion[] {
  const maxOrder = TIER_CONFIGS.find((t) => t.tier === tier)?.questionsPerPillar || 8;
  return allQuestions.filter((q) => q.order <= maxOrder);
}
