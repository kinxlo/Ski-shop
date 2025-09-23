"use client";

import { SearchInput } from "@/components/core/miscellaneous/search-input";
import { DashboardTable } from "@/components/shared/dashboard-table";
import { useAdminPayoutHistoryColumn } from "@/components/shared/dashboard-table/admin/admin-table-data";
import { DownloadCsvButton } from "@/components/shared/download-csv-button";
import { EmptyState } from "@/components/shared/empty-state";
import { useDashboardSearchParameters } from "@/lib/nuqs/use-dashboard-search-parameters";
import { useCallback } from "react";

export const PayoutHistoryTable = () => {
  const { search: searchQuery, setSearch: setSearchQuery, resetToFirstPage } = useDashboardSearchParameters();

  // Mock data for demonstration - in real app this would come from API
  const mockData: PayoutHistory[] = [
    {
      id: "1",
      userId: "user1",
      userName: "John's Store",
      storeName: "John's Electronics",
      role: "vendor",
      amount: 2000,
      dateTime: "2024-09-20T10:00:00Z",
      status: "completed",
      transactionId: "TXN-001",
    },
    {
      id: "2",
      userId: "user2",
      userName: "Sarah Rider",
      role: "rider",
      amount: 800,
      dateTime: "2024-09-19T15:30:00Z",
      status: "completed",
      transactionId: "TXN-002",
    },
    {
      id: "3",
      userId: "user3",
      userName: "Mike's Bakery",
      storeName: "Mike's Bakery",
      role: "vendor",
      amount: 1200,
      dateTime: "2024-09-18T12:15:00Z",
      status: "failed",
    },
  ];

  const payoutHistory = mockData || [];
  const totalHistory = mockData?.length || 0;
  const totalPages = 1;
  const hasNextPage = false;
  const hasPreviousPage = false;

  const columns = useAdminPayoutHistoryColumn();

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
      images={[{ src: "/images/empty-state.svg", width: 80, height: 80, alt: "No payout history" }]}
      title="No payout history found"
      description="There are no payout transactions matching your criteria."
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

  const renderPayoutHistoryTable = () => (
    <section className={`bg-background rounded-lg p-6`}>
      <div className="mb-2 flex items-center justify-between gap-2">
        <h6 className="!text-lg !font-semibold">Payout History</h6>
        <div className="flex items-center gap-2">
          <SearchInput className="" onSearch={handleSearchChange} initialValue={searchQuery} />
          <DownloadCsvButton
            data={(payoutHistory || []) as Record<string, unknown>[]}
            filename="payout-history"
            headers={{
              userName: "Store/Rider Name",
              role: "Role",
              amount: "Amount",
              dateTime: "Date & Time",
              status: "Status",
              transactionId: "Transaction ID",
            }}
          />
        </div>
      </div>
      <div>
        {!payoutHistory || payoutHistory.length === 0 ? (
          renderEmptyState()
        ) : (
          <DashboardTable
            data={payoutHistory}
            columns={columns}
            totalPages={totalPages}
            itemsPerPage={totalHistory}
            hasNextPage={hasNextPage}
            hasPreviousPage={hasPreviousPage}
            showPagination
            pageParameter="page"
          />
        )}
      </div>
    </section>
  );

  const renderPayoutHistoryContent = () => {
    return renderPayoutHistoryTable();
  };

  return renderPayoutHistoryContent();
};
