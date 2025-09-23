"use client";

import { Wrapper } from "@/components/core/layout/wrapper";
import SkiButton from "@/components/shared/button";
import { Details } from "@/components/shared/details";
import { EmptyState } from "@/components/shared/empty-state";
import { useDashboardOrderService } from "@/services/dashboard/vendor/orders/use-order-service";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use } from "react";

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
  const router = useRouter();
  const { useGetOrderById } = useDashboardOrderService();
  const { data: orderResponse, isLoading, isError } = useGetOrderById(orderId);

  if (isLoading) {
    return <OrderDetailSkeleton />;
  }

  if (isError || !orderResponse?.data) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard/orders"
                className="text-high-grey-II flex items-center transition-colors hover:text-gray-900"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                <span className="hidden sm:inline">Back to Orders</span>
              </Link>
              <div className="hidden h-6 w-px bg-gray-300 sm:block" />
              <h1 className="!text-lg font-semibold text-gray-900 sm:!text-3xl">Order Details</h1>
            </div>
          </div>
        </div>
        <Wrapper className="mx-auto px-0 py-4">
          <EmptyState
            images={[{ src: "/images/empty-state.svg", width: 80, height: 80, alt: "Error" }]}
            title="Order not found"
            description="The order you're looking for doesn't exist or has been removed."
            className="bg-mid-grey-I space-y-0 rounded-lg"
            titleClassName="!text-2xl"
            descriptionClassName="text-base mb-4"
            actionButton={
              <Link href="/dashboard/orders">
                <SkiButton variant="primary" size="lg">
                  Back to Orders
                </SkiButton>
              </Link>
            }
          />
        </Wrapper>
      </div>
    );
  }

  const order = orderResponse.data;

  return (
    <>
      <section className={`flex flex-col items-center justify-between gap-4 lg:flex-row`}>
        <div className="flex items-center gap-4">
          <ChevronLeft className="h-6 w-6 cursor-pointer" onClick={() => router.back()} />
          <h4 className="text-high-grey-III !text-[18px] lg:!text-[25px]">Order Summary </h4>
        </div>
        {/* TODO: Add order-specific CSV download functionality */}
      </section>
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
          <div className="space-y-4">
            {order.products.map((product) => (
              <div key={product.id} className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center space-x-4">
                  {/* <img src={product.images[0]} alt={product.name} className="h-16 w-16 rounded object-cover" /> */}
                  <div>
                    <h4 className="font-semibold">{product.name || `Some product`}</h4>
                    <p className="text-sm text-gray-600">Vendor: {product.vendor.name || `Unknown vendor`}</p>
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
        </Details.Section>
      </section>
    </>
  );
}
