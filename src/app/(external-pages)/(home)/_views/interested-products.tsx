/* eslint-disable no-console */
"use client";

import { Wrapper } from "@/components/core/layout/wrapper";
import { useAppService } from "@/services/app/use-app-service";

import { ShopCard } from "../_components/shop-card/shop-card";
import { ShopCardSkeleton } from "./popular-products";

export const InterestedProducts = () => {
  const { useGetAllProducts } = useAppService();

  // Fetch products with default filters (first page)
  const { data: productData, isLoading, error } = useGetAllProducts({ page: 1, limit: 4 });

  if (isLoading) {
    return (
      <Wrapper className="py-16">
        <p className="mb-4 text-lg font-semibold sm:mb-8 sm:text-2xl">You May Be Interested In...</p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <ShopCardSkeleton key={index} />
          ))}
        </div>
      </Wrapper>
    );
  }

  if (error) {
    console.error("Error fetching products:", error); // Debugging log
    return (
      <Wrapper className="py-16">
        <p className="mb-4 text-lg font-semibold sm:mb-8 sm:text-2xl">You May Be Interested In...</p>
        <div className="text-center text-red-500">Failed to load products. Please try again later.</div>
      </Wrapper>
    );
  }

  if (!productData?.data.items) {
    console.warn("No products available"); // Debugging log
    return null; // or return a "No products available" message
  }

  return (
    <Wrapper className="py-16">
      <p className="mb-4 text-lg font-semibold sm:mb-8 sm:text-2xl">You May Be Interested In...</p>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
        {productData?.data.items.map((product: Product) => {
          return (
            <ShopCard
              key={product.id}
              id={product.id}
              category={product.category || "Uncategorized"} // Handle possible undefined category
              title={product.name}
              rating={3} // Default rating if not provided
              price={product.price}
              oldPrice={product.discountPrice || product.price} // Fallback to price if no discount
              image={product.images?.[0] || "/placeholder-product.jpg"} // Fallback image
            />
          );
        })}
      </div>
    </Wrapper>
  );
};
