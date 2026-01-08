'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import AffiliateLayout from '@/components/affiliate/AffiliateLayout'
import {
  Link2,
  TrendingUp,
  ClipboardCheck,
  Sparkles,
  Copy,
  Check,
  ArrowRight,
  Calendar
} from 'lucide-react'

interface Stats {
  totalReferrals: number
  thisMonthReferrals: number
  completedAssessments: number
  aiStrategiesGenerated: number
  averageScore: number
  referralCode: string
}

export default function AffiliateDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState<Stats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  const referralCode = session?.user?.referralCode || ''
  const referralLink = typeof window !== 'undefined'
    ? `${window.location.origin}/assessment?ref=${referralCode}`
    : ''

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/affiliate/login')
      return
    }

    if (status === 'authenticated') {
      fetchStats()
    }
  }, [status, router])

  const fetchStats = async () => {
    try {
      setIsLoading(true)
      const res = await fetch('/api/affiliate/stats')
      if (res.ok) {
        setStats(await res.json())
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const copyReferralLink = async () => {
    if (referralLink) {
      await navigator.clipboard.writeText(referralLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
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

  return (
    <AffiliateLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 text-white">
          <h2 className="text-2xl font-semibold mb-2">
            Welcome back, {session.user?.name}!
          </h2>
          <p className="text-green-100 mb-6">
            Track your referrals and share your unique link to earn credit.
          </p>

          {/* Referral Link Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <p className="text-sm text-green-100 mb-1">Your Referral Link</p>
                <code className="text-sm font-mono bg-white/10 px-3 py-1.5 rounded-lg block truncate">
                  {referralLink}
                </code>
              </div>
              <button
                onClick={copyReferralLink}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-green-600 rounded-xl font-medium hover:bg-green-50 transition-colors shadow-lg"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copy Link
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-green-100">
                <Link2 className="h-5 w-5 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-zinc-500">Total Referrals</p>
                {isLoading ? (
                  <div className="h-8 w-16 bg-zinc-100 rounded animate-pulse"></div>
                ) : (
                  <p className="text-2xl font-semibold text-zinc-900">{stats?.totalReferrals || 0}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-blue-100">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-zinc-500">This Month</p>
                {isLoading ? (
                  <div className="h-8 w-16 bg-zinc-100 rounded animate-pulse"></div>
                ) : (
                  <p className="text-2xl font-semibold text-zinc-900">{stats?.thisMonthReferrals || 0}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-purple-100">
                <ClipboardCheck className="h-5 w-5 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-zinc-500">Completed</p>
                {isLoading ? (
                  <div className="h-8 w-16 bg-zinc-100 rounded animate-pulse"></div>
                ) : (
                  <p className="text-2xl font-semibold text-zinc-900">{stats?.completedAssessments || 0}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-orange-100">
                <TrendingUp className="h-5 w-5 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-zinc-500">Avg. Score</p>
                {isLoading ? (
                  <div className="h-8 w-16 bg-zinc-100 rounded animate-pulse"></div>
                ) : (
                  <p className="text-2xl font-semibold text-zinc-900">
                    {stats?.averageScore?.toFixed(1) || '0.0'}/10
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/affiliate/referrals"
            className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm hover:shadow-md hover:border-green-200 transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100">
                  <ClipboardCheck className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900">View All Referrals</h3>
                  <p className="text-sm text-zinc-500">See detailed assessment results</p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-zinc-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
            </div>
          </Link>

          <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100">
                <Sparkles className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-zinc-900">AI Strategies Generated</h3>
                <p className="text-sm text-zinc-500">
                  {isLoading ? (
                    <span className="inline-block h-4 w-20 bg-zinc-100 rounded animate-pulse"></span>
                  ) : (
                    <>{stats?.aiStrategiesGenerated || 0} referrals have AI strategies</>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-zinc-900 mb-4">How Referrals Work</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-lg font-bold text-green-600">1</span>
              </div>
              <h4 className="font-medium text-zinc-900 mb-1">Share Your Link</h4>
              <p className="text-sm text-zinc-500">Send your unique referral link to potential leads</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-lg font-bold text-green-600">2</span>
              </div>
              <h4 className="font-medium text-zinc-900 mb-1">They Complete Assessment</h4>
              <p className="text-sm text-zinc-500">Leads take the DREAM AI Audit assessment</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-lg font-bold text-green-600">3</span>
              </div>
              <h4 className="font-medium text-zinc-900 mb-1">Track Results</h4>
              <p className="text-sm text-zinc-500">View their results and scores in your dashboard</p>
            </div>
          </div>
        </div>
      </div>
    </AffiliateLayout>
  )
}
