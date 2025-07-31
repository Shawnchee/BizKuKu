import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = 'https://kevxrrzclaimiirpbamz.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtldnhycnpjbGFpbWlpcnBiYW16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4ODMyOTcsImV4cCI6MjA2OTQ1OTI5N30.dGmUSLXizgRbhn8YsQY1zEEMKucVCxPpk4YsnxTjytc'

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Test connection function
export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase.from('users').select('count', { count: 'exact', head: true })
    if (error) {
      console.error('Supabase connection error:', error)
      return { success: false, error: error.message }
    }
    console.log('✅ Supabase connection successful!')
    return { success: true, data }
  } catch (err) {
    console.error('Connection test failed:', err)
    return { success: false, error: 'Connection failed' }
  }
}

// Get all tables
export async function getSupabaseTables() {
  try {
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
    
    if (error) {
      console.error('Error fetching tables:', error)
      return { success: false, error: error.message }
    }
    
    return { success: true, tables: data }
  } catch (err) {
    console.error('Error:', err)
    return { success: false, error: 'Failed to fetch tables' }
  }
}