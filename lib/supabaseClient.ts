import { createClient } from '@supabase/supabase-js';

// Access environment variables safely for Vite
const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || 'https://qzulyczmsjztymaiiwmc.supabase.co';
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'sb_publishable_XTMMR2nnP2EP7czy4wQk4g_VaT4VOTA';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase configuration missing!');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);