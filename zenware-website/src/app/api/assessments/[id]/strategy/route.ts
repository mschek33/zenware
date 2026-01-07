import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateAIStrategy } from '@/lib/ai-strategy';
import type { DreamScores, AssessmentResponses, QuizTier } from '@/types/assessment';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/assessments/[id]/strategy - Get existing AI strategy
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    const assessment = await prisma.assessment.findUnique({
      where: { id },
      select: {
        id: true,
        aiStrategy: true,
        aiStrategyGeneratedAt: true,
        status: true,
      },
    });

    if (!assessment) {
      return NextResponse.json({ error: 'Assessment not found' }, { status: 404 });
    }

    return NextResponse.json({
      id: assessment.id,
      hasStrategy: !!assessment.aiStrategy,
      strategy: assessment.aiStrategy,
      generatedAt: assessment.aiStrategyGeneratedAt,
    });
  } catch (error) {
    console.error('Error fetching AI strategy:', error);
    return NextResponse.json({ error: 'Failed to fetch AI strategy' }, { status: 500 });
  }
}

// POST /api/assessments/[id]/strategy - Generate new AI strategy
export async function POST(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    // Fetch the full assessment
    const assessment = await prisma.assessment.findUnique({
      where: { id },
    });

    if (!assessment) {
      return NextResponse.json({ error: 'Assessment not found' }, { status: 404 });
    }

    if (assessment.status !== 'completed') {
      return NextResponse.json(
        { error: 'Cannot generate strategy for incomplete assessment' },
        { status: 400 }
      );
    }

    // Build scores object
    const scores: DreamScores = {
      demand: assessment.demandScore ?? 0,
      revenue: assessment.revenueScore ?? 0,
      engine: assessment.engineScore ?? 0,
      admin: assessment.adminScore ?? 0,
      marketing: assessment.marketingScore ?? 0,
      overall: assessment.overallScore ?? 0,
    };

    // Get responses
    const responses = (assessment.responses as AssessmentResponses) || {};

    // Generate the AI strategy
    const strategy = await generateAIStrategy({
      tier: assessment.tier as QuizTier,
      scores,
      responses,
      companyName: assessment.company || undefined,
      contactName: assessment.name || undefined,
      companySize: assessment.companySize || undefined,
      industry: assessment.industry || undefined,
      yearlyRevenue: assessment.yearlyRevenue || undefined,
      companyDescription: assessment.companyDescription || undefined,
      customHelpNeeded: assessment.customHelpNeeded || undefined,
    });

    // Save the strategy to the database
    const updatedAssessment = await prisma.assessment.update({
      where: { id },
      data: {
        aiStrategy: strategy,
        aiStrategyGeneratedAt: new Date(),
      },
    });

    return NextResponse.json({
      id: updatedAssessment.id,
      strategy: strategy,
      generatedAt: updatedAssessment.aiStrategyGeneratedAt,
    });
  } catch (error) {
    console.error('Error generating AI strategy:', error);

    // Check for specific error types
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return NextResponse.json(
          { error: 'AI service configuration error. Please contact support.' },
          { status: 503 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to generate AI strategy. Please try again.' },
      { status: 500 }
    );
  }
}
