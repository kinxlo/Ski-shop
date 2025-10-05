export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="hidden h-6 w-px bg-gray-300 sm:block" />
            <h1 className="!text-lg font-semibold text-gray-900 sm:!text-3xl">Track Rider</h1>
          </div>
        </div>
      </div>
      <div className="mx-auto px-0 py-4">
        <div className="animate-pulse space-y-4">
          <div className="h-96 rounded-lg bg-gray-200"></div>
          <div className="h-64 rounded-lg bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}
