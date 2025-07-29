"use client";

import { cn } from "@/lib/utils";
import { useSaveProductEnhanced } from "@/mocks/handlers/products/use-save-product-enhanced";
import { Heart } from "lucide-react";

import SkiButton from "./button";

type ButtonSize = React.ComponentProps<typeof SkiButton>["size"];
type ButtonVariant = React.ComponentProps<typeof SkiButton>["variant"];

interface SaveProductSkiButtonProperties {
  productId: string;
  product?: Product;
  className?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
}

export const SaveProductSkiButton = ({
  productId,
  product,
  className,
  size = "default",
  variant = "ghost",
}: SaveProductSkiButtonProperties) => {
  const { isSaved, isPending, toggleSave, isStorageLoaded } = useSaveProductEnhanced(productId, product);

  if (!isStorageLoaded) {
    return (
      <SkiButton variant={variant} size={size} className={cn("animate-pulse", className)} isDisabled>
        <Heart className="h-4 w-4" />
      </SkiButton>
    );
  }

  return (
    <SkiButton
      variant={variant}
      size={size}
      onClick={toggleSave}
      isDisabled={isPending}
      className={cn(
        "transition-all duration-200",
        isSaved && "text-red-500 hover:text-red-600",
        isPending && "animate-pulse",
        className,
      )}
    >
      <Heart className={cn("h-4 w-4 transition-all duration-200", isSaved && "fill-current")} />
    </SkiButton>
  );
};
