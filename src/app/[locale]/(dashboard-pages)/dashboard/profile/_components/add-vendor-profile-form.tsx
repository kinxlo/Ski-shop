"use client";

import { useDashboardProfileService } from "@/services/dashboard/vendor/users/use-profile-service";
import { useState } from "react";

import { VendorProfileBaseForm } from "./vendor-profile-base-form";

type VendorProfileFormDataWithValidation = Parameters<
  React.ComponentProps<typeof VendorProfileBaseForm>["onSubmit"]
>[0];

export const AddVendorProfileForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { useUpdateVendorProfile } = useDashboardProfileService();
  const { mutateAsync: createProfile } = useUpdateVendorProfile(); // Using the same endpoint for creation

  const handleSubmit = async (data: VendorProfileFormDataWithValidation) => {
    setIsLoading(true);
    try {
      await createProfile({ data });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VendorProfileBaseForm
      initialData={null}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      submitButtonText="Create Profile"
      title="Create Profile"
    />
  );
};
