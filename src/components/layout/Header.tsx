'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, UserCircle, User, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NavItem } from '@/lib/types'
import { useLanguage } from '@/contexts/LanguageContext'
import { useUser } from '@/contexts/UserContext'
import LanguageToggle from '@/components/ui/LanguageToggle'

const navigation: NavItem[] = [
  { name: 'nav.home', href: '/home' },
  { name: 'nav.application-status', href: '/application-status' },
  { name: 'nav.online-bizzku', href: '/online-bizzku' },
  { name: 'nav.mini-services', href: '/mini-services' },
  { name: 'nav.dashboard', href: '/dashboard' },
  { name: 'nav.recommendation', href: '/recommendation' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const { t } = useLanguage()
  const { user, isAuthenticated, logout, getUserDisplayName } = useUser()
  const router = useRouter()

  const isActive = (href: string) => pathname.startsWith(href)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-6" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center -ml-4">
            <Link href="/" className="flex items-center space-x-2">
              <img
                src="/logo.png"
                alt="BizzKu Logo"
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 ml-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200 whitespace-nowrap',
                  isActive(item.href)
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                )}
              >
                {t(item.name)}
              </Link>
            ))}

            {/* Language and Profile Icons */}
            <div className="flex items-center space-x-2 ml-4">
              <div>
                <LanguageToggle />
              </div>
              <div className="relative" ref={profileRef}>
                {isAuthenticated ? (
                  <>
                    <button
                      onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                      className="flex items-center space-x-2 rounded-full p-1 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {user?.avatar_url ? (
                        <img 
                          src={user.avatar_url} 
                          alt={getUserDisplayName()} 
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                          <span className="text-white text-sm font-semibold">
                            {getUserDisplayName().charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <span className="hidden md:block text-sm font-medium text-gray-700 max-w-24 truncate">
                        {getUserDisplayName()}
                      </span>
                    </button>

                    {profileMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900 truncate">{getUserDisplayName()}</p>
                          <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                          {user?.company_name && (
                            <p className="text-xs text-blue-600 truncate">{user.company_name}</p>
                          )}
                        </div>
                        <button
                          onClick={() => {
                            setProfileMenuOpen(false)
                            // TODO: Navigate to profile page when created
                            console.log('Navigate to profile page')
                          }}
                          className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <User className="h-4 w-4 mr-2" />
                          Profile Settings
                        </button>
                        <button
                          onClick={() => {
                            setProfileMenuOpen(false)
                            logout()
                            router.push('/') // Redirect to login
                          }}
                          className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign out
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => router.push('/login')}
                    className="rounded-full p-1 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <UserCircle className="h-7 w-7 text-gray-700" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 whitespace-nowrap',
                    isActive(item.href)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t(item.name)}
                </Link>
              ))}

              <div className="px-3 py-2">
                <LanguageToggle />
              </div>

              <div className="px-3 py-2">
                <button
                  onClick={() => router.push('/login')}
                  className="block w-full text-left text-sm text-gray-700 hover:bg-gray-100 px-3 py-2"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
