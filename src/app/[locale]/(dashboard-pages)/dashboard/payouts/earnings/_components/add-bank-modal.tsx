"use client";

import SkiButton from "@/components/shared/button";
import { ReusableDialog } from "@/components/shared/dialog/Dialog";
import { EmptyState } from "@/components/shared/empty-state";
import { FormField } from "@/components/shared/inputs/FormFields";
import { ComboBox } from "@/components/shared/select-dropdown/combo-box";
import { BankPayoutFormData, bankPayoutSchema } from "@/schemas";
import { usePayoutService } from "@/services/dashboard/vendor/payouts/use-payout-service";
import { useOnboardingUserService } from "@/services/externals/onboarding/use-onboarding-user-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { TbPlus } from "react-icons/tb";
import { toast } from "sonner";

interface AddBankModalProperties {
  isOpen: boolean;
  onClose: () => void;
  onBankAdded?: (bankData: BankPayoutFormData) => void;
}

export const AddBankModal = ({ isOpen, onClose, onBankAdded }: AddBankModalProperties) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<BankPayoutFormData>({
    resolver: zodResolver(bankPayoutSchema),
    defaultValues: {
      bankName: "",
      accountNumber: "",
      accountName: "",
      code: "",
    },
  });

  const { useGetAvailableBanks } = useOnboardingUserService();
  const { useUpdateBankList } = usePayoutService();
  const {
    data: availableBanks,
    isLoading: isLoadingBanks,
    isError: isBanksError,
    refetch: refetchBanks,
  } = useGetAvailableBanks();

  const { mutateAsync: setupBankDetails } = useUpdateBankList();

  const {
    handleSubmit,
    formState: { isValid },
    reset,
  } = methods;

  const handleSubmitForm = async (formData: BankPayoutFormData) => {
    setIsSubmitting(true);

    try {
      const response = await setupBankDetails(formData);

      if (response?.success) {
        toast.success("Bank account added successfully!");
        onBankAdded?.(formData);
        handleClose();
      } else {
        toast.error("Failed to add bank account. Please try again.");
      }
    } catch {
      toast.error("An error occurred while adding the bank account.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    setIsSubmitting(false);
    onClose();
  };

  const handleBankSelection = (bankCode: string) => {
    const selectedBank = availableBanks?.data?.find((bank) => bank.code === bankCode);
    if (selectedBank) {
      methods.setValue("bankName", selectedBank.name);
      methods.setValue("code", selectedBank.code);
    }
  };

  // Error state for banks loading
  if (isBanksError) {
    return (
      <ReusableDialog
        open={isOpen}
        onOpenChange={(open) => !open && handleClose()}
        trigger={<div />}
        title="Add Bank Account"
        className="sm:max-w-md"
      >
        <div className="py-4">
          <EmptyState
            images={[{ src: "/images/alert.png", alt: "Error", width: 60, height: 60 }]}
            title="Failed to Load Banks"
            description="Unable to load available banks. Please check your connection and try again."
            className="min-h-0 space-y-4"
            titleClassName="!text-lg text-red-600"
            descriptionClassName="text-sm"
            button={{
              text: "Retry",
              onClick: () => refetchBanks(),
            }}
          />
        </div>
      </ReusableDialog>
    );
  }

  return (
    <ReusableDialog
      open={isOpen}
      onOpenChange={(open) => !open && handleClose()}
      trigger={<div />}
      title="Add Bank Account"
      headerClassName={`!text-2xl font-semibold`}
      className="sm:max-w-md"
    >
      <div className="space-y-6">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-6">
            {/* Bank Name Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Bank Name</label>
              {isLoadingBanks ? (
                <div className="h-14 w-full animate-pulse rounded-lg bg-gray-200" />
              ) : (
                <ComboBox
                  options={
                    availableBanks?.data?.map((bank) => ({
                      value: bank.code,
                      label: bank.name,
                    })) || []
                  }
                  value={methods.watch("code")}
                  onValueChange={handleBankSelection}
                  placeholder="Select Bank"
                  searchPlaceholder="Search banks..."
                  emptyMessage="No bank found."
                  className="h-14 w-full rounded-lg border-gray-300 bg-white text-gray-900 shadow-none"
                  contentClassName="w-full"
                  disabled={isSubmitting}
                />
              )}
            </div>

            {/* Account Number */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Account Number</label>
              <FormField
                placeholder="Enter Account Number"
                className="h-14 w-full"
                name="accountNumber"
                disabled={isSubmitting}
              />
            </div>

            {/* Account Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Account Name</label>
              <FormField
                placeholder="Enter Account Holder's Name"
                className="h-14 w-full"
                name="accountName"
                disabled={isSubmitting}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <SkiButton
                type="submit"
                className="h-12 w-full font-medium"
                variant="primary"
                isDisabled={!isValid || isSubmitting || isLoadingBanks}
                isLoading={isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add"}
              </SkiButton>
            </div>
          </form>
        </FormProvider>
      </div>
    </ReusableDialog>
  );
};

// Trigger component for the modal
interface AddBankTriggerProperties {
  onBankAdded?: (bankData: BankPayoutFormData) => void;
}

export const AddBankTrigger = ({ onBankAdded }: AddBankTriggerProperties) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBankAdded = (bankData: BankPayoutFormData) => {
    onBankAdded?.(bankData);
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-background min-h-[5rem] w-full rounded-lg border-2 border-dashed border-gray-300 p-4 transition-colors hover:border-gray-400"
      >
        <div className="text-primary flex items-center justify-center gap-2">
          <TbPlus className="h-5 w-5" />
          <span className="font-medium">Add Bank</span>
        </div>
      </button>

      <AddBankModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onBankAdded={handleBankAdded} />
    </>
  );
};
