"use client";

import SkiButton from "@/components/shared/button";
import { FormField } from "@/components/shared/FormFields";
import { Form } from "@/components/ui/form";
import { BankPayoutFormData, bankPayoutSchema } from "@/schemas";
import { useUserService } from "@/services/user/use-user-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface BankPayoutFormProperties {
  data: BankPayoutFormData;
  onComplete: (data: BankPayoutFormData) => void;
}

export const BankPayoutForm = ({ data, onComplete }: BankPayoutFormProperties) => {
  const form = useForm<BankPayoutFormData>({
    resolver: zodResolver(bankPayoutSchema),
    defaultValues: data,
  });
  const { useSetupBankDetails } = useUserService();
  const { mutateAsync: setupBankDetails, isPending } = useSetupBankDetails();

  const onSubmit = async (formData: BankPayoutFormData) => {
    const response = await setupBankDetails(formData);
    if (response?.success) {
      toast.success("Bank details updated successfully, you can now start selling");
      onComplete(formData);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="mb-6 text-center">
        <h2 className="mb-2 !text-3xl font-semibold text-gray-900">Bank and Payout Setup</h2>
        <p className="text-sm text-gray-600">To receive your payments, please provide accurate bank details.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField placeholder="Bank Name" className="h-14 w-full" name="bankName" />
          <FormField placeholder="Account Number" className="h-14 w-full" name="accountNumber" />
          <FormField placeholder="Account Name" className="h-14 w-full" name="accountName" />

          <div className="pt-4">
            <SkiButton
              type="submit"
              className="h-12 w-full font-medium"
              variant="primary"
              isDisabled={!form.formState.isValid || isPending}
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
