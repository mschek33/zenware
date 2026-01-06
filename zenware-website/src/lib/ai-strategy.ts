import Anthropic from '@anthropic-ai/sdk';
import { DreamScores, AssessmentResponses, QuizTier, DreamPillar, PILLAR_INFO } from '@/types/assessment';
import { getQuestionsForTier } from './scoring';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface AssessmentContext {
  tier: QuizTier;
  scores: DreamScores;
  responses: AssessmentResponses;
  companyName?: string;
  contactName?: string;
}

interface QuestionAnswer {
  pillar: DreamPillar;
  question: string;
  answer: string;
  score: number;
}

/**
 * Convert raw responses into readable Q&A format for AI analysis
 */
function formatResponsesForAI(responses: AssessmentResponses, tier: QuizTier): QuestionAnswer[] {
  const questions = getQuestionsForTier(tier);
  const formattedResponses: QuestionAnswer[] = [];

  for (const question of questions) {
    const response = responses[question.id];
    if (response === undefined || response === null) continue;

    let answerText = '';
    let answerScore = 0;

    if (question.type === 'scale') {
      answerText = `${response}/10`;
      answerScore = Number(response);
    } else if (question.type === 'single-choice' && question.options) {
      const option = question.options.find(o => o.value === response);
      answerText = option?.label || String(response);
      answerScore = option?.score || 0;
    } else if (question.type === 'multi-choice' && Array.isArray(response)) {
      const labels = response.map(v => {
        const option = question.options?.find(o => o.value === v);
        return option?.label || v;
      });
      answerText = labels.join(', ');
      const scores = response.map(v => question.options?.find(o => o.value === v)?.score || 0);
      answerScore = scores.length > 0 ? Math.min(10, scores.reduce((a, b) => a + b, 0)) : 0;
    } else {
      answerText = String(response);
    }

    formattedResponses.push({
      pillar: question.pillar,
      question: question.question,
      answer: answerText,
      score: answerScore,
    });
  }

  return formattedResponses;
}

/**
 * Group Q&A by pillar for better organization
 */
function groupByPillar(qas: QuestionAnswer[]): Record<DreamPillar, QuestionAnswer[]> {
  const grouped: Record<DreamPillar, QuestionAnswer[]> = {
    demand: [],
    revenue: [],
    engine: [],
    admin: [],
    marketing: [],
  };

  for (const qa of qas) {
    grouped[qa.pillar].push(qa);
  }

  return grouped;
}

/**
 * Build the comprehensive prompt for Claude
 */
