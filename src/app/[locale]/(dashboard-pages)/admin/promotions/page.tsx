"use client";

import { Icons } from "@/components/core/miscellaneous/icons";
import { formatCurrency } from "@/lib/i18n/utils";
import { Clock, DollarSign } from "lucide-react";

import { DashboardHeader } from "../../_components/dashboard-header";
import { OverViewCard } from "../../_components/overview-card";
import { PromotionHistoryTable } from "./_views/promotion-history-table";
import { PromotionRequestsTable, type AdminPromotionRequest } from "./_views/promotion-request-table";

// Move actions to module scope to satisfy lint rules
const approveRequest = (id: string) => {
  void id;
};
const rejectRequest = (id: string) => {
  void id;
};

const Promotions = () => {
  // Mock stats for the admin promotions dashboard
  const stats = {
    totalPromotions: 150,
    activePromotions: 70,
    expiredPromotions: 80,
    promotionsRevenue: 400_000,
  };

  // Mock requests (pending approvals)
  const mockRequests: AdminPromotionRequest[] = [
    {
      id: "req-1",
      vendorName: "Swift & More",
      productName: "Apple iPhone 13 Mini",
      adType: "banner",
      durationDays: 100,
      amount: 234_000,
      dateTime: "2025-01-15T09:45:00.000Z",
      status: "pending",
    },
    {
      id: "req-2",
      vendorName: "Swift & More",
      productName: "Apple iPhone 13 Mini",
      adType: "featured",
      durationDays: 100,
      amount: 234_000,
      dateTime: "2025-01-15T09:45:00.000Z",
      status: "pending",
    },
    {
      id: "req-3",
      vendorName: "Swift & More",
      productName: "Apple iPhone 13 Mini",
      adType: "banner",
      durationDays: 100,
      amount: 234_000,
      dateTime: "2025-01-15T09:45:00.000Z",
      status: "pending",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <DashboardHeader
          title="Promotions & Ads"
          subtitle="Manage promotions, approve requests and monitor revenue"
          showSubscriptionBanner={false}
          icon={<Icons.promotion className={`size-6`} />}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <OverViewCard
          title="Total Promotions"
          value={stats.totalPromotions}
          icon={<Icons.promotion className="text-primary h-4 w-4" />}
          iconClassName="bg-primary/10"
        />
        <OverViewCard
          title="Active Promotions"
          value={stats.activePromotions}
          icon={<Clock className="h-4 w-4 text-green-600" />}
          iconClassName="bg-green-100"
        />
        <OverViewCard
          title="Expired Promotions"
          value={stats.expiredPromotions}
          icon={<Clock className="h-4 w-4 text-orange-600" />}
          iconClassName="bg-orange-100"
        />
        <OverViewCard
          title="Promotions Revenue"
          value={formatCurrency(stats.promotionsRevenue || 0)}
          icon={<DollarSign className="h-4 w-4 text-blue-600" />}
          iconClassName="bg-blue-100"
        />
      </div>

      <section className="space-y-8">
        <PromotionRequestsTable requests={mockRequests} onApprove={approveRequest} onReject={rejectRequest} />
        <PromotionHistoryTable />
      </section>
    </div>
  );
};

export default Promotions;
