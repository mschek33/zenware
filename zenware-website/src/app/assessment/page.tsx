'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Sparkles, ArrowLeft, Mail, User, Building, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { QuizTier, DreamScores } from '@/types/assessment';
import TierSelector from '@/components/assessment/TierSelector';
import QuizWizard from '@/components/assessment/QuizWizard';
import ResultsDashboard from '@/components/assessment/ResultsDashboard';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

type AssessmentPhase = 'select' | 'capture' | 'quiz' | 'results';

interface LeadInfo {
  email: string;
  name: string;
  company: string;
}

function AssessmentContent() {
  const searchParams = useSearchParams();
  const [phase, setPhase] = useState<AssessmentPhase>('select');
  const [selectedTier, setSelectedTier] = useState<QuizTier | null>(null);
  const [assessmentId, setAssessmentId] = useState<string | null>(null);
  const [scores, setScores] = useState<DreamScores | null>(null);
  const [leadInfo, setLeadInfo] = useState<LeadInfo>({ email: '', name: '', company: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Read tier from URL on mount
  useEffect(() => {
    const tierParam = searchParams.get('tier');
    if (tierParam && ['mini', 'medium', 'indepth'].includes(tierParam)) {
      setSelectedTier(tierParam as QuizTier);
      setPhase('capture'); // Go directly to email capture
    }
  }, [searchParams]);

  const handleTierSelect = (tier: QuizTier) => {
    setSelectedTier(tier);
    setPhase('capture'); // Go to email capture instead of quiz
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadInfo.email) return;

    setIsSubmitting(true);
    // Small delay for UX
    await new Promise(resolve => setTimeout(resolve, 300));
    setIsSubmitting(false);
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

  const handleBackToCapture = () => {
    setPhase('capture');
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

            {phase === 'capture' && selectedTier && (
              <div className="max-w-md mx-auto">
                <div className="bg-white rounded-3xl border border-zinc-200 p-8 shadow-sm dark:bg-zinc-900/50 dark:border-zinc-700">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center mx-auto mb-4 dark:from-purple-900/30 dark:to-pink-900/30">
                      <Mail className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h2 className="text-2xl font-semibold text-zinc-900 mb-2 dark:text-white">
                      Before We Begin
                    </h2>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      Enter your details to save your progress and receive your personalized AI strategy report.
                    </p>
                  </div>

                  <form onSubmit={handleLeadSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-1.5 dark:text-zinc-300">
                        Work Email <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                        <input
                          type="email"
                          id="email"
                          required
                          value={leadInfo.email}
                          onChange={(e) => setLeadInfo({ ...leadInfo, email: e.target.value })}
                          placeholder="you@company.com"
                          className="w-full pl-11 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-zinc-800 dark:border-zinc-600 dark:text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-zinc-700 mb-1.5 dark:text-zinc-300">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                        <input
                          type="text"
                          id="name"
                          value={leadInfo.name}
                          onChange={(e) => setLeadInfo({ ...leadInfo, name: e.target.value })}
                          placeholder="John Smith"
                          className="w-full pl-11 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-zinc-800 dark:border-zinc-600 dark:text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-zinc-700 mb-1.5 dark:text-zinc-300">
                        Company
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                        <input
                          type="text"
                          id="company"
                          value={leadInfo.company}
                          onChange={(e) => setLeadInfo({ ...leadInfo, company: e.target.value })}
                          placeholder="Acme Inc."
                          className="w-full pl-11 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-zinc-800 dark:border-zinc-600 dark:text-white"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || !leadInfo.email}
                      className="w-full py-3.5 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:from-purple-500 hover:to-pink-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Starting...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          Start Assessment
                        </>
                      )}
                    </button>
                  </form>

                  <button
                    onClick={handleBackToSelection}
                    className="mt-6 w-full flex items-center justify-center gap-2 text-sm text-zinc-500 hover:text-zinc-700 transition-colors dark:text-zinc-400 dark:hover:text-zinc-300"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Choose a different assessment
                  </button>
                </div>
              </div>
            )}

            {phase === 'quiz' && selectedTier && (
              <div className="max-w-4xl mx-auto">
                <QuizWizard
                  tier={selectedTier}
                  onComplete={handleQuizComplete}
                  onBack={handleBackToCapture}
                  leadInfo={leadInfo}
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

// Loading fallback for Suspense
function AssessmentLoading() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Header />
      <main className="pt-20">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-purple-500 mx-auto mb-4" />
            <p className="text-zinc-600 dark:text-zinc-400">Loading assessment...</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function AssessmentPage() {
  return (
    <Suspense fallback={<AssessmentLoading />}>
      <AssessmentContent />
    </Suspense>
  );
}
