import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateRecommendations } from '@/lib/scoring';
import { sendAssessmentResultsEmail } from '@/lib/email';
import type { DreamScores } from '@/types/assessment';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/assessments/[id] - Get assessment results
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    const assessment = await prisma.assessment.findUnique({
      where: { id },
    });

    if (!assessment) {
      return NextResponse.json({ error: 'Assessment not found' }, { status: 404 });
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

    // Generate recommendations based on scores
    const recommendations = generateRecommendations(scores);

    return NextResponse.json({
      id: assessment.id,
      tier: assessment.tier,
      status: assessment.status,
      scores,
      recommendations,
      responses: assessment.responses,
      contact: {
        name: assessment.name,
        email: assessment.email,
        company: assessment.company,
      },
      completedAt: assessment.completedAt,
      createdAt: assessment.createdAt,
    });
  } catch (error) {
    console.error('Error fetching assessment:', error);
    return NextResponse.json({ error: 'Failed to fetch assessment' }, { status: 500 });
  }
}

// PATCH /api/assessments/[id] - Update assessment (e.g., add contact info, request PDF)
export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updateData: Record<string, unknown> = {};

    // Allow updating contact info
    if (body.name !== undefined) updateData.name = body.name;
    if (body.email !== undefined) updateData.email = body.email;
    if (body.company !== undefined) updateData.company = body.company;
    if (body.phone !== undefined) updateData.phone = body.phone;

    // Allow setting flags
    if (body.pdfRequested !== undefined) updateData.pdfRequested = body.pdfRequested;
    if (body.consultationRequested !== undefined)
      updateData.consultationRequested = body.consultationRequested;

    const assessment = await prisma.assessment.update({
      where: { id },
      data: updateData,
    });

    // If PDF/email is requested and we have an email address, send the results
    if (body.pdfRequested && assessment.email) {
      const scores = {
        demand: assessment.demandScore ?? 0,
        revenue: assessment.revenueScore ?? 0,
        engine: assessment.engineScore ?? 0,
        admin: assessment.adminScore ?? 0,
        marketing: assessment.marketingScore ?? 0,
        overall: assessment.overallScore ?? 0,
      };

      const emailSent = await sendAssessmentResultsEmail(
        assessment.email,
        assessment.name,
        assessment.id,
        assessment.tier,
        scores
      );

      return NextResponse.json({
        id: assessment.id,
        message: 'Assessment updated successfully',
        emailSent,
      });
    }

    return NextResponse.json({
      id: assessment.id,
      message: 'Assessment updated successfully',
    });
  } catch (error) {
    console.error('Error updating assessment:', error);
    return NextResponse.json({ error: 'Failed to update assessment' }, { status: 500 });
  }
}
