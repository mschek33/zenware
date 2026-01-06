'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Download,
  Calendar,
  ArrowRight,
  Share2,
  Mail,
  CheckCircle,
  Loader2,
  ChevronDown,
  ChevronUp,
  ClipboardList,
  Sparkles,
  RefreshCw,
  AlertCircle,
} from 'lucide-react';
import { DreamScores, DreamPillar, PILLAR_INFO, AssessmentResponses, QuizTier } from '@/types/assessment';
import { getScoreRating, generateRecommendations, getQuestionsForTier } from '@/lib/scoring';
import DreamScoreChart from './DreamScoreChart';
import PillarScoreCard from './PillarScoreCard';
import ReactMarkdown from 'react-markdown';

interface ResultsDashboardProps {
  assessmentId: string;
  scores: DreamScores;
  tier: string;
  responses?: AssessmentResponses;
  initialStrategy?: string | null;
  initialStrategyGeneratedAt?: string | null;
}

export default function ResultsDashboard({
  assessmentId,
  scores,
  tier,
  responses = {},
  initialStrategy = null,
  initialStrategyGeneratedAt = null,
}: ResultsDashboardProps) {
  const [expandedPillar, setExpandedPillar] = useState<DreamPillar | null>(null);
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const [showResponses, setShowResponses] = useState(false);
  const [expandedResponsePillar, setExpandedResponsePillar] = useState<DreamPillar | null>(null);

  // AI Strategy state
  const [aiStrategy, setAiStrategy] = useState<string | null>(initialStrategy);
  const [strategyGeneratedAt, setStrategyGeneratedAt] = useState<string | null>(initialStrategyGeneratedAt);
  const [isGeneratingStrategy, setIsGeneratingStrategy] = useState(false);
  const [strategyError, setStrategyError] = useState<string | null>(null);
  const [showStrategy, setShowStrategy] = useState(!!initialStrategy);

  const fetchExistingStrategy = useCallback(async () => {
    try {
      const response = await fetch(`/api/assessments/${assessmentId}/strategy`);
      if (response.ok) {
        const data = await response.json();
        if (data.strategy) {
          setAiStrategy(data.strategy);
          setStrategyGeneratedAt(data.generatedAt);
        }
      }
    } catch (error) {
      console.error('Failed to fetch existing strategy:', error);
    }
  }, [assessmentId]);

  // Fetch existing strategy on mount if not provided
  useEffect(() => {
    if (!initialStrategy) {
      fetchExistingStrategy();
    }
  }, [initialStrategy, fetchExistingStrategy]);

  const generateStrategy = async () => {
    setIsGeneratingStrategy(true);
    setStrategyError(null);

    try {
      const response = await fetch(`/api/assessments/${assessmentId}/strategy`, {
        method: 'POST',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate strategy');
      }

      setAiStrategy(data.strategy);
      setStrategyGeneratedAt(data.generatedAt);
      setShowStrategy(true);
    } catch (error) {
      console.error('Failed to generate strategy:', error);
      setStrategyError(error instanceof Error ? error.message : 'Failed to generate strategy');
    } finally {
      setIsGeneratingStrategy(false);
    }
  };

  const recommendations = generateRecommendations(scores);
  const pillars: DreamPillar[] = ['demand', 'revenue', 'engine', 'admin', 'marketing'];

  // Get questions for this tier to display with responses
  const questions = getQuestionsForTier(tier as QuizTier);

  // Group questions by pillar
  const questionsByPillar = pillars.reduce((acc, pillar) => {
    acc[pillar] = questions.filter(q => q.pillar === pillar);
    return acc;
  }, {} as Record<DreamPillar, typeof questions>);

  // Find lowest scoring pillars for priority focus
  const priorityPillars = [...pillars]
    .sort((a, b) => scores[a] - scores[b])
    .slice(0, 2);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmittingEmail(true);
    try {
      await fetch(`/api/assessments/${assessmentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, pdfRequested: true }),
      });
      setEmailSubmitted(true);
    } catch (error) {
      console.error('Failed to save email:', error);
    } finally {
      setIsSubmittingEmail(false);
    }
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/assessment/results/${assessmentId}`;
    if (navigator.share) {
      await navigator.share({
        title: 'My DREAM AI Audit Results',
        text: `I scored ${scores.overall}/10 on the Zenware AI Audit. Check out my results!`,
        url,
      });
    } else {
      await navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  // Helper to get the display value for a response
  const getResponseDisplay = (questionId: string, response: string | number | string[] | undefined) => {
    if (response === undefined || response === null) return 'Not answered';

    const question = questions.find(q => q.id === questionId);
    if (!question) return String(response);

    if (question.type === 'scale') {
      return `${response}/10`;
    }

    if (question.type === 'single-choice' && question.options) {
      const option = question.options.find(o => o.value === response);
      return option?.label || String(response);
    }

    if (question.type === 'multi-choice' && Array.isArray(response)) {
      return response.map(v => {
        const option = question.options?.find(o => o.value === v);
        return option?.label || v;
      }).join(', ');
    }

    return String(response);
  };

  const hasResponses = Object.keys(responses).length > 0;

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-4 dark:bg-green-900/30 dark:text-green-400">
          <CheckCircle className="w-4 h-4" />
          Assessment Complete
        </div>
        <h1 className="text-4xl font-light text-zinc-900 mb-4 dark:text-white">
          Your DREAM Score
        </h1>
        <div className="flex items-center justify-center gap-4">
          <span className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
            {scores.overall.toFixed(1)}
          </span>
          <span className="text-2xl text-zinc-400">/10</span>
        </div>
        <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
          {getScoreRating(scores.overall)} - Based on your {tier} assessment
        </p>
      </div>

      {/* Radar Chart */}
      <div className="bg-white rounded-3xl border border-zinc-200 p-8 shadow-sm dark:bg-zinc-900/50 dark:border-zinc-700">
        <h2 className="text-xl font-semibold text-zinc-900 mb-6 text-center dark:text-white">
          Your DREAM Profile
        </h2>
        <DreamScoreChart scores={scores} />
      </div>

      {/* Priority Focus */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl border border-purple-100 p-8 dark:from-purple-900/20 dark:to-pink-900/20 dark:border-purple-800">
        <h2 className="text-xl font-semibold text-zinc-900 mb-4 dark:text-white">
          Priority Focus Areas
        </h2>
        <p className="text-zinc-600 mb-6 dark:text-zinc-400">
          Based on your assessment, here are the areas with the highest potential for AI-driven improvement:
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {priorityPillars.map((pillar) => (
            <div
              key={pillar}
              className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-zinc-200 dark:bg-zinc-900/50 dark:border-zinc-700"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center dark:bg-purple-900/30">
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {scores[pillar].toFixed(1)}
                </span>
              </div>
              <div>
                <h3 className="font-medium text-zinc-900 dark:text-white">
                  {PILLAR_INFO[pillar].name}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {recommendations[pillar][0]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Pillar Scores */}
      <div>
        <h2 className="text-xl font-semibold text-zinc-900 mb-6 dark:text-white">
          Detailed Breakdown
        </h2>
        <div className="space-y-4">
          {pillars.map((pillar) => (
            <PillarScoreCard
              key={pillar}
              pillar={pillar}
              score={scores[pillar]}
              recommendations={recommendations[pillar]}
              expanded={expandedPillar === pillar}
              onToggle={() =>
                setExpandedPillar(expandedPillar === pillar ? null : pillar)
              }
            />
          ))}
        </div>
      </div>

      {/* AI Implementation Strategy Section */}
      <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm dark:bg-zinc-900/50 dark:border-zinc-700 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-zinc-200 dark:border-zinc-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
                  AI Implementation Strategy
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Personalized roadmap powered by Claude AI
                </p>
              </div>
            </div>
            {aiStrategy && (
              <button
                onClick={() => setShowStrategy(!showStrategy)}
                className="p-2 hover:bg-zinc-100 rounded-lg transition-colors dark:hover:bg-zinc-800"
              >
                {showStrategy ? (
                  <ChevronUp className="w-5 h-5 text-zinc-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-zinc-400" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {!aiStrategy && !isGeneratingStrategy && (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center mx-auto mb-4 dark:from-purple-900/30 dark:to-pink-900/30">
                <Sparkles className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-2 dark:text-white">
                Get Your Personalized Implementation Strategy
              </h3>
              <p className="text-zinc-600 mb-6 max-w-md mx-auto dark:text-zinc-400">
                Our AI will analyze your responses and create a comprehensive implementation roadmap with prioritized actions, tool recommendations, and ROI projections.
              </p>
              <button
                onClick={generateStrategy}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg shadow-purple-500/25"
              >
                <Sparkles className="w-5 h-5" />
                Generate AI Strategy
              </button>
              {strategyError && (
                <div className="mt-4 flex items-center justify-center gap-2 text-red-600 dark:text-red-400">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{strategyError}</span>
                </div>
              )}
            </div>
          )}

          {isGeneratingStrategy && (
            <div className="text-center py-12">
              <div className="relative w-16 h-16 mx-auto mb-4">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 animate-pulse" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-white animate-spin" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-2 dark:text-white">
                Analyzing Your Assessment...
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Claude AI is crafting your personalized implementation strategy.
              </p>
              <p className="text-sm text-zinc-500 mt-2 dark:text-zinc-500">
                This typically takes 15-30 seconds
              </p>
            </div>
          )}

          {aiStrategy && showStrategy && (
            <div>
              {/* Meta info and regenerate button */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-200 dark:border-zinc-700">
                <div className="text-sm text-zinc-500 dark:text-zinc-400">
                  {strategyGeneratedAt && (
                    <span>
                      Generated on {new Date(strategyGeneratedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </span>
                  )}
                </div>
                <button
                  onClick={generateStrategy}
                  disabled={isGeneratingStrategy}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors disabled:opacity-50 dark:text-purple-400 dark:hover:bg-purple-900/30"
                >
                  <RefreshCw className={`w-4 h-4 ${isGeneratingStrategy ? 'animate-spin' : ''}`} />
                  Regenerate
                </button>
              </div>

              {/* Strategy content with markdown rendering */}
              <div className="prose prose-zinc max-w-none dark:prose-invert prose-headings:font-semibold prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3 prose-p:text-zinc-600 prose-p:leading-relaxed dark:prose-p:text-zinc-400 prose-li:text-zinc-600 dark:prose-li:text-zinc-400 prose-strong:text-zinc-900 dark:prose-strong:text-white prose-ul:space-y-1 prose-ol:space-y-1">
                <ReactMarkdown>{aiStrategy}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Your Responses Section */}
      {hasResponses && (
        <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm dark:bg-zinc-900/50 dark:border-zinc-700 overflow-hidden">
          <button
            onClick={() => setShowResponses(!showResponses)}
            className="w-full flex items-center justify-between p-6 hover:bg-zinc-50 transition-colors dark:hover:bg-zinc-800/50"
          >
            <div className="flex items-center gap-3">
              <ClipboardList className="w-6 h-6 text-purple-500" />
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
                Your Responses
              </h2>
              <span className="px-2 py-1 bg-zinc-100 text-zinc-600 text-sm rounded-full dark:bg-zinc-800 dark:text-zinc-400">
                {Object.keys(responses).length} answers
              </span>
            </div>
            {showResponses ? (
              <ChevronUp className="w-5 h-5 text-zinc-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-zinc-400" />
            )}
          </button>

          {showResponses && (
            <div className="border-t border-zinc-200 dark:border-zinc-700">
              {pillars.map((pillar) => {
                const pillarQuestions = questionsByPillar[pillar];
                const answeredQuestions = pillarQuestions.filter(q => responses[q.id] !== undefined);

                if (answeredQuestions.length === 0) return null;

                const isExpanded = expandedResponsePillar === pillar;

                return (
                  <div key={pillar} className="border-b border-zinc-100 last:border-b-0 dark:border-zinc-800">
                    <button
                      onClick={() => setExpandedResponsePillar(isExpanded ? null : pillar)}
                      className="w-full flex items-center justify-between px-6 py-4 hover:bg-zinc-50 transition-colors dark:hover:bg-zinc-800/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${
                          pillar === 'demand' ? 'from-blue-500 to-blue-600' :
                          pillar === 'revenue' ? 'from-green-500 to-green-600' :
                          pillar === 'engine' ? 'from-yellow-500 to-yellow-600' :
                          pillar === 'admin' ? 'from-red-500 to-red-600' :
                          'from-purple-500 to-purple-600'
                        }`} />
                        <span className="font-medium text-zinc-900 dark:text-white">
                          {PILLAR_INFO[pillar].name}
                        </span>
                        <span className="text-sm text-zinc-500 dark:text-zinc-400">
                          ({answeredQuestions.length} questions)
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                          {scores[pillar].toFixed(1)}/10
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-zinc-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-zinc-400" />
                        )}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-6 pb-4 space-y-4">
                        {answeredQuestions.map((question, index) => (
                          <div
                            key={question.id}
                            className="p-4 bg-zinc-50 rounded-xl dark:bg-zinc-800/50"
                          >
                            <div className="flex items-start gap-3">
                              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 text-purple-600 text-xs font-medium flex items-center justify-center dark:bg-purple-900/30 dark:text-purple-400">
                                {index + 1}
                              </span>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-zinc-900 mb-2 dark:text-white">
                                  {question.question}
                                </p>
                                <p className="text-sm text-purple-600 font-medium dark:text-purple-400">
                                  {getResponseDisplay(question.id, responses[question.id])}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Email Capture */}
      {!emailSubmitted ? (
        <div className="bg-white rounded-3xl border border-zinc-200 p-8 shadow-sm dark:bg-zinc-900/50 dark:border-zinc-700">
          <div className="max-w-xl mx-auto text-center">
            <Mail className="w-12 h-12 mx-auto text-purple-500 mb-4" />
            <h2 className="text-xl font-semibold text-zinc-900 mb-2 dark:text-white">
              Get Your Detailed Report
            </h2>
            <p className="text-zinc-600 mb-6 dark:text-zinc-400">
              Enter your email to receive a comprehensive PDF report with personalized recommendations.
            </p>
            <form onSubmit={handleEmailSubmit} className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-zinc-800 dark:border-zinc-600 dark:text-white"
                required
              />
              <button
                type="submit"
                disabled={isSubmittingEmail}
                className="px-6 py-3 bg-purple-500 text-white rounded-xl font-medium hover:bg-purple-600 transition-colors disabled:opacity-50"
              >
                {isSubmittingEmail ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Download className="w-5 h-5" />
                )}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="bg-green-50 rounded-3xl border border-green-200 p-8 text-center dark:bg-green-900/20 dark:border-green-800">
          <CheckCircle className="w-12 h-12 mx-auto text-green-500 mb-4" />
          <h2 className="text-xl font-semibold text-zinc-900 mb-2 dark:text-white">
            Report Requested!
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            We&apos;ll send your detailed PDF report to {email} shortly.
          </p>
        </div>
      )}

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-3xl p-8 md:p-12 text-center dark:from-zinc-800 dark:to-zinc-900">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
          Ready to Transform Your Business with AI?
        </h2>
        <p className="text-zinc-300 mb-8 max-w-2xl mx-auto">
          Schedule a free consultation with our AI automation experts to discuss your results and create a customized implementation roadmap.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/contact">
            <button className="flex items-center gap-2 px-8 py-4 bg-white text-zinc-900 rounded-full font-medium hover:bg-zinc-100 transition-colors">
              <Calendar className="w-5 h-5" />
              Schedule Consultation
            </button>
          </Link>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-6 py-4 text-white border border-white/20 rounded-full hover:bg-white/10 transition-colors"
          >
            <Share2 className="w-5 h-5" />
            Share Results
          </button>
        </div>
      </div>

      {/* Retake option */}
      <div className="text-center">
        <Link
          href="/assessment"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-700 transition-colors dark:text-zinc-400 dark:hover:text-zinc-300"
        >
          <ArrowRight className="w-4 h-4" />
          Take Another Assessment
        </Link>
      </div>
    </div>
  );
}
