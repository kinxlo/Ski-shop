import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

export const Ratings = ({ rating, size }: { rating: number; size?: number }) => {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={size || 20}
          className={cn(index < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-400 text-gray-400")}
        />
      ))}
    </div>
  );
};
