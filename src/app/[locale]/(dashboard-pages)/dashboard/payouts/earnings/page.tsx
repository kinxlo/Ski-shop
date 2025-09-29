"use client";

import { BackButton } from "@/components/shared/back-button";
import SkiButton from "@/components/shared/button";
import { AlertModal } from "@/components/shared/dialog/alert-modal";
import { EmptyState } from "@/components/shared/empty-state";
import { FormField } from "@/components/shared/inputs/FormFields";
import { Locale } from "@/lib/i18n/config";
import { formatCurrency } from "@/lib/i18n/utils";
import { usePayoutService } from "@/services/dashboard/vendor/payouts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { TbCheck, TbCurrencyNaira, TbInfoCircle, TbWallet } from "react-icons/tb";
import { z } from "zod";

import { DashboardHeader } from "../../../_components/dashboard-header";
import { OverViewCard } from "../../../_components/overview-card";
import { AddBankTrigger } from "./_components";

// Helper function to get account holder name from Bank data
const getAccountHolderName = (bank: Bank): string => {
  return bank.accountName || bank.user?.fullName || bank.bankName || "Account Holder";
};

// Helper function to get display name for bank
const getBankDisplayName = (bank: Bank): string => {
  return bank.bankName || bank.name || "Unknown Bank";
};

// Withdrawal form schema
const withdrawalSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((value) => !Number.isNaN(Number(value)) && Number(value) > 0, "Please enter a valid amount"),
});

type WithdrawalFormData = z.infer<typeof withdrawalSchema>;

