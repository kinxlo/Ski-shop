/* eslint-disable no-console */
"use client";

import SkiButton from "@/components/shared/button";
import { FormField } from "@/components/shared/inputs/FormFields";
import { PhoneInput } from "@/components/shared/inputs/phone-input";
import { FormControl, FormItem, FormField as UIFormField } from "@/components/ui/form";
import { VendorPersonalFormData, vendorPersonalSchema } from "@/schemas";
import { useDashboardProfileService } from "@/services/dashboard/vendor/users/use-profile-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

interface VendorProfileFormProperties {
  initialData?: VendorProfile | null;
  onSubmit?: (data: VendorPersonalFormData) => Promise<void>;
  isLoading?: boolean;
  submitButtonText?: string;
  title?: string;
}

export const VendorProfileForm = ({
  initialData,
  onSubmit,
  isLoading = false,
  submitButtonText = "Save Personal Information",
  title = "Personal Information",
}: VendorProfileFormProperties) => {
  const methods = useForm<VendorPersonalFormData>({
    resolver: zodResolver(vendorPersonalSchema),
    defaultValues: {
      user: {
        firstName: initialData?.user?.firstName || "",
        lastName: initialData?.user?.lastName || "",
        email: initialData?.user?.email || "",
        phone: initialData?.user?.phone || "",
      },
    },
  });

  const { handleSubmit, reset } = methods;
  const { useUpdateVendorProfile, useGetVendorProfile } = useDashboardProfileService();
  const { data: profileResponse, isLoading: isFetchingProfile } = useGetVendorProfile();
  const updateProfileMutation = useUpdateVendorProfile();

  // Sync fetched data into the form when available
  useEffect(() => {
    const fetchedProfile = profileResponse?.data;
    if (fetchedProfile) {
      reset({
        user: {
          firstName: fetchedProfile.user.firstName ?? "",
          lastName: fetchedProfile.user.lastName ?? "",
          email: fetchedProfile.user.email ?? "",
          phone: fetchedProfile.user.phone ?? "",
        },
      });
    }
  }, [initialData, reset, profileResponse]);

  const handleFormSubmit = async (data: VendorPersonalFormData) => {
    try {
      await (onSubmit
        ? onSubmit(data)
        : updateProfileMutation.mutateAsync({
            data: {
              store: {
                name: initialData?.store?.name || "",
                description: initialData?.store?.description || "",
              },
              business: {
                type: initialData?.business?.type || "",
                businessRegNumber: initialData?.business?.businessRegNumber || "",
                businessName: initialData?.business?.businessName || "",
                country: initialData?.business?.country || "",
                state: initialData?.business?.state || "",
                address: initialData?.business?.address || "",
              },
              logo: initialData?.store?.logo || null,
              user: {
                firstName: data.user.firstName,
                lastName: data.user.lastName,
                phone: data.user.phone,
              },
            },
          }));
      toast.success("Personal information saved successfully!");
    } catch (error) {
      console.error("Error submitting personal information:", error);
      toast.error("Failed to save personal information. Please try again.");
    }
  };

  return (
    <div className="bg-background rounded-lg border p-6">
      <h4 className="text-center">{title}</h4>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="mx-auto mt-8 max-w-2xl space-y-6">
          <div className="grid gap-4 lg:grid-cols-2">
            <FormField
              label="First Name"
              name="user.firstName"
              placeholder="Enter your first name"
              className="col-span-2 h-12 w-full"
            />
            <FormField
              label="Last Name"
              name="user.lastName"
              placeholder="Enter your last name"
              className="col-span-2 h-12 w-full"
            />
            <FormField
              label="Email"
              name="user.email"
              type="email"
              placeholder="Enter your email"
              className="h-12 w-full"
              disabled={!!initialData} // Disable email editing for existing profiles
            />
            <UIFormField
              control={methods.control}
              name="user.phone"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <FormControl className="w-full">
                    <div>
                      <label className="font-medium">Phone Number</label>
                      <PhoneInput
                        defaultCountry={`NG`}
                        className="!w-full !shadow-none"
                        inputClassName="!h-14 !shadow-none"
                        buttonClassName="!h-14 !shadow-none"
                        placeholder="Enter a phone number"
                        {...field}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <SkiButton
              variant={`primary`}
              type="submit"
              isDisabled={isLoading || isFetchingProfile || updateProfileMutation.isPending}
              className="w-full"
              isLoading={isLoading || isFetchingProfile || updateProfileMutation.isPending}
            >
              {submitButtonText}
            </SkiButton>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
