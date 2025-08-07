"use client";

import { SearchInput } from "@/components/core/miscellaneous/search-input";
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
      ...(orderStatus !== "all" && { status: orderStatus as "delivered" | "pending" | "cancelled" }),
      ...(searchQuery && { search: searchQuery }),
      ...(limit && { limit }),
    }),
    [page, orderStatus, searchQuery, limit],
  );

  const { useGetAllProducts } = useDashboardProductService();
  const { useGetAllOrders } = useDashboardOrderService();
  const { data: productData, isLoading: isProductsLoading, isError: isProductsError } = useGetAllProducts(filters);
  const { data: orderData } = useGetAllOrders(filters);

  // Extract data from the correct structure (similar to shop page)
  const totalProducts = productData?.data?.metadata?.total || 0;

  const orders = orderData?.data?.items || [];
  const totalOrders = orderData?.data?.metadata?.total || 0;
  const totalPagesOrders = orderData?.data?.metadata?.totalPages || 0;
  const hasNextPageOrders = orderData?.data?.metadata?.hasNextPage || false;
  const hasPreviousPageOrders = orderData?.data?.metadata?.hasPreviousPage || false;

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
        setOrderStatus(newStatus as "all" | "delivered" | "pending" | "cancelled");
        resetToFirstPage(); // Reset to first page when status changes
      }
    },
    [setOrderStatus, resetToFirstPage, orderStatus],
  );

  // Memoize the formatted revenue value to prevent unnecessary re-renders
  // const formattedRevenue = useMemo(
  //   () => formatCurrency(overviewData?.data?.overview?.totalRevenue || 0, locale as Locale),
  //   [locale, overviewData?.data?.overview?.totalRevenue],
  // );

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
        {isProductsLoading ? (
          <AnalysisSkeleton />
        ) : isProductsError ? (
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
              value={totalProducts || "0"}
              icon={<GiWallet />}
              iconClassName="bg-[#F2EBFB] text-[24px] text-purple"
            />
            <OverViewCard
              title={"Total Orders"}
              value={totalOrders || "0"}
              icon={<RiShoppingCartLine />}
              iconClassName="bg-low-blue text-[24px] blue text-primary"
            />
            <OverViewCard
              title={"Total Products"}
              value={totalProducts || "0"}
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
              ) : orders.length > 0 ? (
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
              ) : (
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
                  titleClassName={`!text-xl font-bold`}
                  description={"There are no products in the database. Please add a product to get started."}
                  descriptionClassName={`text-mid-grey-II`}
                  className="bg-mid-grey-I space-y-0 rounded-lg py-10"
                  button={{
                    text: "Add Product",
                    onClick: () => router.push(`/dashboard/products/new`),
                  }}
                />
              )}
            </section>
          </section>
        </section>
      </main>
    </>
  );
};

export default Page;
