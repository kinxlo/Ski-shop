import { Ratings } from "@/components/shared/ratings";
import { useSaveProduct } from "@/hooks/use-save-product";
import { cn, formatCurrency } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { HTMLAttributes } from "react";
import { PiHeart, PiHeartFill } from "react-icons/pi";

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
  name: string;
  showSaveButton?: boolean;
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
  name,
  showSaveButton = true,
  isStarSeller = false,
}: ShopCardProperties) => {
  const oldPrice = discount ? price / (1 - discount / 100) : null;
  const { isSaved, isPending, toggleSave } = useSaveProduct(id || "");

  // Don't render save button if no ID
  const shouldShowSaveButton = showSaveButton && id;

  return (
    <Link
      href={`/shop/products/${id}`}
      className={cn(
        "relative block rounded-lg border bg-no-repeat p-4", // Added 'relative' for positioning
        isStarSeller && "bg-[url('/images/star-seller.svg')]",
        className,
      )}
    >
      {shouldShowSaveButton && (
        <button
          role="button"
          tabIndex={0}
          aria-label={isSaved ? "Remove from favorites" : "Save product"}
          className={cn(
            "absolute top-4 right-4 z-10 cursor-pointer rounded-full bg-white/80 p-2 backdrop-blur-sm transition-all",
            isSaved ? "text-red-500 hover:bg-red-50" : "text-mid-grey-II hover:bg-white hover:text-red-500",
            isPending && "pointer-events-none opacity-60",
          )}
          onClick={(event) => {
            event.preventDefault(); // Prevent link navigation
            event.stopPropagation(); // Stop event bubbling
            if (!isPending) toggleSave();
          }}
          onKeyDown={(event) => {
            if ((event.key === "Enter" || event.key === " ") && !isPending) {
              event.preventDefault();
              event.stopPropagation();
              toggleSave();
            }
          }}
        >
          {isSaved ? <PiHeartFill className="h-6 w-6 text-red-500" /> : <PiHeart className="h-6 w-6 text-gray-500" />}
        </button>
      )}

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
        <p className={`text-mid-grey-II text-[10px] underline lg:text-sm`}>By {name}</p>
        <div className="flex items-baseline gap-2">
          <p className="text-primary text-xs font-medium lg:text-[16px]">{formatCurrency(price)}</p>
          {oldPrice && (
            <p className="text-mid-danger text-[10px] line-through lg:text-sm">{formatCurrency(oldPrice)}</p>
          )}
        </div>
      </div>
    </Link>
  );
};
