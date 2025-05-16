import { createClient } from '@supabase/supabase-js';

// Declare environment variables on window for TypeScript
declare global {
  interface Window {
    env?: {
      REACT_APP_SUPABASE_URL?: string;
      REACT_APP_SUPABASE_KEY?: string;
    };
  }
}

// Try multiple ways to get environment variables (most reliable first)
let supabaseUrl = '';
let supabaseKey = '';

// 1. Try window.env (if defined in index.html)
if (window.env?.REACT_APP_SUPABASE_URL) {
  supabaseUrl = window.env.REACT_APP_SUPABASE_URL;
}

if (window.env?.REACT_APP_SUPABASE_KEY) {
  supabaseKey = window.env.REACT_APP_SUPABASE_KEY;
}

// 2. Try process.env (Create React App standard)
if (!supabaseUrl && typeof process !== 'undefined' && process.env?.REACT_APP_SUPABASE_URL) {
  supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
}

if (!supabaseKey && typeof process !== 'undefined' && process.env?.REACT_APP_SUPABASE_KEY) {
  supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
}

// 3. Fallback to hardcoded values
if (!supabaseUrl) {
  supabaseUrl = 'https://ogwbagrukjgchivuutyc.supabase.co';
}

if (!supabaseKey) {
  supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9nd2JhZ3J1a2pnY2hpdnV1dHljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczNDEyNjUsImV4cCI6MjA2MjkxNzI2NX0.mTT8efgIWWto2i-EAGpc0Jf5KvURnE5w3sjtDhV-URw';
}

console.log('Supabase URL being used:', supabaseUrl.substring(0, 15) + '...');

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey); 