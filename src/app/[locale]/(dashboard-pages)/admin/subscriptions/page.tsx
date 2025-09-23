"use client";

import Loading from "@/app/Loading";
import { SearchInput } from "@/components/core/miscellaneous/search-input";
import { DashboardTable } from "@/components/shared/dashboard-table";
import { DownloadCsvButton } from "@/components/shared/download-csv-button";
import { EmptyState } from "@/components/shared/empty-state";
import { Locale } from "@/lib/i18n/config";
import { formatCurrency } from "@/lib/i18n/utils";
// import { orderStatusOptions } from "@/lib/constants";
import { useDashboardSearchParameters } from "@/lib/nuqs/use-dashboard-search-parameters";
import { useSettingsService } from "@/services/dashboard/vendor/settings/use-settings-service";
import { useLocale } from "next-intl";
import { GiWallet } from "react-icons/gi";

// import { FilterDropdown } from "../../_components/dashboard-table/_components/filter-dropdown";
import { OverViewCard } from "../../_components/overview-card";
import { TableSkeleton } from "../home/_components/page-skeleton";
import { useSubscriptionHistoryColumns } from "./_components/subscription-history-columns";

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

  const { useGetSubscriptions } = useSettingsService();

  const {
    data: subscriptionHistory,
    isLoading: isSubscriptionHistoryLoading,
    isError: isSubscriptionHistoryError,
  } = useGetSubscriptions({ vendorId: "" });

  const subscriptionHistoryColumns = useSubscriptionHistoryColumns();

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
    <main>
      <section className="mb-5 flex items-center justify-between">
        <h4 className="text-mid-grey-III text-[18px] lg:text-[30px]">Subscriptions</h4>
      </section>

      {/* Overview Cards Section */}
      <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <OverViewCard
          title={"Total Star Sellers"}
          value={150}
          icon={<GiWallet />}
          iconClassName="bg-[#F2EBFB] text-[24px] text-purple"
        />
        <OverViewCard
          title={"Monthly Active Plans"}
          value={120}
          icon={<GiWallet />}
          iconClassName="bg-low-blue text-[24px] blue text-primary"
        />
        <OverViewCard
          title={"Yearly Active Plans"}
          value={20}
          icon={<GiWallet />}
          iconClassName="bg-low-success text-[24px] text-mid-success"
        />
        <OverViewCard
          title={"Subscription Revenue"}
          value={formatCurrency(5000, locale as Locale)}
          icon={<GiWallet />}
          iconClassName="bg-low-warning/20 text-[24px] text-mid-warning"
        />
      </section>

      {/* Subscription History Table Section */}
      <section>
        {isSubscriptionHistoryLoading ? (
          <TableSkeleton />
        ) : isSubscriptionHistoryError ? (
          <EmptyState
            title="Error loading subscription history"
            description="There was a problem fetching the subscription history data. Please try again later."
            className="min-h-fit space-y-0 rounded-lg bg-red-50 p-6"
            titleClassName={`!text-lg font-bold !text-mid-danger`}
            descriptionClassName={`!text-mid-danger`}
            images={[]}
          />
        ) : (
          <section className={`bg-background mt-6 space-y-4 rounded-lg p-6`}>
            <section className={`flex flex-col-reverse justify-between gap-4 lg:flex-row lg:items-center`}>
              <div className="">
                <p className="text-lg !font-semibold">Subscription History</p>
              </div>
              <div className="">
                <div className="flex items-center gap-2">
                  <SearchInput className={``} onSearch={handleSearchChange} initialValue={searchQuery} />
                  {/* <FilterDropdown options={orderStatusOptions} value={status} onValueChange={handleStatusChange} /> */}
                  <DownloadCsvButton
                    data={(subscriptionHistory?.data || []) as Record<string, unknown>[]}
                    filename="subscription-history"
                    headers={{
                      vendorName: "Vendor Name",
                      planType: "Plan Type",
                      amount: "Amount",
                      startDate: "Start Date",
                      endDate: "End Date",
                      status: "Status",
                    }}
                  />
                </div>
              </div>
            </section>
            <section>
              {isSubscriptionHistoryError ? (
                <Loading text="Loading subscription history..." className="w-fill h-fit p-20" />
              ) : subscriptionHistory?.data?.metadata.total ? (
                <DashboardTable
                  data={subscriptionHistory.data.items}
                  columns={subscriptionHistoryColumns}
                  // No pagination for subscription history
                  showPagination
                />
              ) : (
                <div className="flex items-center justify-center p-20">
                  <p>No subscription history found.</p>
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
