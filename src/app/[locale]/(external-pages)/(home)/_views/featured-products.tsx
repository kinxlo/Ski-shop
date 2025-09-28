"use client";

import { Wrapper } from "@/components/core/layout/wrapper";
import SkiButton from "@/components/shared/button";
import { EmptyState } from "@/components/shared/empty-state";
import { Ratings } from "@/components/shared/ratings";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Locale } from "@/lib/i18n/config";
import { formatCurrency } from "@/lib/i18n/utils";
import { useAppService } from "@/services/externals/app/use-app-service";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { memo } from "react";

interface ProductCardProperties {
  product?: Product;
  isLarge?: boolean;
  className?: string;
}

// Skeleton Components
const FeaturedProductSkeleton = memo(({ isLarge = false }: { isLarge?: boolean }) => (
  <div className={`space-y-3 rounded-md p-6 ${isLarge ? "row-span-2 sm:min-h-[630px]" : ""}`}>
    <Skeleton className={`w-full rounded-md ${isLarge ? "h-[500px] sm:h-[580px]" : "h-[200px] md:h-full"}`} />
    <div className="space-y-2">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-4 w-24" />
    </div>
  </div>
));

FeaturedProductSkeleton.displayName = "FeaturedProductSkeleton";

// Individual Product Card Component
const ProductCard = memo(({ product, isLarge = false, className = "" }: ProductCardProperties) => {
  const locale = useLocale() as Locale;
  const fallbackImage =
    "https://res.cloudinary.com/kingsleysolomon/image/upload/v1742989695/byte-alley/hwqfbog9bbrubto2v0te.svg";
  const productImage = product?.images?.[0] || fallbackImage;

  const backgroundSize = isLarge ? "cover" : "contain";
  const backgroundPosition = isLarge ? "center" : "right";

  return (
    <Link
      href={`/shop/products/${product?.id}`}
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
      <div className="backdrop-blur-0 relative z-[2] flex h-full transform flex-col justify-between gap-6 bg-black/60 p-6 text-white transition-all duration-300 group-hover:backdrop-blur-[2px]">
        <Badge variant="default" className="bg-accent w-fit rounded-md px-3 py-1.5 !text-[8px] md:!text-xs">
          Sponsored Ad
        </Badge>
        <div className="space-y-2">
          <h3 className="line-clamp-2 !text-base !font-semibold !text-white lg:!text-2xl">
            {product?.name || "Product Name"}
          </h3>
          <p className="!text-mid-grey-I line-clamp-2 max-w-[500px] !text-xs !font-medium lg:!text-sm">
            {product?.description || "Product description not available"}
          </p>
          <Ratings rating={product?.rating || 0} />
          <p className="!text-mid-grey-I text-[10px] underline lg:!text-sm">By Skicom</p>
          <div className="flex items-baseline gap-2">
            {product?.discountPrice ? (
              <>
                <p className="!text-accent !text-sm !font-semibold lg:!text-lg">
                  {formatCurrency(product?.discountPrice, locale)}
                </p>
                <p className="!text-mid-danger !text-xs !font-medium line-through lg:!text-sm">
                  {formatCurrency(product?.price, locale)}
                </p>
              </>
            ) : (
              <p className="!text-accent !text-sm !font-semibold lg:!text-lg">
                {formatCurrency(product?.price || 0, locale)}
              </p>
            )}
          </div>
          {/* <div className="flex items-baseline gap-2">
            <p className="!text-accent !text-xs !font-semibold lg:!text-xl">
              {formatCurrency(product?.discountPrice || 0, locale)}
            </p>
            {product?.discountPrice && (
              <p className="!text-mid-danger !text-sm !font-medium line-through lg:!text-sm">
                {formatCurrency(product?.price || 0, locale)}
              </p>
            )}
          </div> */}
        </div>
      </div>
    </Link>
  );
});

ProductCard.displayName = "ProductCard";

// Main Component
export const FeaturedProducts = memo(() => {
  const { useGetAllProducts } = useAppService();
  const { isLoading, isError, data: featuredProducts, refetch } = useGetAllProducts({ flag: "banner" });
  const t = useTranslations("home.featuredProducts");

  const renderLoadingSkeletons = () => (
    <Wrapper className="mx-auto grid gap-2 px-4 py-0 md:grid-cols-2 lg:gap-8">
      {/* Large Product Banner Skeleton */}
      <FeaturedProductSkeleton isLarge={true} />
      {/* Second Featured Product Skeleton */}
      <FeaturedProductSkeleton />
      {/* Grid of two smaller card skeletons */}
      <div className="grid grid-cols-2 gap-2 lg:gap-8">
        <FeaturedProductSkeleton />
        <FeaturedProductSkeleton />
      </div>
    </Wrapper>
  );

  const renderFeaturedProductsGrid = () => (
    <Wrapper className="mx-auto grid gap-2 px-4 py-0 md:grid-cols-2 lg:gap-8">
      {/* Large Featured Product Banner */}
      <ProductCard
        product={featuredProducts?.data?.items?.[0]}
        isLarge={true}
        className="row-span-2 sm:min-h-[630px]"
      />
      {/* Second Featured Product */}
      <ProductCard product={featuredProducts?.data?.items?.[1]} className="md:h-full" />
      {/* Grid of two smaller cards */}
      <div className="grid gap-2 md:grid-cols-2 lg:gap-8">
        {featuredProducts?.data?.items
          ?.slice(2, 4)
          .map((product: Product, index: number) => <ProductCard key={product.id || index} product={product} />)}
      </div>
    </Wrapper>
  );

  const renderEmptyState = () => (
    <Wrapper className="gap-6 py-0">
      <div className="flex min-h-[360px] items-center justify-center">
        <EmptyState
          images={[
            {
              src: "/images/empty-state.svg",
              alt: "No featured products found",
              width: 80,
              height: 80,
            },
          ]}
          title="No featured products found"
          titleClassName="!text-lg font-bold !text-mid-warning"
          description="There are no featured products available at the moment. Please check back later."
          descriptionClassName="text-mid-grey-II"
          className="bg-mid-grey-I space-y-0 rounded-lg"
        />
      </div>
    </Wrapper>
  );

  const renderErrorState = () => (
    <Wrapper className="min-h-[480px] gap-6 py-0">
      <div className="flex min-h-[360px] items-center justify-center">
        <EmptyState
          images={[
            {
              src: "/images/empty-state.svg",
              alt: "Failed to load featured products",
              width: 80,
              height: 80,
            },
          ]}
          description="Failed to load featured products"
          descriptionClassName="text-mid-danger"
          className="bg-low-warning/5 space-y-0 rounded-lg"
          actionButton={
            <SkiButton
              onClick={() => refetch()}
              variant="outline"
              className="border-mid-danger text-mid-danger hover:bg-mid-danger/10 border"
            >
              {t("retry")}
            </SkiButton>
          }
        />
      </div>
    </Wrapper>
  );

  const renderFeaturedContent = () => {
    if (isLoading) {
      return renderLoadingSkeletons();
    }

    if (!featuredProducts?.data?.items || featuredProducts.data.items.length === 0) {
      return renderEmptyState();
    }

    if (isError) {
      return renderErrorState();
    }

    return renderFeaturedProductsGrid();
  };

  return renderFeaturedContent();
});

FeaturedProducts.displayName = "FeaturedProducts";
