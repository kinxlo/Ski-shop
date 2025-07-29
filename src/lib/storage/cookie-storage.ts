/* eslint-disable no-console */
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { cookies } from "next/headers";

const SAVED_PRODUCTS_COOKIE = "ski_shop_saved_products";
const MAX_COOKIE_SIZE = 4096; // 4KB limit for cookies

export class CookieStorage {
  // Server-side: Get saved products from cookies
  static async getSavedProductsServer(): Promise<string[]> {
    try {
      const cookieStore = await cookies();
      const savedProductsCookie = cookieStore.get(SAVED_PRODUCTS_COOKIE);

      if (!savedProductsCookie?.value) {
        return [];
      }

      return JSON.parse(savedProductsCookie.value);
    } catch {
      return [];
    }
  }

  // Client-side: Get saved products from cookies
  static getSavedProductsClient(): string[] {
    try {
      const savedProductsCookie = getCookie(SAVED_PRODUCTS_COOKIE);

      if (!savedProductsCookie) {
        return [];
      }

      return JSON.parse(savedProductsCookie as string);
    } catch {
      return [];
    }
  }

  // Client-side: Add product to saved products
  static addSavedProduct(productId: string): void {
    try {
      const currentSaved = this.getSavedProductsClient();

      if (!currentSaved.includes(productId)) {
        const updatedSaved = [...currentSaved, productId];
        this.setSavedProductsCookie(updatedSaved);
      }
    } catch {
      // Silently handle errors
    }
  }

  // Client-side: Remove product from saved products
  static removeSavedProduct(productId: string): void {
    try {
      const currentSaved = this.getSavedProductsClient();
      const updatedSaved = currentSaved.filter((id) => id !== productId);
      this.setSavedProductsCookie(updatedSaved);
    } catch {
      // Silently handle errors
    }
  }

  // Client-side: Check if product is saved
  static isProductSaved(productId: string): boolean {
    try {
      const currentSaved = this.getSavedProductsClient();
      return currentSaved.includes(productId);
    } catch {
      return false;
    }
  }

  // Client-side: Clear all saved products
  static clearSavedProducts(): void {
    try {
      deleteCookie(SAVED_PRODUCTS_COOKIE);
    } catch {
      // Silently handle errors
    }
  }

  // Helper method to set cookie with size check
  private static setSavedProductsCookie(productIds: string[]): void {
    try {
      const cookieValue = JSON.stringify(productIds);

      // Check if cookie would be too large
      if (cookieValue.length > MAX_COOKIE_SIZE) {
        console.warn("Saved products cookie would exceed size limit, truncating...");
        // Keep only the most recent products
        const truncatedIds = productIds.slice(-50); // Keep last 50 products
        const truncatedValue = JSON.stringify(truncatedIds);
        setCookie(SAVED_PRODUCTS_COOKIE, truncatedValue, {
          maxAge: 60 * 60 * 24 * 365, // 1 year
          path: "/",
          sameSite: "lax",
        });
      } else {
        setCookie(SAVED_PRODUCTS_COOKIE, cookieValue, {
          maxAge: 60 * 60 * 24 * 365, // 1 year
          path: "/",
          sameSite: "lax",
        });
      }
    } catch {
      // Silently handle errors
    }
  }
}
