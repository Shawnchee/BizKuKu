'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Import types from our Supabase integration
export interface UserProfile {
  id: string
  email: string
  full_name?: string
  company_name?: string
  business_type?: string
  phone?: string
  address?: string
  city?: string
  state?: string
  postal_code?: string
  country?: string
  avatar_url?: string
  onboarding_completed?: boolean
  user_role?: string
  onboarding_step?: number
  profile_completion_score?: number
  verification_status?: string
  rekognition_id?: string
  password?: string
  last_active_date?: string
  created_at?: string
  updated_at?: string
}

export interface UserPreferences {
  id: string
  user_id: string
  preferred_language: 'en' | 'ms'
  theme: 'light' | 'dark' | 'auto'
  dashboard_layout: 'default' | 'compact' | 'detailed'
  currency_display: string
  show_recommendations: boolean
  show_financial_insights: boolean
  show_platform_suggestions: boolean
  preferred_communication: 'email' | 'sms' | 'push' | 'none'
  focus_areas: string[]
  email_notifications: boolean
  sms_notifications: boolean
  push_notifications: boolean
  marketing_emails: boolean
  created_at?: string
  updated_at?: string
}

export interface Business {
  id: string
  user_id: string
  business_name: string
  business_type: string
  registration_number?: string
  tax_number?: string
  industry?: string
  annual_revenue?: number
  employee_count?: number
  established_date?: string
  description?: string
  website?: string
  social_media?: Record<string, any>
  business_status?: string
  created_at?: string
  updated_at?: string
}

interface UserContextType {
  // User state
  user: UserProfile | null
  preferences: UserPreferences | null
  businesses: Business[]
  
  // Loading states
  loading: boolean
  initialLoading: boolean
  
  // Actions
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  loginWithUser: (user: UserProfile) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>
  updatePreferences: (updates: Partial<UserPreferences>) => Promise<{ success: boolean; error?: string }>
  
  // Utility functions
  isAuthenticated: boolean
  getUserDisplayName: () => string
  getUserGreeting: () => string
}

const UserContext = createContext<UserContextType | undefined>(undefined)

interface UserProviderProps {
  children: ReactNode
}

