import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import React, { useState } from "react";

interface RatingsProperties {
  rating: number;
  size?: string;
  readonly?: boolean;
  onChange?: (rating: number) => void;
  className?: string;
  starColor?: string;
}

export const Ratings: React.FC<RatingsProperties> = ({ rating, size, readonly = true, onChange, className = "" }) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [internalRating, setInternalRating] = useState<number>(rating);

  // If controlled, use prop; if uncontrolled, use internal state
  const displayRating = readonly ? rating : hovered === null ? internalRating : hovered;

  const handleClick = (index: number) => {
    if (readonly) return;
    setInternalRating(index + 1);
    onChange?.(index + 1);
  };

  const handleMouseEnter = (index: number) => {
    if (readonly) return;
    setHovered(index + 1);
  };

  const handleMouseLeave = () => {
    if (readonly) return;
    setHovered(null);
  };

  return (
    <div className={cn("flex gap-0.5", className)}>
      {Array.from({ length: 5 }).map((_, index) => (
        <button
          key={index}
          type="button"
          tabIndex={readonly ? -1 : 0}
          aria-label={`Rate ${index + 1} star${index === 0 ? "" : "s"}`}
          disabled={readonly}
          onClick={() => handleClick(index)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          onFocus={() => handleMouseEnter(index)}
          onBlur={handleMouseLeave}
          className={cn(
            "transition-colors focus:outline-none",
            readonly && "cursor-default",
            !readonly && "cursor-pointer",
          )}
        >
          <Star
            className={cn(
              "size-3.5 md:size-5",
              index < displayRating ? "fill-yellow-400 text-yellow-400" : "fill-gray-400 text-gray-400",
              size,
            )}
          />
        </button>
      ))}
    </div>
  );
};
