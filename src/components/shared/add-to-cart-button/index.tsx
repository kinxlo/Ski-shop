"use client";

import SkiButton from "@/components/shared/button";
import { cn } from "@/lib/utils";
import { useAppService } from "@/services/externals/app/use-app-service";
import { useQueryClient } from "@tanstack/react-query";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import { toast } from "sonner";

type CartCacheItem = { id: string; productId: string; quantity: number };
type CartCache = { items: CartCacheItem[] };

type AddToCartButtonProperties = {
  productId: string;
  quantity?: number;
  stockCount?: number;
  className?: string;
  size?: "sm" | "lg" | "icon";
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  redirectOnSuccess?: boolean;
  stopEventPropagation?: boolean;
  fullWidth?: boolean;
  label?: string;
  isIconVisible?: boolean;
};

export function AddToCartButton({
  productId,
  quantity = 1,
  stockCount,
  className,
  size = "lg",
  variant = "primary",
  redirectOnSuccess = false,
  stopEventPropagation = true,
  fullWidth = true,
  label,
  isIconVisible = true,
}: AddToCartButtonProperties) {
  const { useAddToCart } = useAppService();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: addToCart, isPending } = useAddToCart({
    onMutate: async (newItem: { productId: string; quantity: number }) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });
      const previousCart = queryClient.getQueryData<CartCache>(["cart"]);

      queryClient.setQueryData<CartCache>(["cart"], (old) => {
        const existingItem = old?.items?.find((item) => item.productId === newItem.productId);
        if (existingItem && old) {
          return {
            ...old,
            items: old.items.map((item) =>
              item.productId === newItem.productId ? { ...item, quantity: item.quantity + newItem.quantity } : item,
            ),
          };
        }
        const base: CartCache = { items: old?.items ? [...old.items] : [] };
        return {
          ...base,
          items: [...base.items, { ...newItem, id: Date.now().toString() }],
        };
      });

      return { previousCart };
    },
    onError: (
      _error: unknown,
      _newItem: { productId: string; quantity: number },
      context: { previousCart?: CartCache },
    ) => {
      if (context?.previousCart) {
        queryClient.setQueryData<CartCache>(["cart"], context.previousCart);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const disabled = (typeof stockCount === "number" && stockCount === 0) || isPending;

  const handleClick = (event_?: MouseEvent) => {
    if (stopEventPropagation && event_) {
      event_.preventDefault();
      event_.stopPropagation();
    }
    addToCart(
      { productId, quantity },
      {
        onSuccess: () => {
          toast.success("Added to cart successfully");
          if (redirectOnSuccess) {
            router.push("/shop/cart");
          }
        },
      },
    );
  };
  const buttonLabel = isPending
    ? "Adding..."
    : typeof stockCount === "number" && stockCount === 0
      ? "Out of Stock"
      : (label ?? "Add to Cart");

  return (
    <SkiButton
      variant={variant}
      size={size}
      className={cn(fullWidth ? "w-full" : "", "flex items-center gap-2", className)}
      isDisabled={disabled}
      onClick={handleClick}
      isLeftIconVisible={isIconVisible}
      icon={<ShoppingCart size={20} />}
    >
      {buttonLabel}
    </SkiButton>
  );
}
