import { createClient } from '@supabase/supabase-js'

export const config = {
  runtime: 'edge', // Using Edge runtime for faster response and lower cost
}

export default async function handler(req: Request) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL
  const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables')
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Server configuration error' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Perform a low-cost query to portfolio_info to ensure database activity
    // portfolio_info is a reliable table in this database schema
    const { data, error } = await supabase
      .from('portfolio_info')
      .select('id')
      .limit(1)

    if (error) {
      console.error('Supabase query error:', error.message)
      return new Response(JSON.stringify({ 
        success: false, 
        error: error.message 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({
      success: true,
      timestamp: new Date().toISOString(),
      message: 'Database keep-alive ping successful'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('Unexpected error during keep-alive ping:', err)
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Internal server error' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
