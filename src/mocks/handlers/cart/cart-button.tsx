"use client";

import { Button } from "@/components/ui/button";
import { useCartEnhanced } from "@/mocks/handlers/cart/use-cart-enhanced";
import { Loader2, ShoppingCart } from "lucide-react";

interface CartButtonProperties {
  productId: string;
  product: Product;
  quantity?: number;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  isDisabled?: boolean;
}

export const CartButton = ({
  productId,
  product,
  quantity = 1,
  className,
  variant = "default",
  size = "default",
  isDisabled = false,
}: CartButtonProperties) => {
  const { isInCart, isAddingToCart, isRemovingFromCart, toggleCart } = useCartEnhanced(productId, product);

  const isLoading = isAddingToCart || isRemovingFromCart;

  return (
    <Button
      onClick={() => toggleCart(quantity)}
      disabled={isLoading || isDisabled}
      variant={variant}
      size={size}
      className={className}
    >
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShoppingCart className="h-4 w-4" />}
      <span className="ml-2">{isInCart ? "Remove from Cart" : "Add to Cart"}</span>
    </Button>
  );
};
