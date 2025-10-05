"use client";

import { Skeleton } from "@/components/ui/skeleton";

export const AnalysisSkeleton = () => {
  return (
    <section className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      {/* Total Revenue Card */}
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="bg-background flex min-h-[144px] flex-col justify-center rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-4">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-8 w-[100px]" />
            </div>
            <Skeleton className="h-10 w-10 rounded-md" />
          </div>
        </div>
      ))}
    </section>
  );
};

export const SectionTwoSkeleton = () => {
  return (
    <section className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-12">
      <div className="bg-background rounded-lg p-6 lg:col-span-8">
        <Skeleton className="h-80 w-full" />
      </div>
      <div className="bg-background space-y-4 rounded-lg p-6 lg:col-span-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex items-center gap-2">
            <Skeleton className="size-24" />
            <div className={`space-y-2`}>
              <Skeleton className="h-2 w-[150px]" />
              <Skeleton className="h-4 w-[50px]" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
