// ============================================================
// Next.js 16 Proxy (was "middleware" in v14-15)
// Runs on every request before the page renders.
// Handles:
//   1. Refreshing the Supabase auth session (keeps users logged in)
//   2. Protecting private routes (/account/*, /admin/*)
// ============================================================
import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function proxy(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request)
  const pathname = request.nextUrl.pathname

  // ── Protect /account/* routes ─────────────────────────────
  // Public pages like /account/login and /account/signup are exempt.
  const isAccountRoute = pathname.startsWith('/account')
  const isPublicAccountPage =
    pathname.startsWith('/account/login') ||
    pathname.startsWith('/account/signup') ||
    pathname.startsWith('/account/forgot-password')

  if (isAccountRoute && !isPublicAccountPage && !user) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/account/login'
    return NextResponse.redirect(loginUrl)
  }

  // ── Protect /admin/* routes ────────────────────────────────
  // Basic auth check here; admin ROLE is verified in the admin layout.
  if (pathname.startsWith('/admin') && !user) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/account/login'
    return NextResponse.redirect(loginUrl)
  }

  return supabaseResponse
}

// Only run on pages — skip static assets
export const proxyConfig = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
