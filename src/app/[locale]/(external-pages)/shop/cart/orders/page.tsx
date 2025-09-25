"use client";

import { Wrapper } from "@/components/core/layout/wrapper";
import SkiButton from "@/components/shared/button";
import { EmptyState } from "@/components/shared/empty-state";
import { cn } from "@/lib/utils";
import { useAppService } from "@/services/externals/app/use-app-service";

import { ProductBreadcrumb } from "../../../(home)/_components/product-breadcrumb";
import { OrderCard } from "../../../(home)/_components/shop-card/order-card";

const Orders = ({ headerStyle }: { title: string; headerStyle?: string; hasAction?: boolean }) => {
  const { useGetOrders } = useAppService();
  const { data: orderData, isLoading, isError, refetch } = useGetOrders();

  return (
    <section className="min-h-[480px] pt-18 lg:pt-[10rem]">
      <ProductBreadcrumb productTitle={`Orders`} />
      <Wrapper className={`py-16`}>
        <div className={cn(`mb-8 flex items-baseline justify-between`, headerStyle)}>
          <h3 className={cn("!text-lg md:!text-xl", headerStyle)}>My Orders</h3>
        </div>

        {/* Error State */}
        {isError && (
          <EmptyState
            images={[{ src: "/images/empty-state.svg", width: 80, height: 80, alt: "Error loading orders" }]}
            title="Failed to load orders"
            description="Something went wrong while loading your orders. Please try again."
            className="space-y-0 rounded-lg"
            titleClassName="!text-lg md:!text-2xl !text-mid-danger"
            descriptionClassName="!text-sm md:!text-base text-mid-danger mb-4"
            actionButton={
              <SkiButton
                onClick={() => refetch()}
                variant="outline"
                className="border-mid-danger text-mid-danger border"
              >
                Try Again
              </SkiButton>
            }
          />
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 gap-8">
            {Array.from({ length: 8 }).map((_, index: number) => {
              return <OrderCardSkeleton key={index} />;
            })}
          </div>
        )}

        {/* Empty State */}
        {!orderData?.data.items ||
          (orderData.data.items.length === 0 && (
            <EmptyState
              images={[{ src: "/images/empty-state.svg", width: 80, height: 80, alt: "No orders" }]}
              title="No orders yet"
              description="You haven't placed any orders yet. Start shopping to see your orders here."
              className="bg-mid-grey-I space-y-0 rounded-lg"
              titleClassName="!text-lg md:!text-2xl"
              descriptionClassName="!text-sm md:!text-base mb-4"
              actionButton={
                <SkiButton href="/shop" variant="primary">
                  Start Shopping
                </SkiButton>
              }
            />
          ))}

        {/* Orders Grid */}
        {!isLoading && !isError && orderData?.data.items && orderData.data.items.length > 0 && (
          <div className="grid grid-cols-2 gap-1 md:gap-4">
            {orderData.data.items.map((product) => {
              return (
                <OrderCard
                  key={product.id.toString()}
                  id={product.id.toString()}
                  title={product.products[0].name}
                  rating={product.products[0].rating}
                  // discount={product.products[0].price ? formatCurrency(product.products[0].price) : 0}
                  image={product.products[0].images[0]}
                  status={product.status}
                />
              );
            })}
          </div>
        )}
      </Wrapper>
    </section>
  );
};

const OrderCardSkeleton = () => (
  <div className="flex animate-pulse flex-col gap-8 rounded-lg border p-4 lg:flex-row">
    {/* Product Image Skeleton */}
    <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-200">
      <div className="h-[400px] w-[400px] bg-gray-300"></div>
    </div>

    {/* Order Information Skeleton */}
    <div className="w-full space-y-2">
      {/* Order ID */}
      <div className="h-3 w-20 rounded bg-gray-200 lg:h-4"></div>

      {/* Product Title */}
      <div className="space-y-2">
        <div className="h-4 w-3/4 rounded bg-gray-200 lg:h-8"></div>
        <div className="h-4 w-1/2 rounded bg-gray-200 lg:h-8"></div>
      </div>

      {/* Ratings */}
      <div className="flex items-center space-x-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="h-4 w-4 rounded bg-gray-200"></div>
        ))}
      </div>

      {/* Status and Delivery Info */}
      <div className="mt-8 space-y-2">
        {/* Status Badge */}
        <div className="h-6 w-16 rounded-full bg-gray-200 lg:h-8"></div>

        {/* Delivery Date */}
        <div className="h-6 w-48 rounded bg-gray-200 lg:h-8"></div>
      </div>
    </div>

    {/* Button Skeleton */}
    <div className="h-10 w-32 rounded bg-gray-200 lg:h-12"></div>
  </div>
);

export default Orders;
