/*
  Card — the primary content container throughout the site.

  Design: dark background, subtle blue border at ~10-15% opacity.
  On hover: border brightens and a soft blue glow appears.

  Pass `href` to make the entire card a clickable link.
  Otherwise it renders as a plain div.
*/
import Link from "next/link";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
}

export default function Card({ children, className = "", href }: CardProps) {
  const base =
    "relative bg-black rounded-lg border border-brand-blue/15 " +
    "transition-all duration-300 " +
    "hover:border-brand-blue/50 hover:shadow-[0_0_24px_rgba(0,98,255,0.15)]";

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
