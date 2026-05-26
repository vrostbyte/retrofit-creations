// ============================================================
// Supabase SERVER client
// Use this in:
//   - Server Components (async functions without "use client")
//   - Server Actions ('use server' functions)
//   - API Route handlers (route.ts files)
//
// This client reads the user's session from cookies, so it
// automatically applies RLS policies for the logged-in user.
// NEVER import this in Client Components.
// ============================================================
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  // In Next.js 15+, cookies() returns a Promise
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // This is called from a Server Component where cookies
            // can't be set. The middleware handles session refresh,
            // so this is safe to ignore.
          }
        },
      },
    }
  )
}
