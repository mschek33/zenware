'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/admin/AdminLayout'
import { Trash2, Search, Mail, Phone, Building, Calendar, Download, Eye } from 'lucide-react'
import ContactModal from '@/components/admin/ContactModal'

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
      await new Promise(resolve => setTimeout(resolve, 1000))

      const mockContacts: Contact[] = [
        {
          id: '1',
          name: 'John Smith',
          email: 'john.smith@example.com',
          company: 'TechCorp',
          phone: '+1-555-0123',
          projectType: 'AI Integration',
          budgetRange: '$50,000 - $100,000',
          timeline: '3-6 months',
          message: 'We are interested in integrating AI solutions into our existing workflow. Looking for a consultation to discuss our specific needs and how your conscious AI approach could benefit our organization.',
          createdAt: '2024-01-15T10:30:00Z'
        },
        {
          id: '2',
          name: 'Sarah Johnson',
          email: 'sarah.johnson@greentech.io',
          company: 'GreenTech Solutions',
          phone: '+1-555-0456',
          projectType: 'Regenerative Systems',
          budgetRange: '$25,000 - $50,000',
          timeline: '1-3 months',
          message: 'Hello! We\'re developing sustainable technology solutions and would love to explore how your regenerative approach could help us build more conscious systems. Can we schedule a call?',
          createdAt: '2024-01-14T14:15:00Z'
        },
        {
          id: '3',
          name: 'Michael Chen',
          email: 'michael.chen@startup.co',
          company: 'InnovateCo',
          phone: '+1-555-0789',
          projectType: 'Business Intelligence',
          budgetRange: '$10,000 - $25,000',
          timeline: '1-2 months',
          message: 'We\'re a startup looking to implement conscious business intelligence solutions. Your approach to combining technology with higher consciousness principles really resonates with our mission.',
          createdAt: '2024-01-13T09:45:00Z'
        },
        {
          id: '4',
          name: 'Lisa Anderson',
          email: 'lisa@consciousco.org',
          projectType: 'Consulting',
          timeline: '2-4 weeks',
          message: 'Hi there! I\'m reaching out on behalf of our non-profit organization. We\'re interested in your consulting services to help us integrate more conscious practices into our operations.',
          createdAt: '2024-01-12T16:20:00Z'
        },
        {
          id: '5',
          name: 'Robert Wilson',
          email: 'robert.wilson@enterprise.com',
          company: 'Enterprise Solutions Inc.',
          phone: '+1-555-0321',
          projectType: 'Custom Development',
          budgetRange: '$100,000+',
          timeline: '6+ months',
          message: 'We\'re looking for a long-term partnership to develop custom conscious technology solutions for our enterprise clients. Your portfolio looks very impressive.',
          createdAt: '2024-01-11T11:10:00Z'
        }
      ]

      setContacts(mockContacts)
    } catch (error) {
      console.error('Failed to fetch contacts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteContact = async (contactId: string) => {
    if (!confirm('Are you sure you want to delete this contact? This action cannot be undone.')) return

    try {
      setContacts(prev => prev.filter(c => c.id !== contactId))
    } catch (error) {
      console.error('Failed to delete contact:', error)
    }
  }

  const handleViewContact = (contact: Contact) => {
    setSelectedContact(contact)
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
            <h2 className="text-3xl font-bold text-white">Contacts</h2>
            <p className="text-gray-400 mt-1">Manage contact form submissions</p>
          </div>
          <button
            onClick={exportContacts}
            className="kortex-button-primary mt-4 sm:mt-0 flex items-center"
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="kortex-card">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Total Contacts</p>
                <p className="text-2xl font-bold text-white">{contacts.length}</p>
              </div>
            </div>
          </div>
          <div className="kortex-card">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-gradient-to-r from-green-500 to-green-600">
                <Building className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">With Company</p>
                <p className="text-2xl font-bold text-white">
                  {contacts.filter(c => c.company).length}
                </p>
              </div>
            </div>
          </div>
          <div className="kortex-card">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-purple-600">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">With Phone</p>
                <p className="text-2xl font-bold text-white">
                  {contacts.filter(c => c.phone).length}
                </p>
              </div>
            </div>
          </div>
          <div className="kortex-card">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">This Week</p>
                <p className="text-2xl font-bold text-white">
                  {contacts.filter(c =>
                    new Date(c.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
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
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="kortex-input pl-10 w-full"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={filterProjectType}
                onChange={(e) => setFilterProjectType(e.target.value)}
                className="kortex-input w-full"
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
              <div key={i} className="kortex-card animate-pulse">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="h-6 bg-gray-700 rounded w-1/4 mb-2"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/3 mb-2"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
                    <div className="h-16 bg-gray-700 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="kortex-card text-center py-12">
            <p className="text-gray-400 text-lg">No contacts found</p>
            <p className="text-gray-500 mt-2">Try adjusting your search filters</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredContacts.map((contact) => (
              <div key={contact.id} className="kortex-card group">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{contact.name}</h3>
                      {contact.projectType && (
                        <span className="kortex-badge-primary text-xs">
                          {contact.projectType}
                        </span>
                      )}
                      {contact.budgetRange && (
                        <span className="kortex-badge text-xs">
                          {contact.budgetRange}
                        </span>
                      )}
                    </div>

                    <div className="space-y-1 mb-3 text-sm text-gray-300">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <a href={`mailto:${contact.email}`} className="hover:text-purple-400 transition-colors">
                          {contact.email}
                        </a>
                      </div>
                      {contact.company && (
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-gray-400" />
                          <span>{contact.company}</span>
                        </div>
                      )}
                      {contact.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <a href={`tel:${contact.phone}`} className="hover:text-purple-400 transition-colors">
                            {contact.phone}
                          </a>
                        </div>
                      )}
                      {contact.timeline && (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>Timeline: {contact.timeline}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-gray-300 text-sm line-clamp-2 mb-3">{contact.message}</p>

                    <div className="text-xs text-gray-500">
                      Submitted {new Date(contact.createdAt).toLocaleDateString()} at {new Date(contact.createdAt).toLocaleTimeString()}
                    </div>
                  </div>

                  <div className="ml-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleViewContact(contact)}
                      className="p-2 text-gray-400 hover:text-white hover:bg-[#2a2a2a] rounded-lg transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteContact(contact.id)}
                      className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
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
          <ContactModal
            contact={selectedContact}
            onClose={() => setSelectedContact(null)}
          />
        )}
      </div>
    </AdminLayout>
  )
}