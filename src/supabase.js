import { createClient } from '@supabase/supabase-js';

// VITE env vars will be used if available, otherwise fallback to the hardcoded keys provided.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xpphezupnppdwxcnwfhi.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhwcGhlenVwbnBwZHd4Y253ZmhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg3NDQ3NTYsImV4cCI6MjA4NDMyMDc1Nn0.q_VeNGEmT1AzpxOzHpvJIIFw6Uk3YCevepbeSYKo9FM';

export const supabase = createClient(supabaseUrl, supabaseKey);