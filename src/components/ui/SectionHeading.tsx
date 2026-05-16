/*
  SectionHeading — reusable section title with optional subtitle and decorative accent.

  The blue accent line under the title reinforces the brand's electric blue identity.
  Used consistently across all page sections to create visual hierarchy.

  Usage:
    <SectionHeading title="Featured Products" subtitle="Handcrafted for car enthusiasts" />
    <SectionHeading title="Our Services" centered />
*/
interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = false,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`${centered ? "text-center" : ""} ${className}`}>
      <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-widest text-brand-white">
        {title}
      </h2>
      {/* Blue accent line — the visual signature of all section headings */}
      <div
        className={`mt-3 h-0.5 w-16 bg-brand-blue ${centered ? "mx-auto" : ""}`}
      />
      {subtitle && (
        <p className="mt-4 text-zinc-400 text-base md:text-lg max-w-2xl leading-relaxed font-body">
          {subtitle}
        </p>
      )}
    </div>
  );
}
