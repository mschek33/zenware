import {
  DreamQuestion,
  DreamScores,
  AssessmentResponses,
  QuizTier,
  DreamPillar,
} from '@/types/assessment';
import { DREAM_QUESTIONS } from '@/data/dream-questions';

/**
 * Get the maximum question order for a given tier
 */
function getMaxOrderForTier(tier: QuizTier): number {
  switch (tier) {
    case 'mini':
      return 8;
    case 'medium':
      return 14;
    case 'indepth':
      return 20;
    default:
      return 8;
  }
}

/**
 * Get questions relevant to a specific tier
 */
export function getQuestionsForTier(tier: QuizTier): DreamQuestion[] {
  const maxOrder = getMaxOrderForTier(tier);
  return DREAM_QUESTIONS.filter((q) => q.order <= maxOrder);
}

/**
 * Get questions for a specific pillar and tier
 */
export function getQuestionsForPillarAndTier(
  pillar: DreamPillar,
  tier: QuizTier
): DreamQuestion[] {
  const maxOrder = getMaxOrderForTier(tier);
  return DREAM_QUESTIONS.filter((q) => q.pillar === pillar && q.order <= maxOrder);
}

/**
 * Calculate the score for a single question response
 */
function calculateQuestionScore(
  question: DreamQuestion,
  response: string | number | string[] | undefined
): number {
  if (response === undefined || response === null) {
    return 0;
  }

  switch (question.type) {
    case 'single-choice': {
      if (!question.options) return 0;
      const selected = question.options.find((o) => o.value === response);
      return selected?.score ?? 0;
    }

    case 'scale': {
      // Scale responses are already 1-10, normalize to 0-10
      const numValue = Number(response);
      if (isNaN(numValue)) return 0;
      return Math.max(0, Math.min(10, numValue));
    }

    case 'multi-choice': {
      if (!question.options || !Array.isArray(response)) return 0;
      if (response.length === 0) return 0;

      // Sum the scores of selected options, then normalize
      const selectedScores = response
        .map((v) => question.options?.find((o) => o.value === v)?.score ?? 0)
        .filter((s) => s > 0);

      if (selectedScores.length === 0) return 0;

      // Calculate average score, capped at 10
      const total = selectedScores.reduce((a, b) => a + b, 0);
      return Math.min(10, total);
    }

    default:
      return 0;
  }
}

/**
 * Calculate DREAM scores from assessment responses
 */
export function calculateScores(
  responses: AssessmentResponses,
  tier: QuizTier
): DreamScores {
  const pillarScores: Record<DreamPillar, { totalWeightedScore: number; totalWeight: number }> = {
    demand: { totalWeightedScore: 0, totalWeight: 0 },
    revenue: { totalWeightedScore: 0, totalWeight: 0 },
    engine: { totalWeightedScore: 0, totalWeight: 0 },
    admin: { totalWeightedScore: 0, totalWeight: 0 },
    marketing: { totalWeightedScore: 0, totalWeight: 0 },
  };

  // Get relevant questions for this tier
  const relevantQuestions = getQuestionsForTier(tier);

  // Calculate weighted scores for each question
  for (const question of relevantQuestions) {
    const response = responses[question.id];
    const questionScore = calculateQuestionScore(question, response);
    const weight = question.weight || 1.0;

    pillarScores[question.pillar].totalWeightedScore += questionScore * weight;
    pillarScores[question.pillar].totalWeight += weight;
  }

  // Calculate final pillar scores (0-10 scale)
  const scores: DreamScores = {
    demand: 0,
    revenue: 0,
    engine: 0,
    admin: 0,
    marketing: 0,
    overall: 0,
  };

  const pillars: DreamPillar[] = ['demand', 'revenue', 'engine', 'admin', 'marketing'];

  for (const pillar of pillars) {
    const { totalWeightedScore, totalWeight } = pillarScores[pillar];
    if (totalWeight > 0) {
      // Normalize to 0-10 scale and round to 1 decimal
      scores[pillar] = Math.round((totalWeightedScore / totalWeight) * 10) / 10;
    }
  }

  // Calculate overall score (average of all pillars)
  const pillarValues = pillars.map((p) => scores[p]);
  const sum = pillarValues.reduce((a, b) => a + b, 0);
  scores.overall = Math.round((sum / pillars.length) * 10) / 10;

  return scores;
}

/**
 * Get a text-based rating for a score
 */
export function getScoreRating(score: number): string {
  if (score >= 8) return 'Excellent';
  if (score >= 6) return 'Good';
  if (score >= 4) return 'Moderate';
  if (score >= 2) return 'Needs Improvement';
  return 'Critical';
}