function buildStrategyPrompt(context: AssessmentContext): string {
  const { tier, scores, responses, companyName, contactName } = context;
  const qas = formatResponsesForAI(responses, tier);
  const groupedQAs = groupByPillar(qas);

  const tierDescription = {
    mini: 'Quick Scan (~10 minutes, 40 questions)',
    medium: 'Standard Assessment (~20 minutes, 70 questions)',
    indepth: 'Comprehensive Audit (~40 minutes, 100 questions)',
  }[tier];

  let prompt = `You are a senior AI automation consultant at Zenware, a company specializing in helping businesses transform their operations with AI. You are analyzing the results of a DREAM Framework AI Audit.

## About the DREAM Framework
DREAM stands for the five pillars of business AI transformation:
- **Demand**: Lead generation, funnel optimization, and conversion
- **Revenue**: Sales processes, pricing strategy, and pipeline management
- **Engine**: Operations, workflows, and internal automation
- **Admin**: Finance, HR, compliance, and administrative operations
- **Marketing**: Brand, content strategy, and campaign optimization

## Assessment Details
- **Assessment Type**: ${tierDescription}
${companyName ? `- **Company**: ${companyName}` : ''}
${contactName ? `- **Contact**: ${contactName}` : ''}

## Overall Scores (0-10 scale)
- **Overall Score**: ${scores.overall.toFixed(1)}/10
- **Demand**: ${scores.demand.toFixed(1)}/10
- **Revenue**: ${scores.revenue.toFixed(1)}/10
- **Engine**: ${scores.engine.toFixed(1)}/10
- **Admin**: ${scores.admin.toFixed(1)}/10
- **Marketing**: ${scores.marketing.toFixed(1)}/10

## Detailed Question Responses

`;

  // Add each pillar's questions and answers
  const pillars: DreamPillar[] = ['demand', 'revenue', 'engine', 'admin', 'marketing'];
  for (const pillar of pillars) {
    const pillarInfo = PILLAR_INFO[pillar];
    const pillarQAs = groupedQAs[pillar];

    if (pillarQAs.length > 0) {
      prompt += `### ${pillarInfo.name} (Score: ${scores[pillar].toFixed(1)}/10)\n`;
      prompt += `*${pillarInfo.description}*\n\n`;

      for (const qa of pillarQAs) {
        prompt += `**Q**: ${qa.question}\n`;
        prompt += `**A**: ${qa.answer}\n\n`;
      }
    }
  }

  prompt += `
---

## Your Task

Based on the assessment responses and scores above, create a **comprehensive AI implementation strategy** for this organization. Your analysis should be actionable, specific, and prioritized.

### Required Sections

1. **Executive Summary** (2-3 paragraphs)
   - Overall assessment of AI readiness
   - Key strengths identified
   - Critical gaps that need immediate attention
   - Expected ROI potential from AI implementation

2. **Pillar-by-Pillar Analysis** (for each of the 5 DREAM pillars)
   - Current state assessment based on their responses
   - Specific pain points identified from their answers
   - 3-5 concrete AI solutions they should implement
   - Quick wins (can implement in 1-2 weeks)
   - Medium-term initiatives (1-3 months)
   - Strategic investments (3-6 months)

3. **Prioritized Implementation Roadmap**
   - Phase 1: Foundation (Month 1) - Quick wins and essential setup
   - Phase 2: Acceleration (Months 2-3) - Core AI implementations
   - Phase 3: Optimization (Months 4-6) - Advanced AI and integration
   - For each phase, list specific tools/platforms recommended

4. **Tool & Platform Recommendations**
   - List specific AI tools for each area (e.g., "For lead scoring: Clay, Apollo.io, or HubSpot AI")
   - Include both enterprise and SMB options where applicable
   - Note integration considerations with common platforms

5. **Expected Outcomes & ROI**
   - Quantifiable improvements they can expect (e.g., "30-50% reduction in lead response time")
   - Time savings estimates per pillar
   - Revenue impact projections where applicable

6. **Next Steps**
   - Top 3 actions to take this week
   - Key stakeholders to involve
   - Recommended consultation topics for deeper exploration

### CRITICAL Formatting Requirements (You MUST follow these exactly)
- Use standard Markdown syntax ONLY
- Headers: Use ## for main sections, ### for subsections (e.g., "## Executive Summary")
- Bullet lists: Use hyphen followed by space "- " for all bullet points (NOT bullet characters like •)
- Numbered lists: Use "1. ", "2. ", etc.
- Bold: Use **double asterisks** for emphasis
- Add blank lines between sections and paragraphs for readability
- Each major section should start with a ## header on its own line
- Sub-items should be indented with 2 spaces before the hyphen

Example of correct formatting:
## Section Title

Paragraph text here.

### Subsection

- First bullet point
- Second bullet point
  - Nested bullet point
- Third bullet point

Generate the comprehensive implementation strategy now, following the exact markdown formatting above:`;

  return prompt;
}

/**
 * Generate AI-powered implementation strategy using Claude
 */
export async function generateAIStrategy(context: AssessmentContext): Promise<string> {
  const prompt = buildStrategyPrompt(context);

  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 8000,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    // Extract text content from the response
    const textContent = message.content.find(block => block.type === 'text');
    if (!textContent || textContent.type !== 'text') {
      throw new Error('No text content in AI response');
    }

    return textContent.text;
  } catch (error) {
    console.error('Error generating AI strategy:', error);
    throw new Error('Failed to generate AI strategy. Please try again later.');
  }
}

/**
 * Check if an AI strategy needs to be regenerated
 * (e.g., if responses have changed since last generation)
 */
export function shouldRegenerateStrategy(
  existingStrategy: string | null,
  generatedAt: Date | null
): boolean {
  // No existing strategy - definitely generate
  if (!existingStrategy || !generatedAt) {
    return true;
  }

  // Strategy older than 24 hours might benefit from regeneration
  // But we leave this decision to the user via a "Regenerate" button
  return false;
}
