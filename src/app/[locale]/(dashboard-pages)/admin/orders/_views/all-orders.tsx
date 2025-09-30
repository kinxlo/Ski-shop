"use client";

import { Icons } from "@/components/core/miscellaneous/icons";
import { SearchInput } from "@/components/core/miscellaneous/search-input";
import { DashboardTable } from "@/components/shared/dashboard-table";
import { useAdminOrderColumn } from "@/components/shared/dashboard-table/admin/admin-table-data";
import { DownloadCsvButton } from "@/components/shared/download-csv-button";
import { EmptyState } from "@/components/shared/empty-state";
// import { FilterDropdown } from "@/components/shared/filter-dropdown";
import { useDashboardSearchParameters } from "@/lib/nuqs/use-dashboard-search-parameters";
import { useDashboardOrderService } from "@/services/dashboard/vendor/orders/use-order-service";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import { DashboardHeader } from "../../../_components/dashboard-header";
import { TableSkeleton } from "../../home/_components/page-skeleton";

export const AllOrders = () => {
  const router = useRouter();
  const {
    search: searchQuery,
    status,
    limit,
    page,
    setSearch: setSearchQuery,
    resetToFirstPage,
  } = useDashboardSearchParameters();

  const filters = useMemo(
    () => ({
      page,
      ...(status !== "all" && { status: status as "pending" | "paid" | "cancelled" }),
      ...(searchQuery && { search: searchQuery }),
      ...(limit && { limit }),
    }),
    [page, status, searchQuery, limit],
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

  // const handleStatusChange = useCallback(
  //   (newStatus: string) => {
  //     setStatus(newStatus as "all" | "pending" | "paid");
  //     resetToFirstPage();
  //   },
  //   [setStatus, resetToFirstPage],
  // );

  // const filterOptions = [
  //   { value: "all", label: "All Orders" },
  //   { value: "pending", label: "Pending Orders" },
  //   { value: "paid", label: "Paid Orders" },
  // ];

  const renderLoadingSkeleton = () => <TableSkeleton />;

  const renderErrorState = () => (
    <EmptyState
      images={[{ src: "/images/empty-state.svg", width: 80, height: 80, alt: "Error" }]}
      title="Something went wrong"
      description="Failed to load orders. Please try again."
      className="bg-mid-grey-I space-y-0 rounded-lg"
      titleClassName="!text-2xl"
      descriptionClassName="text-base mb-4"
      actionButton={
        <button
          onClick={() => refetch()}
          className="bg-primary hover:bg-primary/90 text-background rounded-md px-4 py-2"
        >
          Try Again
        </button>
      }
    />
  );

  const renderEmptyState = () => (
    <EmptyState
      images={[{ src: "/images/empty-state.svg", width: 80, height: 80, alt: "No orders" }]}
      title="No orders found"
      description="There are no orders matching your criteria."
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

  const renderOrdersTable = () => (
    <section className="space-y-6">
      <DashboardHeader
        title="All Orders"
        subtitle="Track all orders from customers and their status"
        titleClassName={`!text-lg`}
        subtitleClassName={`!text-sm`}
        showSubscriptionBanner={false}
        icon={<Icons.cart className={`mt-[-4] size-4`} />}
        actionComponent={
          <div className="flex items-center gap-2">
            <SearchInput className="" onSearch={handleSearchChange} initialValue={searchQuery} />
            <DownloadCsvButton
              data={(orders || []) as Record<string, unknown>[]}
              filename="all-orders"
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

  const renderAllOrdersContent = () => {
    return renderOrdersTable();
  };

  return renderAllOrdersContent();
};
