/*
  Badge — small label for categories, statuses, and project types.
  Light-body theme (PRD v1.2.0) — all variants readable on #F8F8F8 cards.

  Variants:
    • default  — blue bg at low opacity, blue text (primary categories)
    • outline  — blue border, blue text, transparent bg
    • success  — green tones (completed, shipped)
    • warning  — amber tones (pending, in-review)
*/
type BadgeVariant = "default" | "outline" | "success" | "warning";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-brand-blue/10 text-brand-blue border border-brand-blue/30",
  outline: "bg-transparent text-brand-blue border border-brand-blue/40",
  success: "bg-green-50 text-green-700 border border-green-200",
  warning: "bg-amber-50 text-amber-700 border border-amber-200",
};

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={
        `inline-flex items-center px-2.5 py-0.5 rounded text-xs font-heading font-semibold uppercase tracking-wider ` +
        `${variantClasses[variant]} ${className}`
      }
    >
      {children}
    </span>
  );
}
