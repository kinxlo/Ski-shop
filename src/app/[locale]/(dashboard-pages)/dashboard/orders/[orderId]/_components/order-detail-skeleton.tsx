import { DashboardHeader } from "@/app/[locale]/(dashboard-pages)/_components/dashboard-header";
import { BackButton } from "@/components/shared/back-button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const OrderDetailSkeleton = () => {
  return (
    <div className="min-h-screen space-y-8">
      {/* Header Skeleton */}
      <DashboardHeader
        title="Order Details"
        // subtitle={`Manage your orders`}
        showSubscriptionBanner
        icon={<BackButton />}
      />
      {/* <Wrapper className="mx-auto px-0 py-4"> */}
      <div className="grid grid-cols-1 gap-4 sm:gap-8 lg:grid-cols-3">
        {/* Main Content Skeleton */}
        <div className="space-y-4 sm:space-y-6 lg:col-span-2">
          {/* Order Summary Skeleton */}
          <Card className="shadow-none">
            <CardHeader className="pb-3 sm:pb-6">
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 sm:gap-4">
                <div className="space-y-1">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Products Ordered Skeleton */}
          <Card className="shadow-none">
            <CardHeader className="pb-3 sm:pb-6">
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                {/* Product Item Skeleton */}
                <div className="bg-background flex items-center space-x-3 rounded-lg p-3 sm:space-x-4 sm:p-4">
                  <div className="relative flex-shrink-0">
                    <div className="relative">
                      <Skeleton className="h-15 w-15 rounded-lg sm:h-20 sm:w-20" />
                      {/* Best Seller Badge Skeleton */}
                      <Skeleton className="absolute -top-1 -left-1 h-4 w-16 rounded sm:-top-2 sm:-left-2 sm:h-5 sm:w-20" />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <Skeleton className="mb-1 h-4 w-48 sm:h-6 sm:w-64" />
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-3 w-12 sm:h-4 sm:w-16" />
                      <Skeleton className="h-4 w-20 sm:h-5 sm:w-24" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Summary Skeleton */}
          <Card className="shadow-none">
            <CardHeader className="pb-3 sm:pb-6">
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between text-sm">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="flex justify-between text-sm">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex justify-between border-t pt-2 text-sm font-semibold sm:pt-3 sm:text-base">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Skeleton */}
        <div className="space-y-4 sm:space-y-6">
          {/* Buyer Information Skeleton */}
          <Card className="shadow-none">
            <CardHeader className="pb-3 sm:pb-6">
              <div className="flex items-center">
                <Skeleton className="mr-2 h-4 w-4 rounded sm:h-5 sm:w-5" />
                <Skeleton className="h-6 w-32" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="space-y-1">
                <Skeleton className="h-3 w-12 sm:h-4 sm:w-16" />
                <Skeleton className="h-4 w-24 sm:h-5 sm:w-32" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center">
                  <Skeleton className="mr-1 h-3 w-3 rounded sm:h-4 sm:w-4" />
                  <Skeleton className="h-3 w-12 sm:h-4 sm:w-16" />
                </div>
                <Skeleton className="h-4 w-20 sm:h-5 sm:w-28" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center">
                  <Skeleton className="mr-1 h-3 w-3 rounded sm:h-4 sm:w-4" />
                  <Skeleton className="h-3 w-16 sm:h-4 sm:w-20" />
                </div>
                <Skeleton className="h-4 w-32 sm:h-5 sm:w-40" />
              </div>
            </CardContent>
          </Card>

          {/* Payment Information Skeleton */}
          <Card className="shadow-none">
            <CardHeader className="pb-3 sm:pb-6">
              <div className="flex items-center">
                <Skeleton className="mr-2 h-4 w-4 rounded sm:h-5 sm:w-5" />
                <Skeleton className="h-6 w-36" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="space-y-1">
                <Skeleton className="h-3 w-14 sm:h-4 sm:w-16" />
                <Skeleton className="h-4 w-20 sm:h-5 sm:w-24" />
              </div>
              <div className="space-y-1">
                <Skeleton className="h-3 w-24 sm:h-4 sm:w-28" />
                <Skeleton className="h-4 w-32 sm:h-5 sm:w-36" />
              </div>
            </CardContent>
          </Card>

          {/* Action Button Skeleton */}
          <div className="sticky bottom-4 z-10 lg:top-6">
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>
        </div>
      </div>
      {/* </Wrapper> */}
    </div>
  );
};
