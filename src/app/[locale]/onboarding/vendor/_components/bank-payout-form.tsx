"use client";

import SkiButton from "@/components/shared/button";
import { FormField } from "@/components/shared/inputs/FormFields";
import { ComboBox } from "@/components/shared/select-dropdown/combo-box";
import { Form } from "@/components/ui/form";
import { BankPayoutFormData, bankPayoutSchema } from "@/schemas";
import { useOnboardingUserService } from "@/services/externals/onboarding/use-onboarding-user-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface BankPayoutFormProperties {
  onComplete: (token?: string) => void;
}

export const BankPayoutForm = ({ onComplete }: BankPayoutFormProperties) => {
  const form = useForm<BankPayoutFormData>({
    resolver: zodResolver(bankPayoutSchema),
    defaultValues: {
      bankName: "",
      accountNumber: "",
      accountName: "",
      code: "",
    },
  });

  const { useSetupBankDetails, useGetAvailableBanks } = useOnboardingUserService();
  const { data: availableBanks, isLoading: isLoadingAvailableBanks } = useGetAvailableBanks();
  const { mutateAsync: setupBankDetails, isPending } = useSetupBankDetails();

  const onSubmit = async (formData: BankPayoutFormData) => {
    setupBankDetails(formData, {
      onSuccess: (response) => {
        if (response?.success) {
          toast.success("Bank details updated successfully, you can now start selling");
          onComplete(response?.data?.token);
        }
      },
      onError: () => {
        toast.error("Failed to update bank details");
      },
    });
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="mb-6 text-center">
        <h2 className="mb-2 !text-3xl font-semibold text-gray-900">Bank and Payout Setup</h2>
        <p className="text-sm text-gray-600">To receive your payments, please provide accurate bank details.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <ComboBox
            options={
              availableBanks?.data?.map((bank) => ({
                value: bank.code,
                label: bank.name,
              })) || []
            }
            value={form.watch("code")}
            onValueChange={(value) => {
              const selectedBank = availableBanks?.data?.find((bank) => bank.code === value);
              if (selectedBank) {
                form.setValue("bankName", selectedBank.name);
                form.setValue("code", selectedBank.code);
              }
            }}
            placeholder="Select bank..."
            searchPlaceholder="Search bank..."
            emptyMessage="No bank found."
            className={`text-high-grey-II h-14 w-full rounded-lg bg-white shadow-none`}
            contentClassName={`w-full`}
          />
          <FormField placeholder="Account Number" className="h-14 w-full" name="accountNumber" />
          <FormField placeholder="Account Name" className="h-14 w-full" name="accountName" />

          <div className="pt-4">
            <SkiButton
              type="submit"
              className="h-12 w-full font-medium"
              variant="primary"
              isDisabled={!form.formState.isValid || isPending || isLoadingAvailableBanks}
              isLoading={isPending}
            >
              Continue & Submit
            </SkiButton>
          </div>
        </form>
      </Form>
    </div>
  );
};
