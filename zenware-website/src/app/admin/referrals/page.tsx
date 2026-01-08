'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import AdminLayout from '@/components/admin/AdminLayout'
import {
  Search,
  Mail,
  Building,
  Calendar,
  Download,
  Eye,
  Link2,
  UserPlus,
  TrendingUp,
  Sparkles,
  X
} from 'lucide-react'

interface Affiliate {
  id: string
  name: string
  referralCode: string
}

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
  affiliateId: string | null
  affiliate: Affiliate | null
}

export default function AdminReferrals() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [assessments, setAssessments] = useState<Assessment[]>([])
  const [affiliates, setAffiliates] = useState<Affiliate[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterAffiliate, setFilterAffiliate] = useState<string>('all')
  const [viewingStrategy, setViewingStrategy] = useState<Assessment | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
      return
    }

    if (status === 'authenticated') {
      fetchData()
    }
  }, [status, router])

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const [assessmentsRes, affiliatesRes] = await Promise.all([
        fetch('/api/admin/assessments'),
        fetch('/api/admin/affiliates'),
      ])

      if (assessmentsRes.ok) {
        const data = await assessmentsRes.json()
        // Only show assessments with referral codes
        setAssessments(data.filter((a: Assessment) => a.referralCode))
      }

      if (affiliatesRes.ok) {
        setAffiliates(await affiliatesRes.json())
      }
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const exportReferrals = () => {
    const csvContent = [
      ['ID', 'Name', 'Email', 'Company', 'Tier', 'Overall Score', 'Referral Code', 'Affiliate', 'Created'],
      ...filteredAssessments.map(a => [
        a.id,
        a.name || '',
        a.email || '',
        a.company || '',
        a.tier,
        a.overallScore?.toFixed(1) || '',
        a.referralCode || '',
        a.affiliate?.name || 'Unknown',
        new Date(a.createdAt).toLocaleDateString(),
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `zenware-referrals-${new Date().toISOString().split('T')[0]}.csv`
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
      (assessment.referralCode?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      assessment.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesAffiliate =
      filterAffiliate === 'all' ||
      assessment.affiliateId === filterAffiliate
    return matchesSearch && matchesAffiliate
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  // Calculate stats per affiliate
  const affiliateStats = affiliates.map(aff => ({
    ...aff,
    referralCount: assessments.filter(a => a.affiliateId === aff.id).length,
  }))

  const completedReferrals = assessments.filter(a => a.status === 'completed').length
  const avgScore = completedReferrals > 0
    ? assessments
        .filter(a => a.status === 'completed' && a.overallScore)
        .reduce((sum, a) => sum + (a.overallScore || 0), 0) / completedReferrals
    : 0

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-zinc-900">Referrals</h2>
            <p className="text-zinc-500 mt-1">Track assessments from affiliate referrals</p>
          </div>
          <button
            onClick={exportReferrals}
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
              <div className="p-3 rounded-xl bg-purple-100">
                <Link2 className="h-5 w-5 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-zinc-500">Total Referrals</p>
                <p className="text-2xl font-semibold text-zinc-900">{assessments.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-green-100">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-zinc-500">Avg. Score</p>
                <p className="text-2xl font-semibold text-zinc-900">{avgScore.toFixed(1)}/10</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-blue-100">
                <UserPlus className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-zinc-500">Active Affiliates</p>
                <p className="text-2xl font-semibold text-zinc-900">
                  {affiliateStats.filter(a => a.referralCount > 0).length}
                </p>
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
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-4 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search by name, email, company, or referral code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
            <div className="sm:w-64">
              <select
                value={filterAffiliate}
                onChange={(e) => setFilterAffiliate(e.target.value)}
                className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              >
                <option value="all">All Affiliates</option>
                {affiliateStats.map(aff => (
                  <option key={aff.id} value={aff.id}>
                    {aff.name} ({aff.referralCode}) - {aff.referralCount} referrals
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Referrals Table */}
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
            <Link2 className="h-12 w-12 text-zinc-300 mx-auto mb-4" />
            <p className="text-zinc-500 text-lg">No referrals found</p>
            <p className="text-zinc-400 mt-1">Referrals will appear here when assessments are completed via affiliate links</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-100">
                    <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Referred By</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Tier</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Score</th>
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
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                            <UserPlus className="w-4 h-4 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-zinc-900">
                              {assessment.affiliate?.name || 'Unknown'}
                            </p>
                            <code className="text-xs text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">
                              {assessment.referralCode}
                            </code>
                          </div>
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
                        <div className="flex items-center gap-1 text-xs text-zinc-500">
                          <Calendar className="h-3 w-3" />
                          {new Date(assessment.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          {assessment.aiStrategy && (
                            <button
                              onClick={() => setViewingStrategy(assessment)}
                              className="p-2 text-purple-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                              title="View AI Strategy"
                            >
                              <Sparkles className="h-4 w-4" />
                            </button>
                          )}
                          <Link
                            href={`/assessment/results/${assessment.id}`}
                            target="_blank"
                            className="p-2 text-zinc-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
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
            <div className="flex items-center justify-between p-6 border-b border-zinc-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900">AI Implementation Strategy</h3>
                  <p className="text-sm text-zinc-500">
                    {viewingStrategy.name || 'Anonymous'} • Referred by {viewingStrategy.affiliate?.name || 'Unknown'}
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
            <div className="flex-1 overflow-y-auto p-6">
              <div className="prose prose-zinc max-w-none">
                <pre className="whitespace-pre-wrap text-sm font-sans bg-transparent p-0 border-0">
                  {viewingStrategy.aiStrategy}
                </pre>
              </div>
            </div>
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
    </AdminLayout>
  )
}
