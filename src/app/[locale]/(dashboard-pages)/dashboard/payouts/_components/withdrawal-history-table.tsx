"use client";

import { Icons } from "@/components/core/miscellaneous/icons";
import SkiButton from "@/components/shared/button";
import { DashboardTable } from "@/components/shared/dashboard-table";
import { EmptyState } from "@/components/shared/empty-state";

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
  isError?: boolean;
  onRowClick?: (transaction: WithdrawalTransaction) => void;
  onRefresh?: () => void;
}

export const WithdrawalHistoryTable = ({
  data,
  totalPages = 1,
  itemsPerPage = 10,
  hasNextPage = false,
  hasPreviousPage = false,
  showPagination = false,
  isLoading = false,
  isError = false,
  onRowClick,
  onRefresh,
}: WithdrawalHistoryTableProperties) => {
  const withdrawalColumns = useWithdrawalHistoryColumns();

  const renderTableHeader = () => (
    <div className="mb-6">
      <h5 className="flex items-center gap-2 !text-2xl font-semibold">
        <Icons.billing /> Withdrawal History
      </h5>
      <p className="mt-1 text-sm text-gray-500">Track your withdrawal transactions and their status</p>
    </div>
  );

  const renderLoadingSkeleton = () => <WithdrawalHistorySkeleton />;

  const renderErrorState = () => (
    <EmptyState
      images={[
        {
          src: "/images/empty-state.svg",
          alt: "Error loading withdrawals",
          width: 80,
          height: 80,
        },
      ]}
      title="Something went wrong"
      titleClassName="!text-lg font-bold !text-mid-danger"
      description="Failed to load withdrawal history. Please try again."
      descriptionClassName="text-mid-grey-II"
      className="bg-mid-grey-I space-y-0 rounded-lg py-10"
      actionButton={
        onRefresh && (
          <SkiButton
            onClick={onRefresh}
            variant="outline"
            className="border-mid-danger text-mid-danger hover:bg-mid-danger/10 mt-4 border"
          >
            Try Again
          </SkiButton>
        )
      }
    />
  );

  const renderEmptyState = () => (
    <EmptyState
      images={[
        {
          src: "/images/empty-state.svg",
          alt: "No withdrawal history",
          width: 80,
          height: 80,
        },
      ]}
      title="No withdrawal history yet"
      titleClassName="!text-lg font-bold !text-mid-warning"
      description="You haven't made any withdrawal requests. Once you request a payout, it will appear here."
      descriptionClassName="text-mid-grey-II"
      className="bg-mid-grey-I space-y-0 rounded-lg py-10"
    />
  );

  const renderWithdrawalTable = () => (
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
  );

  const renderTableContent = () => {
    if (isLoading) {
      return renderLoadingSkeleton();
    }

    if (isError) {
      return renderErrorState();
    }

    if (!data || data.length === 0) {
      return renderEmptyState();
    }

    return renderWithdrawalTable();
  };

  const renderWithdrawalHistoryTable = () => (
    <div className="bg-background rounded-lg p-6">
      {renderTableHeader()}
      {renderTableContent()}
    </div>
  );

  return renderWithdrawalHistoryTable();
};
