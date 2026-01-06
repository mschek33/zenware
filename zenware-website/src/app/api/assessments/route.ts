import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { calculateScores } from '@/lib/scoring';
import type { QuizTier } from '@/types/assessment';

// Validation schema for assessment submission
const AssessmentSubmissionSchema = z.object({
  tier: z.enum(['mini', 'medium', 'indepth']),
  responses: z.record(z.string(), z.union([z.string(), z.number(), z.array(z.string())])),
  contact: z
    .object({
      name: z.string().optional(),
      email: z.string().email().optional().or(z.literal('')),
      company: z.string().optional(),
      phone: z.string().optional(),
    })
    .optional(),
});

// POST /api/assessments - Submit a completed assessment
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = AssessmentSubmissionSchema.parse(body);

    // Calculate scores from responses
    const scores = calculateScores(validated.responses, validated.tier as QuizTier);

    // Create the assessment record
    const assessment = await prisma.assessment.create({
      data: {
        tier: validated.tier,
        status: 'completed',
        responses: validated.responses,
        demandScore: scores.demand,
        revenueScore: scores.revenue,
        engineScore: scores.engine,
        adminScore: scores.admin,
        marketingScore: scores.marketing,
        overallScore: scores.overall,
        name: validated.contact?.name || null,
        email: validated.contact?.email || null,
        company: validated.contact?.company || null,
        phone: validated.contact?.phone || null,
        completedAt: new Date(),
      },
    });

    return NextResponse.json({
      id: assessment.id,
      scores: {
        demand: assessment.demandScore,
        revenue: assessment.revenueScore,
        engine: assessment.engineScore,
        admin: assessment.adminScore,
        marketing: assessment.marketingScore,
        overall: assessment.overallScore,
      },
      tier: assessment.tier,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Error submitting assessment:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to submit assessment', details: errorMessage },
      { status: 500 }
    );
  }
}
