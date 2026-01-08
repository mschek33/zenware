import { NextResponse } from 'next/server';
import { auth } from '../../../../../auth';
import { prisma } from '@/lib/prisma';

// GET /api/affiliate/assessments - Get affiliate's referred assessments
export async function GET() {
  try {
    const session = await auth();
    if (!session || session.user?.role !== 'affiliate') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const affiliateId = session.user?.id;

    const assessments = await prisma.assessment.findMany({
      where: { affiliateId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        tier: true,
        status: true,
        name: true,
        email: true,
        company: true,
        demandScore: true,
        revenueScore: true,
        engineScore: true,
        adminScore: true,
        marketingScore: true,
        overallScore: true,
        pdfRequested: true,
        consultationRequested: true,
        aiStrategy: true,
        aiStrategyGeneratedAt: true,
        completedAt: true,
        createdAt: true,
        referralCode: true,
      },
    });

    return NextResponse.json(assessments);
  } catch (error) {
    console.error('Error fetching affiliate assessments:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
