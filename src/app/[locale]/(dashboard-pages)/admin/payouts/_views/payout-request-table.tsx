"use client";

import { SearchInput } from "@/components/core/miscellaneous/search-input";
import { DashboardTable } from "@/components/shared/dashboard-table";
import { useAdminPayoutRequestColumn } from "@/components/shared/dashboard-table/admin/admin-table-data";
import { EmptyState } from "@/components/shared/empty-state";
import { useDashboardSearchParameters } from "@/lib/nuqs/use-dashboard-search-parameters";
import { useCallback } from "react";

export const PayoutRequestTable = () => {
  const { search: searchQuery, setSearch: setSearchQuery, resetToFirstPage } = useDashboardSearchParameters();

  // Mock data for demonstration - in real app this would come from API
  const mockData: PayoutRequest[] = [
    {
      id: "1",
      userId: "user1",
      userName: "John's Store",
      storeName: "John's Electronics",
      role: "vendor",
      walletBalance: 5000,
      amount: 2000,
      dateTime: "2024-09-20T10:00:00Z",
      status: "pending",
    },
    {
      id: "2",
      userId: "user2",
      userName: "Sarah Rider",
      role: "rider",
      walletBalance: 1500,
      amount: 800,
      dateTime: "2024-09-19T15:30:00Z",
      status: "pending",
    },
    {
      id: "3",
      userId: "user3",
      userName: "Mike's Bakery",
      storeName: "Mike's Bakery",
      role: "vendor",
      walletBalance: 3200,
      amount: 1200,
      dateTime: "2024-09-18T12:15:00Z",
      status: "pending",
    },
  ];

  const payoutRequests = mockData || [];
  const totalRequests = mockData?.length || 0;
  const totalPages = 1;
  const hasNextPage = false;
  const hasPreviousPage = false;

  const columns = useAdminPayoutRequestColumn();

  const handleSearchChange = useCallback(
    (newSearch: string) => {
      if (newSearch !== searchQuery) {
        setSearchQuery(newSearch);
        resetToFirstPage();
      }
    },
    [setSearchQuery, resetToFirstPage, searchQuery],
  );

  const renderEmptyState = () => (
    <EmptyState
      images={[{ src: "/images/empty-state.svg", width: 80, height: 80, alt: "No payout requests" }]}
      title="No payout requests found"
      description="There are no payout requests matching your criteria."
      className="bg-mid-grey-I space-y-0 rounded-lg"
      titleClassName="!text-2xl"
      descriptionClassName="text-base mb-4"
      actionButton={
        <button
          onClick={() => window.location.reload()}
          className="bg-primary hover:bg-primary/90 text-background rounded-md px-4 py-2"
        >
          Refresh
        </button>
      }
    />
  );

  const renderPayoutRequestsTable = () => (
    <section className={`bg-background rounded-lg p-6`}>
      <div className="mb-2 flex items-center justify-between gap-2">
        <h6 className="!text-lg !font-semibold">Payout Requests</h6>
        <div className="flex items-center gap-2">
          <SearchInput className="" onSearch={handleSearchChange} initialValue={searchQuery} />
          {/* <DownloadCsvButton
            data={(payoutRequests || []) as Record<string, unknown>[]}
            filename="payout-requests"
            headers={{
              userName: "Store/Rider Name",
              role: "Role",
              walletBalance: "Wallet Balance",
              amount: "Amount",
              dateTime: "Date & Time",
              status: "Status",
            }}
          /> */}
        </div>
      </div>
      <div>
        {!payoutRequests || payoutRequests.length === 0 ? (
          renderEmptyState()
        ) : (
          <DashboardTable
            data={payoutRequests}
            columns={columns}
            totalPages={totalPages}
            itemsPerPage={totalRequests}
            hasNextPage={hasNextPage}
            hasPreviousPage={hasPreviousPage}
            showPagination
            pageParameter="page"
          />
        )}
      </div>
    </section>
  );

  const renderPayoutRequestsContent = () => {
    return renderPayoutRequestsTable();
  };

  return renderPayoutRequestsContent();
};
