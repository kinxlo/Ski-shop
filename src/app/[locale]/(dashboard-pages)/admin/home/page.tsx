"use client";

import Loading from "@/app/Loading";
import { SearchInput } from "@/components/core/miscellaneous/search-input";
import { DashboardTable } from "@/components/shared/dashboard-table";
import { useAdminOrderColumn } from "@/components/shared/dashboard-table/admin/admin-table-data";
import { EmptyState } from "@/components/shared/empty-state";
import { orderStatusOptions } from "@/lib/constants";
import { Locale } from "@/lib/i18n/config";
import { formatCurrency } from "@/lib/i18n/utils";
import { useDashboardSearchParameters } from "@/lib/nuqs/use-dashboard-search-parameters";
import { useHomeService } from "@/services/dashboard/vendor/home/use-home-service";
import { useDashboardOrderService } from "@/services/dashboard/vendor/orders/use-order-service";
import { usePayoutService } from "@/services/dashboard/vendor/payouts";
import { useSettingsService } from "@/services/dashboard/vendor/settings/use-settings-service";
import { useUserService } from "@/services/externals/user/use-user-service";
import { useLocale } from "next-intl";
import { GiWallet } from "react-icons/gi";
import { IoRibbonOutline } from "react-icons/io5";
import { MdOutlineAddCard } from "react-icons/md";
import { PiUsersThreeLight } from "react-icons/pi";
import { RiShoppingCartLine } from "react-icons/ri";

import { FilterDropdown } from "../../_components/dashboard-table/_components/filter-dropdown";
import { OverViewCard } from "../../_components/overview-card";
import { CurrencyDropdown } from "./_components/currency-dropdown";
import { SectionTwo } from "./_components/currency-dropdown/section-two";
import { AnalysisSkeleton, SectionTwoSkeleton, TableSkeleton } from "./_components/page-skeleton";

