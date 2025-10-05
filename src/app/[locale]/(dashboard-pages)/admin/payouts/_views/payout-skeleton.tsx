import { Skeleton } from "@/components/ui/skeleton";

import { TableSkeleton } from "../../../_components/dashboard-table/_components/table-skeleton";

const PayoutSkeleton = () => {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-32 rounded-md" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="border-border bg-background flex min-h-[120px] flex-col justify-center rounded-lg border p-6"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-8 w-36" />
              </div>
              <Skeleton className="h-10 w-10 rounded-lg" />
            </div>
          </div>
        ))}
      </div>

      <section className="space-y-8">
        <TableSkeleton />
        <TableSkeleton />
      </section>
    </div>
  );
};

export default PayoutSkeleton;