/**
 * Get a color class for a score (for UI)
 */
export function getScoreColor(score: number): string {
  if (score >= 8) return 'text-green-600';
  if (score >= 6) return 'text-blue-600';
  if (score >= 4) return 'text-yellow-600';
  if (score >= 2) return 'text-orange-600';
  return 'text-red-600';
}

/**
 * Get a background color class for a score
 */
export function getScoreBgColor(score: number): string {
  if (score >= 8) return 'bg-green-100';
  if (score >= 6) return 'bg-blue-100';
  if (score >= 4) return 'bg-yellow-100';
  if (score >= 2) return 'bg-orange-100';
  return 'bg-red-100';
}

/**
 * Generate recommendations based on scores
 */
export function generateRecommendations(scores: DreamScores): Record<DreamPillar, string[]> {
  const recommendations: Record<DreamPillar, string[]> = {
    demand: [],
    revenue: [],
    engine: [],
    admin: [],
    marketing: [],
  };

  // Demand recommendations
  if (scores.demand < 4) {
    recommendations.demand = [
      'Implement a formal lead generation strategy',
      'Set up basic marketing automation',
      'Consider AI-powered lead scoring',
    ];
  } else if (scores.demand < 7) {
    recommendations.demand = [
      'Enhance lead qualification with AI',
      'Implement predictive analytics for demand forecasting',
      'Automate lead nurturing sequences',
    ];
  } else {
    recommendations.demand = [
      'Fine-tune AI models for even better prediction',
      'Explore advanced personalization',
      'Consider real-time intent detection',
    ];
  }

  // Revenue recommendations
  if (scores.revenue < 4) {
    recommendations.revenue = [
      'Implement a CRM system with proper adoption',
      'Define and document your sales process',
      'Set up basic sales automation',
    ];
  } else if (scores.revenue < 7) {
    recommendations.revenue = [
      'Deploy AI-powered sales intelligence',
      'Implement conversation intelligence',
      'Automate proposal generation',
    ];
  } else {
    recommendations.revenue = [
      'Leverage predictive deal scoring',
      'Implement AI sales coaching',
      'Optimize pricing with AI insights',
    ];
  }

  // Engine recommendations
  if (scores.engine < 4) {
    recommendations.engine = [
      'Document core workflows',
      'Reduce tool sprawl and integrate systems',
      'Implement basic workflow automation',
    ];
  } else if (scores.engine < 7) {
    recommendations.engine = [
      'Deploy process mining to identify bottlenecks',
      'Implement intelligent document processing',
      'Set up automated exception handling',
    ];
  } else {
    recommendations.engine = [
      'Explore RPA for high-volume tasks',
      'Implement AI agents for complex workflows',
      'Set up predictive maintenance',
    ];
  }

  // Admin recommendations
  if (scores.admin < 4) {
    recommendations.admin = [
      'Automate invoicing and expense management',
      'Implement a knowledge management system',
      'Streamline HR onboarding processes',
    ];
  } else if (scores.admin < 7) {
    recommendations.admin = [
      'Deploy AI for document processing',
      'Implement predictive financial analytics',
      'Set up intelligent IT support',
    ];
  } else {
    recommendations.admin = [
      'Implement touchless AP processing',
      'Deploy AI-powered compliance monitoring',
      'Optimize with predictive planning',
    ];
  }

  // Marketing recommendations
  if (scores.marketing < 4) {
    recommendations.marketing = [
      'Develop a data-driven marketing strategy',
      'Implement marketing automation',
      'Set up proper attribution tracking',
    ];
  } else if (scores.marketing < 7) {
    recommendations.marketing = [
      'Deploy AI for content creation at scale',
      'Implement advanced personalization',
      'Set up predictive campaign planning',
    ];
  } else {
    recommendations.marketing = [
      'Implement AI-driven hyper-personalization',
      'Deploy predictive customer journey optimization',
      'Leverage AI for creative testing at scale',
    ];
  }

  return recommendations;
}

/**
 * Calculate completion percentage
 */
export function calculateCompletionPercentage(
  responses: AssessmentResponses,
  tier: QuizTier
): number {
  const questions = getQuestionsForTier(tier);
  const answeredCount = questions.filter((q) => {
    const response = responses[q.id];
    if (response === undefined || response === null) return false;
    if (Array.isArray(response) && response.length === 0) return false;
    if (typeof response === 'string' && response.trim() === '') return false;
    return true;
  }).length;

  return Math.round((answeredCount / questions.length) * 100);
}
