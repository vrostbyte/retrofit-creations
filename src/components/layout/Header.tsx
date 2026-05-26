/*
  Header — sticky top navigation bar with live auth state.

  Phase 2A changes:
    - Shows user's initials/name when logged in
    - Shows "Sign In" link when logged out
    - Shows "Admin" nav link for admin users
    - Logout button in user dropdown
*/
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import MobileMenu from "./MobileMenu";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/community", label: "Community" },
  { href: "/about", label: "About" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Subscribe to auth state changes
  useEffect(() => {
    const supabase = createClient();

    // Get initial session
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      if (user) checkAdminRole(user.id);
    });

    // Listen for login/logout events
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        checkAdminRole(currentUser.id);
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminRole = async (userId: string) => {
    const supabase = createClient();
    const { data } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .single();
    setIsAdmin(data?.role === "admin");
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUserMenuOpen(false);
    router.push("/");
    router.refresh();
  };

  // Add a subtle shadow on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Get user initials for the avatar button
  const userInitials = user?.user_metadata?.full_name
    ? user.user_metadata.full_name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : user?.email?.slice(0, 2).toUpperCase() ?? "??";

  return (
    <>
      <header
        className={`sticky top-0 z-30 w-full bg-brand-black/95 backdrop-blur-md transition-shadow duration-200
          ${scrolled ? "shadow-[0_1px_0_rgba(0,98,255,0.2)]" : "border-b border-brand-blue/10"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* ── Logo ─────────────────────────────────────────── */}
            <Link href="/" className="flex-shrink-0" aria-label="Retrofit Creations — Home">
              <Image
                src="/images/RC-Engraving-Logo.png"
                alt="Retrofit Creations"
                width={320}
                height={110}
                className="h-10 md:h-14 w-auto object-contain"
                priority
              />
            </Link>

            {/* ── Desktop Navigation ───────────────────────────── */}
            <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1">
              {navLinks.map(({ href, label }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`px-3 py-2 font-heading font-semibold text-sm uppercase tracking-widest rounded transition-colors duration-200
                      ${isActive
                        ? "text-brand-blue"
                        : "text-zinc-300 hover:text-brand-blue"
                      }`}
                  >
                    {label}
                    {isActive && (
                      <span className="block h-0.5 bg-brand-blue mt-0.5 rounded-full" />
                    )}
                  </Link>
                );
              })}
              {/* Admin link — only visible to admin users */}
              {isAdmin && (
                <Link
                  href="/admin"
                  className={`px-3 py-2 font-heading font-semibold text-sm uppercase tracking-widest rounded transition-colors duration-200
                    ${pathname.startsWith("/admin")
                      ? "text-brand-blue"
                      : "text-zinc-300 hover:text-brand-blue"
                    }`}
                >
                  Admin
                  {pathname.startsWith("/admin") && (
                    <span className="block h-0.5 bg-brand-blue mt-0.5 rounded-full" />
                  )}
                </Link>
              )}
            </nav>

            {/* ── Right Controls ───────────────────────────────── */}
            <div className="flex items-center gap-2">
              {/* Cart */}
              <Link
                href="/cart"
                aria-label="Shopping cart"
                className="relative p-2 text-zinc-300 hover:text-brand-blue transition-colors rounded"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-blue text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                  0
                </span>
              </Link>

              {/* Auth: user menu (logged in) or sign in link (logged out) */}
              {user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen((o) => !o)}
                    aria-label="Account menu"
                    aria-expanded={userMenuOpen}
                    className="w-8 h-8 rounded-full bg-brand-blue text-white text-xs font-bold font-heading flex items-center justify-center hover:opacity-90 transition-opacity"
                  >
                    {userInitials}
                  </button>

                  {/* Dropdown */}
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E8E8E8] rounded-lg shadow-lg py-1 z-50">
                      <div className="px-3 py-2 border-b border-[#E8E8E8]">
                        <p className="text-xs text-gray-400 font-body">Signed in as</p>
                        <p className="text-sm font-semibold text-black font-body truncate">{user.email}</p>
                      </div>
                      <Link
                        href="/account"
                        className="block px-3 py-2 text-sm text-gray-700 hover:text-brand-blue hover:bg-[#F8F8F8] font-body transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        My Account
                      </Link>
                      {isAdmin && (
                        <Link
                          href="/admin"
                          className="block px-3 py-2 text-sm text-gray-700 hover:text-brand-blue hover:bg-[#F8F8F8] font-body transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          Admin Panel
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 font-body transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/account/login"
                  aria-label="Sign in"
                  className="p-2 text-zinc-300 hover:text-brand-blue transition-colors rounded"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </Link>
              )}

              {/* Hamburger — mobile only */}
              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={mobileOpen}
                className="lg:hidden p-2 text-zinc-300 hover:text-brand-blue transition-colors rounded"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
            </div>

          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
