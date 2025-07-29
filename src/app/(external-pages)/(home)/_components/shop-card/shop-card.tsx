import SkiButton from "@/components/shared/button";
import { Ratings } from "@/components/shared/ratings";
import { cn } from "@/lib/utils";
import { useAppService } from "@/services/app/use-app-service";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { HTMLAttributes } from "react";
import { toast } from "sonner";

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
  const { useSaveProduct } = useAppService();
  const { mutate: saveProduct, isPending } = useSaveProduct();
  const handleSaveProduct = () => {
    if (!id) {
      toast.error("Product ID is missing");
      return;
    }
    saveProduct(
      { productId: id },
      {
        onSuccess: () => {
          toast.success("Product saved successfully");
        },
        onError: () => {
          toast.error("Failed to save product");
        },
      },
    );
  };

  return (
    <Link
      href={`/shop/products/${id}`}
      className={cn(
        "relative block rounded-lg border bg-no-repeat p-4", // Added 'relative' for positioning
        isStarSeller && "bg-[url('/images/star-seller.svg')]",
        className,
      )}
    >
      {showSaveButton && (
        <SkiButton
          variant={`outline`}
          icon={<HeartFilledIcon className="h-4 w-4 text-red-500" />}
          isIconOnly
          size="icon"
          isLoading={isPending}
          className="text-mid-grey-II absolute top-4 right-4 z-10 rounded-full bg-white/80 p-2 backdrop-blur-sm transition-all hover:bg-white hover:text-red-500"
          onClick={(event) => {
            event.preventDefault(); // Prevent link navigation
            event.stopPropagation(); // Stop event bubbling
            handleSaveProduct();
          }}
          aria-label="Save product"
        />
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
          <p className="text-primary text-xs font-medium lg:text-[16px]">₦{price.toLocaleString()}</p>
          {oldPrice && (
            <p className="text-mid-danger text-[10px] line-through lg:text-sm">₦{oldPrice.toLocaleString()}</p>
          )}
        </div>
      </div>
    </Link>
  );
};
