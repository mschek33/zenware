'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/admin/AdminLayout'
import { statsApi, ApiError } from '@/lib/api'
import { 
  FolderOpen, 
  Wrench, 
  FileText, 
  Mail, 
  UserCheck, 
  Users,
  TrendingUp,
  Eye
} from 'lucide-react'

interface DashboardStats {
  projects: number
  services: number
  blogPosts: number
  contacts: number
  newsletters: number
  users: number
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
    users: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
      return
    }

    if (status === 'authenticated') {
      const fetchStats = async () => {
        try {
          const data = await statsApi.get()
          setStats(data as DashboardStats)
        } catch (error) {
          console.error('Failed to fetch stats:', error)
          if (error instanceof ApiError) {
            // Handle API errors gracefully
            console.error('API Error:', error.message, error.status)
          }
        } finally {
          setIsLoading(false)
        }
      }

      fetchStats()
    }
  }, [status, router])

  if (status === 'loading' || status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const statCards = [
    {
      name: 'Projects',
      value: stats.projects,
      icon: FolderOpen,
      color: 'from-purple-500 to-purple-600',
      href: '/admin/projects'
    },
    {
      name: 'Services',
      value: stats.services,
      icon: Wrench,
      color: 'from-blue-500 to-blue-600',
      href: '/admin/services'
    },
    {
      name: 'Blog Posts',
      value: stats.blogPosts,
      icon: FileText,
      color: 'from-green-500 to-green-600',
      href: '/admin/blog-posts'
    },
    {
      name: 'Contacts',
      value: stats.contacts,
      icon: Mail,
      color: 'from-yellow-500 to-yellow-600',
      href: '/admin/contacts'
    },
    {
      name: 'Newsletter Subscribers',
      value: stats.newsletters,
      icon: UserCheck,
      color: 'from-pink-500 to-pink-600',
      href: '/admin/newsletters'
    },
    {
      name: 'Users',
      value: stats.users,
      icon: Users,
      color: 'from-indigo-500 to-indigo-600',
      href: '/admin/users'
    },
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="kortex-card">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Welcome back, Admin! 👋
              </h2>
              <p className="text-gray-400">
                Here&apos;s what&apos;s happening with your Zenware platform today.
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-3xl font-bold text-white">Z</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {statCards.map((stat) => (
            <div
              key={stat.name}
              className="kortex-card hover:scale-105 transition-transform duration-200 cursor-pointer"
              onClick={() => window.location.href = stat.href}
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-full bg-gradient-to-r ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400">{stat.name}</p>
                  {isLoading ? (
                    <div className="animate-pulse bg-gray-700 h-8 w-12 rounded"></div>
                  ) : (
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="kortex-card">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => window.location.href = '/admin/projects'}
                className="kortex-button w-full text-left"
              >
                Manage Projects
              </button>
              <button
                onClick={() => window.location.href = '/admin/blog-posts'}
                className="kortex-button w-full text-left"
              >
                Create New Blog Post
              </button>
              <button
                onClick={() => window.location.href = '/admin/services'}
                className="kortex-button w-full text-left"
              >
                Update Services
              </button>
            </div>
          </div>

          <div className="kortex-card">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Eye className="h-5 w-5 mr-2" />
              System Status
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Database</span>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-green-500 text-sm">Online</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Authentication</span>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-green-500 text-sm">Active</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Email Service</span>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-green-500 text-sm">Operational</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}