"use client";

import { Icons } from "@/components/core/miscellaneous/icons";
import { SearchInput } from "@/components/core/miscellaneous/search-input";
import { DashboardTable } from "@/components/shared/dashboard-table";
import { useAdminOrderColumn } from "@/components/shared/dashboard-table/admin/admin-table-data";
import { DownloadCsvButton } from "@/components/shared/download-csv-button";
import { EmptyState } from "@/components/shared/empty-state";
import { useDashboardSearchParameters } from "@/lib/nuqs/use-dashboard-search-parameters";
import { useDashboardOrderService } from "@/services/dashboard/vendor/orders/use-order-service";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import { DashboardHeader } from "../../../_components/dashboard-header";
import { TableSkeleton } from "../../home/_components/page-skeleton";

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

  const orderColumn = useAdminOrderColumn();

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
      router.push(`/admin/orders/${order.id}`);
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
    <section className="space-y-6">
      <DashboardHeader
        title="Pending Orders"
        subtitle="Track pending orders from customers and their status"
        titleClassName={`!text-lg`}
        subtitleClassName={`!text-sm`}
        showSubscriptionBanner={false}
        icon={<Icons.cart className={`mt-[-4] size-4`} />}
        actionComponent={
          <div className="flex items-center gap-2">
            <SearchInput className="" onSearch={handleSearchChange} initialValue={searchQuery} />
            <DownloadCsvButton
              data={(orders || []) as Record<string, unknown>[]}
              filename="pending-orders"
              headers={{
                id: "Order ID",
                customerName: "Customer Name",
                totalAmount: "Total Amount",
                status: "Status",
                createdAt: "Date Created",
              }}
            />
          </div>
        }
      />
      <div>
        {isLoading ? (
          renderLoadingSkeleton()
        ) : isError ? (
          renderErrorState()
        ) : !orders || orders.length === 0 ? (
          renderEmptyState()
        ) : (
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
    </section>
  );

  const renderPendingOrdersContent = () => {
    return renderOrdersTable();
  };

  return renderPendingOrdersContent();
};
