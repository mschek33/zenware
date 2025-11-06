'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/admin/AdminLayout'
import { Trash2, Search, Mail, Download, Calendar, UserCheck, UserX, Eye, Filter } from 'lucide-react'

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
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockNewsletters: Newsletter[] = [
        {
          id: '1',
          email: 'john.doe@example.com',
          name: 'John Doe',
          subscribed: true,
          createdAt: '2024-01-15T10:30:00Z'
        },
        {
          id: '2',
          email: 'sarah.wilson@techcorp.com',
          name: 'Sarah Wilson',
          subscribed: true,
          createdAt: '2024-01-14T14:15:00Z'
        },
        {
          id: '3',
          email: 'michael.chen@startup.co',
          name: 'Michael Chen',
          subscribed: false,
          createdAt: '2024-01-13T09:45:00Z'
        },
        {
          id: '4',
          email: 'lisa.anderson@consciousco.org',
          name: 'Lisa Anderson',
          subscribed: true,
          createdAt: '2024-01-12T16:20:00Z'
        },
        {
          id: '5',
          email: 'robert@enterprise.com',
          subscribed: true,
          createdAt: '2024-01-11T11:10:00Z'
        },
        {
          id: '6',
          email: 'emma.brown@greentech.io',
          name: 'Emma Brown',
          subscribed: true,
          createdAt: '2024-01-10T08:30:00Z'
        },
        {
          id: '7',
          email: 'david.kim@innovate.co',
          name: 'David Kim',
          subscribed: false,
          createdAt: '2024-01-09T15:45:00Z'
        },
        {
          id: '8',
          email: 'jennifer.garcia@conscious.ai',
          name: 'Jennifer Garcia',
          subscribed: true,
          createdAt: '2024-01-08T12:20:00Z'
        }
      ]
      
      setNewsletters(mockNewsletters)
    } catch (error) {
      console.error('Failed to fetch newsletters:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteSubscriber = async (subscriberId: string) => {
    if (!confirm('Are you sure you want to delete this subscriber? This action cannot be undone.')) return
    
    try {
      setNewsletters(prev => prev.filter(s => s.id !== subscriberId))
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
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
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
            <h2 className="text-3xl font-bold text-white">Newsletter Subscribers</h2>
            <p className="text-gray-400 mt-1">Manage your newsletter subscriptions</p>
          </div>
          <div className="flex gap-2 mt-4 sm:mt-0">
            <button
              onClick={() => exportSubscribers(true)}
              className="kortex-button flex items-center"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Active
            </button>
            <button
              onClick={() => exportSubscribers(false)}
              className="kortex-button-primary flex items-center"
            >
              <Download className="h-4 w-4 mr-2" />
              Export All
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="kortex-card">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Total Subscribers</p>
                <p className="text-2xl font-bold text-white">{newsletters.length}</p>
              </div>
            </div>
          </div>
          <div className="kortex-card">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-gradient-to-r from-green-500 to-green-600">
                <UserCheck className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Active</p>
                <p className="text-2xl font-bold text-white">
                  {newsletters.filter(s => s.subscribed).length}
                </p>
              </div>
            </div>
          </div>
          <div className="kortex-card">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-gradient-to-r from-red-500 to-red-600">
                <UserX className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Unsubscribed</p>
                <p className="text-2xl font-bold text-white">
                  {newsletters.filter(s => !s.subscribed).length}
                </p>
              </div>
            </div>
          </div>
          <div className="kortex-card">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-purple-600">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">This Week</p>
                <p className="text-2xl font-bold text-white">
                  {newsletters.filter(s => 
                    new Date(s.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                  ).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="kortex-card">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search subscribers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="kortex-input pl-10 w-full"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="kortex-input w-full"
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
              <div key={i} className="kortex-card animate-pulse">
                <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-1/2 mb-3"></div>
                <div className="h-3 bg-gray-700 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        ) : filteredNewsletters.length === 0 ? (
          <div className="kortex-card text-center py-12">
            <p className="text-gray-400 text-lg">No subscribers found</p>
            <p className="text-gray-500 mt-2">Try adjusting your search filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNewsletters.map((subscriber) => (
              <div key={subscriber.id} className="kortex-card group">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      {subscriber.name && (
                        <h3 className="font-semibold text-white text-sm truncate">
                          {subscriber.name}
                        </h3>
                      )}
                      <p className="text-xs text-gray-300 truncate">{subscriber.email}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    subscriber.subscribed 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {subscriber.subscribed ? 'Active' : 'Unsubscribed'}
                  </span>
                </div>
                
                <div className="text-xs text-gray-500 mb-4">
                  Joined {new Date(subscriber.createdAt).toLocaleDateString()}
                </div>
                
                <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleToggleSubscription(subscriber)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                      subscriber.subscribed
                        ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                        : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                    }`}
                  >
                    {subscriber.subscribed ? 'Unsubscribe' : 'Resubscribe'}
                  </button>
                  <button
                    onClick={() => handleDeleteSubscriber(subscriber.id)}
                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Subscription Growth Chart Placeholder */}
        <div className="kortex-card">
          <h3 className="text-xl font-bold text-white mb-4">Subscription Growth</h3>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-600 rounded-lg">
            <div className="text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">Growth chart placeholder</p>
              <p className="text-sm text-gray-500 mt-1">Integrate with your analytics service</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}