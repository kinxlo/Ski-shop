import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HTMLAttributes } from "react";

interface ShopCardProperties extends HTMLAttributes<HTMLDivElement> {
  id: string | undefined;
  category: string;
  title: string;
  rating: number;
  price: number;
  oldPrice?: number;
  image: string;
  isStarSeller?: boolean;
}

export const ShopCard = ({
  id,
  category,
  title,
  rating,
  price,
  oldPrice,
  image,
  className,
  isStarSeller = true,
}: ShopCardProperties) => {
  return (
    <Link
      href={`/products/${id}`}
      className={cn(
        "block rounded-lg border bg-no-repeat p-4",
        isStarSeller && "bg-[url('/images/star-seller.svg')]",
        className,
      )}
    >
      <div className="relative z-[-1] mb-3 aspect-square overflow-hidden rounded-lg">
        <Image
          src={image}
          alt={title}
          width={400}
          height={400}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="space-y-2">
        <p className="text-mid-grey-II text-[10px] capitalize lg:text-sm">{category}</p>
        <p className="line-clamp-2 text-xs font-medium lg:text-lg">{title}</p>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              // size={14}
              className={cn(
                index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300",
                "h-2 w-2 lg:h-4 lg:w-4",
              )}
            />
          ))}
        </div>
        <p className={`text-mid-grey-II text-[10px] underline lg:text-sm`}>By Skicom</p>
        <div className="flex items-baseline gap-2">
          <p className="text-primary text-xs font-medium lg:text-[16px]">₦{price.toLocaleString()}</p>
          {oldPrice && (
            <p className="text-mid-danger text-[10px] line-through lg:text-sm">₦{oldPrice.toLocaleString()}</p>
          )}
        </div>
      </div>
    </Link>
  );
};
