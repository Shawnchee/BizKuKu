'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'

interface ConditionalLayoutProps {
  children: React.ReactNode
}

const ConditionalLayout = ({ children }: ConditionalLayoutProps) => {
  const pathname = usePathname()
  
  const isPreLoginPage = pathname === '/' || pathname === '/login' || pathname === '/avatar-onboarding'
  
  if (isPreLoginPage) {
    return <>{children}</>
  }

  return (
    <div className="flex flex-col min-h-screen"> {/* ✅ Full height flex container */}
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default ConditionalLayout
