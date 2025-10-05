import { Skeleton } from "@/components/ui/skeleton";

export const TableSkeleton = () => {
  return (
    <section className="mt-6 space-y-4 rounded-lg bg-white p-6 dark:bg-[#111111]">
      {/* Table Section */}
      <section>
        <div className="rounded-lg">
          {/* Table Header */}
          <div className="-b bg-gray-50 px-6 py-3 dark:bg-slate-800">
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
  );
};
