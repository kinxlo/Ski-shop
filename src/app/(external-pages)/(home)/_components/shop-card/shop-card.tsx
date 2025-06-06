import { Ratings } from "@/components/shared/ratings";
import { cn } from "@/lib/utils";
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
  discount?: number;
}

export const ShopCard = ({
  id,
  category,
  title,
  rating,
  price,
  discount,
  image,
  className,
  isStarSeller = true,
}: ShopCardProperties) => {
  const oldPrice = discount ? price / (1 - discount / 100) : null;

  return (
    <Link
      href={`/shop/products/${id}`}
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
        <p className="line-clamp-2 text-xs font-medium lg:text-sm">{title}</p>
        <Ratings rating={rating} />
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
