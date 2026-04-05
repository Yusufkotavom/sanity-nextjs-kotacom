"use client";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: string;
}

const SIZE_MAP = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-xl",
};

export default function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  showValue = true,
  className = "",
}: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.3 && rating - fullStars < 0.8;
  const emptyStars = maxRating - fullStars - (hasHalf ? 1 : 0);

  return (
    <span
      className={`inline-flex items-center gap-1 ${SIZE_MAP[size]} ${className}`}
      aria-label={`Rating: ${rating} out of ${maxRating}`}
    >
      <span className="inline-flex text-amber-400">
        {"★".repeat(Math.max(0, fullStars))}
        {hasHalf && <span className="opacity-60">★</span>}
        <span className="text-foreground/20">
          {"★".repeat(Math.max(0, emptyStars))}
        </span>
      </span>
      {showValue && (
        <span className="ml-1 font-medium text-foreground/70">{rating}</span>
      )}
    </span>
  );
}
