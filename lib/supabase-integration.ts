import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = 'https://kevxrrzclaimiirpbamz.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtldnhycnpjbGFpbWlpcnBiYW16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4ODMyOTcsImV4cCI6MjA2OTQ1OTI5N30.dGmUSLXizgRbhn8YsQY1zEEMKucVCxPpk4YsnxTjytc'

// Create Supabase client
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Type definitions for better TypeScript support
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
  onboarding_completed: boolean
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
  social_media?: any
  business_status: string
  created_at?: string
  updated_at?: string
}

export interface FinancialRecord {
  id: string
  business_id: string
  record_type: 'income' | 'expense' | 'asset' | 'liability'
  category: string
  amount: number
  currency: string
  description?: string
  transaction_date: string
  receipt_url?: string
  tags?: string[]
  created_at?: string
  updated_at?: string
}

export interface LoanApplication {
  id: string
  business_id: string
  loan_type: string
  requested_amount: number
  currency: string
  purpose: string
  application_status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected'
  application_data?: any
  documents?: any
  lender_info?: any
  approval_date?: string
  disbursement_date?: string
  created_at?: string
  updated_at?: string
}

export interface FaceVerification {
  id: string
  user_id: string
  verification_type: 'blink' | 'head_turn' | 'nod'
  verification_status: 'passed' | 'failed'
  confidence_score?: number
  face_image_url?: string
  session_token?: string
  ip_address?: string
  user_agent?: string
  created_at?: string
}

// Authentication functions
export const auth = {
  // Sign up new user
  async signUp(email: string, password: string, userData?: Partial<UserProfile>) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    })
    return { data, error }
  },

  // Sign in user
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  // Sign out user
  async signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Get current user
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  // Get current session
  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession()
    return { session, error }
  }
}

// User Profile functions
export const userProfiles = {
  // Create or update user profile
  async upsert(profile: Partial<UserProfile>) {
    const { data, error } = await supabase
      .from('user_profiles')
      .upsert(profile)
      .select()
      .single()
    return { data, error }
  },

  // Get user profile by ID
  async getById(id: string) {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', id)
      .single()
    return { data, error }
  },

  // Get current user's profile
  async getCurrent() {
    const { user } = await auth.getCurrentUser()
    if (!user) return { data: null, error: { message: 'Not authenticated' } }
    
    return await this.getById(user.id)
  },

  // Update profile
  async update(id: string, updates: Partial<UserProfile>) {
    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    return { data, error }
  }
}

// Business functions
export const businesses = {
  // Create new business
  async create(business: Omit<Business, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('businesses')
      .insert(business)
      .select()
      .single()
    return { data, error }
  },

  // Get user's businesses
  async getUserBusinesses(userId: string) {
    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  // Get business by ID
  async getById(id: string) {
    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .eq('id', id)
      .single()
    return { data, error }
  },

  // Update business
  async update(id: string, updates: Partial<Business>) {
    const { data, error } = await supabase
      .from('businesses')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    return { data, error }
  }
}

// Financial Records functions
export const financialRecords = {
  // Create financial record
  async create(record: Omit<FinancialRecord, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('financial_records')
      .insert(record)
      .select()
      .single()
    return { data, error }
  },

  // Get records for a business
  async getByBusiness(businessId: string, filters?: {
    type?: string
    category?: string
    dateFrom?: string
    dateTo?: string
  }) {
    let query = supabase
      .from('financial_records')
      .select('*')
      .eq('business_id', businessId)
      .order('transaction_date', { ascending: false })

    if (filters?.type) {
      query = query.eq('record_type', filters.type)
    }
    if (filters?.category) {
      query = query.eq('category', filters.category)
    }
    if (filters?.dateFrom) {
      query = query.gte('transaction_date', filters.dateFrom)
    }
    if (filters?.dateTo) {
      query = query.lte('transaction_date', filters.dateTo)
    }

    const { data, error } = await query
    return { data, error }
  },

  // Get financial summary
  async getSummary(businessId: string, dateFrom?: string, dateTo?: string) {
    let query = supabase
      .from('financial_records')
      .select('record_type, amount')
      .eq('business_id', businessId)

    if (dateFrom) query = query.gte('transaction_date', dateFrom)
    if (dateTo) query = query.lte('transaction_date', dateTo)

    const { data, error } = await query

    if (error) return { data: null, error }

    // Calculate summary
    const summary = data?.reduce((acc, record) => {
      if (record.record_type === 'income') {
        acc.totalIncome += record.amount
      } else if (record.record_type === 'expense') {
        acc.totalExpenses += record.amount
      }
      return acc
    }, { totalIncome: 0, totalExpenses: 0, netIncome: 0 })

    if (summary) {
      summary.netIncome = summary.totalIncome - summary.totalExpenses
    }

    return { data: summary, error: null }
  }
}

// Loan Applications functions
export const loanApplications = {
  // Create loan application
  async create(application: Omit<LoanApplication, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('loan_applications')
      .insert(application)
      .select()
      .single()
    return { data, error }
  },

  // Get applications for a business
  async getByBusiness(businessId: string) {
    const { data, error } = await supabase
      .from('loan_applications')
      .select('*')
      .eq('business_id', businessId)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  // Update application
  async update(id: string, updates: Partial<LoanApplication>) {
    const { data, error } = await supabase
      .from('loan_applications')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    return { data, error }
  }
}

// Face Verification functions
export const faceVerifications = {
  // Record face verification attempt
  async create(verification: Omit<FaceVerification, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('face_verifications')
      .insert(verification)
      .select()
      .single()
    return { data, error }
  },

  // Get user's verification history
  async getUserHistory(userId: string, limit: number = 10) {
    const { data, error } = await supabase
      .from('face_verifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)
    return { data, error }
  },

  // Get verification statistics
  async getStats(userId: string) {
    const { data, error } = await supabase
      .from('face_verifications')
      .select('verification_type, verification_status')
      .eq('user_id', userId)

    if (error) return { data: null, error }

    const stats = data?.reduce((acc, record) => {
      const type = record.verification_type
      const status = record.verification_status
      
      if (!acc[type]) {
        acc[type] = { passed: 0, failed: 0, total: 0 }
      }
      
      acc[type][status]++
      acc[type].total++
      
      return acc
    }, {} as Record<string, { passed: number, failed: number, total: number }>)

    return { data: stats, error: null }
  }
}

// Utility functions
export const utils = {
  // Test database connection
  async testConnection() {
    try {
      const { data, error } = await supabase.from('user_profiles').select('count', { count: 'exact', head: true })
      return { success: !error, error: error?.message }
    } catch (err) {
      return { success: false, error: 'Connection failed' }
    }
  },

  // Check if user has completed onboarding
  async checkOnboardingStatus(userId: string) {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('onboarding_completed')
      .eq('id', userId)
      .single()
    
    return { 
      completed: data?.onboarding_completed || false, 
      error 
    }
  },

  // Get user's business count
  async getUserBusinessCount(userId: string) {
    const { count, error } = await supabase
      .from('businesses')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
    
    return { count: count || 0, error }
  }
}

// Export default client
export default supabase