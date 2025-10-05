import { Skeleton } from "@/components/ui/skeleton";

import { TableSkeleton } from "../../../home/_components/page-skeleton";

const UserDetailSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Header (matches BuyersView header layout) */}
      <section className="flex flex-col items-center justify-between gap-4 lg:flex-row">
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-md" />
          <div className="space-y-1">
            <Skeleton className="h-6 w-[220px]" />
            <Skeleton className="h-4 w-[140px]" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-[180px]" />
        </div>
      </section>

      {/* Profile Overview (matches BuyersView details grid) */}
      <section className="bg-background space-y-4 rounded-lg p-6">
        <Skeleton className="h-6 w-[160px]" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-5 w-40" />
            </div>
          ))}
        </div>
      </section>
      <section className="bg-background space-y-4 rounded-lg p-6">
        <Skeleton className="h-6 w-[160px]" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-5 w-40" />
            </div>
          ))}
        </div>
      </section>
      <section className="bg-background space-y-4 rounded-lg p-6">
        <Skeleton className="h-6 w-[160px]" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-5 w-40" />
            </div>
          ))}
        </div>
      </section>

      {/* Orders Table (reuse the same table skeleton BuyersView uses) */}
      <TableSkeleton />
    </div>
  );
};

export default UserDetailSkeleton;