const Page = () => {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const { useGetPayoutStore, useGetVendorBanks, useInitiateWithdrawal } = usePayoutService();
  const queryClient = useQueryClient();

  // Fetch payout data
  const { data: payoutStore, isLoading } = useGetPayoutStore();

  // Fetch user's bank accounts
  const {
    data: vendorBanks,
    isLoading: isLoadingBanks,
    isError: isBanksError,
    refetch: refetchBanks,
  } = useGetVendorBanks();

  const { mutateAsync: initiateWithdrawal, isPending: isInitiatingWithdrawal } = useInitiateWithdrawal();

  // State management
  const [selectedBankId, setSelectedBankId] = useState("");
  const [bankAccounts, setBankAccounts] = useState<Bank[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Form setup
  const methods = useForm<WithdrawalFormData>({
    resolver: zodResolver(withdrawalSchema),
    defaultValues: {
      amount: "",
    },
  });

  // Calculate available earnings
  const availableEarnings = payoutStore?.success ? payoutStore.data.available : 0;
  const dailyLimit = 100_000; // ₦100,000 daily limit

  // Transform and set bank accounts from API response
  useEffect(() => {
    if (vendorBanks?.success && vendorBanks.data?.items) {
      setBankAccounts(vendorBanks.data.items);
    }
  }, [vendorBanks]);

  // Auto-select first bank when banks are loaded
  useEffect(() => {
    if (bankAccounts.length > 0 && !selectedBankId) {
      setSelectedBankId(bankAccounts[0].id);
    }
  }, [bankAccounts, selectedBankId]);

  const handleBankAdded = () => {
    // Refetch the bank list to get the updated data from server
    // This will automatically include the newly added bank
    setTimeout(() => {
      refetchBanks();
    }, 1000);
  };

  const handleWithdrawal = async (formData: WithdrawalFormData) => {
    await initiateWithdrawal(
      { amount: formData.amount, bankId: selectedBankId },
      {
        onSuccess: (response) => {
          if (response?.success) {
            setShowSuccessModal(true);
            queryClient.invalidateQueries({ queryKey: ["dashboard", "payouts"] });
          }
        },
      },
    );
  };

  const handleProceed = () => {
    setShowSuccessModal(false);
    router.push(`/${locale}/dashboard/payouts`);
  };

  const {
    handleSubmit,
    watch,
    formState: { isValid },
  } = methods;

  const watchedAmount = watch("amount");

  return (
    <div className="space-y-8">
      {/* Header */}
      <DashboardHeader
        title="Withdraw Earnings"
        subtitle={`Manage your withdraw earnings, add a bank account and withdraw your earnings`}
        showSubscriptionBanner
        icon={<BackButton />}
      />
      <section className="space-y-6">
        {/* Available Earnings */}
        <OverViewCard
          title="Available Earnings"
          value={formatCurrency(availableEarnings, locale)}
          icon={<TbWallet />}
          iconClassName="bg-primary/10 text-primary text-[24px]"
        />

        {/* Bank Accounts */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="!text-lg">Bank Accounts</h2>
          </div>

          <div className="space-y-3">
            {/* Loading state for banks */}
            {isLoadingBanks ? (
              <div className="space-y-3">
                {Array.from({ length: 2 }, (_, index) => (
                  <div key={index} className="bg-background rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-[#111111]" />
                        <div className="h-3 w-32 animate-pulse rounded bg-gray-200 dark:bg-[#111111]" />
                        <div className="h-3 w-28 animate-pulse rounded bg-gray-200 dark:bg-[#111111]" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : isBanksError ? (
              <div className="bg-background rounded-lg p-6">
                <EmptyState
                  images={[{ src: "/images/alert.png", alt: "Error", width: 50, height: 50 }]}
                  title="Failed to Load Bank Accounts"
                  description="Unable to load your bank accounts. Please check your connection and try again."
                  className="min-h-0 space-y-4"
                  titleClassName="!text-lg text-red-600"
                  descriptionClassName="text-sm text-gray-600"
                  button={{
                    text: "Retry",
                    onClick: () => refetchBanks(),
                  }}
                />
              </div>
            ) : bankAccounts.length === 0 ? (
              <div className="bg-background rounded-lg p-6">
                <EmptyState
                  images={[{ src: "/images/alert.png", alt: "No banks", width: 50, height: 50 }]}
                  title="No Bank Accounts"
                  description="Add a bank account to withdraw your earnings"
                  className="min-h-0 space-y-4"
                  titleClassName="!text-lg text-gray-700"
                  descriptionClassName="text-sm text-gray-600"
                />
              </div>
            ) : (
              <section className={`grid grid-cols-1 gap-4 md:grid-cols-3`}>
                {bankAccounts?.map((bank) => (
                  <div
                    key={bank.id}
                    onClick={() => setSelectedBankId(bank.id)}
                    className={`bg-background cursor-pointer rounded-lg border-2 p-4 transition-colors ${
                      selectedBankId === bank.id
                        ? "border-primary bg-primary/10"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-accent flex h-10 w-10 items-center justify-center rounded-full">
                          <span className="text-sm font-bold text-white">
                            {getBankDisplayName(bank).charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{getBankDisplayName(bank)}</p>
                          <p className="text-sm text-gray-600">{bank.accountNumber}</p>
                          <p className="text-sm text-gray-600">{getAccountHolderName(bank)}</p>
                        </div>
                      </div>
                      {selectedBankId === bank.id && (
                        <div className="bg-primary flex h-6 w-6 items-center justify-center rounded-full">
                          <TbCheck className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {/* Add Bank Button */}
                <AddBankTrigger onBankAdded={handleBankAdded} />
              </section>
            )}
          </div>
        </div>

        {/* Amount to Withdraw Form */}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handleWithdrawal)} className="space-y-6">
            <div>
              <h2 className="text-high-II mb-4 !text-lg font-semibold">Amount to Withdraw</h2>

              <div className="space-y-4">
                <div>
                  <label htmlFor="amount" className="mb-2 block text-sm font-medium text-gray-700">
                    Amount
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <TbCurrencyNaira className="h-5 w-5 text-gray-400" />
                    </div>
                    <FormField name="amount" placeholder="0.00" className="!h-14 pl-10 text-lg" />
                  </div>
                </div>

                {/* Daily Limit Info */}
                <div className="bg-primary/10 flex items-start gap-2 rounded-lg p-3">
                  <TbInfoCircle className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                  <p className="text-primary text-sm">
                    You can withdraw every day, up to your daily limit of {formatCurrency(dailyLimit, locale)}.
                  </p>
                </div>
              </div>
            </div>

            {/* Initiate Withdrawal Button */}
            <div className="pt-4">
              <SkiButton
                type="submit"
                className="w-full py-4 text-lg font-semibold"
                variant="primary"
                isDisabled={
                  !isValid || !watchedAmount || !selectedBankId || isLoading || isLoadingBanks || isInitiatingWithdrawal
                }
                isLoading={isInitiatingWithdrawal}
              >
                {isInitiatingWithdrawal ? "Processing..." : "Initiate Withdrawal"}
              </SkiButton>
            </div>
          </form>
        </FormProvider>
      </section>

      {/* Success Modal */}
      <AlertModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        onConfirm={handleProceed}
        type="success"
        title="Withdrawal Successful"
        description="Funds have been sent to your account"
        confirmText="Proceed"
        showCancelButton={false}
      />
    </div>
  );
};

export default Page;
