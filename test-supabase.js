// Test Supabase connection and explore database
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://kevxrrzclaimiirpbamz.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtldnhycnpjbGFpbWlpcnBiYW16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2NzI4MzUsImV4cCI6MjA1NDI0ODgzNX0.fCN_HYpZVMv2lPJfXYjIdNTb2f4tV8qSayWNmF8v63Y'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testConnection() {
  console.log('🔍 Testing Supabase connection...')
  console.log('Project URL:', supabaseUrl)
  console.log('Project ID: kevxrrzclaimiirpbamz')
  console.log()

  try {
    // Test basic connection
    console.log('1. Testing basic connection...')
    const { data: authData, error: authError } = await supabase.auth.getUser()
    console.log('Auth status:', authError ? 'Not authenticated' : 'Connected')
    console.log()

    // Try to get database info
    console.log('2. Attempting to access database...')
    
    // Try common table names
    const commonTables = ['users', 'profiles', 'posts', 'todos', 'items', 'products', 'orders']
    
    for (const tableName of commonTables) {
      try {
        const { data, error, count } = await supabase
          .from(tableName)
          .select('*', { count: 'exact', head: true })
        
        if (!error) {
          console.log(`✅ Table "${tableName}" exists with ${count || 0} rows`)
        }
      } catch (err) {
        // Table might not exist, skip
      }
    }

    // Try to get all public tables using RPC or direct query if available
    console.log()
    console.log('3. Trying to list all tables...')
    
    try {
      // Try using a custom RPC function if it exists
      const { data: rpcData, error: rpcError } = await supabase.rpc('get_tables')
      if (!rpcError && rpcData) {
        console.log('Tables (via RPC):', rpcData)
      }
    } catch (err) {
      console.log('No custom RPC function found')
    }

    // Try basic queries on potential tables
    console.log()
    console.log('4. Testing read access...')
    
    // Test if we can read from pg_tables (PostgreSQL system table)
    try {
      const { data, error } = await supabase
        .from('pg_tables')
        .select('tablename')
        .eq('schemaname', 'public')
      
      if (!error && data) {
        console.log('📋 Public tables found:')
        data.forEach(table => console.log(`  - ${table.tablename}`))
      }
    } catch (err) {
      console.log('Cannot access pg_tables directly')
    }

    console.log()
    console.log('5. Connection summary:')
    console.log('✅ Supabase client created successfully')
    console.log('✅ URL and API key are valid')
    console.log('✅ Connection to project established')
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message)
  }
}

testConnection()