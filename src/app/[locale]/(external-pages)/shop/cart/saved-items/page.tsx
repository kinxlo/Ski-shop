"use client";

import { Wrapper } from "@/components/core/layout/wrapper";
import SkiButton from "@/components/shared/button";
import { EmptyState } from "@/components/shared/empty-state";
import { cn } from "@/lib/utils";
import { useAppService } from "@/services/externals/app/use-app-service";

import { ProductBreadcrumb } from "../../../(home)/_components/product-breadcrumb";
import { ShopCard } from "../../../(home)/_components/shop-card/shop-card";

const SavedItems = ({ headerStyle }: { title: string; headerStyle?: string; hasAction?: boolean }) => {
  const { useGetSavedProducts } = useAppService();
  const { isLoading, isError, data, refetch } = useGetSavedProducts();

  // Handle empty state
  const hasSavedItems = data?.data?.items && data.data.items.length > 0;

  return (
    <section className="min-h-[480px] pt-[10rem]">
      <ProductBreadcrumb productTitle={`Saved Items`} />
      <Wrapper className={`py-16`}>
        <div className={cn(`mb-8 flex items-baseline justify-between`, headerStyle)}>
          <h2 className={cn("text-high-grey-II text-sm font-black lg:text-3xl", headerStyle)}>Saved Items</h2>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index: number) => (
              <ShopCardSkeleton key={index} />
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <EmptyState
            images={[{ src: "/images/empty-state.svg", width: 80, height: 80, alt: "Empty State" }]}
            title={"Failed to load saved items"}
            description={"Something went wrong while loading your saved items."}
            className={`space-y-0 rounded-lg`}
            titleClassName={`!text-2xl !text-mid-danger`}
            descriptionClassName={`text-mid-danger mb-4`}
            actionButton={
              <SkiButton
                onClick={() => refetch()}
                variant="outline"
                className={`border-mid-danger text-mid-danger border`}
              >
                Try Again
              </SkiButton>
            }
          />
        )}

        {/* Empty State */}
        {!isLoading && !isError && !hasSavedItems && (
          <EmptyState
            images={[{ src: "/images/empty-state.svg", width: 80, height: 80, alt: "Empty State" }]}
            title={"No saved items yet"}
            description={"Start saving your favorite products to see them here."}
            className={`bg-mid-grey-I space-y-0 rounded-lg`}
            titleClassName={`!text-2xl`}
            descriptionClassName={`text-base mb-4`}
            actionButton={
              <SkiButton href="/shop" variant="primary">
                Browse Products
              </SkiButton>
            }
          />
        )}

        {/* Products Grid */}
        {!isLoading && !isError && hasSavedItems && (
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
            {data?.data?.items?.map((product: Product) => (
              <ShopCard
                key={product.id}
                id={product.id}
                category={product.category}
                title={product.name}
                rating={3}
                price={product.price}
                discount={product.discountPrice || 0}
                image={product.images[0]}
                name={product.user.name || "Skicom"}
                showSaveButton={true} // Ensure save button is shown
              />
            ))}
          </div>
        )}
      </Wrapper>
    </section>
  );
};

const ShopCardSkeleton = () => (
  <div className="animate-pulse space-y-3 rounded-lg border p-4">
    <div className="h-72 rounded-md bg-gray-200"></div>
    <div className="h-4 rounded bg-gray-200"></div>
    <div className="h-4 w-3/4 rounded bg-gray-200"></div>
    <div className="h-4 w-1/2 rounded bg-gray-200"></div>
  </div>
);

export default SavedItems;
