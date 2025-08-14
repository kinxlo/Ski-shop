"use client";

import { Skeleton } from "@/components/ui/skeleton";

export const PayoutOverviewSkeleton = () => {
  return (
    <section className="my-[38px] grid grid-cols-1 gap-[31px] lg:grid-cols-2">
      {/* Overview Cards Skeleton */}
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="border-border flex min-h-[120px] flex-col justify-center rounded-lg border bg-white p-6 shadow-none"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <Skeleton className="h-4 w-[120px]" />
              <Skeleton className="h-8 w-[140px]" />
            </div>
            <Skeleton className="h-12 w-12 rounded-lg" />
          </div>
        </div>
      ))}
    </section>
  );
};

export const WithdrawalHistorySkeleton = () => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-none">
      <div className="mb-6">
        <Skeleton className="mb-2 h-6 w-[180px]" />
        <Skeleton className="h-4 w-[280px]" />
      </div>

      {/* Table Header */}
      <div className="mb-4 grid grid-cols-5 gap-4 border-b border-gray-200 pb-3">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[80px]" />
        <Skeleton className="h-4 w-[60px]" />
        <Skeleton className="h-4 w-[90px]" />
        <Skeleton className="h-4 w-[70px]" />
      </div>

      {/* Table Rows */}
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="grid grid-cols-5 gap-4 border-b border-gray-100 py-4 last:border-b-0">
          <Skeleton className="h-4 w-[80px]" />
          <Skeleton className="h-4 w-[100px]" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-[90px]" />
            <Skeleton className="h-3 w-[70px]" />
          </div>
          <Skeleton className="h-4 w-[80px]" />
          <Skeleton className="h-6 w-[80px] rounded-full" />
        </div>
      ))}
    </div>
  );
};

export const PayoutPageSkeleton = () => {
  return (
    <main>
      {/* Header Section */}
      <section className="flex items-center justify-between">
        <Skeleton className="h-8 w-[100px]" />
        <Skeleton className="h-10 w-[160px] rounded-full" />
      </section>

      {/* Overview Cards */}
      <PayoutOverviewSkeleton />

      {/* Withdrawal History */}
      <section>
        <WithdrawalHistorySkeleton />
      </section>
    </main>
  );
};
