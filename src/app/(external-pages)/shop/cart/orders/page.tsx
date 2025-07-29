"use client";

import { ProductBreadcrumb } from "@/app/(external-pages)/(home)/_components/product-breadcrumb";
import { OrderCard } from "@/app/(external-pages)/(home)/_components/shop-card/order-card";
import { Wrapper } from "@/components/core/layout/wrapper";
import { cn } from "@/lib/utils";
import { useAppService } from "@/services/app/use-app-service";

const Orders = ({ headerStyle }: { title: string; headerStyle?: string; hasAction?: boolean }) => {
  const { useGetOrders } = useAppService();
  const { data: orderData, isLoading } = useGetOrders();

  // eslint-disable-next-line no-console
  console.log(orderData);

  return (
    <section className="min-h-[480px] pt-[10rem]">
      <ProductBreadcrumb productTitle={`Orders`} />
      <Wrapper className={`py-16`}>
        <div className={cn(`mb-8 flex items-baseline justify-between`, headerStyle)}>
          <h2 className={cn("text-high-grey-II text-sm font-black lg:text-3xl", headerStyle)}>My Orders</h2>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-8">
          {isLoading &&
            Array.from({ length: 8 }).map((_, index: number) => {
              return <ShopCardSkeleton key={index} />;
            })}
          {orderData?.data.items?.map((product) => {
            return (
              <OrderCard
                key={product.id.toString()}
                id={product.id.toString()}
                title={product.products[0].name}
                rating={3}
                // discount={product.products[0].price ? formatCurrency(product.products[0].price) : 0}
                image={product.products[0].images[0]}
                status={product.status}
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

export default Orders;
