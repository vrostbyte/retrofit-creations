/*
  Button — the primary interactive element across the site.

  Three variants match the brand system:
    • primary   — solid blue background, white text (main CTAs)
    • secondary — transparent with blue border (secondary actions)
    • ghost     — invisible until hovered (nav-level or subtle actions)

  Pass `href` to render as a Next.js <Link> instead of a <button>,
  so the same component handles both navigation and form actions.

  Usage:
    <Button variant="primary" size="lg" href="/contact">Get a Quote</Button>
    <Button variant="secondary" onClick={handleClick}>Learn More</Button>
*/
"use client";

import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  children: React.ReactNode;
  className?: string;
}

/* Variant styles — always use brand-blue (#0062FF) and adjust opacity for effects */
const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand-blue text-brand-white border border-brand-blue " +
    "hover:bg-brand-blue/90 hover:shadow-[0_0_20px_rgba(0,98,255,0.4)] " +
    "active:bg-brand-blue/80",
  secondary:
    "bg-transparent text-brand-blue border border-brand-blue " +
    "hover:bg-brand-blue/10 hover:shadow-[0_0_16px_rgba(0,98,255,0.25)] " +
    "active:bg-brand-blue/20",
  ghost:
    "bg-transparent text-brand-white border border-transparent " +
    "hover:border-brand-blue/50 hover:text-brand-blue hover:bg-brand-blue/5 " +
    "active:bg-brand-blue/10",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-heading font-semibold " +
    "uppercase tracking-widest rounded transition-all duration-200 " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black " +
    "disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none";

  const classes = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  /* Render as a link when href is provided */
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
