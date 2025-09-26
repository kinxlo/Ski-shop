import { LocaleLink } from "@/components/shared/locale-link";
import { Ratings } from "@/components/shared/ratings";
import { Badge } from "@/components/ui/badge";
import { Locale } from "@/lib/i18n/config";
import { formatCurrency } from "@/lib/i18n/utils";
import { cn } from "@/lib/utils";
import { useSaveProduct } from "@/mocks/handlers/products/use-save-product";
import { useLocale } from "next-intl";
import Image from "next/image";
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
  action?: () => void;
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
  action,
}: ShopCardProperties) => {
  // const oldPrice = discount ? price / (1 - discount / 100) : null;
  const product: Product | undefined = id
    ? {
        id,
        name: title,
        status: "published",
        category,
        description: "",
        discountPrice: discount || null,
        images: [image],
        price,
        stockCount: 0,
        rating,
        store: { id: "", name: "" },
        user: { id: "", name },
        createdAt: "",
        updatedAt: "",
      }
    : undefined;
  const { isSaved, isPending, toggleSave } = useSaveProduct(id || "", product);
  const locale = useLocale() as Locale;
  const discountPercentage = discount ? Math.round(((price - discount) / price) * 100) : 0;
  // Don't render save button if no ID
  const shouldShowSaveButton = showSaveButton && id;

  return (
    <LocaleLink
      href={`/shop/products/${id}`}
      className={cn(
        "relative block overflow-hidden rounded-lg border bg-no-repeat p-2 md:p-4", // Added 'relative' for positioning
        isStarSeller &&
          // "bg-[url(https://res.cloudinary.com/kingsleysolomon/image/upload/h_100,f_auto,q_auto/v1758641972/skicom/f7ajczgvhobbzpwehd8g.png)]",
          "bg-[url(/images/star-seller.svg)]",
        className,
      )}
    >
      {shouldShowSaveButton && (
        <button
          role="button"
          tabIndex={0}
          aria-label={isSaved ? "Remove from favorites" : "Save product"}
          className={cn(
            "absolute top-4 right-4 z-10 cursor-pointer rounded-full bg-white/80 p-1 backdrop-blur-sm transition-all md:p-2",
            isSaved ? "text-red-500 hover:bg-red-50" : "text-mid-grey-II hover:bg-white hover:text-red-500",
            isPending && "pointer-events-none opacity-60",
          )}
          onClick={(event) => {
            event.preventDefault(); // Prevent link navigation
            event.stopPropagation(); // Stop event bubbling
            if (!isPending) toggleSave();
            if (action) action();
          }}
          onKeyDown={(event) => {
            if ((event.key === "Enter" || event.key === " ") && !isPending) {
              event.preventDefault();
              event.stopPropagation();
              toggleSave();
            }
          }}
        >
          {isSaved ? (
            <PiHeartFill className="text-red-500 lg:h-6 lg:w-6" />
          ) : (
            <PiHeart className="text-gray-500 lg:h-6 lg:w-6" />
          )}
        </button>
      )}

      <div className="relative z-[-1] mb-3 aspect-square overflow-hidden rounded-lg md:mb-4">
        <Image
          priority
          src={
            image ||
            `https://res.cloudinary.com/kingsleysolomon/image/upload/f_auto,q_auto/v1624958924/audiophile/assets/category-headphones/desktop/image-xx99-mark-two_lkqy5n.jpg`
          }
          alt={title}
          width={400}
          height={400}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="space-y-2">
        <p className="!text-[10px] capitalize md:!text-xs lg:!text-sm">{category}</p>
        <p className="!text-foreground !truncate !text-xs !font-semibold md:!text-sm lg:!text-base">{title}</p>
        <div className={`flex items-center justify-between`}>
          <Ratings size={`!size-2.5 md:!size-4`} rating={rating} />
          {discountPercentage > 0 && (
            <Badge
              variant={`destructive`}
              className="rounded px-1 py-[0.5px] text-[8px] font-medium text-white md:!text-[9px]"
            >
              {discountPercentage}% OFF
            </Badge>
          )}
        </div>
        <p className={`!truncate !text-[10px] underline md:!text-xs lg:!text-sm`}>By {name}</p>
        <div className="flex items-baseline gap-2">
          {discount ? (
            <>
              <p className="!text-primary !text-sm !font-semibold md:!text-base lg:!text-lg">
                {formatCurrency(discount, locale)}
              </p>
              <p className="!text-destructive !text-[10px] !font-medium line-through md:!text-sm">
                {formatCurrency(price, locale)}
              </p>
            </>
          ) : (
            <p className="!text-primary text-sm !font-semibold md:!text-base lg:!text-lg">
              {formatCurrency(price, locale)}
            </p>
          )}
        </div>
      </div>
    </LocaleLink>
  );
};
