'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/admin/AdminLayout'
import { Trash2, Search, Mail, Phone, Building, Calendar, Download, Eye, X } from 'lucide-react'

interface Contact {
  id: string
  name: string
  email: string
  company?: string
  phone?: string
  projectType?: string
  budgetRange?: string
  timeline?: string
  message: string
  createdAt: string
  userId?: string
}

export default function AdminContacts() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterProjectType, setFilterProjectType] = useState<string>('all')
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
      return
    }

    if (status === 'authenticated') {
      fetchContacts()
    }
  }, [status, router])

  const fetchContacts = async () => {
    try {
      setIsLoading(true)
      const res = await fetch('/api/admin/contacts')
      if (res.ok) {
        const data = await res.json()
        setContacts(data)
      }
    } catch (error) {
      console.error('Failed to fetch contacts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteContact = async (contactId: string) => {
    if (!confirm('Are you sure you want to delete this contact? This action cannot be undone.')) return

    try {
      const res = await fetch(`/api/admin/contacts/${contactId}`, { method: 'DELETE' })
      if (res.ok) {
        setContacts(prev => prev.filter(c => c.id !== contactId))
      }
    } catch (error) {
      console.error('Failed to delete contact:', error)
    }
  }

  const exportContacts = () => {
    const csvContent = [
      ['Name', 'Email', 'Company', 'Phone', 'Project Type', 'Budget Range', 'Timeline', 'Message', 'Date'],
      ...filteredContacts.map(contact => [
        contact.name,
        contact.email,
        contact.company || '',
        contact.phone || '',
        contact.projectType || '',
        contact.budgetRange || '',
        contact.timeline || '',
        contact.message.replace(/"/g, '""'),
        new Date(contact.createdAt).toLocaleDateString()
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `zenware-contacts-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (contact.company && contact.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      contact.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesProjectType = filterProjectType === 'all' || contact.projectType === filterProjectType
    return matchesSearch && matchesProjectType
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
            <h2 className="text-2xl font-semibold text-zinc-900">Contacts</h2>
            <p className="text-zinc-500 mt-1">Manage contact form submissions</p>
          </div>
          <button
            onClick={exportContacts}
            className="mt-4 sm:mt-0 flex items-center px-4 py-2.5 bg-zinc-900 text-white rounded-xl font-medium hover:bg-black transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-blue-100">
                <Mail className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-zinc-500">Total Contacts</p>
                <p className="text-2xl font-semibold text-zinc-900">{contacts.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-green-100">
                <Building className="h-5 w-5 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-zinc-500">With Company</p>
                <p className="text-2xl font-semibold text-zinc-900">
                  {contacts.filter(c => c.company).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-purple-100">
                <Phone className="h-5 w-5 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-zinc-500">With Phone</p>
                <p className="text-2xl font-semibold text-zinc-900">
                  {contacts.filter(c => c.phone).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-amber-100">
                <Calendar className="h-5 w-5 text-amber-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-zinc-500">This Week</p>
                <p className="text-2xl font-semibold text-zinc-900">
                  {contacts.filter(c =>
                    new Date(c.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
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
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={filterProjectType}
                onChange={(e) => setFilterProjectType(e.target.value)}
                className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              >
                <option value="all">All Project Types</option>
                <option value="AI Integration">AI Integration</option>
                <option value="Regenerative Systems">Regenerative Systems</option>
                <option value="Business Intelligence">Business Intelligence</option>
                <option value="Consulting">Consulting</option>
                <option value="Custom Development">Custom Development</option>
              </select>
            </div>
          </div>
        </div>

        {/* Contacts List */}
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm animate-pulse">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="h-6 bg-zinc-100 rounded w-1/4 mb-2"></div>
                    <div className="h-4 bg-zinc-100 rounded w-1/3 mb-2"></div>
                    <div className="h-4 bg-zinc-100 rounded w-1/2 mb-4"></div>
                    <div className="h-16 bg-zinc-100 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-zinc-200 p-12 shadow-sm text-center">
            <Mail className="h-12 w-12 text-zinc-300 mx-auto mb-4" />
            <p className="text-zinc-500 text-lg">No contacts found</p>
            <p className="text-zinc-400 mt-1">Try adjusting your search filters</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredContacts.map((contact) => (
              <div key={contact.id} className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm group hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-zinc-900">{contact.name}</h3>
                      {contact.projectType && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                          {contact.projectType}
                        </span>
                      )}
                      {contact.budgetRange && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-100 text-zinc-600">
                          {contact.budgetRange}
                        </span>
                      )}
                    </div>

                    <div className="space-y-1 mb-3 text-sm text-zinc-600">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-zinc-400" />
                        <a href={`mailto:${contact.email}`} className="hover:text-purple-600 transition-colors">
                          {contact.email}
                        </a>
                      </div>
                      {contact.company && (
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-zinc-400" />
                          <span>{contact.company}</span>
                        </div>
                      )}
                      {contact.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-zinc-400" />
                          <a href={`tel:${contact.phone}`} className="hover:text-purple-600 transition-colors">
                            {contact.phone}
                          </a>
                        </div>
                      )}
                      {contact.timeline && (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-zinc-400" />
                          <span>Timeline: {contact.timeline}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-zinc-600 text-sm line-clamp-2 mb-3">{contact.message}</p>

                    <div className="text-xs text-zinc-400">
                      Submitted {new Date(contact.createdAt).toLocaleDateString()} at {new Date(contact.createdAt).toLocaleTimeString()}
                    </div>
                  </div>

                  <div className="ml-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setSelectedContact(contact)}
                      className="p-2 text-zinc-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteContact(contact.id)}
                      className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Contact Detail Modal */}
        {selectedContact && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setSelectedContact(null)} />
            <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 max-h-[80vh] overflow-y-auto">
              <button
                onClick={() => setSelectedContact(null)}
                className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              <h3 className="text-xl font-semibold text-zinc-900 mb-4">{selectedContact.name}</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-zinc-500">Email:</span>
                  <a href={`mailto:${selectedContact.email}`} className="ml-2 text-purple-600 hover:underline">
                    {selectedContact.email}
                  </a>
                </div>
                {selectedContact.company && (
                  <div>
                    <span className="text-zinc-500">Company:</span>
                    <span className="ml-2 text-zinc-900">{selectedContact.company}</span>
                  </div>
                )}
                {selectedContact.phone && (
                  <div>
                    <span className="text-zinc-500">Phone:</span>
                    <a href={`tel:${selectedContact.phone}`} className="ml-2 text-purple-600 hover:underline">
                      {selectedContact.phone}
                    </a>
                  </div>
                )}
                {selectedContact.projectType && (
                  <div>
                    <span className="text-zinc-500">Project Type:</span>
                    <span className="ml-2 text-zinc-900">{selectedContact.projectType}</span>
                  </div>
                )}
                {selectedContact.budgetRange && (
                  <div>
                    <span className="text-zinc-500">Budget:</span>
                    <span className="ml-2 text-zinc-900">{selectedContact.budgetRange}</span>
                  </div>
                )}
                {selectedContact.timeline && (
                  <div>
                    <span className="text-zinc-500">Timeline:</span>
                    <span className="ml-2 text-zinc-900">{selectedContact.timeline}</span>
                  </div>
                )}
                <div className="pt-3 border-t border-zinc-100">
                  <span className="text-zinc-500 block mb-2">Message:</span>
                  <p className="text-zinc-700 whitespace-pre-wrap">{selectedContact.message}</p>
                </div>
                <div className="pt-3 text-xs text-zinc-400">
                  Submitted {new Date(selectedContact.createdAt).toLocaleDateString()} at {new Date(selectedContact.createdAt).toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
