"use client";

import { Icons } from "@/components/core/miscellaneous/icons";
import { SearchInput } from "@/components/core/miscellaneous/search-input";
import { DashboardTable } from "@/components/shared/dashboard-table";
import { EmptyState } from "@/components/shared/empty-state";
import { Locale } from "@/lib/i18n/config";
import { formatCurrency, formatDate, formatTime } from "@/lib/i18n/utils";
import { useDashboardSearchParameters } from "@/lib/nuqs/use-dashboard-search-parameters";
import { Ban, CircleCheck } from "lucide-react";
import { useLocale } from "next-intl";
import { useCallback, useMemo } from "react";

import { DashboardHeader } from "../../../_components/dashboard-header";

export type AdminPromotionRequest = {
  id: string;
  vendorName: string;
  productName: string;
  adType: "banner" | "featured" | "spotlight" | "carousel";
  durationDays: number;
  amount: number;
  dateTime: string;
  status: "pending" | "approved" | "rejected";
};

interface PromotionRequestsTableProperties {
  requests?: AdminPromotionRequest[];
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

export const PromotionRequestsTable: React.FC<PromotionRequestsTableProperties> = ({
  requests = [],
  onApprove = () => {},
  onReject = () => {},
}) => {
  const { search: searchQuery, setSearch: setSearchQuery, resetToFirstPage } = useDashboardSearchParameters();
  const locale = useLocale() as Locale;

  const filteredRequests = useMemo(() => {
    const q = (searchQuery || "").toLowerCase().trim();
    if (!q) return requests ?? [];
    return (requests ?? []).filter(
      (r) =>
        r.vendorName.toLowerCase().includes(q) ||
        r.productName.toLowerCase().includes(q) ||
        r.adType.toLowerCase().includes(q),
    );
  }, [requests, searchQuery]);

  const totalRequests = filteredRequests.length;
  const totalPages = 1;
  const hasNextPage = false;
  const hasPreviousPage = false;

  const columns = useMemo<TableColumnDefinition<AdminPromotionRequest>[]>(() => {
    return [
      {
        header: "Vendor's Name",
        accessorKey: "vendorName",
        render: (_: string | number, row: AdminPromotionRequest) => (
          <span className="inline-block max-w-[150px] cursor-help truncate text-xs font-medium" title={row.vendorName}>
            {row.vendorName}
          </span>
        ),
      },
      {
        header: "Products",
        accessorKey: "productName",
        render: (_: string | number, row: AdminPromotionRequest) => (
          <span className="inline-block max-w-[160px] cursor-help truncate text-xs font-medium" title={row.productName}>
            {row.productName}
          </span>
        ),
      },
      {
        header: "Ad Type",
        accessorKey: "adType",
        render: (_: string | number, row: AdminPromotionRequest) => {
          const badgeMap: Record<AdminPromotionRequest["adType"], string> = {
            banner: "bg-primary/10 text-primary",
            featured: "bg-blue-100 text-blue-700",
            spotlight: "bg-purple-100 text-purple-700",
            carousel: "bg-emerald-100 text-emerald-700",
          };
          const cls = badgeMap[row.adType] ?? "bg-primary/10 text-primary";
          return (
            <span className={`inline-block rounded-full px-2 py-1 text-xs font-medium capitalize ${cls}`}>
              {row.adType}
            </span>
          );
        },
      },
      {
        header: "Duration",
        accessorKey: "durationDays",
        render: (_: string | number, row: AdminPromotionRequest) => (
          <span className="text-xs font-semibold">{row.durationDays} Days</span>
        ),
      },
      {
        header: "Amount",
        accessorKey: "amount",
        render: (_: string | number, row: AdminPromotionRequest) => (
          <span className="text-xs font-medium">{formatCurrency(row.amount, locale)}</span>
        ),
      },
      {
        header: "Date & Time",
        accessorKey: "dateTime",
        render: (_: string | number, row: AdminPromotionRequest) => {
          const date = new Date(row.dateTime);
          return (
            <div>
              <span className="text-xs">{formatDate(date, locale)}</span> |{" "}
              <span className="text-xs">{formatTime(date, locale)}</span>
            </div>
          );
        },
      },
      {
        header: "Action",
        accessorKey: "status",
        render: (_: string | number, row: AdminPromotionRequest) => {
          const disabled = row.status !== "pending";
          return (
            <div className="flex items-center gap-4">
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  if (!disabled) onApprove(row.id);
                }}
                className={`cursor-pointer rounded p-1 transition-colors hover:bg-green-50 ${
                  disabled ? "cursor-not-allowed opacity-50 hover:bg-transparent" : ""
                }`}
                title="Approve promotion request"
                disabled={disabled}
              >
                <CircleCheck className="text-mid-success h-5 w-5 stroke-3" />
              </button>
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  if (!disabled) onReject(row.id);
                }}
                className={`cursor-pointer rounded p-1 transition-colors hover:bg-red-50 ${
                  disabled ? "cursor-not-allowed opacity-50 hover:bg-transparent" : ""
                }`}
                title="Reject promotion request"
                disabled={disabled}
              >
                <Ban className="text-mid-danger h-5 w-5 stroke-3" />
              </button>
            </div>
          );
        },
      },
    ];
  }, [locale, onApprove, onReject]);

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
      images={[{ src: "/images/empty-state.svg", width: 30, height: 30, alt: "No promotion requests" }]}
      title="No promotion requests found"
      description="There are no promotion requests matching your criteria."
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

  const renderPromotionRequestsTable = () => (
    <section className={`bg-background space-y-6 rounded-lg p-6`}>
      <DashboardHeader
        title="Promotion Request"
        subtitle="Review and manage incoming promotion requests"
        showSubscriptionBanner={false}
        titleClassName={`!text-lg`}
        subtitleClassName={`!text-sm`}
        icon={<Icons.promotion className={`size-6`} />}
        actionComponent={
          <div className="flex items-center gap-2">
            <SearchInput className="" onSearch={handleSearchChange} initialValue={searchQuery} />
          </div>
        }
      />
      <div>
        {!filteredRequests || filteredRequests.length === 0 ? (
          renderEmptyState()
        ) : (
          <DashboardTable
            data={filteredRequests}
            columns={columns}
            totalPages={totalPages}
            itemsPerPage={totalRequests}
            hasNextPage={hasNextPage}
            hasPreviousPage={hasPreviousPage}
            showPagination={false}
            pageParameter="page"
          />
        )}
      </div>
    </section>
  );

  return renderPromotionRequestsTable();
};
