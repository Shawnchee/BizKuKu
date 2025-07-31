
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/contexts/UserContext'
import PreLoginHome from '@/components/auth/PreLoginHome'

export default function Home() {
  const { isAuthenticated, initialLoading } = useUser()
  const router = useRouter()
  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (!initialLoading && isAuthenticated) {
      router.push('/home') // or '/dashboard' - whichever you prefer for the main dashboard
    }
  }, [isAuthenticated, initialLoading, router])

  // Show loading state while checking authentication
  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Show PreLoginHome for unauthenticated users
  if (!isAuthenticated) {
    return <PreLoginHome />
  }

  // This shouldn't be reached due to the redirect, but just in case
  return null
}
