"use client";

import { useDashboardProfileService } from "@/services/dashboard/vendor/users/use-profile-service";
import { useState } from "react";

import { VendorProfileBaseForm } from "./vendor-profile-base-form";

type VendorProfileFormDataWithValidation = Parameters<
  React.ComponentProps<typeof VendorProfileBaseForm>["onSubmit"]
>[0];

export const EditVendorProfileForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { useGetVendorProfile, useUpdateVendorProfile } = useDashboardProfileService();
  const { data: profileData, isLoading: isLoadingProfile } = useGetVendorProfile();
  const { mutateAsync: updateProfile } = useUpdateVendorProfile();

  const handleSubmit = async (data: VendorProfileFormDataWithValidation) => {
    setIsLoading(true);
    try {
      await updateProfile({ data });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingProfile) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="border-primary mx-auto h-8 w-8 animate-spin rounded-full border-b-2"></div>
          <p className="mt-2 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <VendorProfileBaseForm
      initialData={profileData?.data || null}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      submitButtonText="Update Profile"
      title="Edit Profile"
    />
  );
};
