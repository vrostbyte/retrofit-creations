// ============================================================
// Supabase ADMIN (service role) client
// Use this ONLY in Server Actions and API Routes for operations
// that need to bypass RLS — for example, creating an order
// after payment or approving a testimonial.
//
// The SERVICE ROLE KEY has FULL database access and bypasses
// all Row Level Security rules. NEVER import this in any file
// that could run in the browser (no "use client" files).
// ============================================================
import { createClient } from '@supabase/supabase-js'

export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
