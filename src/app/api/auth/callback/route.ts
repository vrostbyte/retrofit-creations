// ============================================================
// Auth Callback Route
// Handles the redirect after email confirmation links.
// When a user clicks "Confirm your email" in their inbox,
// Supabase redirects them here with a one-time code.
// We exchange that code for a real session, then redirect
// the user to their account dashboard.
// ============================================================
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/account'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // Something went wrong — send them back to login with an error flag
  return NextResponse.redirect(`${origin}/account/login?error=auth_callback_failed`)
}