const Page = () => {
  const locale = useLocale();

  const {
    // page: currentPage,
    search: searchQuery,
    status,
    limit,
    setSearch: setSearchQuery,
    setStatus,
    resetToFirstPage,
  } = useDashboardSearchParameters();

  const orderFilters = {
    // page: currentPage,
    ...(status !== "all" && { status: status as "pending" | "delivered" | "cancelled" }),
    ...(searchQuery && { search: searchQuery }),
    // ...(limit && { limit }),
  };

  const { useGetOverview } = useHomeService();
  const { useGetAllOrders } = useDashboardOrderService();
  const { useGetAllUsers } = useUserService();
  const { useGetPayouts } = usePayoutService();
  const { useGetSubscriptions } = useSettingsService();

  const orderColumn = useAdminOrderColumn();

  const { data: overviewData, isLoading: isOverviewLoading, isError: isOverviewError } = useGetOverview();
  const { data: allOrders, isLoading: isAllOrdersLoading, isError: isAllOrdersError } = useGetAllOrders(orderFilters);
  const { data: newOrders } = useGetAllOrders({ status: "pending" });

  const orders = allOrders?.data?.items || [];
  const totalPages = allOrders?.data?.metadata?.totalPages || 1;
  const hasNextPage = allOrders?.data?.metadata?.hasNextPage || false;
  const hasPreviousPage = allOrders?.data?.metadata?.hasPreviousPage || false;

  const { data: allUsers } = useGetAllUsers();
  const { data: payoutsData } = useGetPayouts();
  const { data: subscriptionsData } = useGetSubscriptions();

  const handleSearchChange = (newSearch: string) => {
    setSearchQuery(newSearch);
    resetToFirstPage(); // Reset to first page when search changes
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus as "all" | "pending" | "delivered" | "cancelled");
    resetToFirstPage(); // Reset to first page when status changes
  };

  // const handleRowClick = (order: Order) => {
  //   // Navigate to order details page
  //   window.location.href = `/admin/orders/${order.id}`;
  // };

  return (
    <main>
      <section className="mb-5 flex items-center justify-between">
        <h4 className="text-mid-grey-III text-[18px] lg:text-[30px]">Dashboard Overview</h4>
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
          className="min-h-fit space-y-0 rounded-lg bg-red-50 p-6"
          titleClassName={`!text-lg font-bold !text-mid-danger`}
          descriptionClassName={`!text-mid-danger`}
          images={[]}
        />
      ) : (
        <section className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <OverViewCard
            title={"Total Revenue"}
            value={formatCurrency(overviewData?.data?.totalRevenue || 0, locale as Locale)}
            icon={<GiWallet />}
            iconClassName="bg-[#F2EBFB] text-[24px] text-purple"
          />
          <OverViewCard
            title={"Total Orders"}
            value={allOrders?.data.metadata.total || "0"}
            icon={<RiShoppingCartLine />}
            iconClassName="bg-low-blue text-[24px] blue text-primary"
          />
          <OverViewCard
            title={"Total Users"}
            value={allUsers?.data.metadata.total || "0"}
            icon={<PiUsersThreeLight />}
            iconClassName="bg-low-success text-[24px] text-mid-success"
          />
          <OverViewCard
            title={"New Orders"}
            value={newOrders?.data.metadata.total || "0"}
            icon={<RiShoppingCartLine />}
            iconClassName="bg-low-blue text-[24px] blue text-primary"
          />
          <OverViewCard
            title={"Pending Payouts"}
            value={payoutsData?.data.metadata.total || "0"}
            icon={<MdOutlineAddCard />}
            iconClassName="bg-low-danger text-[24px] text-mid-danger"
          />
          <OverViewCard
            title={"Active Subscriptions"}
            value={subscriptionsData?.data?.metadata.total || "0"}
            icon={<IoRibbonOutline />}
            iconClassName="bg-low-success text-[24px] text-mid-success"
          />
        </section>
      )}

      {/* Section Two */}
      <section>
        {isOverviewLoading ? (
          <SectionTwoSkeleton />
        ) : isOverviewError ? (
          <EmptyState
            title="Error loading Graph data"
            description="There was a problem fetching the graph data. Please try again later."
            className="min-h-fit space-y-0 rounded-lg bg-red-50 p-6"
            titleClassName={`!text-lg font-bold !text-mid-danger`}
            descriptionClassName={`!text-mid-danger`}
            images={[]}
          />
        ) : (
          <SectionTwo />
        )}
      </section>

      {/* Orders Table Section */}
      <section>
        {isAllOrdersLoading ? (
          <TableSkeleton />
        ) : isAllOrdersError ? (
          <EmptyState
            title="Error loading orders"
            description="There was a problem fetching the orders data. Please try again later."
            className="min-h-fit space-y-0 rounded-lg bg-red-50 p-6"
            titleClassName={`!text-lg font-bold !text-mid-danger`}
            descriptionClassName={`!text-mid-danger`}
            images={[]}
          />
        ) : (
          <section className={`bg-background mt-6 space-y-4 rounded-lg p-6`}>
            <section className={`flex flex-col-reverse justify-between gap-4 lg:flex-row lg:items-center`}>
              <div className="">
                <p className="text-lg font-bold">Recent Orders</p>
              </div>
              <div className="">
                <div className="flex items-center gap-2">
                  <SearchInput className={``} onSearch={handleSearchChange} initialValue={searchQuery} />
                  <FilterDropdown options={orderStatusOptions} value={status} onValueChange={handleStatusChange} />
                </div>
              </div>
            </section>
            <section>
              {isAllOrdersError ? (
                <Loading text="Loading orders..." className="w-fill h-fit p-20" />
              ) : orders?.length ? (
                <DashboardTable
                  data={orders}
                  columns={orderColumn}
                  totalPages={totalPages}
                  itemsPerPage={limit || 10}
                  hasNextPage={hasNextPage}
                  hasPreviousPage={hasPreviousPage}
                  showPagination
                  pageParameter="page"
                  // onRowClick={handleRowClick}
                />
              ) : (
                <div className="flex items-center justify-center p-20">
                  <p>No orders found.</p>
                </div>
              )}
            </section>
          </section>
        )}
      </section>
    </main>
  );
};

export default Page;
