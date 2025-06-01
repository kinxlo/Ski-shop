"use client";

import { ProductBreadcrumb } from "@/app/(external-pages)/(home)/_components/product-breadcrumb";
import { ShopCard } from "@/app/(external-pages)/(home)/_components/shop-card/shop-card";
import { Wrapper } from "@/components/core/layout/wrapper";
import { cn } from "@/lib/utils";
import { useAppService } from "@/services/app/use-app-service";
import { toast } from "sonner";

const SavedItems = ({ headerStyle }: { title: string; headerStyle?: string; hasAction?: boolean }) => {
  const { useGetAllProducts } = useAppService();
  const { isLoading, isError, error, data } = useGetAllProducts();

  // Handle error state
  if (isError) {
    toast.error("something went wrong", {
      description: error.message,
    });
  }

  return (
    <section className="min-h-[480px] pt-[10rem]">
      <ProductBreadcrumb productTitle={`Saved Items`} />
      <Wrapper className={`py-16`}>
        <div className={cn(`mb-8 flex items-baseline justify-between`, headerStyle)}>
          <h2 className={cn("text-high-grey-II text-sm font-black lg:text-3xl", headerStyle)}>Saved Items</h2>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
          {isLoading &&
            Array.from({ length: 8 }).map((_, index: number) => {
              return <ShopCardSkeleton key={index} />;
            })}
          {data?.products?.slice(0, 8).map((product) => {
            return (
              <ShopCard
                key={product.id.toString()}
                id={product.id.toString()}
                category={product.category}
                title={product.title}
                rating={product.rating}
                price={product.price}
                discount={product.discountPercentage}
                image={product.thumbnail}
              />
            );
          })}
        </div>
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
