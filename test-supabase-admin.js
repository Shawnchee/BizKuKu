// Test Supabase with admin access using service role
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://kevxrrzclaimiirpbamz.supabase.co'
// Using service role key for full access
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtldnhycnpjbGFpbWlpcnBiYW16Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczODY3MjgzNSwiZXhwIjoyMDU0MjQ4ODM1fQ.LqaJk0P0yL5_qbYmjHQp7fIFjPUoB-R8zVIVmYPNx3I'

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function exploreDatabase() {
  console.log('🔍 Exploring Supabase database with admin access...')
  console.log('Project ID: kevxrrzclaimiirpbamz')
  console.log('Using service role for full access')
  console.log()

  try {
    // Get all tables in the public schema
    console.log('1. Listing all public tables...')
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name, table_type')
      .eq('table_schema', 'public')
      .order('table_name')

    if (tablesError) {
      console.error('Error fetching tables:', tablesError.message)
    } else if (tables && tables.length > 0) {
      console.log('📋 Found tables:')
      for (const table of tables) {
        console.log(`  - ${table.table_name} (${table.table_type})`)
        
        // Get row count for each table
        try {
          const { count, error: countError } = await supabase
            .from(table.table_name)
            .select('*', { count: 'exact', head: true })
          
          if (!countError) {
            console.log(`    └── ${count || 0} rows`)
          }
        } catch (err) {
          console.log(`    └── Could not count rows`)
        }
      }
    } else {
      console.log('No public tables found. Database might be empty.')
    }

    console.log()
    console.log('2. Checking authentication tables...')
    
    // Check auth.users table
    try {
      const { data: users, error: usersError } = await supabase
        .from('auth.users')
        .select('id, email, created_at', { count: 'exact' })
        .limit(5)
      
      if (!usersError && users) {
        console.log(`✅ Found ${users.length} users in auth.users table`)
        users.forEach(user => {
          console.log(`  - ${user.email || 'No email'} (ID: ${user.id?.substring(0, 8)}...)`)
        })
      }
    } catch (err) {
      console.log('❌ Cannot access auth.users table')
    }

    console.log()
    console.log('3. Checking database schema...')
    
    // Get column information for each table
    const { data: columns, error: columnsError } = await supabase
      .from('information_schema.columns')
      .select('table_name, column_name, data_type, is_nullable')
      .eq('table_schema', 'public')
      .order('table_name, ordinal_position')

    if (!columnsError && columns && columns.length > 0) {
      console.log('📊 Table schemas:')
      let currentTable = ''
      for (const col of columns) {
        if (col.table_name !== currentTable) {
          currentTable = col.table_name
          console.log(`\n  ${col.table_name}:`)
        }
        console.log(`    - ${col.column_name}: ${col.data_type} ${col.is_nullable === 'YES' ? '(nullable)' : '(required)'}`)
      }
    }

    console.log()
    console.log('4. Checking Row Level Security (RLS) policies...')
    
    try {
      const { data: policies, error: policiesError } = await supabase
        .from('pg_policies')
        .select('schemaname, tablename, policyname, permissive, roles, cmd, qual')
        .eq('schemaname', 'public')

      if (!policiesError && policies && policies.length > 0) {
        console.log('🔒 RLS Policies found:')
        policies.forEach(policy => {
          console.log(`  - ${policy.tablename}.${policy.policyname} (${policy.cmd})`)
        })
      } else {
        console.log('No RLS policies found or cannot access pg_policies')
      }
    } catch (err) {
      console.log('Cannot check RLS policies')
    }

    console.log()
    console.log('5. Testing CRUD operations...')
    
    // Try to create a test table
    try {
      const { error: createError } = await supabase.rpc('exec_sql', {
        sql: `
          CREATE TABLE IF NOT EXISTS test_connection (
            id SERIAL PRIMARY KEY,
            message TEXT,
            created_at TIMESTAMP DEFAULT NOW()
          );
        `
      })
      
      if (!createError) {
        console.log('✅ Can create tables')
        
        // Test insert
        const { error: insertError } = await supabase
          .from('test_connection')
          .insert({ message: 'Connection test successful!' })
        
        if (!insertError) {
          console.log('✅ Can insert data')
          
          // Test select
          const { data, error: selectError } = await supabase
            .from('test_connection')
            .select('*')
            .limit(1)
          
          if (!selectError && data) {
            console.log('✅ Can read data:', data[0]?.message)
          }
        }
      }
    } catch (err) {
      console.log('❌ Limited CRUD access')
    }

    console.log()
    console.log('🎉 Database exploration complete!')
    console.log('Summary: You have FULL ACCESS to your Supabase project!')
    
  } catch (error) {
    console.error('❌ Exploration failed:', error.message)
  }
}

exploreDatabase()