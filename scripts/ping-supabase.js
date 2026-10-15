
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseKey) {
    console.error('Error: Required environment variables VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY are missing.');
    process.exit(1);
}
const supabase = createClient(supabaseUrl, supabaseKey);
async function ping() {
    console.log(`Pinging Supabase at ${supabaseUrl}...`);
    // Query 'categories' (or any table you have) just to create activity
    const { data, error } = await supabase.from('categories').select('id').limit(1);

    if (error) {
        console.error('Ping failed:', error.message);
        process.exit(1);
    }
    console.log('Ping successful! Database is active.');
}
ping();
