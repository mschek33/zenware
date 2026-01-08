'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import {
  Home,
  Link2,
  LogOut,
  Menu,
  X,
  Copy,
  Check
} from 'lucide-react'

interface AffiliateLayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: 'Dashboard', href: '/affiliate', icon: Home },
  { name: 'My Referrals', href: '/affiliate/referrals', icon: Link2 },
]

export default function AffiliateLayout({ children }: AffiliateLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()

  const referralCode = session?.user?.referralCode || ''
  const referralLink = typeof window !== 'undefined'
    ? `${window.location.origin}/assessment?ref=${referralCode}`
    : ''

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/affiliate/login' })
  }

  const copyReferralLink = async () => {
    if (referralLink) {
      await navigator.clipboard.writeText(referralLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
        <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-zinc-200 shadow-xl">
          <div className="flex h-16 items-center justify-between px-4 border-b border-zinc-100">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                <Link2 className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-semibold text-zinc-900">Affiliate</span>
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
                      ? 'bg-green-50 text-green-700 shadow-sm'
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-green-600' : 'text-zinc-400'}`} />
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
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                <Link2 className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-semibold text-zinc-900">Affiliate</span>
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
                        ? 'bg-green-50 text-green-700 shadow-sm'
                        : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                    }`}
                  >
                    <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-green-600' : 'text-zinc-400'}`} />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
            <div className="p-3 space-y-3">
              {/* Referral Code Card */}
              <div className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
                <p className="text-xs text-green-600 font-medium mb-1">Your Referral Code</p>
                <code className="text-lg font-mono font-bold text-green-700">{referralCode}</code>
                <button
                  onClick={copyReferralLink}
                  className="mt-2 w-full flex items-center justify-center gap-2 px-3 py-2 bg-white text-green-600 rounded-lg text-sm font-medium hover:bg-green-50 transition-colors border border-green-200"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Referral Link
                    </>
                  )}
                </button>
              </div>

              {/* User Info */}
              <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                <p className="text-xs text-zinc-500">Logged in as</p>
                <p className="text-sm font-medium text-zinc-900 truncate">{session?.user?.name}</p>
                <p className="text-xs text-zinc-500 truncate">{session?.user?.email}</p>
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
                {navigation.find(item => item.href === pathname)?.name || 'Affiliate Portal'}
              </h1>
            </div>
            <div className="lg:hidden flex items-center">
              <button
                onClick={copyReferralLink}
                className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-600 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {referralCode}
              </button>
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
