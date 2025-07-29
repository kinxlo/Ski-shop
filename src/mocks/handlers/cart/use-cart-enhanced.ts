/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unicorn/no-array-for-each */
import { useCartStorage } from "@/mocks/handlers/cart/use-cart-storage";
import { useAppService } from "@/services/app/use-app-service";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export const useCartEnhanced = (productId?: string, product?: Product) => {
  const { useGetCart, useAddToCart, useUpdateCartItem, useRemoveFromCart, useCheckoutCart } = useAppService();
  const {
    cartItems,
    isLoaded: isStorageLoaded,
    isProductInCart: isProductInCartStorage,
    getCartItemByProductId,
    addToCart: addToCartStorage,
    updateCartItemQuantity: updateCartItemQuantityStorage,
    removeFromCart: removeFromCartStorage,
    clearCart: clearCartStorage,
    cartTotals,
  } = useCartStorage();

  // Get cart from API to check if current product is in cart
  const { data: cartResponse } = useGetCart();
  const apiCartItems = cartResponse?.data?.items || [];
  const isProductInCartAPI = productId ? apiCartItems.some((item: CartItem) => item.product.id === productId) : false;

  // Use localStorage as the source of truth for immediate UI updates
  const isProductInCartStorageResult = productId ? isProductInCartStorage(productId) : false;

  // Local state for optimistic updates
  const [localIsInCart, setLocalIsInCart] = useState(isProductInCartStorageResult);
  const [localQuantity, setLocalQuantity] = useState(0);

  // Update local state when storage state changes
  useEffect(() => {
    if (isStorageLoaded && productId) {
      const isInCart = isProductInCartStorage(productId);
      setLocalIsInCart(isInCart);

      const cartItem = getCartItemByProductId(productId);
      setLocalQuantity(cartItem?.quantity || 0);
    }
  }, [isProductInCartStorage, getCartItemByProductId, isStorageLoaded, productId]);

  // Sync localStorage with API data when API data loads
  useEffect(() => {
    if (cartResponse?.data?.items && isStorageLoaded) {
      const apiProductIds = new Set(cartResponse.data.items.map((item: CartItem) => item.product.id));
      const storageProductIds = new Set(cartItems.map((item) => item.product.id));

      // Add items that exist in API but not in storage
      cartResponse.data.items.forEach((apiItem: CartItem) => {
        if (!storageProductIds.has(apiItem.product.id)) {
          addToCartStorage(apiItem.product, apiItem.quantity);
        }
      });

      // Remove items that exist in storage but not in API
      cartItems.forEach((storageItem) => {
        if (!apiProductIds.has(storageItem.product.id)) {
          removeFromCartStorage(storageItem.id);
        }
      });
    }
  }, [cartResponse?.data?.items, isStorageLoaded, cartItems, addToCartStorage, removeFromCartStorage]);

  // Add to cart mutation
  const { mutate: addToCartAPI, isPending: isAddingToCart } = useAddToCart({
    onSuccess: () => {
      if (product) {
        addToCartStorage(product, 1);
      }
      toast.success("Item added to cart");
    },
    onError: () => {
      setLocalIsInCart(false); // Revert optimistic update
      toast.error("Failed to add item to cart");
    },
  });

  // Update cart item mutation
  const { mutate: updateCartItemAPI, isPending: isUpdatingCart } = useUpdateCartItem({
    onSuccess: () => {
      toast.success("Cart updated successfully");
    },
    onError: () => {
      // Revert optimistic update by refetching
      toast.error("Failed to update cart");
    },
  });

  // Remove from cart mutation
  const { mutate: removeFromCartAPI, isPending: isRemovingFromCart } = useRemoveFromCart({
    onSuccess: () => {
      if (productId) {
        const cartItem = getCartItemByProductId(productId);
        if (cartItem) {
          removeFromCartStorage(cartItem.id);
        }
      }
      toast.success("Item removed from cart");
    },
    onError: () => {
      setLocalIsInCart(true); // Revert optimistic update
      toast.error("Failed to remove item from cart");
    },
  });

  // Checkout cart mutation
  const { mutate: checkoutCartAPI, isPending: isCheckingOut } = useCheckoutCart({
    onSuccess: () => {
      clearCartStorage();
      toast.success("Order placed successfully");
    },
    onError: () => {
      toast.error("Failed to place order");
    },
  });

  // Add to cart
  const addToCart = useCallback(
    (quantity: number = 1) => {
      if (!productId || !product) {
        toast.error("Product information is missing");
        return;
      }

      // Optimistic update
      setLocalIsInCart(true);
      setLocalQuantity(quantity);

      addToCartAPI({ productId, quantity });
    },
    [productId, product, addToCartAPI],
  );

  // Update cart item quantity
  const updateCartItemQuantity = useCallback(
    (itemId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(itemId);
        return;
      }

      // Optimistic update
      setLocalQuantity(quantity);
      updateCartItemQuantityStorage(itemId, quantity);

      updateCartItemAPI({ itemId, quantity });
    },
    [updateCartItemAPI, updateCartItemQuantityStorage],
  );

  // Remove from cart
  const removeFromCart = useCallback(
    (itemId?: string) => {
      const targetItemId = itemId || getCartItemByProductId(productId!)?.id;

      if (!targetItemId) {
        toast.error("Item not found in cart");
        return;
      }

      // Optimistic update
      setLocalIsInCart(false);
      setLocalQuantity(0);

      removeFromCartAPI(targetItemId);
    },
    [productId, getCartItemByProductId, removeFromCartAPI],
  );

  // Toggle add/remove from cart
  const toggleCart = useCallback(
    (quantity: number = 1) => {
      if (!productId || !product) {
        toast.error("Product information is missing");
        return;
      }

      if (localIsInCart) {
        removeFromCart();
      } else {
        addToCart(quantity);
      }
    },
    [productId, product, localIsInCart, addToCart, removeFromCart],
  );

  // Checkout cart
  const checkoutCart = useCallback(
    (paymentMethod: string = "paystack") => {
      if (cartItems.length === 0) {
        toast.error("Cart is empty");
        return;
      }

      checkoutCartAPI({ paymentMethod });
    },
    [cartItems.length, checkoutCartAPI],
  );

  return {
    // State
    cartItems,
    isLoaded: isStorageLoaded,
    isInCart: localIsInCart,
    quantity: localQuantity,
    cartTotals: cartTotals(),

    // Loading states
    isAddingToCart,
    isUpdatingCart,
    isRemovingFromCart,
    isCheckingOut,

    // Actions
    addToCart,
    updateCartItemQuantity,
    removeFromCart,
    toggleCart,
    checkoutCart,
    clearCart: clearCartStorage,
  };
};
