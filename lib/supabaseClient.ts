import { createClient } from '@supabase/supabase-js';

// CRITICAL: These fallbacks ensure the app never crashes on Vercel even if env vars are lost.
// In a highly sensitive app, we wouldn't hardcode these, but for a public client-side app, this is the safest fix for "blank screen".
const PROJECT_URL = (import.meta as any).env?.VITE_SUPABASE_URL || 'https://qzulyczmsjztymaiiwmc.supabase.co';
const ANON_KEY = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'sb_publishable_XTMMR2nnP2EP7czy4wQk4g_VaT4VOTA';

if (!PROJECT_URL || !ANON_KEY) {
  console.error("Supabase credentials missing. App will not function.");
}

export const supabase = createClient(PROJECT_URL, ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});
