'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/admin/AdminLayout'
import { Plus, Edit, Trash2, Search, Shield, User, Calendar, Mail } from 'lucide-react'
import UserModal from '@/components/admin/UserModal'

interface AdminUser {
  id: string
  name?: string
  email: string
  role: 'admin' | 'editor' | 'viewer'
  createdAt: string
  updatedAt: string
  lastLogin?: string
}

export default function AdminUsers() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [users, setUsers] = useState<AdminUser[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
      return
    }

    if (status === 'authenticated') {
      fetchUsers()
    }
  }, [status, router])

  const fetchUsers = async () => {
    try {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockUsers: AdminUser[] = [
        {
          id: '1',
          name: 'Admin User',
          email: 'admin@zenware.ai',
          role: 'admin',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
          lastLogin: '2024-01-15T14:30:00Z'
        },
        {
          id: '2',
          name: 'Content Editor',
          email: 'editor@zenware.ai',
          role: 'editor',
          createdAt: '2024-01-05T10:15:00Z',
          updatedAt: '2024-01-05T10:15:00Z',
          lastLogin: '2024-01-14T09:20:00Z'
        },
        {
          id: '3',
          name: 'Guest Viewer',
          email: 'viewer@zenware.ai',
          role: 'viewer',
          createdAt: '2024-01-10T16:45:00Z',
          updatedAt: '2024-01-10T16:45:00Z'
        }
      ]
      
      setUsers(mockUsers)
    } catch (error) {
      console.error('Failed to fetch users:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateUser = () => {
    setEditingUser(null)
    setIsModalOpen(true)
  }

  const handleEditUser = (user: AdminUser) => {
    setEditingUser(user)
    setIsModalOpen(true)
  }

  const handleDeleteUser = async (userId: string) => {
    const user = users.find(u => u.id === userId)
    if (user?.email === session?.user?.email) {
      alert('You cannot delete your own account')
      return
    }

    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) return
    
    try {
      setUsers(prev => prev.filter(u => u.id !== userId))
    } catch (error) {
      console.error('Failed to delete user:', error)
    }
  }

  const handleSaveUser = async (userData: Partial<AdminUser>) => {
    try {
      if (editingUser) {
        const updatedUser = { ...editingUser, ...userData, updatedAt: new Date().toISOString() }
        setUsers(prev => prev.map(u => u.id === editingUser.id ? updatedUser : u))
      } else {
        const newUser: AdminUser = {
          id: Date.now().toString(),
          ...userData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        } as AdminUser
        setUsers(prev => [newUser, ...prev])
      }
      setIsModalOpen(false)
    } catch (error) {
      console.error('Failed to save user:', error)
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-500/20 text-red-400'
      case 'editor':
        return 'bg-blue-500/20 text-blue-400'
      case 'viewer':
        return 'bg-green-500/20 text-green-400'
      default:
        return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return Shield
      case 'editor':
        return Edit
      case 'viewer':
        return User
      default:
        return User
    }
  }

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
            <h2 className="text-3xl font-bold text-white">Users</h2>
            <p className="text-gray-400 mt-1">Manage admin panel users and permissions</p>
          </div>
          <button
            onClick={handleCreateUser}
            className="kortex-button-primary mt-4 sm:mt-0 flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="kortex-card">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-purple-600">
                <User className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Total Users</p>
                <p className="text-2xl font-bold text-white">{users.length}</p>
              </div>
            </div>
          </div>
          <div className="kortex-card">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-gradient-to-r from-red-500 to-red-600">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Admins</p>
                <p className="text-2xl font-bold text-white">
                  {users.filter(u => u.role === 'admin').length}
                </p>
              </div>
            </div>
          </div>
          <div className="kortex-card">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600">
                <Edit className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Editors</p>
                <p className="text-2xl font-bold text-white">
                  {users.filter(u => u.role === 'editor').length}
                </p>
              </div>
            </div>
          </div>
          <div className="kortex-card">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-gradient-to-r from-green-500 to-green-600">
                <User className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Viewers</p>
                <p className="text-2xl font-bold text-white">
                  {users.filter(u => u.role === 'viewer').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="kortex-card">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="kortex-input pl-10 w-full"
            />
          </div>
        </div>

        {/* Role Permissions Info */}
        <div className="kortex-card">
          <h3 className="text-lg font-semibold text-white mb-4">Role Permissions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-[#1a1a1a] rounded-lg border border-red-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-red-400" />
                <span className="font-medium text-red-400">Admin</span>
              </div>
              <p className="text-sm text-gray-300">Full access to all features, user management, system settings</p>
            </div>
            <div className="p-4 bg-[#1a1a1a] rounded-lg border border-blue-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Edit className="h-5 w-5 text-blue-400" />
                <span className="font-medium text-blue-400">Editor</span>
              </div>
              <p className="text-sm text-gray-300">Can create and edit content, manage projects and services</p>
            </div>
            <div className="p-4 bg-[#1a1a1a] rounded-lg border border-green-500/20">
              <div className="flex items-center gap-2 mb-2">
                <User className="h-5 w-5 text-green-400" />
                <span className="font-medium text-green-400">Viewer</span>
              </div>
              <p className="text-sm text-gray-300">Read-only access to dashboard and analytics</p>
            </div>
          </div>
        </div>

        {/* Users List */}
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="kortex-card animate-pulse">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
                    <div>
                      <div className="h-4 bg-gray-700 rounded w-32 mb-2"></div>
                      <div className="h-3 bg-gray-700 rounded w-48"></div>
                    </div>
                  </div>
                  <div className="h-6 bg-gray-700 rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="kortex-card text-center py-12">
            <p className="text-gray-400 text-lg">No users found</p>
            <p className="text-gray-500 mt-2">Try adjusting your search term</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredUsers.map((user) => {
              const RoleIcon = getRoleIcon(user.role)
              const isCurrentUser = user.email === session?.user?.email
              
              return (
                <div key={user.id} className="kortex-card group">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold text-white">
                            {user.name || 'Unnamed User'}
                          </h3>
                          {isCurrentUser && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400">
                              You
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-300 mt-1">
                          <Mail className="h-4 w-4" />
                          <span>{user.email}</span>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                          </div>
                          {user.lastLogin && (
                            <div>
                              Last login {new Date(user.lastLogin).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <RoleIcon className="h-4 w-4" />
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </div>
                      
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEditUser(user)}
                          className="p-2 text-gray-400 hover:text-white hover:bg-[#2a2a2a] rounded-lg transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        {!isCurrentUser && (
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* User Modal */}
        {isModalOpen && (
          <UserModal
            user={editingUser}
            onSave={handleSaveUser}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </AdminLayout>
  )
}