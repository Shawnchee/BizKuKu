'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'
// import Chatbot from '@/components/chatbot/Chatbot'

interface ConditionalLayoutProps {
  children: React.ReactNode
}

const ConditionalLayout = ({ children }: ConditionalLayoutProps) => {
  const pathname = usePathname()
  
  // Hide header, footer, and chatbot on pre-login pages
  const isPreLoginPage = pathname === '/' || pathname === '/login' || pathname === '/avatar-onboarding'
  
  if (isPreLoginPage) {
    return <>{children}</>
  }
  
  return (
    <>
      <Header />
      <main className="flex-1">
        {children}
      </main>
      {/* <Chatbot /> */}
      <Footer />
    </>
  )
}

export default ConditionalLayout