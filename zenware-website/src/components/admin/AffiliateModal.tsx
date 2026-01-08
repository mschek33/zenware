'use client'

import { useState, useEffect } from 'react'
import { X, Eye, EyeOff, RefreshCw } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const affiliateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  referralCode: z.string()
    .min(3, 'Code must be at least 3 characters')
    .max(20, 'Code must be at most 20 characters')
    .regex(/^[A-Z0-9]+$/, 'Code must be uppercase alphanumeric'),
  password: z.string().min(6, 'Password must be at least 6 characters').optional().or(z.literal('')),
  company: z.string().optional(),
  phone: z.string().optional(),
  notes: z.string().optional(),
  isActive: z.boolean(),
})

type AffiliateFormData = z.infer<typeof affiliateSchema>

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

interface AffiliateModalProps {
  isOpen: boolean
  onClose: () => void
  affiliate?: Affiliate | null
  onSave: () => void
}

function generateCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = ''
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

export default function AffiliateModal({ isOpen, onClose, affiliate, onSave }: AffiliateModalProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isEditing = !!affiliate

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AffiliateFormData>({
    resolver: zodResolver(affiliateSchema),
    defaultValues: {
      name: '',
      email: '',
      referralCode: '',
      password: '',
      company: '',
      phone: '',
      notes: '',
      isActive: true,
    },
  })

  useEffect(() => {
    if (isOpen) {
      if (affiliate) {
        reset({
          name: affiliate.name,
          email: affiliate.email,
          referralCode: affiliate.referralCode,
          password: '',
          company: affiliate.company || '',
          phone: affiliate.phone || '',
          notes: affiliate.notes || '',
          isActive: affiliate.isActive,
        })
      } else {
        reset({
          name: '',
          email: '',
          referralCode: generateCode(),
          password: '',
          company: '',
          phone: '',
          notes: '',
          isActive: true,
        })
      }
      setError(null)
    }
  }, [isOpen, affiliate, reset])

  const handleGenerateCode = () => {
    setValue('referralCode', generateCode())
  }

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('referralCode', e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))
  }

  const onSubmit = async (data: AffiliateFormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const url = affiliate
        ? `/api/admin/affiliates/${affiliate.id}`
        : '/api/admin/affiliates'

      const body: {
        name: string
        email: string
        referralCode: string
        company: string | null
        phone: string | null
        notes: string | null
        isActive: boolean
        password?: string
      } = {
        name: data.name,
        email: data.email,
        referralCode: data.referralCode,
        company: data.company || null,
        phone: data.phone || null,
        notes: data.notes || null,
        isActive: data.isActive,
      }

      // Only include password if provided
      if (data.password) {
        body.password = data.password
      } else if (!affiliate) {
        // Password required for new affiliates
        setError('Password is required for new affiliates')
        setIsSubmitting(false)
        return
      }

      const res = await fetch(url, {
        method: affiliate ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Failed to save affiliate')
      }

      onSave()
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-200">
          <h3 className="text-lg font-semibold text-zinc-900">
            {isEditing ? 'Edit Affiliate' : 'Add New Affiliate'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-zinc-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Name *</label>
            <input
              type="text"
              {...register('name')}
              className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="John Smith"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Email *</label>
            <input
              type="email"
              {...register('email')}
              className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Referral Code *</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={watch('referralCode')}
                onChange={handleCodeChange}
                className="flex-1 px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 font-mono uppercase focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="JOHN2024"
              />
              <button
                type="button"
                onClick={handleGenerateCode}
                className="px-3 py-2.5 bg-zinc-100 hover:bg-zinc-200 rounded-xl transition-colors"
                title="Generate random code"
              >
                <RefreshCw className="w-5 h-5 text-zinc-600" />
              </button>
            </div>
            {errors.referralCode && (
              <p className="mt-1 text-sm text-red-500">{errors.referralCode.message}</p>
            )}
            <p className="mt-1 text-xs text-zinc-500">Uppercase letters and numbers only (3-20 chars)</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Password {isEditing ? '(leave blank to keep current)' : '*'}
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                className="w-full px-4 py-2.5 pr-12 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder={isEditing ? '••••••••' : 'Min 6 characters'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Company</label>
              <input
                type="text"
                {...register('company')}
                className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Acme Inc"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Phone</label>
              <input
                type="text"
                {...register('phone')}
                className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="+1 555 123 4567"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Notes</label>
            <textarea
              {...register('notes')}
              rows={3}
              className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              placeholder="Internal notes about this affiliate..."
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isActive"
              {...register('isActive')}
              className="w-4 h-4 rounded border-zinc-300 text-purple-600 focus:ring-purple-500"
            />
            <label htmlFor="isActive" className="text-sm text-zinc-700">
              Active (can log in and track referrals)
            </label>
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-zinc-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="px-4 py-2 bg-zinc-900 text-white rounded-xl font-medium hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Affiliate'}
          </button>
        </div>
      </div>
    </div>
  )
}
