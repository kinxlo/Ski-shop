"use client";

import { SearchInput } from "@/components/core/miscellaneous/search-input";
import { DashboardTable } from "@/components/shared/dashboard-table";
import { useOrderColumn } from "@/components/shared/dashboard-table/table-data";
import { EmptyState } from "@/components/shared/empty-state";
import { orderStatusOptions } from "@/lib/constants";
import type { Locale } from "@/lib/i18n/config";
import { formatCurrency } from "@/lib/i18n/utils";
import { useDashboardSearchParameters } from "@/lib/nuqs/use-dashboard-search-parameters";
import { useHomeService } from "@/services/dashboard/vendor/home/use-home-service";
import { useDashboardProductService } from "@/services/dashboard/vendor/products/use-product-service";
import { useLocale } from "next-intl";
import { useCallback, useMemo } from "react";
import { GiWallet } from "react-icons/gi";
import { IoBag } from "react-icons/io5";
import { RiShoppingCartLine } from "react-icons/ri";

import { FilterDropdown } from "../../_components/dashboard-table/_components/filter-dropdown";
import { OverViewCard } from "../../_components/overview-card";
import { CurrencyDropdown } from "./_components/currency-dropdown";
import { AnalysisSkeleton, TableSkeleton } from "./page-skeleton";

const Page = () => {
  const locale = useLocale();
  const orderColumn = useOrderColumn();
  const {
    search: searchQuery,
    orderStatus,
    limit,
    page,
    setSearch: setSearchQuery,
    setOrderStatus,
    resetToFirstPage,
  } = useDashboardSearchParameters();

  const filters = useMemo(
    () => ({
      page,
      ...(orderStatus !== "all" && { status: orderStatus as "completed" | "pending" | "cancelled" }),
      ...(searchQuery && { search: searchQuery }),
      ...(limit && { limit }),
    }),
    [page, orderStatus, searchQuery, limit],
  );

  const { useGetAllProducts } = useDashboardProductService();
  const { useGetOverview } = useHomeService();
  const { data: productData, isLoading: isProductsLoading, isError: isProductsError } = useGetAllProducts(filters);
  const { data: overviewData, isLoading: isOverviewLoading, isError: isOverviewError } = useGetOverview();

  // Extract data from the correct structure (similar to shop page)
  const products = productData?.data?.items || [];
  const totalProducts = productData?.data?.metadata?.total || 0;
  const totalPages = productData?.data?.metadata?.totalPages || 0;
  const hasNextPage = productData?.data?.metadata?.hasNextPage || false;
  const hasPreviousPage = productData?.data?.metadata?.hasPreviousPage || false;

  const handleSearchChange = useCallback(
    (newSearch: string) => {
      // Prevent rapid search changes that could cause throttling
      if (newSearch !== searchQuery) {
        setSearchQuery(newSearch);
        resetToFirstPage(); // Reset to first page when search changes
      }
    },
    [setSearchQuery, resetToFirstPage, searchQuery],
  );

  const handleStatusChange = useCallback(
    (newStatus: string) => {
      // Prevent rapid status changes that could cause throttling
      if (newStatus !== orderStatus) {
        setOrderStatus(newStatus as "all" | "completed" | "pending" | "cancelled");
        resetToFirstPage(); // Reset to first page when status changes
      }
    },
    [setOrderStatus, resetToFirstPage, orderStatus],
  );

  // Memoize the formatted revenue value to prevent unnecessary re-renders
  const formattedRevenue = useMemo(
    () => formatCurrency(overviewData?.data?.overview?.totalRevenue || 0, locale as Locale),
    [locale, overviewData?.data?.overview?.totalRevenue],
  );

  return (
    <>
      <main>
        <section className="mb-5 flex items-center justify-between">
          <h4 className="text-mid-grey-III text-[18px] !font-bold lg:text-[30px]">Dashboard Overview</h4>
          <div>
            <CurrencyDropdown />
          </div>
        </section>

        {/* Overview Cards Section */}
        {isOverviewLoading ? (
          <AnalysisSkeleton />
        ) : isOverviewError ? (
          <EmptyState
            title="Error loading data"
            description="There was a problem fetching the overview data. Please try again later."
            className="bg-low-warning/5 min-h-fit space-y-0 rounded-lg p-6"
            titleClassName={`!text-lg font-bold !text-mid-danger`}
            descriptionClassName={`!text-mid-danger`}
            images={[]}
          />
        ) : (
          <section className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <OverViewCard
              title={"Total Sales"}
              value={formattedRevenue}
              icon={<GiWallet />}
              iconClassName="bg-[#F2EBFB] text-[24px] text-purple"
            />
            <OverViewCard
              title={"Total Orders"}
              value={overviewData?.data?.overview?.totalOrders || "0"}
              icon={<RiShoppingCartLine />}
              iconClassName="bg-low-blue text-[24px] blue text-primary"
            />
            <OverViewCard
              title={"Total Products"}
              value={overviewData?.data?.overview?.totalUsers || "0"}
              icon={<IoBag />}
              iconClassName="bg-low-success text-[24px] text-mid-success"
            />
          </section>
        )}

        {/* Products Table Section */}
        <section>
          <section className={`mt-6 space-y-4 rounded-lg bg-white p-6`}>
            <section className={`flex flex-col-reverse justify-between gap-4 lg:flex-row lg:items-center`}>
              <div className="">
                <p className="text-lg font-bold">Recent Orders</p>
              </div>
              <div className="">
                <div className="flex items-center gap-2">
                  <SearchInput className={``} onSearch={handleSearchChange} initialValue={searchQuery} delay={500} />
                  <FilterDropdown options={orderStatusOptions} value={orderStatus} onValueChange={handleStatusChange} />
                </div>
              </div>
            </section>
            <section>
              {isProductsLoading ? (
                <TableSkeleton />
              ) : isProductsError ? (
                <EmptyState
                  title="Error loading products"
                  description="There was a problem fetching the table data. Please try again later."
                  className="min-h-fit space-y-0 rounded-lg bg-red-50 p-6"
                  titleClassName={`!text-lg font-bold !text-mid-danger`}
                  descriptionClassName={`!text-mid-danger`}
                  images={[]}
                />
              ) : products.length > 0 ? (
                <DashboardTable
                  data={products}
                  columns={orderColumn}
                  totalPages={totalPages}
                  itemsPerPage={totalProducts}
                  hasPreviousPage={hasPreviousPage}
                  hasNextPage={hasNextPage}
                  showPagination
                  pageParameter="page"
                />
              ) : (
                <div className="flex items-center justify-center p-20">
                  <p>No products found. Add your first product to get started.</p>
                </div>
              )}
            </section>
          </section>
        </section>
      </main>
    </>
  );
};

export default Page;
