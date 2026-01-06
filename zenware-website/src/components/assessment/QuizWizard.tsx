'use client';

import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import {
  QuizTier,
  DreamPillar,
  AssessmentResponses,
  DreamScores,
  TIER_CONFIGS,
} from '@/types/assessment';
import { getQuestionsForTier, calculateScores } from '@/lib/scoring';
import QuizProgress from './QuizProgress';
import QuestionCard from './QuestionCard';

interface LeadInfo {
  email: string;
  name: string;
  company: string;
}

interface QuizWizardProps {
  tier: QuizTier;
  onComplete: (assessmentId: string, scores: DreamScores) => void;
  onBack: () => void;
  leadInfo?: LeadInfo;
}

const STORAGE_KEY = 'zenware_assessment_progress';

interface StoredProgress {
  tier: QuizTier;
  responses: AssessmentResponses;
  currentIndex: number;
  timestamp: number;
}

export default function QuizWizard({ tier, onComplete, onBack, leadInfo }: QuizWizardProps) {
  const questions = getQuestionsForTier(tier);
  const tierConfig = TIER_CONFIGS.find((t) => t.tier === tier)!;

  const [responses, setResponses] = useState<AssessmentResponses>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentQuestion = questions[currentQuestionIndex];
  const currentPillar = currentQuestion?.pillar as DreamPillar;

  // Load saved progress from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const progress: StoredProgress = JSON.parse(saved);
        // Only restore if same tier and less than 24 hours old
        const hoursSinceSave = (Date.now() - progress.timestamp) / (1000 * 60 * 60);
        if (progress.tier === tier && hoursSinceSave < 24) {
          setResponses(progress.responses);
          setCurrentQuestionIndex(progress.currentIndex);
        }
      }
    } catch {
      // Ignore localStorage errors
    }
  }, [tier]);

  // Save progress to localStorage
  const saveProgress = useCallback(() => {
    try {
      const progress: StoredProgress = {
        tier,
        responses,
        currentIndex: currentQuestionIndex,
        timestamp: Date.now(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore localStorage errors
    }
  }, [tier, responses, currentQuestionIndex]);

  // Auto-save on response changes
  useEffect(() => {
    saveProgress();
  }, [saveProgress]);

  const handleResponseChange = (value: string | number | string[]) => {
    setResponses((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  const canGoNext = () => {
    const response = responses[currentQuestion.id];
    if (response === undefined || response === null) return false;
    if (Array.isArray(response) && response.length === 0) return false;
    if (typeof response === 'string' && response.trim() === '') return false;
    return true;
  };

  const goToNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const goToPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Calculate scores
      const scores = calculateScores(responses, tier);

      // Submit to API with lead info
      const res = await fetch('/api/assessments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier,
          responses,
          contact: leadInfo ? {
            email: leadInfo.email || undefined,
            name: leadInfo.name || undefined,
            company: leadInfo.company || undefined,
          } : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.details || data.error || 'Failed to submit assessment');
      }

      // Clear saved progress
      localStorage.removeItem(STORAGE_KEY);

      // Notify parent
      onComplete(data.id, scores);
    } catch (err) {
      console.error('Submit error:', err);
      setError('Failed to submit assessment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <QuizProgress
          currentPillar={currentPillar}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          questionsPerPillar={tierConfig.questionsPerPillar}
        />
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl border border-zinc-200 p-8 shadow-sm dark:bg-zinc-900/50 dark:border-zinc-700">
        <QuestionCard
          question={currentQuestion}
          value={responses[currentQuestion.id]}
          onChange={handleResponseChange}
        />
      </div>

      {/* Error message */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={currentQuestionIndex === 0 ? onBack : goToPrevious}
          className="flex items-center gap-2 px-6 py-3 text-zinc-600 hover:text-zinc-900 transition-colors dark:text-zinc-400 dark:hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          {currentQuestionIndex === 0 ? 'Back to Selection' : 'Previous'}
        </button>

        {isLastQuestion ? (
          <button
            onClick={handleSubmit}
            disabled={!canGoNext() || isSubmitting}
            className={`
              flex items-center gap-2 px-8 py-4 rounded-full font-medium
              transition-all duration-300
              ${
                canGoNext() && !isSubmitting
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/25'
                  : 'bg-zinc-200 text-zinc-500 cursor-not-allowed dark:bg-zinc-700 dark:text-zinc-400'
              }
            `}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                View My Results
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        ) : (
          <button
            onClick={goToNext}
            disabled={!canGoNext()}
            className={`
              flex items-center gap-2 px-8 py-4 rounded-full font-medium
              transition-all duration-300
              ${
                canGoNext()
                  ? 'bg-zinc-900 text-white hover:bg-black dark:bg-white dark:text-black dark:hover:bg-zinc-200'
                  : 'bg-zinc-200 text-zinc-500 cursor-not-allowed dark:bg-zinc-700 dark:text-zinc-400'
              }
            `}
          >
            Next Question
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Skip option */}
      {!isLastQuestion && (
        <div className="mt-4 text-center">
          <button
            onClick={goToNext}
            className="text-sm text-zinc-500 hover:text-zinc-700 transition-colors dark:text-zinc-400 dark:hover:text-zinc-300"
          >
            Skip this question
          </button>
        </div>
      )}
    </div>
  );
}
