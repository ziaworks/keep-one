import { createClient } from '@supabase/supabase-js';

// Read from environment variables first
let supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
let supabaseKey = process.env.REACT_APP_SUPABASE_KEY || '';

// Fallback values for build/deployment (replace these with your actual values)
if (!supabaseUrl) supabaseUrl = 'https://your-project-id.supabase.co';
if (!supabaseKey) supabaseKey = 'your-anon-key-goes-here';

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey); 