"use client";

import { SearchInput } from "@/components/core/miscellaneous/search-input";
import SkiButton from "@/components/shared/button";
import { DashboardTable } from "@/components/shared/dashboard-table";
import { useOrderColumn } from "@/components/shared/dashboard-table/table-data";
import { EmptyState, ErrorState } from "@/components/shared/empty-state";
import { useDashboardSearchParameters } from "@/lib/nuqs/use-dashboard-search-parameters";
import { useDashboardOrderService } from "@/services/dashboard/vendor/orders/use-order-service";
import { useCallback, useMemo } from "react";

import { TableSkeleton } from "../../home/page-skeleton";

export const PaidOrders = () => {
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
      status: "paid" as const,
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

  const renderLoadingSkeleton = () => <TableSkeleton />;

  const renderErrorState = () => <ErrorState onRetry={() => refetch()} />;

  const renderEmptyState = () => (
    <EmptyState
      title="No orders found"
      description="There are no orders matching your criteria."
      descriptionClassName="text-base mb-4"
      actionButton={
        <SkiButton variant={`primary`} size={`lg`} onClick={() => refetch()}>
          Refresh
        </SkiButton>
      }
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
          placeholder="Search delivered orders..."
        />
      </div>

      {/* Dashboard Table */}
      <DashboardTable
        data={orders}
        columns={orderColumn}
        totalPages={totalPages}
        itemsPerPage={totalOrders}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        showPagination
        pageParameter="page"
      />
    </div>
  );

  const renderDeliveredOrdersContent = () => {
    if (isLoading) {
      return renderLoadingSkeleton();
    }

    if (isError) {
      return renderErrorState();
    }

    if (!orders || orders.length === 0) {
      return renderEmptyState();
    }

    return renderOrdersTable();
  };

  return renderDeliveredOrdersContent();
};
