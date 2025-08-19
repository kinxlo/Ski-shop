/* eslint-disable no-console */
"use client";

import SkiButton from "@/components/shared/button";
import { FormField } from "@/components/shared/inputs/FormFields";
import { vendorBusinessFormSchema, type VendorBusinessFormData } from "@/schemas";
import { useDashboardProfileService } from "@/services/dashboard/vendor/users/use-profile-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

// Sample data for dropdowns
const businessTypes = [
  { value: "individual", label: "Individual" },
  { value: "corporation", label: "Corporation" },
  { value: "partnership", label: "Partnership" },
  { value: "llc", label: "LLC" },
];

const countries = [
  { value: "nigeria", label: "🇳🇬 Nigeria" },
  { value: "united_kingdom", label: "🇬🇧 United Kingdom" },
  { value: "united_states", label: "🇺🇸 United States" },
  { value: "canada", label: "🇨🇦 Canada" },
  { value: "australia", label: "🇦🇺 Australia" },
];

const states = [
  { value: "lagos", label: "Lagos" },
  { value: "abuja", label: "Abuja" },
  { value: "kano", label: "Kano" },
  { value: "kaduna", label: "Kaduna" },
];

interface VendorBusinessFormProperties {
  initialData?: VendorProfile | null;
  onSubmit?: (data: VendorBusinessFormData) => Promise<void>;
  isLoading?: boolean;
  submitButtonText?: string;
  title?: string;
}

export const VendorBusinessForm = ({
  initialData,
  onSubmit,
  isLoading = false,
  submitButtonText = "Save Business Information",
  title = "Business Information",
}: VendorBusinessFormProperties) => {
  const methods = useForm<VendorBusinessFormData>({
    resolver: zodResolver(vendorBusinessFormSchema),
    defaultValues: {
      business: {
        type: initialData?.business?.type || "",
        businessRegNumber: initialData?.business?.businessRegNumber || "",
        businessName: initialData?.business?.businessName || "",
        country: initialData?.business?.country || "",
        state: initialData?.business?.state || "",
        address: initialData?.business?.address || "",
      },
    },
  });

  const { handleSubmit } = methods;
  const { useUpdateVendorProfile } = useDashboardProfileService();
  const updateProfileMutation = useUpdateVendorProfile();

  const handleFormSubmit = async (data: VendorBusinessFormData) => {
    try {
      await (onSubmit
        ? onSubmit(data)
        : updateProfileMutation.mutateAsync({
            data: {
              // Include required sibling keys as empty objects to satisfy type
              store: {},
              user: {},
              business: {
                type: data.business.type,
                businessRegNumber: data.business.businessRegNumber,
                businessName: data.business.businessName,
                country: data.business.country,
                state: data.business.state,
                address: data.business.address,
              },
            },
          }));
      toast.success("Business information saved successfully!");
    } catch (error) {
      console.error("Error submitting business information:", error);
      toast.error("Failed to save business information. Please try again.");
    }
  };

  return (
    <div className="bg-background rounded-lg border p-6">
      <h4 className="text-center">{title}</h4>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="mx-auto mt-8 max-w-2xl space-y-6">
          <div className="grid gap-4 lg:grid-cols-2">
            <FormField
              label="Business Type"
              name="business.type"
              type="select"
              options={businessTypes}
              placeholder="Select business type"
              className="!h-12 w-full"
            />
            <FormField
              label="Business Registration Number (optional)"
              name="business.businessRegNumber"
              placeholder="CAC: 1920384"
              className="!h-12 w-full"
            />
            <FormField
              label="Business Name"
              name="business.businessName"
              placeholder="Enter business name"
              className="!h-12 w-full"
            />
            <FormField
              label="Country"
              name="business.country"
              type="select"
              options={countries}
              placeholder="Select country"
              className="!h-12 w-full"
            />
            <FormField
              label="State"
              name="business.state"
              type="select"
              options={states}
              placeholder="Select state"
              className="!h-12 w-full"
            />
            <FormField
              label="Store Address"
              name="business.address"
              placeholder="43 Yaba Street, Lagos."
              className="!h-12 w-full"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <SkiButton
              variant={`primary`}
              type="submit"
              isDisabled={isLoading || updateProfileMutation.isPending}
              className="w-full"
              isLoading={isLoading || updateProfileMutation.isPending}
            >
              {submitButtonText}
            </SkiButton>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
