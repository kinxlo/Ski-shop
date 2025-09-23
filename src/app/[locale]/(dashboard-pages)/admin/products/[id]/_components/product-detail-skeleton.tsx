import { ArrowLeft } from "lucide-react";

const ProductDetailSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="rounded-lg p-2 transition-colors hover:bg-gray-100">
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div className="h-6 w-32 animate-pulse rounded bg-gray-200"></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-24 animate-pulse rounded-full bg-gray-200"></div>
              <div className="h-10 w-10 animate-pulse rounded-lg bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="aspect-square animate-pulse rounded-xl bg-gray-200"></div>
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((index) => (
                <div key={index} className="aspect-square animate-pulse rounded-lg bg-gray-200"></div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="h-8 w-3/4 animate-pulse rounded bg-gray-200"></div>
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200"></div>
            </div>
            <div className="space-y-3">
              <div className="h-6 w-32 animate-pulse rounded bg-gray-200"></div>
              <div className="space-y-2">
                {[1, 2, 3].map((index) => (
                  <div key={index} className="flex items-center">
                    <div className="mr-3 h-2 w-2 rounded-full bg-gray-300"></div>
                    <div className="h-4 w-48 animate-pulse rounded bg-gray-200"></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-baseline space-x-3">
                <div className="h-10 w-32 animate-pulse rounded bg-gray-200"></div>
                <div className="h-6 w-24 animate-pulse rounded bg-gray-200"></div>
              </div>
              <div className="h-4 w-40 animate-pulse rounded bg-gray-200"></div>
            </div>
            <div className="space-y-3 pt-4">
              <div className="h-12 w-full animate-pulse rounded-lg bg-gray-200"></div>
              <div className="h-12 w-full animate-pulse rounded-lg bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
