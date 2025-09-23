"use client";

import { formatCurrency } from "@/lib/i18n/utils";
import { useAdminService } from "@/services/dashboard/admin/use-admin-service";
import { Clock, DollarSign, Wallet } from "lucide-react";

import { OverViewCard } from "../../_components/overview-card";
import { PayoutHistoryTable } from "./_views/payout-history-table";
import { PayoutRequestTable } from "./_views/payout-request-table";

const Payout = () => {
  const { useGetPayoutsStats } = useAdminService();

  const { data, isLoading, error } = useGetPayoutsStats();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const stats = data?.data;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Payouts Overview</h1>
        <p className="mt-1 text-gray-600">Monitor your payout statistics and wallet balance</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <OverViewCard
          title="Total Payouts Paid"
          value={formatCurrency(stats?.totalPayoutsPaid || 0)}
          icon={<DollarSign className="h-4 w-4 text-green-600" />}
          iconClassName="bg-green-100"
        />
        <OverViewCard
          title="Wallet Balance"
          value={formatCurrency(stats?.walletBalance || 0)}
          icon={<Wallet className="h-4 w-4 text-blue-600" />}
          iconClassName="bg-blue-100"
        />
        <OverViewCard
          title="Pending Payouts"
          value={formatCurrency(stats?.pendingPayouts || 0)}
          icon={<Clock className="h-4 w-4 text-orange-600" />}
          iconClassName="bg-orange-100"
        />
      </div>
      <section className="space-y-8">
        <PayoutRequestTable />
        <PayoutHistoryTable />
      </section>
    </div>
  );
};

export default Payout;
