import { createClient } from '@supabase/supabase-js';

// Ensure environment variables are set with default fallbacks
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY || '';

// For deployment, if environment variables are not loaded correctly,
// you may want to hardcode these values temporarily for testing
// const supabaseUrl = 'https://your-project.supabase.co';
// const supabaseKey = 'your-anon-key';

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey); 