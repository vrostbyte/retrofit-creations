/*
  SectionHeading — reusable section title (light-body theme, PRD v1.2.0).

  Black heading text on white background. Blue accent line unchanged.
  Subtitle uses secondary text color (#555555).
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
      <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-widest text-black">
        {title}
      </h2>
      {/* Blue accent line — brand signature */}
      <div
        className={`mt-3 h-0.5 w-16 bg-brand-blue ${centered ? "mx-auto" : ""}`}
      />
      {subtitle && (
        <p className="mt-4 text-[#555555] text-base md:text-lg max-w-2xl leading-relaxed font-body">
          {subtitle}
        </p>
      )}
    </div>
  );
}
