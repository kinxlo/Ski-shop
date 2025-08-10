"use client";

import { DashboardTable } from "@/components/shared/dashboard-table";

import { WithdrawalHistorySkeleton } from "./payout-skeleton";
import { useWithdrawalHistoryColumns } from "./withdrawal-history-columns";

interface WithdrawalHistoryTableProperties {
  data: WithdrawalTransaction[];
  totalPages?: number;
  itemsPerPage?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  showPagination?: boolean;
  isLoading?: boolean;
  onRowClick?: (transaction: WithdrawalTransaction) => void;
}

export const WithdrawalHistoryTable = ({
  data,
  totalPages = 1,
  itemsPerPage = 10,
  hasNextPage = false,
  hasPreviousPage = false,
  showPagination = false,
  isLoading = false,
  onRowClick,
}: WithdrawalHistoryTableProperties) => {
  const withdrawalColumns = useWithdrawalHistoryColumns();

  return (
    <div className="rounded-lg bg-white p-6">
      <div className="mb-6">
        <h5 className="text-high-grey-II !text-2xl font-semibold">Withdrawal History</h5>
        <p className="mt-1 text-sm text-gray-500">Track your withdrawal transactions and their status</p>
      </div>

      {isLoading ? (
        <WithdrawalHistorySkeleton />
      ) : (
        <DashboardTable
          data={data}
          columns={withdrawalColumns}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          showPagination={showPagination}
          onRowClick={onRowClick}
        />
      )}
    </div>
  );
};
