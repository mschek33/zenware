'use client'

import { createContext, useContext, useEffect, useState, ReactNode, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

interface ReferralContextType {
  referralCode: string | null
  clearReferralCode: () => void
}

const ReferralContext = createContext<ReferralContextType>({
  referralCode: null,
  clearReferralCode: () => {},
})

const REFERRAL_STORAGE_KEY = 'zenware_referral_code'
const REFERRAL_EXPIRY_DAYS = 30

function ReferralProviderInner({ children }: { children: ReactNode }) {
  const [referralCode, setReferralCode] = useState<string | null>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check URL for ?ref= parameter
    const urlCode = searchParams.get('ref')

    if (urlCode) {
      // Store in localStorage with expiry
      const expiryDate = new Date()
      expiryDate.setDate(expiryDate.getDate() + REFERRAL_EXPIRY_DAYS)

      try {
        localStorage.setItem(REFERRAL_STORAGE_KEY, JSON.stringify({
          code: urlCode.toUpperCase(),
          expiry: expiryDate.toISOString(),
        }))
      } catch {
        // localStorage might not be available
      }

      setReferralCode(urlCode.toUpperCase())
    } else {
      // Check localStorage for existing code
      try {
        const stored = localStorage.getItem(REFERRAL_STORAGE_KEY)
        if (stored) {
          const { code, expiry } = JSON.parse(stored)
          if (new Date(expiry) > new Date()) {
            setReferralCode(code)
          } else {
            localStorage.removeItem(REFERRAL_STORAGE_KEY)
          }
        }
      } catch {
        // Ignore localStorage errors
      }
    }
  }, [searchParams])

  const clearReferralCode = () => {
    try {
      localStorage.removeItem(REFERRAL_STORAGE_KEY)
    } catch {
      // Ignore localStorage errors
    }
    setReferralCode(null)
  }

  return (
    <ReferralContext.Provider value={{ referralCode, clearReferralCode }}>
      {children}
    </ReferralContext.Provider>
  )
}

export default function ReferralProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null}>
      <ReferralProviderInner>{children}</ReferralProviderInner>
    </Suspense>
  )
}

export function useReferral() {
  return useContext(ReferralContext)
}
