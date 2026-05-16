/*
  MobileMenu — slide-out navigation drawer for mobile screens.

  Opens from the right side. A dark overlay covers the page behind it.
  All nav links are included with the same structure as the desktop header.

  The parent (Header) controls open/closed state via the `isOpen` prop
  and the `onClose` callback.
*/
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/community", label: "Community" },
  { href: "/about", label: "About" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  /* Lock body scroll while drawer is open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* Close on route change */
  useEffect(() => {
    onClose();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      {/* Dark overlay behind the drawer */}
      <div
        className={`fixed inset-0 z-40 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out drawer */}
      <nav
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`fixed top-0 right-0 z-50 h-full w-72 max-w-[85vw] bg-zinc-950 border-l border-brand-blue/20
          flex flex-col transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-brand-blue/20">
          <span className="font-heading font-bold text-brand-white uppercase tracking-widest text-lg">
            Menu
          </span>
          <button
            onClick={onClose}
            aria-label="Close navigation menu"
            className="p-2 text-zinc-400 hover:text-brand-blue transition-colors rounded"
          >
            {/* X icon */}
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <ul className="flex flex-col px-4 py-6 gap-1 flex-1">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`block px-4 py-3 font-heading font-semibold uppercase tracking-widest text-sm rounded transition-colors duration-200
                    ${isActive
                      ? "text-brand-blue bg-brand-blue/10"
                      : "text-zinc-300 hover:text-brand-blue hover:bg-brand-blue/5"
                    }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Bottom CTA */}
        <div className="px-6 pb-8 border-t border-brand-blue/20 pt-6">
          <Link
            href="/contact"
            className="block w-full text-center py-3 bg-brand-blue text-white font-heading font-semibold uppercase tracking-widest text-sm rounded
              hover:bg-brand-blue/90 transition-colors"
          >
            Get a Free Quote
          </Link>
        </div>
      </nav>
    </>
  );
}
