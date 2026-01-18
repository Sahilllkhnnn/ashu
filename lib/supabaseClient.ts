import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://qzulyczmsjztymaiiwmc.supabase.co';
// REPLACE WITH YOUR ACTUAL ANON KEY FROM SUPABASE DASHBOARD
// In a real Vite app, you would use import.meta.env.VITE_SUPABASE_ANON_KEY
const SUPABASE_ANON_KEY = 'PUT_YOUR_SUPABASE_ANON_KEY_HERE';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
