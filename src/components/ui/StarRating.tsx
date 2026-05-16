/*
  StarRating — displays a 1–5 star rating with filled/unfilled stars.

  Filled stars use brand blue; unfilled use a muted zinc.
  Sizes: sm (reviews list), md (product cards), lg (testimonial cards).
*/
type Size = "sm" | "md" | "lg";

interface StarRatingProps {
  rating: number;
  size?: Size;
  className?: string;
}

const sizeClasses: Record<Size, string> = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

export default function StarRating({
  rating,
  size = "md",
  className = "",
}: StarRatingProps) {
  /* Clamp rating to 1–5 */
  const clampedRating = Math.max(1, Math.min(5, Math.round(rating)));

  return (
    <div
      className={`flex items-center gap-0.5 ${className}`}
      aria-label={`${clampedRating} out of 5 stars`}
      role="img"
    >
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`${sizeClasses[size]} ${
            i < clampedRating ? "text-brand-blue" : "text-zinc-700"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}
