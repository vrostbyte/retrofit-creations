/*
  Card — primary content container (light-body theme, PRD v1.2.0).

  Background: light gray #F8F8F8 (brand-surface)
  Border: light gray #E8E8E8 — clearly visible on white page background
  Hover: border shifts to blue at 30% opacity, subtle shadow lift
*/
import Link from "next/link";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
}

export default function Card({ children, className = "", href }: CardProps) {
  const base =
    "relative bg-[#F8F8F8] rounded-lg border border-[#E8E8E8] " +
    "transition-all duration-300 " +
    "hover:border-brand-blue/30 hover:shadow-[0_4px_20px_rgba(0,98,255,0.1)]";

  const classes = `${base} ${className}`;

  if (href) {
    return (
      <Link href={href} className={`${classes} block`}>
        {children}
      </Link>
    );
  }

  return <div className={classes}>{children}</div>;
}
