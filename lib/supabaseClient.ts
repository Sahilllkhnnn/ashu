import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://qzulyczmsjztymaiiwmc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6dWx5Y3ptc2p6dHltYWlpd21jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg3MjU0MDUsImV4cCI6MjA4NDMwMTQwNX0.qBITi2VBbAINgd1jJ71rupMnW_bGIYdji2uoAUf-ZIw';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
