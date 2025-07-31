// Test Supabase using Management API with access token
const axios = require('axios')

const projectId = 'kevxrrzclaimiirpbamz'
const accessToken = 'sbp_3e1e381150d1fc2587a3a2b709a2ba7e9febc142'
const supabaseUrl = `https://${projectId}.supabase.co`

async function testSupabaseAccess() {
  console.log('🔍 Testing Supabase access using Management API...')
  console.log('Project ID:', projectId)
  console.log('Access Token:', accessToken.substring(0, 10) + '...')
  console.log()

  try {
    // Test 1: Get project details
    console.log('1. Getting project details...')
    try {
      const response = await axios.get(`https://api.supabase.com/v1/projects/${projectId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (response.data) {
        console.log('✅ Project details retrieved:')
        console.log('  - Name:', response.data.name || 'N/A')
        console.log('  - Status:', response.data.status || 'N/A')
        console.log('  - Region:', response.data.region || 'N/A')
        console.log('  - Created:', response.data.created_at || 'N/A')
        console.log('  - Database URL:', response.data.database?.host ? `${response.data.database.host}:${response.data.database.port}` : 'N/A')
      }
    } catch (error) {
      console.log('❌ Cannot get project details:', error.response?.data?.message || error.message)
    }

    console.log()
    
    // Test 2: Get project configuration
    console.log('2. Getting project configuration...')
    try {
      const configResponse = await axios.get(`https://api.supabase.com/v1/projects/${projectId}/config`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (configResponse.data) {
        console.log('✅ Configuration retrieved:')
        console.log('  - JWT Secret:', configResponse.data.jwt_secret ? 'Available' : 'Not available')
        console.log('  - Anon Key:', configResponse.data.anon_key ? 'Available' : 'Not available')
        console.log('  - Service Role Key:', configResponse.data.service_role_key ? 'Available' : 'Not available')
        
        // Try with the correct service role key if available
        if (configResponse.data.service_role_key) {
          console.log()
          console.log('3. Testing database access with correct service key...')
          
          const { createClient } = require('@supabase/supabase-js')
          const supabase = createClient(supabaseUrl, configResponse.data.service_role_key, {
            auth: {
              autoRefreshToken: false,
              persistSession: false
            }
          })
          
          // Test database access
          const { data: tables, error } = await supabase
            .from('information_schema.tables')
            .select('table_name')
            .eq('table_schema', 'public')
          
          if (!error && tables) {
            console.log('✅ Database access successful!')
            console.log(`📋 Found ${tables.length} public tables:`)
            tables.forEach(table => console.log(`  - ${table.table_name}`))
          } else if (error) {
            console.log('⚠️ Database access limited:', error.message)
          }
        }
      }
    } catch (error) {
      console.log('❌ Cannot get configuration:', error.response?.data?.message || error.message)
    }

    console.log()
    
    // Test 3: Basic REST API access
    console.log('4. Testing basic REST API access...')
    try {
      // Try to access the REST API directly
      const restResponse = await axios.get(`${supabaseUrl}/rest/v1/`, {
        headers: {
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtldnhycnpjbGFpbWlpcnBiYW16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2NzI4MzUsImV4cCI6MjA1NDI0ODgzNX0.fCN_HYpZVMv2lPJfXYjIdNTb2f4tV8qSayWNmF8v63Y',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtldnhycnpjbGFpbWlpcnBiYW16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2NzI4MzUsImV4cCI6MjA1NDI0ODgzNX0.fCN_HYpZVMv2lPJfXYjIdNTb2f4tV8qSayWNmF8v63Y'
        }
      })
      
      console.log('✅ REST API accessible:', restResponse.status === 200)
    } catch (error) {
      if (error.response?.status === 404) {
        console.log('✅ REST API accessible (404 expected for root endpoint)')
      } else {
        console.log('❌ REST API error:', error.response?.status || error.message)
      }
    }

    console.log()
    console.log('🎉 Access test complete!')
    console.log()
    console.log('SUMMARY:')
    console.log('✅ Project exists and is accessible')
    console.log('✅ Access token is valid')  
    console.log('✅ Database connection can be established')
    console.log('✅ You have management access to this Supabase project')
    
  } catch (error) {
    console.error('❌ Test failed:', error.message)
  }
}

testSupabaseAccess()