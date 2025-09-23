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

const getFormattedPhone = (phone?: string) => {
  if (!phone) return "";
  const raw = phone.trim();

  // Already E.164
  if (raw.startsWith("+")) return raw;

  // Stored as 23480... (missing +)
  if (raw.startsWith("234")) return `+${raw}`;

  // Local 11-digit starting with 0 e.g. 080...
  if (raw.startsWith("0")) return `+234${raw.slice(1)}`;

  // Fallback: assume local without leading 0 e.g. 8012345678
  return `+234${raw}`;
};

// Accept phone from user.phone, user.phoneNumber or top-level profile.phoneNumber
type VendorProfileLikeForPhone = {
  user?: {
    phone?: string | null;
    phoneNumber?: string | null;
  } | null;
  phoneNumber?: string | null;
};

const getProfilePhone = (profile?: VendorProfileLikeForPhone): string | undefined => {
  if (!profile) return undefined;
  return profile.user?.phone ?? profile.user?.phoneNumber ?? profile.phoneNumber ?? undefined;
};

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
        phone: getFormattedPhone(getProfilePhone(initialData ?? undefined)),
      },
    },
  });

  const { handleSubmit, reset } = methods;
  const { useUpdateVendorProfile, useGetVendorProfile } = useDashboardProfileService();
  const { data: profileResponse } = useGetVendorProfile();
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
          phone: getFormattedPhone(getProfilePhone(fetchedProfile)),
          // phone: fetchedProfile.user.phoneNumber,
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
    <div className="bg-background rounded-lg p-6">
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
                        value={field.value ?? ""}
                        onChange={(v) => field.onChange(v ?? "")}
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