export function UserProvider({ children }: UserProviderProps) {
  // State
  const [user, setUser] = useState<UserProfile | null>(null)
  const [preferences, setPreferences] = useState<UserPreferences | null>(null)
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)

  // Initialize user context (check for existing session)
  useEffect(() => {
    // For now, we'll just set initialLoading to false
    // In the future, we can check for stored session data
    const timer = setTimeout(() => {
      setInitialLoading(false)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Mock user data for our three test accounts
  const mockUsers: Record<string, UserProfile> = {
    'ahmad.restaurant@bizkuku.com': {
      id: '11111111-1111-1111-1111-111111111111',
      email: 'ahmad.restaurant@bizkuku.com',
      full_name: 'Ahmad bin Hassan',
      company_name: 'Warung Ahmad Sedap',
      business_type: 'restaurant',
      phone: '+60123456789',
      address: '123 Jalan Makan, Taman Sedap',
      city: 'Kuala Lumpur',
      state: 'Selangor',
      postal_code: '50000',
      country: 'Malaysia',
      avatar_url: 'https://example.com/avatar-ahmad.jpg',
      onboarding_completed: true,
      user_role: 'business_owner',
      onboarding_step: 4,
      profile_completion_score: 95,
      verification_status: 'verified',
      rekognition_id: 'aws-rekognition-face-ahmad-001',
      password: 'password123'
    },
    'siti.retail@bizkuku.com': {
      id: '22222222-2222-2222-2222-222222222222', 
      email: 'siti.retail@bizkuku.com',
      full_name: 'Siti Nurhaliza',
      company_name: 'Butik Siti Fashion',
      business_type: 'retail',
      phone: '+60198765432',
      address: '456 Jalan Shopping, Taman Mode',
      city: 'Petaling Jaya',
      state: 'Selangor',
      postal_code: '47800',
      country: 'Malaysia',
      avatar_url: 'https://example.com/avatar-siti.jpg',
      onboarding_completed: true,
      user_role: 'business_owner',
      onboarding_step: 4,
      profile_completion_score: 88,
      verification_status: 'verified',
      rekognition_id: 'aws-rekognition-face-siti-002',
      password: 'password123'
    },
    'raj.tech@bizkuku.com': {
      id: '33333333-3333-3333-3333-333333333333',
      email: 'raj.tech@bizkuku.com', 
      full_name: 'Rajesh Kumar',
      company_name: 'TechSolutions Sdn Bhd',
      business_type: 'technology',
      phone: '+60176543210',
      address: '789 Jalan Teknologi, Cyber Valley',
      city: 'Cyberjaya',
      state: 'Selangor',
      postal_code: '63000',
      country: 'Malaysia',
      avatar_url: 'https://example.com/avatar-raj.jpg',
      onboarding_completed: true,
      user_role: 'business_owner',
      onboarding_step: 4,
      profile_completion_score: 92,
      verification_status: 'verified',
      rekognition_id: 'aws-rekognition-face-raj-003',
      password: 'password123'
    }
  }

  // Mock preferences for each user
  const mockPreferences: Record<string, UserPreferences> = {
    'ahmad.restaurant@bizkuku.com': {
      id: 'pref-111',
      user_id: '11111111-1111-1111-1111-111111111111',
      preferred_language: 'ms',
      theme: 'light',
      dashboard_layout: 'default',
      currency_display: 'MYR',
      show_recommendations: true,
      show_financial_insights: true,
      show_platform_suggestions: true,
      preferred_communication: 'email',
      focus_areas: ['loans', 'digitalization'],
      email_notifications: true,
      sms_notifications: false,
      push_notifications: true,
      marketing_emails: false
    },
    'siti.retail@bizkuku.com': {
      id: 'pref-222',
      user_id: '22222222-2222-2222-2222-222222222222',
      preferred_language: 'en',
      theme: 'light',
      dashboard_layout: 'compact',
      currency_display: 'MYR',
      show_recommendations: true,
      show_financial_insights: true,
      show_platform_suggestions: true,
      preferred_communication: 'sms',
      focus_areas: ['grants', 'compliance'],
      email_notifications: true,
      sms_notifications: true,
      push_notifications: true,
      marketing_emails: true
    },
    'raj.tech@bizkuku.com': {
      id: 'pref-333',
      user_id: '33333333-3333-3333-3333-333333333333',
      preferred_language: 'en',
      theme: 'dark',
      dashboard_layout: 'detailed',
      currency_display: 'MYR',
      show_recommendations: true,
      show_financial_insights: true,
      show_platform_suggestions: false,
      preferred_communication: 'email',
      focus_areas: ['digitalization', 'expansion'],
      email_notifications: true,
      sms_notifications: false,
      push_notifications: false,
      marketing_emails: false
    }
  }

  // Login function (email/password)
  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setLoading(true)
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Check if user exists in our mock data
      const mockUser = mockUsers[email]
      
      if (!mockUser || mockUser.password !== password) {
        return { success: false, error: 'Invalid email or password' }
      }
      
      // Set user data
      setUser(mockUser)
      setPreferences(mockPreferences[email])
      
      // TODO: Set businesses data when needed
      setBusinesses([])
      
      return { success: true }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: 'Login failed. Please try again.' }
    } finally {
      setLoading(false)
    }
  }

  // Login function (direct user object from face recognition)
  const loginWithUser = async (user: UserProfile): Promise<{ success: boolean; error?: string }> => {
    setLoading(true)
    
    try {
      // Set user data directly
      setUser(user)
      
      // Set preferences if available
      if (user.email && mockPreferences[user.email]) {
        setPreferences(mockPreferences[user.email])
      } else {
        // Create default preferences for the user
        const defaultPrefs: UserPreferences = {
          id: `pref-${user.id}`,
          user_id: user.id,
          preferred_language: 'en',
          theme: 'light',
          dashboard_layout: 'default',
          currency_display: 'MYR',
          show_recommendations: true,
          show_financial_insights: true,
          show_platform_suggestions: true,
          preferred_communication: 'email',
          focus_areas: [],
          email_notifications: true,
          sms_notifications: false,
          push_notifications: true,
          marketing_emails: false
        }
        setPreferences(defaultPrefs)
      }
      
      // TODO: Set businesses data when needed
      setBusinesses([])
      
      return { success: true }
    } catch (error) {
      console.error('Login with user error:', error)
      return { success: false, error: 'Login failed. Please try again.' }
    } finally {
      setLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    setUser(null)
    setPreferences(null)
    setBusinesses([])
  }

  // Update profile function
  const updateProfile = async (updates: Partial<UserProfile>): Promise<{ success: boolean; error?: string }> => {
    if (!user) return { success: false, error: 'No user logged in' }
    
    setLoading(true)
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Update user state
      setUser(prev => prev ? { ...prev, ...updates } : null)
      
      return { success: true }
    } catch (error) {
      console.error('Update profile error:', error)
      return { success: false, error: 'Failed to update profile' }
    } finally {
      setLoading(false)
    }
  }

  // Update preferences function
  const updatePreferences = async (updates: Partial<UserPreferences>): Promise<{ success: boolean; error?: string }> => {
    if (!user || !preferences) return { success: false, error: 'No user logged in' }
    
    setLoading(true)
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Update preferences state
      setPreferences(prev => prev ? { ...prev, ...updates } : null)
      
      return { success: true }
    } catch (error) {
      console.error('Update preferences error:', error)
      return { success: false, error: 'Failed to update preferences' }
    } finally {
      setLoading(false)
    }
  }

  // Utility functions
  const isAuthenticated = !!user

  const getUserDisplayName = (): string => {
    if (!user) return 'Guest'
    return user.full_name || user.email.split('@')[0] || 'User'
  }

  const getUserGreeting = (): string => {
    if (!user) return 'Welcome!'
    
    const name = user.full_name?.split(' ')[0] || user.email.split('@')[0]
    const businessType = user.business_type
    
    // Personalized greetings based on business type and language
    const isMs = preferences?.preferred_language === 'ms'
    
    if (businessType === 'restaurant') {
      return isMs ? `Selamat datang, Chef ${name}!` : `Welcome, Chef ${name}!`
    } else if (businessType === 'retail') {
      return isMs ? `Selamat datang, ${name}!` : `Welcome, ${name}!`
    } else if (businessType === 'technology') {
      return isMs ? `Selamat datang, ${name}!` : `Welcome, ${name}!`
    }
    
    return isMs ? `Selamat datang, ${name}!` : `Welcome, ${name}!`
  }

  const contextValue: UserContextType = {
    // State
    user,
    preferences,
    businesses,
    loading,
    initialLoading,
    
    // Actions
    login,
    loginWithUser,
    logout,
    updateProfile,
    updatePreferences,
    
    // Utilities
    isAuthenticated,
    getUserDisplayName,
    getUserGreeting
  }

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  )
}

// Custom hook to use the UserContext
export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}