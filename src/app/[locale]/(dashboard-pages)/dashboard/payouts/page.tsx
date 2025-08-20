"use client";

import SubscriptionBanner from "@/components/shared/banner/subscription-banner";
import SkiButton from "@/components/shared/button";
import { Locale } from "@/lib/i18n/config";
import { formatCurrency } from "@/lib/i18n/utils";
import { usePayoutService } from "@/services/dashboard/vendor/payouts";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { TbClock, TbCreditCard, TbDownload, TbWallet } from "react-icons/tb";

import { OverViewCard } from "../../_components/overview-card";
import { PayoutOverviewSkeleton, WithdrawalHistoryTable } from "./_components";

// Helper function to transform WithdrawalHistoryItem to WithdrawalTransaction
const transformHistoryItems = (historyItems: WithdrawalHistoryItem[]): WithdrawalTransaction[] => {
  return historyItems.map((item, index) => {
    const bankName = item.bank.name || item.bank.bankName || "Unknown Bank";
    const firstThree = item.bank.firstThreeDigits || "***";
    const lastThree = item.bank.lastThreeDigits || "***";

    return {
      id: item.id || `${item.bank.id}-${index}`, // Use item ID if available, fallback to generated ID
      amount: item.amount,
      bankName,
      bankAccount: `${firstThree}****${lastThree}`,
      date: item.date,
      status: item.status,
      transactionId: `${firstThree}-${Date.parse(item.date)}`,
    };
  });
};

const Page = () => {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const { useGetPayoutStore, useGetWithdrawalsHistory } = usePayoutService();

  // Fetch actual data from the API
  const { data: payoutStore, isLoading: isLoadingStore } = useGetPayoutStore();

  // Get payout ID from store data for withdrawals
  // const payoutId = payoutStore?.success ? payoutStore.data.id : "";

  // Fetch withdrawals data using the payout ID
  const { data: withdrawalsData, isLoading: isLoadingWithdrawals } = useGetWithdrawalsHistory();

  // Calculate stats and withdrawal history from API data
  const { stats, withdrawalHistory } = useMemo(() => {
    const statsData = payoutStore?.success
      ? {
          totalEarnings: payoutStore.data.total,
          withdrawnEarnings: payoutStore.data.withdrawn,
          pendingEarnings: payoutStore.data.pending,
          availableEarnings: payoutStore.data.available,
        }
      : {
          totalEarnings: 0,
          withdrawnEarnings: 0,
          pendingEarnings: 0,
          availableEarnings: 0,
        };

    const historyData = withdrawalsData?.success ? transformHistoryItems(withdrawalsData.data) : [];

    return {
      stats: statsData,
      withdrawalHistory: historyData,
    };
  }, [payoutStore, withdrawalsData]);

  const isOverviewLoading = isLoadingStore;
  const isWithdrawalsLoading = isLoadingWithdrawals;

  // Handle row click to navigate to withdrawal details
  const handleWithdrawalRowClick = (transaction: WithdrawalTransaction) => {
    router.push(`/${locale}/dashboard/payouts/withdrawal/${transaction.id}`);
  };

  return (
    <main className="space-y-8">
      <section className="flex items-center justify-between">
        <h4 className="">Payout</h4>
        <div>
          <SkiButton
            isLeftIconVisible
            icon={<TbDownload />}
            variant="primary"
            className="rounded-full"
            isDisabled={isOverviewLoading}
            onClick={() => router.push(`/${locale}/dashboard/payouts/earnings`)}
          >
            Withdraw Earnings
          </SkiButton>
        </div>
      </section>
      <div>
        <SubscriptionBanner />
      </div>
      {/* Overview Cards Section */}
      {isOverviewLoading ? (
        <PayoutOverviewSkeleton />
      ) : (
        <section className="my-[38px] grid grid-cols-1 gap-[31px] lg:grid-cols-2">
          <OverViewCard
            title="Total Earnings"
            value={formatCurrency(stats.totalEarnings, locale)}
            icon={<TbWallet />}
            iconClassName="bg-primary/10 text-primary text-[24px]"
          />
          <OverViewCard
            title="Withdrawn Earnings"
            value={formatCurrency(stats.withdrawnEarnings, locale)}
            icon={<TbCreditCard />}
            iconClassName="bg-low-success text-mid-success text-[24px]"
          />
          <OverViewCard
            title="Pending Earnings"
            value={formatCurrency(stats.pendingEarnings, locale)}
            icon={<TbClock />}
            iconClassName="bg-low-warning/20 text-mid-warning text-[24px]"
          />
          <OverViewCard
            title="Available Earnings"
            value={formatCurrency(stats.availableEarnings, locale)}
            icon={<TbDownload />}
            iconClassName="bg-low-info text-mid-info text-[24px]"
          />
        </section>
      )}

      {/* Withdrawal History Section */}
      <section>
        <WithdrawalHistoryTable
          data={withdrawalHistory}
          totalPages={1}
          itemsPerPage={withdrawalHistory.length}
          hasNextPage={false}
          hasPreviousPage={false}
          showPagination={false}
          isLoading={isWithdrawalsLoading}
          onRowClick={handleWithdrawalRowClick}
        />
      </section>
    </main>
  );
};

export default Page;
