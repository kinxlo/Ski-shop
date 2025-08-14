"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "ski_shop_cart";

export const useCartStorage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart items from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const items = stored ? JSON.parse(stored) : [];
      setCartItems(items);
    } catch {
      // Silently handle localStorage errors
      setCartItems([]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save cart items to localStorage whenever they change
  const saveToStorage = useCallback((items: CartItem[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Silently handle localStorage errors
    }
  }, []);

  // Add item to cart
  const addToCart = useCallback(
    (product: Product, quantity: number = 1) => {
      setCartItems((previous) => {
        const existingItemIndex = previous.findIndex((item) => item.product.id === product.id);

        if (existingItemIndex === -1) {
          // Add new item to cart
          const newCartItem: CartItem = {
            id: `${product.id}-${Date.now()}`,
            product,
            name: product.name,
            price: product.discountPrice || product.price,
            quantity,
            image: product.images[0],
          };
          const newItems = [...previous, newCartItem];
          saveToStorage(newItems);
          return newItems;
        } else {
          // Update existing item quantity
          const newItems = [...previous];
          newItems[existingItemIndex].quantity += quantity;
          saveToStorage(newItems);
          return newItems;
        }
      });
    },
    [saveToStorage],
  );

  // Update cart item quantity
  const updateCartItemQuantity = useCallback(
    (itemId: string, quantity: number) => {
      setCartItems((previous) => {
        const itemIndex = previous.findIndex((item) => item.id === itemId);
        if (itemIndex === -1) return previous;

        const newItems = [...previous];
        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          newItems.splice(itemIndex, 1);
        } else {
          // Update quantity
          newItems[itemIndex].quantity = quantity;
        }
        saveToStorage(newItems);
        return newItems;
      });
    },
    [saveToStorage],
  );

  // Remove item from cart
  const removeFromCart = useCallback(
    (itemId: string) => {
      setCartItems((previous) => {
        const newItems = previous.filter((item) => item.id !== itemId);
        saveToStorage(newItems);
        return newItems;
      });
    },
    [saveToStorage],
  );

  // Clear cart
  const clearCart = useCallback(() => {
    setCartItems([]);
    saveToStorage([]);
  }, [saveToStorage]);

  // Get cart item by ID
  const getCartItem = useCallback(
    (itemId: string) => {
      return cartItems.find((item) => item.id === itemId);
    },
    [cartItems],
  );

  // Check if product is in cart
  const isProductInCart = useCallback(
    (productId: string) => {
      return cartItems.some((item) => item.product.id === productId);
    },
    [cartItems],
  );

  // Get cart item for a specific product
  const getCartItemByProductId = useCallback(
    (productId: string) => {
      return cartItems.find((item) => item.product.id === productId);
    },
    [cartItems],
  );

  // Calculate cart totals
  const cartTotals = useCallback(() => {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const uniqueItems = cartItems.length;

    return {
      totalItems,
      totalAmount,
      uniqueItems,
    };
  }, [cartItems]);

  return {
    cartItems,
    isLoaded,
    addToCart,
    updateCartItemQuantity,
    removeFromCart,
    clearCart,
    getCartItem,
    isProductInCart,
    getCartItemByProductId,
    cartTotals,
  };
};
