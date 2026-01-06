'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import {
  Home,
  Users,
  FolderOpen,
  Wrench,
  FileText,
  Mail,
  UserCheck,
  LogOut,
  Menu,
  X,
  ClipboardCheck
} from 'lucide-react'

interface AdminLayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: Home },
  { name: 'Assessments', href: '/admin/assessments', icon: ClipboardCheck },
  { name: 'Projects', href: '/admin/projects', icon: FolderOpen },
  { name: 'Services', href: '/admin/services', icon: Wrench },
  { name: 'Blog Posts', href: '/admin/blog-posts', icon: FileText },
  { name: 'Contacts', href: '/admin/contacts', icon: Mail },
  { name: 'Newsletters', href: '/admin/newsletters', icon: UserCheck },
  { name: 'Users', href: '/admin/users', icon: Users },
]

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/admin/login' })
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
        <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-zinc-200 shadow-xl">
          <div className="flex h-16 items-center justify-between px-4 border-b border-zinc-100">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-sm font-bold text-white">Z</span>
              </div>
              <span className="text-xl font-semibold text-zinc-900">Admin</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-zinc-400 hover:text-zinc-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="mt-6 px-3 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all ${
                    isActive
                      ? 'bg-purple-50 text-purple-700 shadow-sm'
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-purple-600' : 'text-zinc-400'}`} />
                  {item.name}
                </Link>
              )
            })}
          </nav>
          <div className="absolute bottom-4 left-3 right-3">
            <button
              onClick={handleSignOut}
              className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-xl transition-colors"
            >
              <LogOut className="mr-3 h-5 w-5 text-zinc-400" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col bg-white border-r border-zinc-200">
          <div className="flex h-16 items-center px-4 border-b border-zinc-100">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-sm font-bold text-white">Z</span>
              </div>
              <span className="text-xl font-semibold text-zinc-900">Admin</span>
            </div>
          </div>
          <div className="flex-1 flex flex-col">
            <nav className="flex-1 px-3 py-4 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all ${
                      isActive
                        ? 'bg-purple-50 text-purple-700 shadow-sm'
                        : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                    }`}
                  >
                    <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-purple-600' : 'text-zinc-400'}`} />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
            <div className="p-3">
              <div className="mb-3 p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                <p className="text-xs text-zinc-500">Logged in as</p>
                <p className="text-sm font-medium text-zinc-900 truncate">{session?.user?.email}</p>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-xl transition-colors"
              >
                <LogOut className="mr-3 h-5 w-5 text-zinc-400" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        <div className="sticky top-0 z-40 flex h-16 items-center bg-white/80 backdrop-blur-xl border-b border-zinc-200 px-4 lg:px-6">
          <button
            type="button"
            className="lg:hidden -ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-xl text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 focus:outline-none transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1 px-4 flex justify-between lg:px-0">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-zinc-900">
                {navigation.find(item => item.href === pathname)?.name || 'Admin Dashboard'}
              </h1>
            </div>
          </div>
        </div>
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 lg:px-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
