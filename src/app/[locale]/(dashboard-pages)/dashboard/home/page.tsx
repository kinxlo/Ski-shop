"use client";

import { SearchInput } from "@/components/core/miscellaneous/search-input";
import { DashboardTable } from "@/components/shared/dashboard-table";
import { orderColumn } from "@/components/shared/dashboard-table/table-data";
import { EmptyState } from "@/components/shared/empty-state";
import { productStatusOptions } from "@/lib/constants";
import { useDashboardSearchParameters } from "@/lib/nuqs/use-dashboard-search-parameters";
import { formatCurrency } from "@/lib/utils";
import { useHomeService } from "@/services/dashboard/vendor/home/use-home-service";
import { useProductService } from "@/services/externals/products/use-product-service";
import { useQueryState } from "nuqs";
import { useCallback } from "react";
import { GiWallet } from "react-icons/gi";
import { IoBag } from "react-icons/io5";
import { RiShoppingCartLine } from "react-icons/ri";

import { FilterDropdown } from "../../_components/dashboard-table/_components/filter-dropdown";
import { OverViewCard } from "../../_components/overview-card";
import { CurrencyDropdown } from "./_components/currency-dropdown";
import { AnalysisSkeleton, TableSkeleton } from "./page-skeleton";

const Page = () => {
  const {
    search: searchQuery,
    status,
    setSearch: setSearchQuery,
    setStatus,
    resetToFirstPage,
  } = useDashboardSearchParameters();

  // Get the current page from the table's URL parameter
  const [tablePage] = useQueryState("tp", { defaultValue: "1" });

  const filters: IFilters = {
    page: tablePage ? Number.parseInt(tablePage) : 1,
    ...(status !== "all" && { status: status as "published" | "draft" }),
    ...(searchQuery && { search: searchQuery }),
  };

  // Debug: Log the current state
  // console.log("Dashboard state:", {
  //   currentPage,
  //   searchQuery,
  //   status,
  //   filters,
  // });

  const { useGetAllProducts } = useProductService();
  const { useGetOverview } = useHomeService();
  const { data: productData, isLoading: isProductsLoading, isError: isProductsError } = useGetAllProducts(filters);
  const { data: overviewData, isLoading: isOverviewLoading, isError: isOverviewError } = useGetOverview();

  // Force refetch when page changes
  // useEffect(() => {
  //   refetchProducts();
  // }, [currentPage, refetchProducts]);

  // Extract data from the correct structure (similar to shop page)
  const products = productData?.items || [];
  const totalProducts = productData?.metadata?.total || 0;
  const totalPages = productData?.metadata?.totalPages || 0;
  const hasNextPage = productData?.metadata?.hasNextPage || false;
  const hasPreviousPage = productData?.metadata?.hasPreviousPage || false;

  const handleSearchChange = useCallback(
    (newSearch: string) => {
      setSearchQuery(newSearch);
      resetToFirstPage(); // Reset to first page when search changes
    },
    [setSearchQuery, resetToFirstPage],
  );

  const handleStatusChange = useCallback(
    (newStatus: string) => {
      setStatus(newStatus as "all" | "published" | "draft");
      resetToFirstPage(); // Reset to first page when status changes
    },
    [setStatus, resetToFirstPage],
  );

  // No need for page change handler since table manages its own state

  return (
    <>
      {/* <VerifyEmailModal email={session?.user?.email || null} open={showVerifyModal} onOpenChange={setShowVerifyModal} /> */}
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
              value={formatCurrency(overviewData?.data?.overview?.totalRevenue || 0)}
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
                  <SearchInput className={``} onSearch={handleSearchChange} initialValue={searchQuery} />
                  <FilterDropdown options={productStatusOptions} value={status} onValueChange={handleStatusChange} />
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
                  pageParameter="tp"
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
