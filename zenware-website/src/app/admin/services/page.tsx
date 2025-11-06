'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/admin/AdminLayout'
import { Plus, Edit, Trash2, Search, Star } from 'lucide-react'
import ServiceModal from '@/components/admin/ServiceModal'

interface Service {
  id: string
  name: string
  slug: string
  description: string
  features: string[]
  category: 'automation' | 'intelligence' | 'business-intelligence'
  price?: string
  featured: boolean
  createdAt: string
  updatedAt: string
}

export default function AdminServices() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState<string>('all')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
      return
    }

    if (status === 'authenticated') {
      fetchServices()
    }
  }, [status, router])

  const fetchServices = async () => {
    try {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockServices: Service[] = [
        {
          id: '1',
          name: 'AI Workflow Automation',
          slug: 'ai-workflow-automation',
          description: 'Intelligent automation solutions that adapt to your business processes',
          features: ['Process Mining', 'Smart Workflows', 'Predictive Analytics', '24/7 Monitoring'],
          category: 'automation',
          price: '$2,999/month',
          featured: true,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z'
        },
        {
          id: '2',
          name: 'Conscious AI Advisory',
          slug: 'conscious-ai-advisory',
          description: 'Strategic AI consulting with ethical and consciousness-driven approaches',
          features: ['AI Strategy', 'Ethics Review', 'Implementation Planning', 'Training'],
          category: 'intelligence',
          price: 'Custom',
          featured: false,
          createdAt: '2024-01-02T00:00:00Z',
          updatedAt: '2024-01-02T00:00:00Z'
        }
      ]
      
      setServices(mockServices)
    } catch (error) {
      console.error('Failed to fetch services:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateService = () => {
    setEditingService(null)
    setIsModalOpen(true)
  }

  const handleEditService = (service: Service) => {
    setEditingService(service)
    setIsModalOpen(true)
  }

  const handleDeleteService = async (serviceId: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return
    
    try {
      setServices(prev => prev.filter(s => s.id !== serviceId))
    } catch (error) {
      console.error('Failed to delete service:', error)
    }
  }

  const handleSaveService = async (serviceData: Partial<Service>) => {
    try {
      if (editingService) {
        const updatedService = { ...editingService, ...serviceData, updatedAt: new Date().toISOString() }
        setServices(prev => prev.map(s => s.id === editingService.id ? updatedService : s))
      } else {
        const newService: Service = {
          id: Date.now().toString(),
          ...serviceData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        } as Service
        setServices(prev => [newService, ...prev])
      }
      setIsModalOpen(false)
    } catch (error) {
      console.error('Failed to save service:', error)
    }
  }

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || service.category === filterCategory
    return matchesSearch && matchesCategory
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
            <h2 className="text-3xl font-bold text-white">Services</h2>
            <p className="text-gray-400 mt-1">Manage your service offerings</p>
          </div>
          <button
            onClick={handleCreateService}
            className="kortex-button-primary mt-4 sm:mt-0 flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </button>
        </div>

        {/* Filters */}
        <div className="kortex-card">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="kortex-input pl-10 w-full"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="kortex-input w-full"
              >
                <option value="all">All Categories</option>
                <option value="automation">Automation</option>
                <option value="intelligence">Intelligence</option>
                <option value="business-intelligence">Business Intelligence</option>
              </select>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="kortex-card animate-pulse">
                <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-1/2 mb-4"></div>
                <div className="h-20 bg-gray-700 rounded mb-4"></div>
                <div className="flex gap-2">
                  <div className="h-8 bg-gray-700 rounded w-16"></div>
                  <div className="h-8 bg-gray-700 rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="kortex-card text-center py-12">
            <p className="text-gray-400 text-lg">No services found</p>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredServices.map((service) => (
              <div key={service.id} className="kortex-card group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold text-white">{service.name}</h3>
                      {service.featured && (
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="kortex-badge-primary">
                        {service.category.replace('-', ' ')}
                      </span>
                      {service.price && (
                        <span className="text-green-400 font-medium text-sm">
                          {service.price}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm mb-4">{service.description}</p>
                
                <div className="space-y-2 mb-4">
                  <h4 className="text-sm font-medium text-gray-400">Features:</h4>
                  <div className="grid grid-cols-2 gap-1">
                    {service.features.slice(0, 4).map((feature) => (
                      <div key={feature} className="text-xs text-gray-300 flex items-center">
                        <div className="w-1 h-1 bg-purple-500 rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                  {service.features.length > 4 && (
                    <p className="text-xs text-gray-500">
                      +{service.features.length - 4} more features
                    </p>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    Updated {new Date(service.updatedAt).toLocaleDateString()}
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEditService(service)}
                      className="p-2 text-gray-400 hover:text-white hover:bg-[#2a2a2a] rounded-lg transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteService(service.id)}
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

        {/* Service Modal */}
        {isModalOpen && (
          <ServiceModal
            service={editingService}
            onSave={handleSaveService}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </AdminLayout>
  )
}