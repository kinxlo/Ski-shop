"use client";

import Loading from "@/app/Loading";
import { Icons } from "@/components/core/miscellaneous/icons";
import { SearchInput } from "@/components/core/miscellaneous/search-input";
import { DashboardTable } from "@/components/shared/dashboard-table";
import { DownloadCsvButton } from "@/components/shared/download-csv-button";
import { EmptyState } from "@/components/shared/empty-state";
// import { orderStatusOptions } from "@/lib/constants";
import { Locale } from "@/lib/i18n/config";
import { formatCurrency } from "@/lib/i18n/utils";
import { useDashboardSearchParameters } from "@/lib/nuqs/use-dashboard-search-parameters";
import { useAdminService } from "@/services/dashboard/admin/use-admin-service";
import { useLocale } from "next-intl";
import { GiWallet } from "react-icons/gi";

import { DashboardHeader } from "../../_components/dashboard-header";
// import { FilterDropdown } from "../../_components/dashboard-table/_components/filter-dropdown";
import { OverViewCard } from "../../_components/overview-card";
import { SectionTwo } from "./_components/currency-dropdown/section-two";
import { AnalysisSkeleton, SectionTwoSkeleton, TableSkeleton } from "./_components/page-skeleton";
import { useRevenueHistoryColumns } from "./_components/revenue-history-columns";

const Page = () => {
  const locale = useLocale();

  const {
    // page: currentPage,
    search: searchQuery,
    // status,

    setSearch: setSearchQuery,
    // setStatus,
    resetToFirstPage,
  } = useDashboardSearchParameters();

  const { useGetRevenueOverview, useGetRevenueHistory } = useAdminService();

  const { data: overviewData, isLoading: isOverviewLoading, isError: isOverviewError } = useGetRevenueOverview();
  const {
    data: revenueHistory,
    isLoading: isRevenueHistoryLoading,
    isError: isRevenueHistoryError,
  } = useGetRevenueHistory();

  const revenueHistoryColumns = useRevenueHistoryColumns();

  const handleSearchChange = (newSearch: string) => {
    setSearchQuery(newSearch);
    resetToFirstPage(); // Reset to first page when search changes
  };

  // const handleStatusChange = (newStatus: string) => {
  //   setStatus(newStatus as "all" | "pending" | "delivered" | "cancelled");
  //   resetToFirstPage(); // Reset to first page when status changes
  // };

  // const handleRowClick = (order: Order) => {
  //   // Navigate to order details page
  //   window.location.href = `/admin/orders/${order.id}`;
  // };

  return (
    <main className="space-y-8">
      <DashboardHeader
        // actionComponent={<CurrencyDropdown />}
        title="Revenue"
        subtitle={`View all revenue data`}
        showSubscriptionBanner={false}
        icon={<Icons.wallet className={`size-6`} />}
      />

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
        <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <OverViewCard
            title={"Total Revenue"}
            value={formatCurrency(overviewData?.data?.totalRevenue || 0, locale as Locale)}
            icon={<GiWallet />}
            iconClassName="bg-[#F2EBFB] text-[24px] text-purple"
          />
          <OverViewCard
            title={"Subscriptions"}
            value={formatCurrency(overviewData?.data?.subscriptions || 0, locale as Locale)}
            icon={<GiWallet />}
            iconClassName="bg-low-blue text-[24px] blue text-primary"
          />
          <OverViewCard
            title={"Promotions"}
            value={formatCurrency(overviewData?.data?.promotionAds || 0, locale as Locale)}
            icon={<GiWallet />}
            iconClassName="bg-low-success text-[24px] text-mid-success"
          />
          <OverViewCard
            title={"Commissions"}
            value={formatCurrency(overviewData?.data?.commisions || 0, locale as Locale)}
            icon={<GiWallet />}
            iconClassName="bg-low-warning/20 text-[24px] text-mid-warning"
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

      {/* Revenue History Table Section */}
      <section>
        {isRevenueHistoryLoading ? (
          <TableSkeleton />
        ) : isRevenueHistoryError ? (
          <EmptyState
            title="Error loading revenue history"
            description="There was a problem fetching the revenue history data. Please try again later."
            className="min-h-fit space-y-0 rounded-lg bg-red-50 p-6"
            titleClassName={`!text-lg font-bold !text-mid-danger`}
            descriptionClassName={`!text-mid-danger`}
            images={[]}
          />
        ) : (
          <section className={`bg-background mt-6 space-y-4 rounded-lg p-6`}>
            <DashboardHeader
              title="Revenue History"
              subtitle="Track Skishop revenue history"
              showSubscriptionBanner={false}
              icon={<Icons.wallet className="mt-[-2] size-4" />}
              titleClassName={`!text-lg`}
              subtitleClassName={`!text-sm`}
              actionComponent={
                <div className="">
                  <div className="flex items-center gap-2">
                    <SearchInput className={``} onSearch={handleSearchChange} initialValue={searchQuery} />
                    {/* <FilterDropdown options={orderStatusOptions} value={status} onValueChange={handleStatusChange} /> */}
                    <DownloadCsvButton
                      data={(revenueHistory?.data || []) as Record<string, unknown>[]}
                      filename="revenue-history"
                      headers={{
                        revenueSource: "Revenue Source",
                        description: "Description",
                        amount: "Amount",
                        user: "User",
                        date: "Date",
                      }}
                    />
                  </div>
                </div>
              }
            />

            <section>
              {isRevenueHistoryError ? (
                <Loading text="Loading revenue history..." className="w-fill h-fit p-20" />
              ) : revenueHistory?.data?.length ? (
                <DashboardTable
                  data={revenueHistory.data}
                  columns={revenueHistoryColumns}
                  // No pagination for revenue history
                  showPagination={false}
                />
              ) : (
                <div className="flex items-center justify-center p-20">
                  <p>No revenue history found.</p>
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
