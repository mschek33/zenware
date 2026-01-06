import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import ResultsDashboard from '@/components/assessment/ResultsDashboard';
import type { DreamScores, AssessmentResponses } from '@/types/assessment';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ResultsPage({ params }: PageProps) {
  const { id } = await params;

  const assessment = await prisma.assessment.findUnique({
    where: { id },
  });

  if (!assessment) {
    notFound();
  }

  const scores: DreamScores = {
    demand: assessment.demandScore ?? 0,
    revenue: assessment.revenueScore ?? 0,
    engine: assessment.engineScore ?? 0,
    admin: assessment.adminScore ?? 0,
    marketing: assessment.marketingScore ?? 0,
    overall: assessment.overallScore ?? 0,
  };

  // Parse responses from JSON
  const responses = (assessment.responses as AssessmentResponses) || {};

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Header />
      <main className="pt-20 py-12">
        <div className="container px-4 mx-auto">
          <ResultsDashboard
            assessmentId={id}
            scores={scores}
            tier={assessment.tier}
            responses={responses}
            initialStrategy={assessment.aiStrategy}
            initialStrategyGeneratedAt={assessment.aiStrategyGeneratedAt?.toISOString() ?? null}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;

  const assessment = await prisma.assessment.findUnique({
    where: { id },
    select: { overallScore: true },
  });

  return {
    title: `DREAM AI Audit Results${assessment ? ` - Score: ${assessment.overallScore}/10` : ''}`,
    description: 'View your personalized AI automation potential assessment results from Zenware.',
  };
}
