"use client";

import { Locale } from "@/lib/i18n/config";
import { formatDate } from "@/lib/i18n/utils";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";

export const useSubscriptionHistoryColumns = (): TableColumnDefinition<SubscriptionHistory>[] => {
  const locale = useLocale();

  return [
    {
      header: "Vendor Name / Store Name",
      accessorKey: "vendorName",
      render: (_, item: SubscriptionHistory) => (
        <span className="text-high-grey-II text-sm font-medium capitalize">{item.vendorName}</span>
      ),
    },
    {
      header: "Plan Type",
      accessorKey: "planType",
      render: (_, item: SubscriptionHistory) => (
        <span
          className={cn(
            `rounded-full px-2 py-1 text-xs capitalize`,
            item.planType === `monthly` && "text-primary",
            item.planType === `yearly` && "text-mid-warning",
          )}
        >
          {item.planType}
        </span>
      ),
    },
    {
      header: "Start Date",
      accessorKey: "startDate",
      render: (_, item: SubscriptionHistory) => (
        <span className="text-gray-700">{formatDate(item.startDate, locale as Locale)}</span>
      ),
    },
    {
      header: "Expired Date",
      accessorKey: "endDate",
      render: (_, item: SubscriptionHistory) => (
        <span className="text-gray-700">{formatDate(item.endDate, locale as Locale)}</span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      render: (_, item: SubscriptionHistory) => (
        <span
          className={cn(
            `rounded-full px-2 py-1 text-xs capitalize`,
            item.status === "active" && "bg-low-success text-mid-success",
            item.status === "inactive" && "bg-red-100 text-red-600",
          )}
        >
          {item.status}
        </span>
      ),
    },
  ];
};
