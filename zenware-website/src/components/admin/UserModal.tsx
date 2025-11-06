'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X, User, Shield, Edit } from 'lucide-react'

interface AdminUser {
  id: string
  name?: string
  email: string
  role: 'admin' | 'editor' | 'viewer'
  createdAt: string
  updatedAt: string
  lastLogin?: string
}

const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['admin', 'editor', 'viewer']),
})

type UserForm = z.infer<typeof userSchema>

interface UserModalProps {
  user?: AdminUser | null
  onSave: (userData: Partial<AdminUser>) => Promise<void>
  onClose: () => void
}

export default function UserModal({ user, onSave, onClose }: UserModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserForm>({
    resolver: zodResolver(userSchema),
    defaultValues: user ? {
      name: user.name || '',
      email: user.email,
      role: user.role,
    } : {
      name: '',
      email: '',
      role: 'viewer' as const,
    }
  })

  const onSubmit = async (data: UserForm) => {
    setIsSubmitting(true)
    try {
      await onSave(data)
    } catch (error) {
      console.error('Failed to save user:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getRoleDescription = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Full access to all features, user management, system settings'
      case 'editor':
        return 'Can create and edit content, manage projects and services'
      case 'viewer':
        return 'Read-only access to dashboard and analytics'
      default:
        return ''
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Shield className="h-5 w-5 text-red-400" />
      case 'editor':
        return <Edit className="h-5 w-5 text-blue-400" />
      case 'viewer':
        return <User className="h-5 w-5 text-green-400" />
      default:
        return <User className="h-5 w-5 text-gray-400" />
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="fixed inset-0 bg-black/60 transition-opacity" onClick={onClose} />
        
        <div className="relative transform overflow-hidden rounded-2xl bg-[#111111] border border-[#2a2a2a] px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
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
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">
                  {user ? 'Edit User' : 'Add New User'}
                </h3>
                <p className="text-gray-400">
                  {user ? 'Update user information and permissions' : 'Create a new admin panel user'}
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name *
              </label>
              <input
                {...register('name')}
                className="kortex-input w-full"
                placeholder="Enter full name"
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address *
              </label>
              <input
                {...register('email')}
                type="email"
                className="kortex-input w-full"
                placeholder="Enter email address"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Role *
              </label>
              <div className="space-y-3">
                {(['admin', 'editor', 'viewer'] as const).map((role) => (
                  <div key={role} className="relative">
                    <label className="flex items-start gap-3 p-4 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] cursor-pointer hover:bg-[#1f1f1f] transition-colors">
                      <input
                        {...register('role')}
                        type="radio"
                        value={role}
                        className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {getRoleIcon(role)}
                          <span className="font-medium text-white capitalize">
                            {role}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400">
                          {getRoleDescription(role)}
                        </p>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
              {errors.role && (
                <p className="text-red-400 text-sm mt-1">{errors.role.message}</p>
              )}
            </div>

            {/* Warning for Admin Role */}
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
              <p className="text-yellow-400 text-sm">
                <strong>Note:</strong> Admin users have full access to all system features including user management. 
                Only assign admin role to trusted users.
              </p>
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
                {isSubmitting ? 'Saving...' : user ? 'Update User' : 'Create User'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}