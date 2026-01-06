'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/admin/AdminLayout'
import { Trash2, Search, Mail, Download, Calendar, UserCheck, UserX } from 'lucide-react'

interface Newsletter {
  id: string
  email: string
  name?: string
  subscribed: boolean
  createdAt: string
  userId?: string
}

export default function AdminNewsletters() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [newsletters, setNewsletters] = useState<Newsletter[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
      return
    }

    if (status === 'authenticated') {
      fetchNewsletters()
    }
  }, [status, router])

  const fetchNewsletters = async () => {
    try {
      setIsLoading(true)
      const res = await fetch('/api/admin/newsletters')
      if (res.ok) {
        const data = await res.json()
        setNewsletters(data)
      }
    } catch (error) {
      console.error('Failed to fetch newsletters:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteSubscriber = async (subscriberId: string) => {
    if (!confirm('Are you sure you want to delete this subscriber? This action cannot be undone.')) return

    try {
      const res = await fetch(`/api/admin/newsletters/${subscriberId}`, { method: 'DELETE' })
      if (res.ok) {
        setNewsletters(prev => prev.filter(s => s.id !== subscriberId))
      }
    } catch (error) {
      console.error('Failed to delete subscriber:', error)
    }
  }

  const handleToggleSubscription = async (subscriber: Newsletter) => {
    try {
      const updatedSubscriber = {
        ...subscriber,
        subscribed: !subscriber.subscribed
      }
      setNewsletters(prev => prev.map(s => s.id === subscriber.id ? updatedSubscriber : s))
    } catch (error) {
      console.error('Failed to toggle subscription:', error)
    }
  }

  const exportSubscribers = (activeOnly: boolean = false) => {
    const dataToExport = activeOnly ? newsletters.filter(s => s.subscribed) : newsletters
    const csvContent = [
      ['Email', 'Name', 'Status', 'Subscribed Date'],
      ...dataToExport.map(subscriber => [
        subscriber.email,
        subscriber.name || '',
        subscriber.subscribed ? 'Active' : 'Unsubscribed',
        new Date(subscriber.createdAt).toLocaleDateString()
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    const filename = activeOnly
      ? `zenware-active-subscribers-${new Date().toISOString().split('T')[0]}.csv`
      : `zenware-all-subscribers-${new Date().toISOString().split('T')[0]}.csv`
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const filteredNewsletters = newsletters.filter(newsletter => {
    const matchesSearch = newsletter.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (newsletter.name && newsletter.name.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = filterStatus === 'all' ||
      (filterStatus === 'subscribed' && newsletter.subscribed) ||
      (filterStatus === 'unsubscribed' && !newsletter.subscribed)
    return matchesSearch && matchesStatus
  })

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

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-zinc-900">Newsletter Subscribers</h2>
            <p className="text-zinc-500 mt-1">Manage your newsletter subscriptions</p>
          </div>
          <div className="flex gap-2 mt-4 sm:mt-0">
            <button
              onClick={() => exportSubscribers(true)}
              className="flex items-center px-4 py-2.5 bg-white border border-zinc-200 text-zinc-700 rounded-xl font-medium hover:bg-zinc-50 transition-colors"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Active
            </button>
            <button
              onClick={() => exportSubscribers(false)}
              className="flex items-center px-4 py-2.5 bg-zinc-900 text-white rounded-xl font-medium hover:bg-black transition-colors"
            >
              <Download className="h-4 w-4 mr-2" />
              Export All
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-blue-100">
                <Mail className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-zinc-500">Total Subscribers</p>
                <p className="text-2xl font-semibold text-zinc-900">{newsletters.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-green-100">
                <UserCheck className="h-5 w-5 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-zinc-500">Active</p>
                <p className="text-2xl font-semibold text-zinc-900">
                  {newsletters.filter(s => s.subscribed).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-red-100">
                <UserX className="h-5 w-5 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-zinc-500">Unsubscribed</p>
                <p className="text-2xl font-semibold text-zinc-900">
                  {newsletters.filter(s => !s.subscribed).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-purple-100">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-zinc-500">This Week</p>
                <p className="text-2xl font-semibold text-zinc-900">
                  {newsletters.filter(s =>
                    new Date(s.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                  ).length}
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
                  placeholder="Search subscribers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              >
                <option value="all">All Subscribers</option>
                <option value="subscribed">Active Only</option>
                <option value="unsubscribed">Unsubscribed Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Subscribers List */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm animate-pulse">
                <div className="h-4 bg-zinc-100 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-zinc-100 rounded w-1/2 mb-3"></div>
                <div className="h-3 bg-zinc-100 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        ) : filteredNewsletters.length === 0 ? (
          <div className="bg-white rounded-2xl border border-zinc-200 p-12 shadow-sm text-center">
            <Mail className="h-12 w-12 text-zinc-300 mx-auto mb-4" />
            <p className="text-zinc-500 text-lg">No subscribers found</p>
            <p className="text-zinc-400 mt-1">Try adjusting your search filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNewsletters.map((subscriber) => (
              <div key={subscriber.id} className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm group hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      {subscriber.name && (
                        <h3 className="font-semibold text-zinc-900 text-sm truncate">
                          {subscriber.name}
                        </h3>
                      )}
                      <p className="text-xs text-zinc-600 truncate">{subscriber.email}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${subscriber.subscribed
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                    }`}>
                    {subscriber.subscribed ? 'Active' : 'Unsubscribed'}
                  </span>
                </div>

                <div className="text-xs text-zinc-400 mb-4">
                  Joined {new Date(subscriber.createdAt).toLocaleDateString()}
                </div>

                <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleToggleSubscription(subscriber)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${subscriber.subscribed
                        ? 'bg-red-50 text-red-600 hover:bg-red-100'
                        : 'bg-green-50 text-green-600 hover:bg-green-100'
                      }`}
                  >
                    {subscriber.subscribed ? 'Unsubscribe' : 'Resubscribe'}
                  </button>
                  <button
                    onClick={() => handleDeleteSubscriber(subscriber.id)}
                    className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Subscription Growth Chart Placeholder */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-zinc-900 mb-4">Subscription Growth</h3>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-zinc-200 rounded-xl">
            <div className="text-center">
              <Calendar className="h-12 w-12 text-zinc-300 mx-auto mb-4" />
              <p className="text-zinc-500">Growth chart placeholder</p>
              <p className="text-sm text-zinc-400 mt-1">Integrate with your analytics service</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
