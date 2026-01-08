import { NextResponse } from 'next/server';
import { auth } from '../../../../../auth';
import { prisma } from '@/lib/prisma';

// GET /api/affiliate/stats - Get affiliate's stats
export async function GET() {
  try {
    const session = await auth();
    if (!session || session.user?.role !== 'affiliate') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const affiliateId = session.user?.id;

    // Get affiliate data
    const affiliate = await prisma.affiliate.findUnique({
      where: { id: affiliateId },
      select: {
        totalReferrals: true,
        referralCode: true,
        name: true,
      },
    });

    if (!affiliate) {
      return NextResponse.json({ error: 'Affiliate not found' }, { status: 404 });
    }

    // Get assessment stats
    const assessments = await prisma.assessment.findMany({
      where: { affiliateId },
      select: {
        status: true,
        overallScore: true,
        aiStrategy: true,
        createdAt: true,
      },
    });

    const completed = assessments.filter(a => a.status === 'completed');
    const withAiStrategy = assessments.filter(a => a.aiStrategy);

    // Calculate this month's referrals
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const thisMonthReferrals = assessments.filter(
      a => new Date(a.createdAt) >= startOfMonth
    ).length;

    // Calculate average score
    const avgScore = completed.length > 0
      ? completed.reduce((sum, a) => sum + (a.overallScore || 0), 0) / completed.length
      : 0;

    return NextResponse.json({
      totalReferrals: affiliate.totalReferrals,
      thisMonthReferrals,
      completedAssessments: completed.length,
      aiStrategiesGenerated: withAiStrategy.length,
      averageScore: avgScore,
      referralCode: affiliate.referralCode,
    });
  } catch (error) {
    console.error('Error fetching affiliate stats:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
