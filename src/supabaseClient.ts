import { createClient } from '@supabase/supabase-js';

// Read from environment variables first
let supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
let supabaseKey = process.env.REACT_APP_SUPABASE_KEY || '';

// Fallback values for build/deployment (replace these with your actual values)
if (!supabaseUrl) supabaseUrl = 'https://ogwbagrukjgchivuutyc.supabase.co';
if (!supabaseKey) supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9nd2JhZ3J1a2pnY2hpdnV1dHljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczNDEyNjUsImV4cCI6MjA2MjkxNzI2NX0.mTT8efgIWWto2i-EAGpc0Jf5KvURnE5w3sjtDhV-URw';

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey); 