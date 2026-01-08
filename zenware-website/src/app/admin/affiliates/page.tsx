'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/admin/AdminLayout'
import AffiliateModal from '@/components/admin/AffiliateModal'
import {
  Search,
  Mail,
  Building,
  Calendar,
  Plus,
  Edit,
  Trash2,
  UserPlus,
  Users,
  Link2,
  Copy,
  Check,
  ToggleLeft,
  ToggleRight
} from 'lucide-react'

interface Affiliate {
  id: string
  referralCode: string
  name: string
  email: string
  company: string | null
  phone: string | null
  isActive: boolean
  notes: string | null
  totalReferrals: number
  createdAt: string
  lastLoginAt: string | null
}

export default function AdminAffiliates() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [affiliates, setAffiliates] = useState<Affiliate[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterActive, setFilterActive] = useState<string>('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAffiliate, setEditingAffiliate] = useState<Affiliate | null>(null)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
      return
    }

    if (status === 'authenticated') {
      fetchAffiliates()
    }
  }, [status, router])

  const fetchAffiliates = async () => {
    try {
      setIsLoading(true)
      const res = await fetch('/api/admin/affiliates')
      if (res.ok) {
        const data = await res.json()
        setAffiliates(data)
      }
    } catch (error) {
      console.error('Failed to fetch affiliates:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteAffiliate = async (affiliateId: string) => {
    if (!confirm('Are you sure you want to delete this affiliate? Their referral history will be preserved but unlinked.')) return

    try {
      const res = await fetch(`/api/admin/affiliates/${affiliateId}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        setAffiliates(prev => prev.filter(a => a.id !== affiliateId))
      }
    } catch (error) {
      console.error('Failed to delete affiliate:', error)
    }
  }

  const handleToggleActive = async (affiliate: Affiliate) => {
    try {
      const res = await fetch(`/api/admin/affiliates/${affiliate.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !affiliate.isActive }),
      })
      if (res.ok) {
        setAffiliates(prev =>
          prev.map(a => a.id === affiliate.id ? { ...a, isActive: !a.isActive } : a)
        )
      }
    } catch (error) {
      console.error('Failed to toggle affiliate status:', error)
    }
  }

  const copyReferralLink = async (code: string) => {
    const link = `${window.location.origin}/assessment?ref=${code}`
    await navigator.clipboard.writeText(link)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const handleEditAffiliate = (affiliate: Affiliate) => {
    setEditingAffiliate(affiliate)
    setIsModalOpen(true)
  }

  const handleAddAffiliate = () => {
    setEditingAffiliate(null)
    setIsModalOpen(true)
  }

  const filteredAffiliates = affiliates.filter(affiliate => {
    const matchesSearch =
      affiliate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      affiliate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      affiliate.referralCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (affiliate.company?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
    const matchesActive =
      filterActive === 'all' ||
      (filterActive === 'active' && affiliate.isActive) ||
      (filterActive === 'inactive' && !affiliate.isActive)
    return matchesSearch && matchesActive
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

  const totalReferrals = affiliates.reduce((sum, a) => sum + a.totalReferrals, 0)
  const activeCount = affiliates.filter(a => a.isActive).length

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-zinc-900">Affiliates</h2>
            <p className="text-zinc-500 mt-1">Manage your referral partners</p>
          </div>
          <button
            onClick={handleAddAffiliate}
            className="mt-4 sm:mt-0 flex items-center px-4 py-2.5 bg-zinc-900 text-white rounded-xl font-medium hover:bg-black transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Affiliate
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-purple-100">
                <UserPlus className="h-5 w-5 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-zinc-500">Total Affiliates</p>
                <p className="text-2xl font-semibold text-zinc-900">{affiliates.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-green-100">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-zinc-500">Active</p>
                <p className="text-2xl font-semibold text-zinc-900">{activeCount}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-blue-100">
                <Link2 className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-zinc-500">Total Referrals</p>
                <p className="text-2xl font-semibold text-zinc-900">{totalReferrals}</p>
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
                  placeholder="Search by name, email, code, or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={filterActive}
                onChange={(e) => setFilterActive(e.target.value)}
                className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Affiliates Table */}
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
        ) : filteredAffiliates.length === 0 ? (
          <div className="bg-white rounded-2xl border border-zinc-200 p-12 shadow-sm text-center">
            <UserPlus className="h-12 w-12 text-zinc-300 mx-auto mb-4" />
            <p className="text-zinc-500 text-lg">No affiliates found</p>
            <p className="text-zinc-400 mt-1">Add your first affiliate to start tracking referrals</p>
            <button
              onClick={handleAddAffiliate}
              className="mt-4 inline-flex items-center px-4 py-2.5 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Affiliate
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-100">
                    <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Affiliate</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Referral Code</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Referrals</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Last Login</th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-zinc-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {filteredAffiliates.map((affiliate) => (
                    <tr key={affiliate.id} className="hover:bg-zinc-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-zinc-900">{affiliate.name}</p>
                          <div className="flex items-center gap-1 text-xs text-zinc-500">
                            <Mail className="h-3 w-3" />
                            {affiliate.email}
                          </div>
                          {affiliate.company && (
                            <div className="flex items-center gap-1 text-xs text-zinc-500">
                              <Building className="h-3 w-3" />
                              {affiliate.company}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <code className="px-2 py-1 bg-purple-50 text-purple-700 rounded-lg text-sm font-mono">
                            {affiliate.referralCode}
                          </code>
                          <button
                            onClick={() => copyReferralLink(affiliate.referralCode)}
                            className="p-1.5 text-zinc-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                            title="Copy referral link"
                          >
                            {copiedCode === affiliate.referralCode ? (
                              <Check className="h-4 w-4 text-green-600" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-lg font-semibold text-zinc-900">
                          {affiliate.totalReferrals}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleToggleActive(affiliate)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                            affiliate.isActive
                              ? 'bg-green-100 text-green-700 hover:bg-green-200'
                              : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'
                          }`}
                        >
                          {affiliate.isActive ? (
                            <>
                              <ToggleRight className="h-3.5 w-3.5" />
                              Active
                            </>
                          ) : (
                            <>
                              <ToggleLeft className="h-3.5 w-3.5" />
                              Inactive
                            </>
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        {affiliate.lastLoginAt ? (
                          <div className="flex items-center gap-1 text-xs text-zinc-500">
                            <Calendar className="h-3 w-3" />
                            {new Date(affiliate.lastLoginAt).toLocaleDateString()}
                          </div>
                        ) : (
                          <span className="text-xs text-zinc-400">Never</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEditAffiliate(affiliate)}
                            className="p-2 text-zinc-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteAffiliate(affiliate.id)}
                            className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
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

      {/* Affiliate Modal */}
      <AffiliateModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingAffiliate(null)
        }}
        affiliate={editingAffiliate}
        onSave={fetchAffiliates}
      />
    </AdminLayout>
  )
}
