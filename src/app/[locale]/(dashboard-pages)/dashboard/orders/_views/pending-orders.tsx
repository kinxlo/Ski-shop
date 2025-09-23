"use client";

import { SearchInput } from "@/components/core/miscellaneous/search-input";
import { DashboardTable } from "@/components/shared/dashboard-table";
import { useOrderColumn } from "@/components/shared/dashboard-table/table-data";
import { EmptyState } from "@/components/shared/empty-state";
import { useDashboardSearchParameters } from "@/lib/nuqs/use-dashboard-search-parameters";
import { useDashboardOrderService } from "@/services/dashboard/vendor/orders/use-order-service";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import { TableSkeleton } from "../../home/page-skeleton";

export const PendingOrders = () => {
  const router = useRouter();
  const {
    search: searchQuery,
    limit,
    page,
    setSearch: setSearchQuery,
    resetToFirstPage,
  } = useDashboardSearchParameters();

  const filters = useMemo(
    () => ({
      page,
      status: "pending" as const,
      ...(searchQuery && { search: searchQuery }),
      ...(limit && { limit }),
    }),
    [page, searchQuery, limit],
  );

  const { useGetAllOrders } = useDashboardOrderService();
  const { data: orderData, isLoading, isError, refetch } = useGetAllOrders(filters);

  const orders = orderData?.data?.items || [];
  const totalOrders = orderData?.data?.metadata?.total || 0;
  const totalPages = orderData?.data?.metadata?.totalPages || 1;
  const hasNextPage = orderData?.data?.metadata?.hasNextPage || false;
  const hasPreviousPage = orderData?.data?.metadata?.hasPreviousPage || false;

  const orderColumn = useOrderColumn();

  const handleSearchChange = useCallback(
    (newSearch: string) => {
      if (newSearch !== searchQuery) {
        setSearchQuery(newSearch);
        resetToFirstPage();
      }
    },
    [setSearchQuery, resetToFirstPage, searchQuery],
  );

  const handleRowClick = useCallback(
    (order: Order) => {
      router.push(`/dashboard/orders/${order.id}`);
    },
    [router],
  );

  const renderLoadingSkeleton = () => <TableSkeleton />;

  const renderErrorState = () => (
    <EmptyState
      images={[{ src: "/images/empty-state.svg", width: 80, height: 80, alt: "Error" }]}
      title="Something went wrong"
      description="Failed to load pending orders. Please try again."
      className="bg-mid-grey-I space-y-0 rounded-lg"
      titleClassName="!text-2xl"
      descriptionClassName="text-base mb-4"
      actionButton={
        <button
          onClick={() => refetch()}
          className="bg-primary hover:bg-primary/90 text-background rounded-md px-4 py-2"
        >
          Refresh
        </button>
      }
    />
  );

  const renderEmptyState = () => (
    <EmptyState
      images={[{ src: "/images/empty-state.svg", width: 80, height: 80, alt: "No pending orders" }]}
      title="No pending orders"
      description="There are no pending orders at the moment."
      className="bg-mid-grey-I space-y-0 rounded-lg"
      titleClassName="!text-2xl"
      descriptionClassName="text-base mb-4"
    />
  );

  const renderOrdersTable = () => (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="flex justify-end">
        <SearchInput
          className="w-full max-w-md"
          onSearch={handleSearchChange}
          initialValue={searchQuery}
          delay={500}
          placeholder="Search pending orders..."
        />
      </div>
      {isLoading ? (
        renderLoadingSkeleton()
      ) : isError ? (
        renderErrorState()
      ) : !orders || orders.length === 0 ? (
        renderEmptyState()
      ) : (
        // Dashboard Table
        <DashboardTable
          data={orders}
          columns={orderColumn}
          totalPages={totalPages}
          itemsPerPage={totalOrders}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          showPagination
          pageParameter="page"
          onRowClick={handleRowClick}
        />
      )}
    </div>
  );

  const renderPendingOrdersContent = () => {
    return renderOrdersTable();
  };

  return renderPendingOrdersContent();
};
