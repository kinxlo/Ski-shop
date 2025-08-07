"use client";

import { Wrapper } from "@/components/core/layout/wrapper";
import { BlurImage } from "@/components/core/miscellaneous/blur-image";
import SkiButton from "@/components/shared/button";
import { EmptyState } from "@/components/shared/empty-state";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/i18n/utils";
import { cn } from "@/lib/utils";
import { useDashboardOrderService } from "@/services/dashboard/vendor/orders/use-order-service";
import { ArrowLeft, CreditCard, MapPin, Phone, User } from "lucide-react";
import Link from "next/link";
import { use, useState } from "react";

import { AssignRiderModal } from "./_components/assign-rider-modal";
import { OrderDetailSkeleton } from "./_components/order-detail-skeleton";

interface OrderDetailPageProperties {
  params: Promise<{
    orderId: string;
    locale: string;
  }>;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending": {
      return "bg-yellow-500 text-white";
    }
    case "delivered": {
      return "bg-green-500 text-white";
    }
    case "cancelled": {
      return "bg-red-500 text-white";
    }
    default: {
      return "bg-gray-500 text-white";
    }
  }
};

export default function OrderDetailPage({ params }: OrderDetailPageProperties) {
  const { orderId } = use(params);
  const { useGetOrderById, useUpdateOrderStatus } = useDashboardOrderService();
  const { data: orderResponse, isLoading, isError } = useGetOrderById(orderId);
  const [isAssignRiderModalOpen, setIsAssignRiderModalOpen] = useState(false);

  const updateOrderStatusMutation = useUpdateOrderStatus({
    onSuccess: () => {
      // Optionally refresh the order data or show success message
      // Order status updated successfully
    },
    onError: () => {
      // Failed to update order status
    },
  });

  const handleAssignRider = () => {
    // Update order status to "assigned" or similar
    updateOrderStatusMutation.mutate({
      id: orderId,
      status: "delivered", // You might want to add a new status like "assigned"
    });
    // TODO: Add rider assignment logic here
  };

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
                className="flex items-center text-gray-600 transition-colors hover:text-gray-900"
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard/orders"
                className="flex items-center text-gray-600 transition-colors hover:text-gray-900"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                <span className="hidden sm:inline">Back to Orders</span>
              </Link>
              <div className="hidden h-6 w-px bg-gray-300 sm:block" />
              <h1 className="!text-lg font-semibold text-gray-900 sm:!text-3xl">Order Details</h1>
            </div>
            <Badge className={cn("px-3 py-1 text-sm", getStatusColor(order.status))}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Badge>
          </div>
        </div>
      </div>

      <Wrapper className="mx-auto px-0 py-4">
        <div className="grid grid-cols-1 gap-4 sm:gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-4 sm:space-y-6 lg:col-span-2">
            {/* Order Summary */}
            <Card className="shadow-none">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-base sm:text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 sm:gap-4">
                  <div>
                    <span className="text-gray-500">Order ID:</span>
                    <span className="ml-2 font-medium">{order.id}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Date Purchased:</span>
                    <span className="ml-2 font-medium">{formatDate(order.createdAt)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Products Ordered */}
            <Card className="shadow-none">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-base sm:text-lg">Products Ordered</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {order.products.map((product: OrderProduct) => (
                    <div
                      key={product.id}
                      className="flex items-center space-x-3 rounded-lg bg-gray-50 p-3 sm:space-x-4 sm:p-4"
                    >
                      <div className="relative flex-shrink-0">
                        <div className="relative">
                          <BlurImage
                            src={product.images[0] || "/images/placeholder-product.jpg"}
                            alt={product.name}
                            width={60}
                            height={60}
                            className="rounded-lg object-cover sm:h-20 sm:w-20"
                          />
                          {product.vendor?.name && (
                            <div className="bg-primary absolute -top-1 -left-1 rounded px-1 py-0.5 text-xs text-white sm:-top-2 sm:-left-2 sm:px-2 sm:py-1">
                              {`Best Seller`}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="mb-1 !text-sm font-medium text-gray-900 sm:!text-2xl">{product.name}</h3>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-500 sm:text-sm">Qty: {product.quantity}</div>
                          <div className="text-primary text-sm font-medium sm:text-base">
                            {formatCurrency(product.price)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Financial Summary */}
            <Card className="shadow-none">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-base sm:text-lg">Financial Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">
                      {formatCurrency(
                        order.products.reduce(
                          (sum: number, product: OrderProduct) => sum + product.price * product.quantity,
                          0,
                        ),
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery fee</span>
                    <span className="font-medium">₦1,200</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 text-sm font-semibold sm:pt-3 sm:text-base">
                    <span>Total</span>
                    <span className="text-primary">
                      {formatCurrency(
                        order.products.reduce(
                          (sum: number, product: OrderProduct) => sum + product.price * product.quantity,
                          0,
                        ) + 1200,
                      )}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Buyer Information */}
            <Card className="shadow-none">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="flex items-center text-base sm:text-lg">
                  <User className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Buyer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div>
                  <span className="text-xs text-gray-500 sm:text-sm">Name</span>
                  <p className="text-sm font-medium sm:text-base">{order.buyer.name}</p>
                </div>
                <div>
                  <span className="flex items-center text-xs text-gray-500 sm:text-sm">
                    <Phone className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                    Phone
                  </span>
                  <p className="text-sm font-medium sm:text-base">N/A</p>
                </div>
                <div>
                  <span className="flex items-center text-xs text-gray-500 sm:text-sm">
                    <MapPin className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                    Address
                  </span>
                  <p className="text-sm font-medium sm:text-base">N/A</p>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card className="shadow-none">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="flex items-center text-base sm:text-lg">
                  <CreditCard className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div>
                  <span className="text-xs text-gray-500 sm:text-sm">Method</span>
                  <p className="text-sm font-medium sm:text-base">N/A</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500 sm:text-sm">Transaction ID</span>
                  <p className="font-mono text-xs font-medium sm:text-sm">N/A</p>
                </div>
              </CardContent>
            </Card>

            {/* Action Button */}
            <div className="sticky bottom-4 z-10 lg:top-6">
              <SkiButton
                variant="primary"
                size={`xl`}
                className="w-full"
                onClick={() => setIsAssignRiderModalOpen(true)}
                isDisabled={updateOrderStatusMutation.isPending}
              >
                {updateOrderStatusMutation.isPending ? "Assigning..." : "Assign Rider"}
              </SkiButton>
            </div>
          </div>
        </div>
      </Wrapper>

      {/* Assign Rider Modal */}
      <AssignRiderModal
        isOpen={isAssignRiderModalOpen}
        onClose={() => setIsAssignRiderModalOpen(false)}
        onAssignRider={handleAssignRider}
        orderId={""}
      />
    </div>
  );
}
