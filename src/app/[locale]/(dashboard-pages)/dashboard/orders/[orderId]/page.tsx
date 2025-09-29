"use client";

import { Wrapper } from "@/components/core/layout/wrapper";
import { BlurImage } from "@/components/core/miscellaneous/blur-image";
import { BackButton } from "@/components/shared/back-button";
import SkiButton from "@/components/shared/button";
import { AlertModal } from "@/components/shared/dialog/alert-modal";
import { EmptyState } from "@/components/shared/empty-state";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { formatCurrency, formatDate } from "@/lib/i18n/utils";
import { cn } from "@/lib/utils";
import { OrderTrackingData, RiderInfo } from "@/modules/tracking/types";
import { createTrackingData } from "@/modules/tracking/utils/tracking-utils";
import { useDashboardOrderService } from "@/services/dashboard/vendor/orders/use-order-service";
import { ArrowLeft, CreditCard, Info, MapPin, Phone, Star, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { use, useState } from "react";

import { DashboardHeader } from "../../../_components/dashboard-header";
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
  const [isFulfillmentFeeModalOpen, setIsFulfillmentFeeModalOpen] = useState(false);
  const [trackingData, setTrackingData] = useState<OrderTrackingData | null>(null);
  const [assignedRider, setAssignedRider] = useState<RiderInfo | null>({
    id: "1",
    name: "Bola Xpress",
    phone: "0803 123 4567",
    rating: 4.7,
    reviews: 63,
    location: {
      lat: 6.5244,
      lng: 3.3792,
      address: "Lagos, Nigeria",
    },
  });

  // Status checkboxes state
  const [orderConfirmed, setOrderConfirmed] = useState(true);
  const [packageReady, setPackageReady] = useState(false);

  // Handle checkbox changes
  const handleOrderConfirmedChange = (checked: boolean | "indeterminate") => {
    setOrderConfirmed(checked === true);
  };

  const handlePackageReadyChange = (checked: boolean | "indeterminate") => {
    setPackageReady(checked === true);
  };

  const updateOrderStatusMutation = useUpdateOrderStatus({
    onSuccess: () => {
      // Optionally refresh the order data or show success message
      // Order status updated successfully
    },
    onError: () => {
      // Failed to update order status
    },
  });

  const handleAssignRider = (riderId: string, riderInfo?: RiderInfo) => {
    if (riderInfo && orderResponse?.data) {
      // Create tracking data
      const newTrackingData = createTrackingData(
        orderId,
        orderResponse.data.products[0]?.name || "Product",
        riderInfo,
        "rider_accepted",
      );

      setTrackingData(newTrackingData);
      setAssignedRider(riderInfo);
    }
  };

  const handleFulfillmentFeeInfo = () => {
    setIsFulfillmentFeeModalOpen(true);
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
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-8">
        <DashboardHeader
          actionComponent={
            <Badge className={cn("px-3 py-1 text-sm", getStatusColor(order.status))}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Badge>
          }
          title="Order Details"
          subtitle={`Order details`}
          showSubscriptionBanner
          icon={<BackButton />}
        />
      </div>

      <Wrapper className="mx-auto px-0 py-4">
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-4 sm:space-y-6 lg:col-span-2">
            {/* Order Summary */}
            <Card className="border-none shadow-none">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-base sm:!text-lg">Order Summary</CardTitle>
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
            <Card className="border-none shadow-none">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-base sm:!text-lg">Products Ordered</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {order.products.map((product: OrderProduct) => (
                    <div
                      key={product.id}
                      className="bg-primary/5 relative flex items-center space-x-3 overflow-hidden rounded-lg p-3 sm:space-x-4 sm:p-4"
                    >
                      <div className="flex-shrink-0">
                        <div className={cn("")}>
                          <BlurImage
                            src={product.images[0] || "/images/placeholder-product.jpg"}
                            alt={product.name}
                            width={60}
                            height={60}
                            className="rounded-lg object-cover sm:h-20 sm:w-20"
                          />
                          {product.vendor?.name && (
                            <Image
                              src="/images/star-seller.svg"
                              alt="Seller badge"
                              width={20}
                              height={20}
                              className="pointer-events-none absolute -top-3 -left-0 z-10 size-10 sm:size-20"
                            />
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
            <Card className="border-none shadow-none">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-base sm:!text-lg">Financial Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-high-grey-II">Subtotal</span>
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
                    <span className="text-high-grey-II">Delivery fee</span>
                    <span className="font-medium">₦1,200</span>
                  </div>
                  {assignedRider && (
                    <div className="flex justify-between text-sm">
                      <span className="text-high-grey-II flex items-center gap-1">
                        Gas / Fulfillment Fee
                        <Info
                          className="text-primary h-4 w-4 cursor-pointer hover:opacity-80"
                          onClick={handleFulfillmentFeeInfo}
                        />
                      </span>
                      <span className="text-mid-danger font-medium">₦5,800</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t pt-2 text-sm font-semibold text-green-500 sm:pt-3 sm:text-base">
                    <span>Total</span>
                    <span className="">
                      {formatCurrency(
                        order.products.reduce(
                          (sum: number, product: OrderProduct) => sum + product.price * product.quantity,
                          0,
                        ) +
                          1200 +
                          (assignedRider ? 5800 : 0),
                      )}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Update Status Section */}
            <Card className="border-none shadow-none">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-base sm:!text-lg">Update Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between space-x-3">
                    <label
                      htmlFor="order-confirmed"
                      className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Order Confirmed
                    </label>
                    <Checkbox
                      id="order-confirmed"
                      checked={orderConfirmed}
                      onCheckedChange={handleOrderConfirmedChange}
                      className="data-[state=checked]:bg-primary data-[state=checked]:border-border border-primary h-6 w-6 rounded-full border-2 data-[state=checked]:border-2"
                    />
                  </div>
                  <div className="flex items-center justify-between space-x-3">
                    <label
                      htmlFor="package-ready"
                      className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Package ready to be shipped
                    </label>
                    <Checkbox
                      id="package-ready"
                      checked={packageReady}
                      onCheckedChange={handlePackageReadyChange}
                      className="data-[state=checked]:bg-primary data-[state=checked]:border-border border-primary h-6 w-6 rounded-full border-2 data-[state=checked]:border-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Buyer Information */}
            <Card className="border-none shadow-none">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="flex items-center text-base sm:!text-lg">
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
            <Card className="border-none shadow-none">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="flex items-center text-base sm:!text-lg">
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

            {/* Assigned Rider Information */}
            {assignedRider && (
              <Card className="border-none shadow-none">
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="flex items-center text-base sm:!text-lg">
                    <User className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    Assigned Rider
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
                      <span className="text-high-grey-II text-lg font-semibold">
                        {assignedRider.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold">{assignedRider.name}</p>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{assignedRider.rating}</span>
                        <span className="text-xs text-gray-500">({assignedRider.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className="flex items-center text-xs text-gray-500 sm:text-sm">
                      <Phone className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                      Phone
                    </span>
                    <p className="text-sm font-medium sm:text-base">{assignedRider.phone}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 sm:text-sm">Rider ID</span>
                    <p className="font-mono text-xs font-medium sm:text-sm">{assignedRider.id}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="sticky bottom-4 z-10 space-y-3 lg:top-6">
              {trackingData ? (
                <Link href={`/dashboard/orders/${orderId}/tracking`}>
                  <SkiButton variant="primary" size="xl" className="w-full">
                    Track Rider
                  </SkiButton>
                </Link>
              ) : (
                <SkiButton
                  variant="primary"
                  size="xl"
                  className="w-full"
                  onClick={() => setIsAssignRiderModalOpen(true)}
                  isDisabled={updateOrderStatusMutation.isPending}
                >
                  {updateOrderStatusMutation.isPending ? "Assigning..." : "Assign Rider"}
                </SkiButton>
              )}
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

      {/* Fulfillment Fee Info Modal */}
      <AlertModal
        isOpen={isFulfillmentFeeModalOpen}
        onClose={() => setIsFulfillmentFeeModalOpen(false)}
        onConfirm={() => setIsFulfillmentFeeModalOpen(false)}
        type="info"
        title="Fulfillment/Gas Fee"
        description="Ski-Shop charges a small fulfilment fee on each order you receive. This fee helps cover transaction costs, platform maintenance, and customer support to keep your store running smoothly."
        confirmText="Okay, Got It!"
        showCancelButton={false}
      />
    </div>
  );
}
