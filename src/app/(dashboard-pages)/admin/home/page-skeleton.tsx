"use client";

import { Skeleton } from "@/components/ui/skeleton";

const DashboardHomeSkeleton = () => {
  return (
    <main>
      {/* Header Section */}
      <section className="mb-5 flex items-center justify-between">
        <h4 className="text-mid-grey-III text-[18px] lg:text-[30px]">Dashboard Overview</h4>
        <Skeleton className="h-[40px] w-[120px]" />
      </section>

      {/* Overview Cards Grid */}
      <section className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Total Revenue Card */}
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="rounded-lg bg-white p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-8 w-[100px]" />
              </div>
              <Skeleton className="h-10 w-10 rounded-md" />
            </div>
          </div>
        ))}
      </section>

      {/* Section Two */}
      <section className="mt-6 flex items-start justify-between gap-4">
        <div className="flex-1 rounded-lg bg-white p-6">
          <Skeleton className="h-80 w-full" />
        </div>
        <div className="flex-1 space-y-4 rounded-lg bg-white p-6">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </section>

      {/* Recent Orders Section */}
      <section className="mt-6 space-y-4 bg-white p-6">
        {/* Header with search and filter */}
        <section className="flex flex-col-reverse justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <Skeleton className="h-6 w-[150px]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-[200px]" />
              <Skeleton className="h-10 w-[120px]" />
            </div>
          </div>
        </section>

        {/* Table Section */}
        <section>
          <div className="rounded-lg">
            {/* Table Header */}
            <div className="-b bg-gray-50 px-6 py-3">
              <div className="grid grid-cols-6 gap-4">
                <Skeleton className="h-4 w-[80px]" />
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[80px]" />
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[80px]" />
                <Skeleton className="h-4 w-[80px]" />
              </div>
            </div>

            {/* Table Rows */}
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="-b px-6 py-4">
                <div className="grid grid-cols-6 gap-4">
                  <Skeleton className="h-4 w-[60px]" />
                  <Skeleton className="h-4 w-[120px]" />
                  <Skeleton className="h-4 w-[80px]" />
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-4 w-[80px]" />
                  <Skeleton className="h-4 w-[60px]" />
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-4 flex items-center justify-between">
            <Skeleton className="h-4 w-[200px]" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded" />
              <Skeleton className="h-8 w-8 rounded" />
              <Skeleton className="h-8 w-8 rounded" />
              <Skeleton className="h-8 w-8 rounded" />
              <Skeleton className="h-8 w-8 rounded" />
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};

export default DashboardHomeSkeleton;
