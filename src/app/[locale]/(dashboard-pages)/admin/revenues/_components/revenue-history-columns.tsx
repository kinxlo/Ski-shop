"use client";

import { Locale } from "@/lib/i18n/config";
import { formatCurrency, formatDate } from "@/lib/i18n/utils";
import { useLocale } from "next-intl";

export const useRevenueHistoryColumns = (): TableColumnDefinition<RevenueHistory>[] => {
  const locale = useLocale();

  return [
    {
      header: "Revenue Source",
      accessorKey: "revenueSource",
      render: (_, item: RevenueHistory) => (
        <span className="text-high-grey-II text-sm font-medium capitalize">{item.revenueSource}</span>
      ),
    },
    {
      header: "Description",
      accessorKey: "description",
      render: (_, item: RevenueHistory) => <span className="text-gray-900">{item.description}</span>,
    },
    {
      header: "Amount",
      accessorKey: "amount",
      render: (_, item: RevenueHistory) => (
        <span className="font-semibold text-gray-900">{formatCurrency(item.amount, locale as Locale)}</span>
      ),
    },
    {
      header: "User",
      accessorKey: "user",
      render: (_, item: RevenueHistory) => <span className="text-gray-700">{item.user}</span>,
    },
    {
      header: "Role",
      accessorKey: "role",
      render: (_, item: RevenueHistory) => <span className="text-gray-700">{item.role}</span>,
    },
    {
      header: "Date",
      accessorKey: "date",
      render: (_, item: RevenueHistory) => (
        <span className="text-gray-700">{formatDate(item.date, locale as Locale)}</span>
      ),
    },
  ];
};
