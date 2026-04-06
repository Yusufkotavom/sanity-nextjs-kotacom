import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Check if Supabase is configured
export function isSupabaseConfigured() {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

// Fallback credentials
export const FALLBACK_CREDENTIALS = {
  email: 'admin@kotacom.id',
  password: 'admin123',
};
