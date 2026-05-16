/*
  Badge — small label for categories, statuses, and project types.

  Variants:
    • default  — solid blue (primary categories)
    • outline  — blue border, transparent bg (secondary tags)
    • success  — green (completed, shipped)
    • warning  — amber (pending, in-review)
*/
type BadgeVariant = "default" | "outline" | "success" | "warning";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-brand-blue/20 text-brand-blue border border-brand-blue/40",
  outline: "bg-transparent text-brand-blue border border-brand-blue/50",
  success: "bg-green-500/20 text-green-400 border border-green-500/40",
  warning: "bg-amber-500/20 text-amber-400 border border-amber-500/40",
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
