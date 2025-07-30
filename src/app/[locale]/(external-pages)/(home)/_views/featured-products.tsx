"use client";

import { Wrapper } from "@/components/core/layout/wrapper";
import SkiButton from "@/components/shared/button";
import { EmptyState } from "@/components/shared/empty-state";
import { Ratings } from "@/components/shared/ratings";
import { Badge } from "@/components/ui/badge";
import { useAppService } from "@/services/app/use-app-service";
import { memo, useMemo } from "react";
import { toast } from "sonner";

// Types
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  rating?: number;
}

interface ProductCardProperties {
  product: Product;
  isLarge?: boolean;
  className?: string;
}

// Skeleton Loader Component
const FeaturedProductsSkeleton = memo(() => {
  return (
    <Wrapper className="mx-auto my-[98px] grid gap-4 px-4 md:grid-cols-2">
      {/* Large Product Banner Skeleton */}
      <div className="row-span-2 flex h-[300px] animate-pulse items-center justify-center rounded-2xl bg-gray-200 sm:min-h-[630px]">
        <div className="h-10 w-3/4 rounded bg-gray-300"></div>
      </div>

      {/* Product Grid Skeletons */}
      <div className="flex h-[200px] animate-pulse items-center justify-center rounded-2xl bg-gray-200 md:h-full">
        <div className="space-y-4">
          <div className="h-4 w-20 rounded bg-gray-300"></div>
          <div className="h-6 w-32 rounded bg-gray-300"></div>
          <div className="h-4 w-24 rounded bg-gray-300"></div>
        </div>
      </div>

      <div className="flex h-[200px] animate-pulse items-center justify-center rounded-2xl bg-gray-200 md:h-full">
        <div className="space-y-4">
          <div className="h-4 w-20 rounded bg-gray-300"></div>
          <div className="h-6 w-32 rounded bg-gray-300"></div>
          <div className="h-4 w-24 rounded bg-gray-300"></div>
        </div>
      </div>
    </Wrapper>
  );
});

FeaturedProductsSkeleton.displayName = "FeaturedProductsSkeleton";

// Individual Product Card Component
const ProductCard = memo(({ product, isLarge = false, className = "" }: ProductCardProperties) => {
  const fallbackImage =
    "https://res.cloudinary.com/kingsleysolomon/image/upload/v1742989695/byte-alley/hwqfbog9bbrubto2v0te.svg";
  const productImage = product?.images?.[0] || fallbackImage;

  const backgroundSize = isLarge ? "cover" : "contain";
  const backgroundPosition = isLarge ? "center" : "right";

  return (
    <section
      className={`group relative overflow-hidden rounded-md ${className}`}
      role="article"
      aria-label={`Featured product: ${product?.name}`}
    >
      <div
        style={{
          backgroundImage: `url(${productImage})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition,
          backgroundSize,
        }}
        className="absolute inset-0 z-[1] h-full w-full bg-black transition-all duration-300 group-hover:scale-105 group-hover:blur-sm"
        aria-hidden="true"
      />
      <div className="backdrop-blur-0 relative z-[2] flex h-full transform flex-col justify-between gap-6 p-6 text-white transition-all duration-300 group-hover:backdrop-blur-[2px]">
        <Badge variant="default" className="bg-accent w-fit rounded-md px-3 py-1.5">
          Sponsored Ad
        </Badge>
        <div className="space-y-2">
          <h3 className="line-clamp-2 text-xs font-medium lg:text-xl">{product?.name || "Product Name"}</h3>
          <p className="text-mid-grey-II line-clamp-2 max-w-[300px] text-xs font-light lg:text-sm">
            {product?.description || "Product description not available"}
          </p>
          <Ratings rating={product?.rating || 0} />
          <p className="text-mid-grey-II text-[10px] underline lg:text-sm">By Skicom</p>
          <div className="flex items-baseline gap-2">
            <p className="text-accent text-xs font-medium lg:text-2xl">₦{product?.price?.toLocaleString() || "0"}</p>
            {product?.price && (
              <p className="text-mid-danger text-sm line-through lg:text-xl">
                ₦{(product.price * 1.2).toLocaleString()}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});

ProductCard.displayName = "ProductCard";

// Main Component
export const FeaturedProducts = memo(() => {
  const { useGetAllProducts } = useAppService();
  const { isLoading, isError, error, data, refetch } = useGetAllProducts();

  // Memoize featured products to prevent unnecessary re-renders
  const featuredProducts = useMemo(() => {
    if (!data?.data?.items) return [];
    return data.data.items.slice(0, 4).map((item: unknown) => ({
      id: (item as { id?: string })?.id || `product-${Math.random()}`,
      name: (item as { name?: string })?.name || "Product",
      description: (item as { description?: string })?.description || "Product description",
      price: (item as { price?: number })?.price || 0,
      images: (item as { images?: string[] })?.images || [],
      rating: (item as { rating?: number })?.rating || 0,
    }));
  }, [data]);

  // Handle loading state
  if (isLoading) {
    return <FeaturedProductsSkeleton />;
  }

  // Handle error state
  if (isError) {
    toast.error("Failed to load featured products", {
      description: error?.message || "Please try again later",
    });
    return (
      <EmptyState
        images={[{ src: "/images/empty-state.svg", width: 80, height: 80, alt: "No featured products" }]}
        description="Failed to load featured products"
        descriptionClassName="text-mid-danger"
        className="min-h-fit space-y-0 rounded-lg py-10"
        actionButton={
          <SkiButton
            onClick={() => refetch()}
            variant="outline"
            className="border-mid-danger text-mid-danger hover:bg-mid-danger/10 mt-4 border"
          >
            Retry
          </SkiButton>
        }
      />
    );
  }

  // Handle empty state
  if (featuredProducts.length === 0) {
    return (
      <Wrapper className={`my-[78px] min-h-[308px]`}>
        <EmptyState
          images={[{ src: "/images/empty-state.svg", width: 80, height: 80, alt: "No featured products" }]}
          description="No featured products found"
          descriptionClassName="text-primary"
          className="bg-mid-grey-I min-h-fit space-y-0 rounded-lg py-10"
        />
      </Wrapper>
    );
  }

  return (
    <Wrapper className="mx-auto my-[98px] grid gap-2 px-4 md:grid-cols-2 lg:gap-8">
      {/* Large Featured Product Banner */}
      <ProductCard product={featuredProducts[0]} isLarge={true} className="row-span-2 sm:min-h-[630px]" />

      {/* Second Featured Product */}
      <ProductCard product={featuredProducts[1]} className="md:h-full" />

      {/* Grid of two smaller cards */}
      <div className="grid grid-cols-2 gap-2 lg:gap-8">
        {featuredProducts.slice(2, 4).map((product: Product, index: number) => (
          <ProductCard key={product.id || index} product={product} />
        ))}
      </div>
    </Wrapper>
  );
});

FeaturedProducts.displayName = "FeaturedProducts";
