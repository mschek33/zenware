'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import AffiliateLayout from '@/components/affiliate/AffiliateLayout'
import {
  Search,
  Mail,
  Building,
  Calendar,
  Download,
  Eye,
  ClipboardCheck,
  TrendingUp,
  Sparkles,
  X,
  FileText,
  MessageSquare
} from 'lucide-react'

interface Assessment {
  id: string
  tier: string
  status: string
  name: string | null
  email: string | null
  company: string | null
  demandScore: number | null
  revenueScore: number | null
  engineScore: number | null
  adminScore: number | null
  marketingScore: number | null
  overallScore: number | null
  pdfRequested: boolean
  consultationRequested: boolean
  aiStrategy: string | null
  aiStrategyGeneratedAt: string | null
  completedAt: string | null
  createdAt: string
  referralCode: string | null
}

export default function AffiliateReferrals() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [assessments, setAssessments] = useState<Assessment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterTier, setFilterTier] = useState<string>('all')
  const [viewingStrategy, setViewingStrategy] = useState<Assessment | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/affiliate/login')
      return
    }

    if (status === 'authenticated') {
      fetchAssessments()
    }
  }, [status, router])

  const fetchAssessments = async () => {
    try {
      setIsLoading(true)
      const res = await fetch('/api/affiliate/assessments')
      if (res.ok) {
        setAssessments(await res.json())
      }
    } catch (error) {
      console.error('Failed to fetch assessments:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const exportAssessments = () => {
    const csvContent = [
      ['ID', 'Name', 'Email', 'Company', 'Tier', 'Overall', 'Demand', 'Revenue', 'Engine', 'Admin', 'Marketing', 'PDF Requested', 'Consultation Requested', 'Completed', 'Created'],
      ...filteredAssessments.map(a => [
        a.id,
        a.name || '',
        a.email || '',
        a.company || '',
        a.tier,
        a.overallScore?.toFixed(1) || '',
        a.demandScore?.toFixed(1) || '',
        a.revenueScore?.toFixed(1) || '',
        a.engineScore?.toFixed(1) || '',
        a.adminScore?.toFixed(1) || '',
        a.marketingScore?.toFixed(1) || '',
        a.pdfRequested ? 'Yes' : 'No',
        a.consultationRequested ? 'Yes' : 'No',
        a.completedAt ? new Date(a.completedAt).toLocaleDateString() : '',
        new Date(a.createdAt).toLocaleDateString()
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `my-referrals-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const filteredAssessments = assessments.filter(assessment => {
    const matchesSearch =
      (assessment.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (assessment.email?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (assessment.company?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      assessment.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTier = filterTier === 'all' || assessment.tier === filterTier
    return matchesSearch && matchesTier
  })

  const getScoreColor = (score: number | null) => {
    if (score === null) return 'text-zinc-400'
    if (score >= 8) return 'text-green-600'
    if (score >= 6) return 'text-yellow-600'
    if (score >= 4) return 'text-orange-600'
    return 'text-red-600'
  }

  const getTierBadgeClass = (tier: string) => {
    switch (tier) {
      case 'mini':
        return 'bg-blue-100 text-blue-700'
      case 'medium':
        return 'bg-purple-100 text-purple-700'
      case 'indepth':
        return 'bg-pink-100 text-pink-700'
      default:
        return 'bg-zinc-100 text-zinc-700'
    }
  }

  if (status === 'loading' || status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const completedAssessments = assessments.filter(a => a.status === 'completed')
  const avgScore = completedAssessments.length > 0
    ? completedAssessments.reduce((sum, a) => sum + (a.overallScore || 0), 0) / completedAssessments.length
    : 0

  return (
    <AffiliateLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-zinc-900">My Referrals</h2>
            <p className="text-zinc-500 mt-1">View all assessments from your referrals</p>
          </div>
          <button
            onClick={exportAssessments}
            disabled={filteredAssessments.length === 0}
            className="mt-4 sm:mt-0 flex items-center px-4 py-2.5 bg-zinc-900 text-white rounded-xl font-medium hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-green-100">
                <ClipboardCheck className="h-5 w-5 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-zinc-500">Total Referrals</p>
                <p className="text-2xl font-semibold text-zinc-900">{assessments.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-blue-100">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-zinc-500">Avg. Score</p>
                <p className="text-2xl font-semibold text-zinc-900">{avgScore.toFixed(1)}/10</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100">
                <Sparkles className="h-5 w-5 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-zinc-500">AI Strategies</p>
                <p className="text-2xl font-semibold text-zinc-900">
                  {assessments.filter(a => a.aiStrategy).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-pink-100">
                <MessageSquare className="h-5 w-5 text-pink-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-zinc-500">Consultations</p>
                <p className="text-2xl font-semibold text-zinc-900">
                  {assessments.filter(a => a.consultationRequested).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-4 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search by name, email, company, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={filterTier}
                onChange={(e) => setFilterTier(e.target.value)}
                className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              >
                <option value="all">All Tiers</option>
                <option value="mini">Mini</option>
                <option value="medium">Medium</option>
                <option value="indepth">In-depth</option>
              </select>
            </div>
          </div>
        </div>

        {/* Assessments Table */}
        {isLoading ? (
          <div className="bg-white rounded-2xl border border-zinc-200 p-8 shadow-sm">
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse flex items-center space-x-4">
                  <div className="h-10 bg-zinc-100 rounded-xl w-1/4"></div>
                  <div className="h-10 bg-zinc-100 rounded-xl w-1/6"></div>
                  <div className="h-10 bg-zinc-100 rounded-xl w-1/6"></div>
                  <div className="h-10 bg-zinc-100 rounded-xl w-1/4"></div>
                </div>
              ))}
            </div>
          </div>
        ) : filteredAssessments.length === 0 ? (
          <div className="bg-white rounded-2xl border border-zinc-200 p-12 shadow-sm text-center">
            <ClipboardCheck className="h-12 w-12 text-zinc-300 mx-auto mb-4" />
            <p className="text-zinc-500 text-lg">No referrals yet</p>
            <p className="text-zinc-400 mt-1">Share your referral link to start tracking assessments</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-100">
                    <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Tier</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Overall</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">DREAM Scores</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Flags</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-zinc-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {filteredAssessments.map((assessment) => (
                    <tr key={assessment.id} className="hover:bg-zinc-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-zinc-900">{assessment.name || 'Anonymous'}</p>
                          {assessment.email && (
                            <div className="flex items-center gap-1 text-xs text-zinc-500">
                              <Mail className="h-3 w-3" />
                              {assessment.email}
                            </div>
                          )}
                          {assessment.company && (
                            <div className="flex items-center gap-1 text-xs text-zinc-500">
                              <Building className="h-3 w-3" />
                              {assessment.company}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getTierBadgeClass(assessment.tier)}`}>
                          {assessment.tier.charAt(0).toUpperCase() + assessment.tier.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-lg font-semibold ${getScoreColor(assessment.overallScore)}`}>
                          {assessment.overallScore?.toFixed(1) || '-'}
                        </span>
                        <span className="text-zinc-400 text-sm">/10</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 text-xs">
                          <span className={`px-1.5 py-0.5 rounded ${getScoreColor(assessment.demandScore)} bg-zinc-50`} title="Demand">
                            D: {assessment.demandScore?.toFixed(1) || '-'}
                          </span>
                          <span className={`px-1.5 py-0.5 rounded ${getScoreColor(assessment.revenueScore)} bg-zinc-50`} title="Revenue">
                            R: {assessment.revenueScore?.toFixed(1) || '-'}
                          </span>
                          <span className={`px-1.5 py-0.5 rounded ${getScoreColor(assessment.engineScore)} bg-zinc-50`} title="Engine">
                            E: {assessment.engineScore?.toFixed(1) || '-'}
                          </span>
                          <span className={`px-1.5 py-0.5 rounded ${getScoreColor(assessment.adminScore)} bg-zinc-50`} title="Admin">
                            A: {assessment.adminScore?.toFixed(1) || '-'}
                          </span>
                          <span className={`px-1.5 py-0.5 rounded ${getScoreColor(assessment.marketingScore)} bg-zinc-50`} title="Marketing">
                            M: {assessment.marketingScore?.toFixed(1) || '-'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {assessment.aiStrategy && (
                            <button
                              onClick={() => setViewingStrategy(assessment)}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 hover:from-purple-200 hover:to-pink-200 transition-colors"
                              title="View AI Strategy"
                            >
                              <Sparkles className="h-3 w-3 mr-1" />
                              AI
                            </button>
                          )}
                          {assessment.pdfRequested && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                              <FileText className="h-3 w-3 mr-1" />
                              PDF
                            </span>
                          )}
                          {assessment.consultationRequested && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-700">
                              <MessageSquare className="h-3 w-3 mr-1" />
                              Consult
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-xs text-zinc-500">
                          <Calendar className="h-3 w-3" />
                          {new Date(assessment.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/assessment/results/${assessment.id}`}
                            target="_blank"
                            className="p-2 text-zinc-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="View Results"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* AI Strategy Modal */}
      {viewingStrategy && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900">
                    AI Implementation Strategy
                  </h3>
                  <p className="text-sm text-zinc-500">
                    {viewingStrategy.name || 'Anonymous'} • {viewingStrategy.company || 'No company'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setViewingStrategy(null)}
                className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-zinc-500" />
              </button>
            </div>

            {/* Modal Meta */}
            <div className="px-6 py-3 bg-zinc-50 border-b border-zinc-200 text-sm text-zinc-500 flex items-center justify-between">
              <span>
                Generated: {viewingStrategy.aiStrategyGeneratedAt
                  ? new Date(viewingStrategy.aiStrategyGeneratedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    })
                  : 'Unknown'}
              </span>
              <span className="text-green-600 font-medium">
                Score: {viewingStrategy.overallScore?.toFixed(1) || '-'}/10
              </span>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="prose prose-zinc max-w-none prose-headings:font-semibold prose-h2:text-xl prose-h2:mt-6 prose-h2:mb-3 prose-h3:text-lg prose-h3:mt-4 prose-h3:mb-2 prose-p:text-zinc-600 prose-li:text-zinc-600 prose-strong:text-zinc-900">
                <pre className="whitespace-pre-wrap text-sm font-sans bg-transparent p-0 border-0">
                  {viewingStrategy.aiStrategy}
                </pre>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-zinc-200">
              <Link
                href={`/assessment/results/${viewingStrategy.id}`}
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-xl transition-colors"
              >
                <Eye className="w-4 h-4" />
                View Full Results
              </Link>
              <button
                onClick={() => setViewingStrategy(null)}
                className="px-4 py-2 bg-zinc-900 text-white rounded-xl font-medium hover:bg-black transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </AffiliateLayout>
  )
}
