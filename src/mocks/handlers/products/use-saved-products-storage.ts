"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "ski_shop_saved_products";

export const useSavedProductsStorage = () => {
  const [savedProducts, setSavedProducts] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved products from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const products = stored ? JSON.parse(stored) : [];
      setSavedProducts(products);
    } catch {
      // Silently handle localStorage errors
      setSavedProducts([]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save products to localStorage whenever they change
  const saveToStorage = useCallback((products: Product[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch {
      // Silently handle localStorage errors
    }
  }, []);

  // Add a product to saved products
  const addSavedProduct = useCallback(
    (product: Product) => {
      setSavedProducts((previous) => {
        const newProducts = previous.some((p) => p.id === product.id) ? previous : [...previous, product];
        saveToStorage(newProducts);
        return newProducts;
      });
    },
    [saveToStorage],
  );

  // Remove a product from saved products
  const removeSavedProduct = useCallback(
    (productId: string) => {
      setSavedProducts((previous) => {
        const newProducts = previous.filter((p) => p.id !== productId);
        saveToStorage(newProducts);
        return newProducts;
      });
    },
    [saveToStorage],
  );

  // Check if a product is saved
  const isProductSaved = useCallback(
    (productId: string) => {
      return savedProducts.some((p) => p.id === productId);
    },
    [savedProducts],
  );

  // Toggle save/unsave a product
  const toggleSavedProduct = useCallback(
    (product: Product) => {
      if (isProductSaved(product.id)) {
        removeSavedProduct(product.id);
      } else {
        addSavedProduct(product);
      }
    },
    [isProductSaved, addSavedProduct, removeSavedProduct],
  );

  // Clear all saved products
  const clearSavedProducts = useCallback(() => {
    setSavedProducts([]);
    saveToStorage([]);
  }, [saveToStorage]);

  return {
    savedProducts,
    isLoaded,
    addSavedProduct,
    removeSavedProduct,
    isProductSaved,
    toggleSavedProduct,
    clearSavedProducts,
  };
};
