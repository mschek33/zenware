'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X, Plus } from 'lucide-react'

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

const serviceSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.enum(['automation', 'intelligence', 'business-intelligence']),
  price: z.string().optional(),
  featured: z.boolean(),
})

type ServiceForm = z.infer<typeof serviceSchema>

interface ServiceModalProps {
  service?: Service | null
  onSave: (serviceData: Partial<Service>) => Promise<void>
  onClose: () => void
}

export default function ServiceModal({ service, onSave, onClose }: ServiceModalProps) {
  const [features, setFeatures] = useState<string[]>(service?.features || [])
  const [newFeature, setNewFeature] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ServiceForm>({
    resolver: zodResolver(serviceSchema),
    defaultValues: service ? {
      name: service.name,
      slug: service.slug,
      description: service.description,
      category: service.category,
      price: service.price || '',
      featured: service.featured,
    } : {
      name: '',
      slug: '',
      description: '',
      category: 'automation' as const,
      price: '',
      featured: false,
    }
  })

  // Generate slug from name
  const watchName = watch('name')
  useEffect(() => {
    if (watchName && !service) {
      const slug = watchName
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim()
      setValue('slug', slug)
    }
  }, [watchName, setValue, service])

  const addFeature = () => {
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      setFeatures([...features, newFeature.trim()])
      setNewFeature('')
    }
  }

  const removeFeature = (featureToRemove: string) => {
    setFeatures(features.filter(feature => feature !== featureToRemove))
  }

  const onSubmit = async (data: ServiceForm) => {
    setIsSubmitting(true)
    try {
      await onSave({
        ...data,
        features,
      })
    } catch (error) {
      console.error('Failed to save service:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="fixed inset-0 bg-black/60 transition-opacity" onClick={onClose} />
        
        <div className="relative transform overflow-hidden rounded-2xl bg-[#111111] border border-[#2a2a2a] px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              type="button"
              className="rounded-md text-gray-400 hover:text-white focus:outline-none"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white">
              {service ? 'Edit Service' : 'Create New Service'}
            </h3>
            <p className="text-gray-400 mt-1">
              {service ? 'Update service details' : 'Add a new service to your offerings'}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Service Name *
                </label>
                <input
                  {...register('name')}
                  className="kortex-input w-full"
                  placeholder="Enter service name"
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  URL Slug *
                </label>
                <input
                  {...register('slug')}
                  className="kortex-input w-full"
                  placeholder="service-url-slug"
                />
                {errors.slug && (
                  <p className="text-red-400 text-sm mt-1">{errors.slug.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                {...register('description')}
                rows={4}
                className="kortex-input w-full"
                placeholder="Detailed description of the service"
              />
              {errors.description && (
                <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>

            {/* Category and Pricing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category *
                </label>
                <select {...register('category')} className="kortex-input w-full">
                  <option value="automation">Automation</option>
                  <option value="intelligence">Intelligence</option>
                  <option value="business-intelligence">Business Intelligence</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Price
                </label>
                <input
                  {...register('price')}
                  className="kortex-input w-full"
                  placeholder="$999/month or Custom"
                />
              </div>
            </div>

            {/* Featured */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Featured Service
              </label>
              <div className="flex items-center mt-2">
                <input
                  {...register('featured')}
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-300">Feature this service</span>
              </div>
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Features
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                  className="kortex-input flex-1"
                  placeholder="Add a feature"
                />
                <button
                  type="button"
                  onClick={addFeature}
                  className="kortex-button px-3"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-2">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a]">
                    <span className="text-gray-300">{feature}</span>
                    <button
                      type="button"
                      onClick={() => removeFeature(feature)}
                      className="text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              {features.length === 0 && (
                <p className="text-gray-500 text-sm mt-2">No features added yet</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="kortex-button flex-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="kortex-button-primary flex-1 disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : service ? 'Update Service' : 'Create Service'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}