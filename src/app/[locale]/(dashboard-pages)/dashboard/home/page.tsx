"use client";

import { SearchInput } from "@/components/core/miscellaneous/search-input";
import SubscriptionBanner from "@/components/shared/banner/subscription-banner";
import { DashboardTable } from "@/components/shared/dashboard-table";
import { useOrderColumn } from "@/components/shared/dashboard-table/table-data";
import { EmptyState } from "@/components/shared/empty-state";
import { orderStatusOptions } from "@/lib/constants";
import { useDashboardSearchParameters } from "@/lib/nuqs/use-dashboard-search-parameters";
import { useDashboardOrderService } from "@/services/dashboard/vendor/orders/use-order-service";
import { useDashboardProductService } from "@/services/dashboard/vendor/products/use-product-service";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { GiWallet } from "react-icons/gi";
import { IoBag } from "react-icons/io5";
import { RiShoppingCartLine } from "react-icons/ri";

import { FilterDropdown } from "../../_components/dashboard-table/_components/filter-dropdown";
import { OverViewCard } from "../../_components/overview-card";
import { CurrencyDropdown } from "./_components/currency-dropdown";
import { AnalysisSkeleton, TableSkeleton } from "./page-skeleton";

const Page = () => {
  const router = useRouter();
  const orderColumn = useOrderColumn();
  const {
    search: searchQuery,
    status,
    limit,
    // page,
    setSearch: setSearchQuery,
    setStatus,
    resetToFirstPage,
  } = useDashboardSearchParameters();

  const filters = useMemo(
    () => ({
      // page,
      ...(status !== "all" && { status: status as "delivered" | "pending" | "cancelled" }),
      ...(searchQuery && { search: searchQuery }),
      ...(limit && { limit }),
    }),
    [status, searchQuery, limit],
  );

  const { useGetAllProducts } = useDashboardProductService();
  const { useGetAllOrders } = useDashboardOrderService();
  const { data: productData, isLoading: isProductsLoading, isError: isProductsError } = useGetAllProducts(filters);
  const { data: orderData } = useGetAllOrders(filters);

  // Extract data from the correct structure
  const totalProducts = productData?.data?.metadata?.total || 0;
  const orders = orderData?.data?.items || [];
  const totalOrders = orderData?.data?.metadata?.total || 0;
  const totalPagesOrders = orderData?.data?.metadata?.totalPages || 0;
  const hasNextPageOrders = orderData?.data?.metadata?.hasNextPage || false;
  const hasPreviousPageOrders = orderData?.data?.metadata?.hasPreviousPage || false;

  const handleSearchChange = useCallback(
    (newSearch: string) => {
      if (newSearch !== searchQuery) {
        setSearchQuery(newSearch);
        resetToFirstPage();
      }
    },
    [setSearchQuery, resetToFirstPage, searchQuery],
  );

  const handleStatusChange = useCallback(
    (newStatus: string) => {
      if (newStatus !== status) {
        setStatus(newStatus as "all" | "delivered" | "pending" | "cancelled");
        resetToFirstPage();
      }
    },
    [setStatus, resetToFirstPage, status],
  );

  const renderDashboardHeader = () => (
    <>
      <section className="flex items-center justify-between">
        <h4 className="">Dashboard Overview</h4>
        <CurrencyDropdown />
      </section>
      <SubscriptionBanner />
    </>
  );

  const renderOverviewLoadingSkeleton = () => <AnalysisSkeleton />;

  const renderOverviewErrorState = () => (
    <EmptyState
      title="Error loading data"
      description="There was a problem fetching the overview data. Please try again later."
      className="bg-low-warning/5 min-h-fit space-y-0 rounded-lg p-6"
      titleClassName="!text-lg font-bold !text-mid-danger"
      descriptionClassName="!text-mid-danger"
      images={[]}
    />
  );

  const renderOverviewCards = () => (
    <section className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      <OverViewCard
        title="Total Sales"
        value={totalProducts || "0"}
        icon={<GiWallet />}
        iconClassName="bg-low-blue dark:bg-[#111111] text-[24px] text-primary"
      />
      <OverViewCard
        title="Total Orders"
        value={totalOrders || "0"}
        icon={<RiShoppingCartLine />}
        iconClassName="bg-low-blue dark:bg-[#111111] text-[24px] text-primary"
      />
      <OverViewCard
        title="Total Products"
        value={totalProducts || "0"}
        icon={<IoBag />}
        iconClassName="bg-low-success dark:bg-[#111111] text-[24px] text-mid-success"
      />
    </section>
  );

  const renderOverviewSection = () => {
    if (isProductsLoading) {
      return renderOverviewLoadingSkeleton();
    }

    if (isProductsError) {
      return renderOverviewErrorState();
    }

    return renderOverviewCards();
  };

  const renderOrdersTableHeader = () => (
    <section className="flex flex-col-reverse justify-between gap-4 lg:flex-row lg:items-center">
      <div>
        <p className="text-lg !font-bold">Recent Orders</p>
      </div>
      <div>
        <div className="flex items-center gap-2">
          <SearchInput onSearch={handleSearchChange} initialValue={searchQuery} delay={500} />
          <FilterDropdown options={orderStatusOptions} value={status} onValueChange={handleStatusChange} />
        </div>
      </div>
    </section>
  );

  const renderOrdersTableLoadingSkeleton = () => <TableSkeleton />;

  const renderOrdersTableErrorState = () => (
    <EmptyState
      title="Error loading products"
      description="There was a problem fetching the table data. Please try again later."
      className="min-h-fit space-y-0 rounded-lg bg-red-50 p-6"
      titleClassName="!text-lg font-bold !text-mid-danger"
      descriptionClassName="!text-mid-danger"
      images={[]}
    />
  );

  const renderOrdersTable = () => (
    <DashboardTable
      data={orders}
      columns={orderColumn}
      totalPages={totalPagesOrders}
      itemsPerPage={totalOrders}
      hasPreviousPage={hasPreviousPageOrders}
      hasNextPage={hasNextPageOrders}
      showPagination
      pageParameter="page"
    />
  );

  const renderOrdersEmptyState = () => (
    <EmptyState
      images={[
        {
          src: "/images/empty-state.svg",
          alt: "Empty Cart",
          width: 80,
          height: 80,
        },
      ]}
      title="No products found"
      titleClassName="!text-xl font-bold"
      description="There are no products in the database. Please add a product to get started."
      descriptionClassName="text-mid-grey-II"
      className="bg-mid-grey-I space-y-0 rounded-lg py-10"
      button={{
        text: "Add Product",
        onClick: () => router.push("/dashboard/products/new"),
      }}
    />
  );

  const renderOrdersTableContent = () => {
    if (isProductsLoading) {
      return renderOrdersTableLoadingSkeleton();
    }

    if (isProductsError) {
      return renderOrdersTableErrorState();
    }

    if (orders.length > 0) {
      return renderOrdersTable();
    }

    return renderOrdersEmptyState();
  };

  const renderOrdersTableSection = () => (
    <section>
      <section className="bg-background space-y-4 rounded-lg p-6">
        {renderOrdersTableHeader()}
        <section>{renderOrdersTableContent()}</section>
      </section>
    </section>
  );

  return (
    <main className="space-y-8">
      {renderDashboardHeader()}
      {renderOverviewSection()}
      {renderOrdersTableSection()}
    </main>
  );
};

export default Page;
