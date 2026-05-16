/*
  Header — sticky top navigation bar present on all pages.

  Layout:
    Left   — Logo (RC Engraving logo, transparent variant)
    Center — Desktop nav links with active state
    Right  — Cart icon (with item count badge) + Account icon + Hamburger (mobile)

  Behavior:
    • Stays stuck to the top on scroll (position: sticky)
    • Adds a subtle dark blur on scroll for depth
    • On mobile: hides center nav, shows hamburger → opens MobileMenu
*/
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import MobileMenu from "./MobileMenu";

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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* Add a subtle shadow/border on scroll to separate header from content */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
                width={140}
                height={48}
                className="h-12 w-auto object-contain"
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
                    {/* Active underline indicator */}
                    {isActive && (
                      <span className="block h-0.5 bg-brand-blue mt-0.5 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* ── Right Controls ───────────────────────────────── */}
            <div className="flex items-center gap-2">
              {/* Cart — shows item count badge (will be wired in Phase 2) */}
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
                {/* Item count badge — hardcoded 0 until Phase 2 cart state */}
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-blue text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                  0
                </span>
              </Link>

              {/* Account */}
              <Link
                href="/account"
                aria-label="Your account"
                className="p-2 text-zinc-300 hover:text-brand-blue transition-colors rounded"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </Link>

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

      {/* Mobile slide-out drawer */}
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
