'use client';

import { useState } from 'react';
import { Sparkles, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { QuizTier, DreamScores } from '@/types/assessment';
import TierSelector from '@/components/assessment/TierSelector';
import QuizWizard from '@/components/assessment/QuizWizard';
import ResultsDashboard from '@/components/assessment/ResultsDashboard';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

type AssessmentPhase = 'select' | 'quiz' | 'results';

export default function AssessmentPage() {
  const [phase, setPhase] = useState<AssessmentPhase>('select');
  const [selectedTier, setSelectedTier] = useState<QuizTier | null>(null);
  const [assessmentId, setAssessmentId] = useState<string | null>(null);
  const [scores, setScores] = useState<DreamScores | null>(null);

  const handleTierSelect = (tier: QuizTier) => {
    setSelectedTier(tier);
    setPhase('quiz');
  };

  const handleQuizComplete = (id: string, finalScores: DreamScores) => {
    setAssessmentId(id);
    setScores(finalScores);
    setPhase('results');
  };

  const handleBackToSelection = () => {
    setPhase('select');
    setSelectedTier(null);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        {phase === 'select' && (
          <section className="py-16 bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950">
            <div className="container px-4 mx-auto">
              <div className="max-w-3xl mx-auto text-center mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-sm font-medium rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                  <Sparkles className="w-4 h-4" />
                  Free AI Readiness Assessment
                </div>
                <h1 className="text-4xl md:text-5xl font-light text-zinc-900 mb-6 dark:text-white">
                  Discover Your{' '}
                  <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                    AI Automation Potential
                  </span>
                </h1>
                <p className="text-lg text-zinc-600 dark:text-zinc-400">
                  Take our comprehensive DREAM Framework assessment to uncover where AI automation
                  can transform your business across Demand, Revenue, Engine, Admin, and Marketing.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Main Content */}
        <section className="py-12">
          <div className="container px-4 mx-auto">
            {phase === 'select' && (
              <TierSelector onSelect={handleTierSelect} />
            )}

            {phase === 'quiz' && selectedTier && (
              <div className="max-w-4xl mx-auto">
                <QuizWizard
                  tier={selectedTier}
                  onComplete={handleQuizComplete}
                  onBack={handleBackToSelection}
                />
              </div>
            )}

            {phase === 'results' && assessmentId && scores && (
              <ResultsDashboard
                assessmentId={assessmentId}
                scores={scores}
                tier={selectedTier || 'mini'}
              />
            )}
          </div>
        </section>

        {/* Back Link (only on selection phase) */}
        {phase === 'select' && (
          <section className="py-8">
            <div className="container px-4 mx-auto text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-700 transition-colors dark:text-zinc-400 dark:hover:text-zinc-300"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
