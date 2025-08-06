"use client";

import { SearchInput } from "@/components/core/miscellaneous/search-input";
import { EmptyState } from "@/components/shared/empty-state";
import { useDashboardSearchParameters } from "@/lib/nuqs/use-dashboard-search-parameters";
import { useDashboardOrderService } from "@/services/dashboard/vendor/orders/use-order-service";
import { useCallback, useMemo } from "react";
import { toast } from "sonner";

import { MobileOrderCard } from "../_components/mobile-order-card";
import { OrderTable } from "../_components/order-table";

export const AllOrders = () => {
  const {
    search: searchQuery,
    orderStatus,
    limit,
    page,
    setSearch: setSearchQuery,
    resetToFirstPage,
  } = useDashboardSearchParameters();

  const filters = useMemo(
    () => ({
      page,
      ...(orderStatus !== "all" && { status: orderStatus as "pending" | "delivered" | "cancelled" }),
      ...(searchQuery && { search: searchQuery }),
      ...(limit && { limit }),
    }),
    [page, orderStatus, searchQuery, limit],
  );

  const { useGetAllOrders, useUpdateOrderStatus } = useDashboardOrderService();
  const { data: orderData, isLoading, isError, refetch } = useGetAllOrders(filters);
  const updateOrderStatusMutation = useUpdateOrderStatus();

  const orders = orderData?.data?.items || [];
  const totalOrders = orderData?.data?.metadata?.total || 0;

  const handleSearchChange = useCallback(
    (newSearch: string) => {
      if (newSearch !== searchQuery) {
        setSearchQuery(newSearch);
        resetToFirstPage();
      }
    },
    [setSearchQuery, resetToFirstPage, searchQuery],
  );

  const handleStatusUpdate = useCallback(
    async (orderId: string, status: "pending" | "delivered" | "cancelled") => {
      try {
        await updateOrderStatusMutation.mutateAsync({ id: orderId, status });
        toast.success("Order status updated successfully");
        refetch();
      } catch {
        toast.error("Failed to update order status");
      }
    },
    [updateOrderStatusMutation, refetch],
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-10 w-full animate-pulse rounded bg-gray-200" />
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-32 animate-pulse rounded bg-gray-200" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <EmptyState
        images={[{ src: "/images/empty-state.svg", width: 80, height: 80, alt: "Error" }]}
        title="Something went wrong"
        description="Failed to load orders. Please try again."
        className="bg-mid-grey-I space-y-0 rounded-lg"
        titleClassName="!text-2xl"
        descriptionClassName="text-base mb-4"
        actionButton={
          <button onClick={() => refetch()} className="bg-primary hover:bg-primary/90 rounded-md px-4 py-2 text-white">
            Try Again
          </button>
        }
      />
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <EmptyState
        images={[{ src: "/images/empty-state.svg", width: 80, height: 80, alt: "No orders" }]}
        title="No orders found"
        description="There are no orders matching your criteria."
        className="bg-mid-grey-I space-y-0 rounded-lg"
        titleClassName="!text-2xl"
        descriptionClassName="text-base mb-4"
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="flex justify-end">
        <SearchInput
          className="w-full max-w-md"
          onSearch={handleSearchChange}
          initialValue={searchQuery}
          delay={500}
          placeholder="Search for orders..."
        />
      </div>

      {/* Mobile View */}
      <div className="block lg:hidden">
        <div className="space-y-4">
          {orders.map((order) => (
            <MobileOrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block">
        <OrderTable orders={orders} onStatusUpdate={handleStatusUpdate} />
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-500">
        Showing {orders.length} of {totalOrders} orders
      </div>
    </div>
  );
};
