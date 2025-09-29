"use client";

import { DashboardHeader } from "@/app/[locale]/(dashboard-pages)/_components/dashboard-header";
import { Wrapper } from "@/components/core/layout/wrapper";
import { BackButton } from "@/components/shared/back-button";
import SkiButton from "@/components/shared/button";
import { EmptyState } from "@/components/shared/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { Locale } from "@/lib/i18n/config";
import { formatCurrency, formatDate } from "@/lib/i18n/utils";
import { cn } from "@/lib/utils";
import { usePayoutService } from "@/services/dashboard/vendor/payouts";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { TbArrowLeft, TbRefresh } from "react-icons/tb";

import alertImage from "~/images/alert.png";

// Helper function to get account holder name from Bank data
const getAccountHolderName = (bank: Bank): string => {
  return bank?.accountName || bank?.user?.fullName || bank?.bankName || "Account Holder";
};

// Helper function to get display name for bank
const getBankDisplayName = (bank: Bank): string => {
  return bank?.bankName || bank?.name || "Unknown Bank";
};

interface PageProperties {
  params: {
    id: string;
    locale: string;
  };
}

const WithdrawalDetailsPage = ({ params }: PageProperties) => {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const { useGetWithdrawalDetails } = usePayoutService();

  // Fetch withdrawal details based on the ID
  const { data: withdrawalResponse, isLoading, isError } = useGetWithdrawalDetails(params.id);

  // Transform the API data for display
  const withdrawalData = useMemo(() => {
    if (!withdrawalResponse?.success) return null;

    const data = withdrawalResponse.data;
    const bankName = getBankDisplayName(data.bank);
    const accountHolderName = getAccountHolderName(data.bank);
    const firstThree = data.bank?.firstThreeDigits || "***";
    const lastThree = data.bank?.lastThreeDigits || "***";

    return {
      id: data.id,
      amount: data.amount,
      status: data.status,
      bankAccount: data.bank?.accountNumber || `${firstThree}****${lastThree}`,
      bankName,
      accountHolderName,
      transactionId: `${firstThree}-${Date.parse(data.date)}`,
      paidOn: data.date,
      time: new Date(data.date).toLocaleTimeString(locale, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };
  }, [withdrawalResponse, locale]);

  const handleGoBack = () => {
    router.back();
  };

  // Loading state with detailed skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen">
        {/* Header Skeleton */}
        <div className="border-border border-b px-4 py-4 sm:px-6 sm:py-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <Skeleton className="h-8 w-8 rounded-full sm:h-10 sm:w-10" />
            <Skeleton className="h-6 w-40 sm:h-8 sm:w-48" />
          </div>
        </div>

        {/* Content Skeleton */}
        <Wrapper className="px-0 py-8">
          <div className="bg-background rounded-lg p-4 sm:p-6 lg:p-8">
            {/* Amount Section Skeleton */}
            <div className="mb-6 sm:mb-8">
              <Skeleton className="mb-3 h-5 w-32 sm:h-6 sm:w-40" />
              <Skeleton className="h-8 w-48 sm:h-10 sm:w-56 lg:h-12 lg:w-64" />
            </div>

            {/* Status Section Skeleton */}
            <div className="mb-6 sm:mb-8">
              <Skeleton className="mb-3 h-5 w-16 sm:h-6 sm:w-20" />
              <Skeleton className="h-8 w-24 rounded-lg" />
            </div>

            {/* Bank Details Grid Skeleton */}
            <div className="mb-6 space-y-6 sm:mb-8 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:gap-8">
              {/* Bank Account */}
              <div className="rounded-lg border border-gray-200 p-4 sm:border-0 sm:p-0">
                <Skeleton className="mb-2 h-4 w-24 sm:mb-3 sm:h-5 sm:w-28" />
                <Skeleton className="h-5 w-36 sm:h-6 sm:w-44" />
              </div>

              {/* Bank Name */}
              <div className="rounded-lg border border-gray-200 p-4 sm:border-0 sm:p-0">
                <Skeleton className="mb-2 h-4 w-20 sm:mb-3 sm:h-5 sm:w-24" />
                <div className="flex items-center gap-2 sm:gap-3">
                  <Skeleton className="h-6 w-6 rounded-full sm:h-8 sm:w-8" />
                  <Skeleton className="h-5 w-32 sm:h-6 sm:w-40" />
                </div>
              </div>

              {/* Account Holder */}
              <div className="rounded-lg border border-gray-200 p-4 sm:border-0 sm:p-0">
                <Skeleton className="mb-2 h-4 w-28 sm:mb-3 sm:h-5 sm:w-32" />
                <Skeleton className="h-5 w-40 sm:h-6 sm:w-48" />
              </div>

              {/* Transaction ID */}
              <div className="rounded-lg border border-gray-200 p-4 sm:border-0 sm:p-0">
                <Skeleton className="mb-2 h-4 w-24 sm:mb-3 sm:h-5 sm:w-28" />
                <Skeleton className="h-5 w-44 sm:h-6 sm:w-52" />
              </div>

              {/* Date */}
              <div className="rounded-lg border border-gray-200 p-4 sm:border-0 sm:p-0">
                <Skeleton className="mb-2 h-4 w-16 sm:mb-3 sm:h-5 sm:w-20" />
                <Skeleton className="h-5 w-28 sm:h-6 sm:w-32" />
              </div>

              {/* Time */}
              <div className="rounded-lg border border-gray-200 p-4 sm:border-0 sm:p-0">
                <Skeleton className="mb-2 h-4 w-12 sm:mb-3 sm:h-5 sm:w-16" />
                <Skeleton className="h-5 w-24 sm:h-6 sm:w-28" />
              </div>
            </div>

            {/* Action Button Skeleton */}
            <div className="pt-4 sm:pt-6">
              <Skeleton className="h-12 w-full sm:h-14 lg:h-12 lg:w-48" />
            </div>
          </div>
        </Wrapper>
      </div>
    );
  }

  // Error state using EmptyState component
  if (isError || !withdrawalData) {
    return (
      <div className="min-h-screen">
        {/* Header */}
        <div className="border-border border-b px-4 py-4 sm:px-6 sm:py-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={handleGoBack}
              className="rounded-full p-2 transition-colors hover:bg-gray-100 active:bg-gray-200 sm:p-3"
              aria-label="Go back"
            >
              <TbArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
            <h1 className="!text-2xl">Withdraw Details</h1>
          </div>
        </div>

        {/* Error State */}
        <Wrapper className="px-0 py-8">
          <div className="bg-background rounded-lg p-4 sm:p-6 lg:p-8">
            <EmptyState
              images={[{ src: alertImage.src, alt: "Error loading withdrawal", width: 80, height: 80 }]}
              title="Unable to Load Withdrawal Details"
              description="We encountered an error while loading the withdrawal information. Please check your connection and try again."
              className="space-y-6"
              titleClassName="!text-xl text-red-600 font-semibold"
              descriptionClassName="text-gray-600 max-w-[400px] font-medium"
              actionButton={
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <SkiButton
                    onClick={() => window.location.reload()}
                    variant="primary"
                    className="w-full sm:w-auto sm:min-w-[140px]"
                  >
                    <TbRefresh className="mr-2 h-4 w-4" />
                    Try Again
                  </SkiButton>
                  <SkiButton onClick={handleGoBack} variant="outline" className="w-full sm:w-auto sm:min-w-[120px]">
                    <TbArrowLeft className="mr-2 h-4 w-4" />
                    Go Back
                  </SkiButton>
                </div>
              }
            />
          </div>
        </Wrapper>
      </div>
    );
  }

  return (
    <main className="space-y-8">
      <DashboardHeader title="Withdraw Details" showSubscriptionBanner={false} icon={<BackButton />} />
      <Wrapper className="!mt-[1rem] px-0">
        <div className="bg-background rounded-lg p-4 sm:p-6 lg:p-8">
          {/* Amount */}
          <div className="mb-6 sm:mb-8">
            <h2 className="mb-2 !text-lg font-semibold">Withdraw Amount</h2>
            <p className="text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
              {formatCurrency(withdrawalData.amount, locale)}
            </p>
          </div>

          {/* Status */}
          <div className="mb-6 sm:mb-8">
            <h2 className="mb-2 !text-lg font-semibold">Status</h2>
            <span
              className={cn(
                "inline-flex rounded-lg px-3 py-2 text-sm font-medium capitalize sm:px-4 sm:py-2 sm:text-base",
                withdrawalData.status === "approved" && "bg-green-100 text-green-800",
                withdrawalData.status === "completed" && "bg-green-100 text-green-800",
                withdrawalData.status === "pending" && "bg-yellow-100 text-yellow-800",
                withdrawalData.status === "processing" && "bg-blue-100 text-blue-800",
                withdrawalData.status === "failed" && "bg-red-100 text-red-800",
              )}
            >
              {withdrawalData.status}
            </span>
          </div>

          {/* Bank Details Grid */}
          <div className="mb-6 space-y-6 sm:mb-8 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:gap-8">
            {/* Bank Account Number */}
            <div className="rounded-lg border border-gray-200 p-4 sm:border-0 sm:p-0">
              <h2 className="mb-2 !text-lg font-semibold">Bank Account</h2>
              <p className="font-medium break-all text-gray-900 sm:text-lg">{withdrawalData.bankAccount}</p>
            </div>

            {/* Bank Name */}
            <div className="rounded-lg border border-gray-200 p-4 sm:border-0 sm:p-0">
              <h2 className="mb-2 !text-lg font-semibold">Bank Name</h2>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-500 sm:h-8 sm:w-8">
                  <span className="text-foreground text-xs font-bold sm:text-sm">
                    {withdrawalData.bankName.charAt(0)}
                  </span>
                </div>
                <span className="font-medium sm:text-lg">{withdrawalData.bankName}</span>
              </div>
            </div>

            {/* Account Holder */}
            <div className="rounded-lg border border-gray-200 p-4 sm:border-0 sm:p-0">
              <h2 className="mb-2 !text-lg font-semibold">Account Holder</h2>
              <p className="font-medium text-gray-900 sm:text-lg">{withdrawalData.accountHolderName}</p>
            </div>

            {/* Transaction ID */}
            <div className="rounded-lg border border-gray-200 p-4 sm:border-0 sm:p-0">
              <h2 className="mb-2 !text-lg font-semibold">Transaction ID</h2>
              <p className="font-medium break-all text-gray-900 sm:text-lg">{withdrawalData.transactionId}</p>
            </div>

            {/* Date */}
            <div className="rounded-lg border border-gray-200 p-4 sm:border-0 sm:p-0">
              <h2 className="mb-2 !text-lg font-semibold">Paid on</h2>
              <p className="font-medium text-gray-900 sm:text-lg">{formatDate(withdrawalData.paidOn, locale)}</p>
            </div>

            {/* Time */}
            <div className="rounded-lg border border-gray-200 p-4 sm:border-0 sm:p-0">
              <h2 className="mb-2 !text-lg font-semibold">Time</h2>
              <p className="font-medium text-gray-900 sm:text-lg">{withdrawalData.time}</p>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4 sm:pt-6">
            <SkiButton
              onClick={handleGoBack}
              className="w-full py-3 text-base font-semibold sm:py-4 sm:text-lg lg:w-auto lg:min-w-[200px]"
              variant="primary"
            >
              Back to Payouts
            </SkiButton>
          </div>
        </div>
      </Wrapper>
    </main>
  );
};

export default WithdrawalDetailsPage;
