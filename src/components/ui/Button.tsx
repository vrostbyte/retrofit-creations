/*
  Button — primary interactive element across the site.

  Variants (light-body theme, PRD v1.2.0):
    • primary   — solid blue bg, white text (CTAs — unchanged)
    • secondary — transparent, blue border, blue text (secondary actions)
    • ghost     — transparent with gray border and dark text for visibility on light bg

  Pass `href` to render as a Next.js <Link> instead of a <button>.
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

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand-blue text-white border border-brand-blue " +
    "hover:bg-brand-blue/90 hover:shadow-[0_0_20px_rgba(0,98,255,0.35)] " +
    "active:bg-brand-blue/80",
  secondary:
    "bg-transparent text-brand-blue border border-brand-blue " +
    "hover:bg-brand-blue/8 hover:shadow-[0_0_12px_rgba(0,98,255,0.2)] " +
    "active:bg-brand-blue/15",
  /* ghost: visible on light backgrounds — dark border, dark text, hover reveals blue */
  ghost:
    "bg-transparent text-gray-700 border border-gray-300 " +
    "hover:border-brand-blue hover:text-brand-blue hover:bg-brand-blue/5 " +
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
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 " +
    "disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none";

  const classes = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

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
