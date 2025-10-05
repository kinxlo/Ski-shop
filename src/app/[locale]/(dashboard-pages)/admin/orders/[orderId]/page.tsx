"use client";

import { BackButton } from "@/components/shared/back-button";
import { Details } from "@/components/shared/details";
import { EmptyState, ErrorState } from "@/components/shared/empty-state";
import { useDashboardOrderService } from "@/services/dashboard/vendor/orders/use-order-service";
import { use } from "react";

import { DashboardHeader } from "../../../_components/dashboard-header";
import { OrderDetailSkeleton } from "./_components/order-detail-skeleton";

interface OrderDetailPageProperties {
  params: Promise<{
    orderId: string;
    locale: string;
  }>;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString();
};

export default function OrderDetailPage({ params }: OrderDetailPageProperties) {
  const { orderId } = use(params);
  const { useGetOrderById } = useDashboardOrderService();
  const { data: orderResponse, isLoading, isError, refetch } = useGetOrderById(orderId);

  if (isLoading) {
    return <OrderDetailSkeleton />;
  }

  if (isError || !orderResponse?.data) {
    return <ErrorState className={`bg-background min-h-[calc(100vh-130px)]`} onRetry={() => refetch()} />;
  }

  const order = orderResponse.data;

  return (
    <section className={`space-y-8`}>
      <DashboardHeader
        title="Order Details"
        subtitle={`${order.reference} details`}
        showSubscriptionBanner={false}
        icon={<BackButton />}
      />
      {/* TODO: Add order-specific CSV download functionality */}

      <section className="space-y-6">
        <Details.Section title="Order Details">
          <Details.Grid className={`lg:flex lg:justify-between`}>
            <Details.Item label="Order ID" value={order.reference} />
            <Details.Item label="Buyer Name" value={order.buyer.name} />
            <Details.Item label="Status" value={order.status} />
            <Details.Item label="Total Amount" value={`$${order.totalAmount}`} />
            <Details.Item label="Payment Method" value={order.paymentMethod} />
            <Details.Item label="Paid At" value={formatDate(order.paidAt)} />
            <Details.Item label="Delivery Status" value={order.deliveryStatus} />
            <Details.Item label="Created At" value={formatDate(order.createdAt)} />
          </Details.Grid>
        </Details.Section>
        <Details.Section title="Order Products">
          {!order.products || order.products.length === 0 ? (
            <EmptyState
              title="No products in this order"
              description="This order has no products to display."
              descriptionClassName="mb-4"
            />
          ) : (
            <div className="space-y-4">
              {order.products.map((product) => (
                <div key={product.id} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center space-x-4">
                    {/* <img src={product.images[0]} alt={product.name} className="h-16 w-16 rounded object-cover" /> */}
                    <div>
                      <h4 className="font-semibold">{product.name || `Some product`}</h4>
                      <p className="text-sm text-gray-600">Vendor: {product.vendor?.name || `Unknown vendor`}</p>
                      <p className="text-sm text-gray-600">Rating: {product.rating || `No rating`}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${product.price || `0.00`}</p>
                    <p className="text-sm text-gray-600">Qty: {product.quantity || `0`}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Details.Section>
      </section>
    </section>
  );
}
