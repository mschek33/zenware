'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import AdminLayout from '@/components/admin/AdminLayout'
import { statsApi, ApiError } from '@/lib/api'
import {
  FolderOpen,
  Wrench,
  FileText,
  Mail,
  UserCheck,
  TrendingUp,
  Eye,
  ClipboardCheck,
  ArrowRight
} from 'lucide-react'

interface DashboardStats {
  projects: number
  services: number
  blogPosts: number
  contacts: number
  newsletters: number
  users: number
  assessments?: number
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats>({
    projects: 0,
    services: 0,
    blogPosts: 0,
    contacts: 0,
    newsletters: 0,
    users: 0,
    assessments: 0
  })
  const [isLoading, setIsLoading] = useState(true)
  const [assessmentCount, setAssessmentCount] = useState(0)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
      return
    }

    if (status === 'authenticated') {
      const fetchData = async () => {
        try {
          const [statsData, assessmentsRes] = await Promise.all([
            statsApi.get(),
            fetch('/api/admin/assessments')
          ])
          setStats(statsData as DashboardStats)

          if (assessmentsRes.ok) {
            const assessments = await assessmentsRes.json()
            setAssessmentCount(Array.isArray(assessments) ? assessments.length : 0)
          }
        } catch (error) {
          console.error('Failed to fetch stats:', error)
          if (error instanceof ApiError) {
            console.error('API Error:', error.message, error.status)
          }
        } finally {
          setIsLoading(false)
        }
      }

      fetchData()
    }
  }, [status, router])

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

  const statCards = [
    {
      name: 'Assessments',
      value: assessmentCount,
      icon: ClipboardCheck,
      color: 'bg-gradient-to-br from-purple-500 to-pink-500',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      href: '/admin/assessments'
    },
    {
      name: 'Projects',
      value: stats.projects,
      icon: FolderOpen,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      href: '/admin/projects'
    },
    {
      name: 'Services',
      value: stats.services,
      icon: Wrench,
      color: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
      href: '/admin/services'
    },
    {
      name: 'Blog Posts',
      value: stats.blogPosts,
      icon: FileText,
      color: 'bg-gradient-to-br from-amber-500 to-amber-600',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
      href: '/admin/blog-posts'
    },
    {
      name: 'Contacts',
      value: stats.contacts,
      icon: Mail,
      color: 'bg-gradient-to-br from-rose-500 to-rose-600',
      iconBg: 'bg-rose-100',
      iconColor: 'text-rose-600',
      href: '/admin/contacts'
    },
    {
      name: 'Newsletter',
      value: stats.newsletters,
      icon: UserCheck,
      color: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
      href: '/admin/newsletters'
    },
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-zinc-900 mb-1">
                Welcome back!
              </h2>
              <p className="text-zinc-500">
                Here&apos;s what&apos;s happening with your Zenware platform today.
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/25">
                <span className="text-2xl font-bold text-white">Z</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {statCards.map((stat) => (
            <Link
              key={stat.name}
              href={stat.href}
              className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm hover:shadow-md hover:border-zinc-300 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`p-3 rounded-xl ${stat.iconBg}`}>
                    <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-zinc-500">{stat.name}</p>
                    {isLoading ? (
                      <div className="animate-pulse bg-zinc-100 h-8 w-12 rounded mt-1"></div>
                    ) : (
                      <p className="text-2xl font-semibold text-zinc-900">{stat.value}</p>
                    )}
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-zinc-300 group-hover:text-zinc-500 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions & System Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-zinc-900 mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
              Quick Actions
            </h3>
            <div className="space-y-2">
              <Link
                href="/admin/assessments"
                className="block w-full px-4 py-3 text-left text-zinc-700 bg-zinc-50 hover:bg-zinc-100 rounded-xl transition-colors"
              >
                View AI Audit Assessments
              </Link>
              <Link
                href="/admin/projects"
                className="block w-full px-4 py-3 text-left text-zinc-700 bg-zinc-50 hover:bg-zinc-100 rounded-xl transition-colors"
              >
                Manage Projects
              </Link>
              <Link
                href="/admin/blog-posts"
                className="block w-full px-4 py-3 text-left text-zinc-700 bg-zinc-50 hover:bg-zinc-100 rounded-xl transition-colors"
              >
                Create New Blog Post
              </Link>
              <Link
                href="/admin/services"
                className="block w-full px-4 py-3 text-left text-zinc-700 bg-zinc-50 hover:bg-zinc-100 rounded-xl transition-colors"
              >
                Update Services
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-zinc-900 mb-4 flex items-center">
              <Eye className="h-5 w-5 mr-2 text-purple-600" />
              System Status
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <span className="text-zinc-600">Database</span>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-green-600 text-sm font-medium">Online</span>
                </div>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-zinc-100">
                <span className="text-zinc-600">Authentication</span>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-green-600 text-sm font-medium">Active</span>
                </div>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-zinc-100">
                <span className="text-zinc-600">Email Service (SES)</span>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-green-600 text-sm font-medium">Operational</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
