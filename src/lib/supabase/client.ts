// ============================================================
// Supabase BROWSER client
// Use this in Client Components (marked "use client").
//
// The ANON KEY is safe to expose in the browser because:
//   1. Row Level Security (RLS) policies control what each
//      user can actually read or write.
//   2. The anon key only grants "public" access — RLS still
//      enforces all our data access rules.
// ============================================================
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
