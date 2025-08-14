/* eslint-disable no-console */
"use client";

import { BlurImage } from "@/components/core/miscellaneous/blur-image";
import SkiButton from "@/components/shared/button";
import { FormField } from "@/components/shared/inputs/FormFields";
import { vendorStoreFormSchema, type VendorStoreFormData } from "@/schemas";
import { useDashboardProfileService } from "@/services/dashboard/vendor/users/use-profile-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

interface VendorStoreFormProperties {
  initialData?: VendorProfile | null;
  onSubmit?: (data: VendorStoreFormData) => Promise<void>;
  isLoading?: boolean;
  submitButtonText?: string;
  title?: string;
}

export const VendorStoreForm = ({
  initialData,
  onSubmit,
  isLoading,
  submitButtonText = "Save Store Information",
  title = "Store Information",
}: VendorStoreFormProperties) => {
  const fileInputReference = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const methods = useForm<VendorStoreFormData>({
    resolver: zodResolver(vendorStoreFormSchema),
    defaultValues: {
      store: {
        name: "",
        description: "",
        // category: "",
      },
      logo: null,
    },
  });

  const { handleSubmit, setValue, reset } = methods;

  // Services
  const { useGetVendorStore, useUpdateVendorProfile } = useDashboardProfileService();
  const { data: storeResponse, isLoading: isFetchingStore } = useGetVendorStore();
  const updateProfileMutation = useUpdateVendorProfile();

  // Sync fetched data into the form when available
  useEffect(() => {
    const fetchedStore = storeResponse?.data;
    if (fetchedStore) {
      reset({
        store: {
          name: fetchedStore.name ?? "",
          description: fetchedStore.description ?? "",
        },
      });
      if (typeof fetchedStore.logo === "string" && fetchedStore.logo) {
        setPreviewImage(fetchedStore.logo);
      }
    }
  }, [storeResponse, initialData, reset]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue("logo", file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const triggerFileInput = () => {
    fileInputReference.current?.click();
  };

  const handleFormSubmit = async (data: VendorStoreFormData) => {
    try {
      // Prefer internal handling; fall back to external handler if explicitly provided
      await (onSubmit
        ? onSubmit(data)
        : updateProfileMutation.mutateAsync({
            data: {
              store: {
                name: data.store.name,
                description: data.store.description,
              },
              logo: data.logo as File | undefined,
              // user and business omitted intentionally in this form
              user: {},
              business: {},
            },
          }));
      toast.success("Store information saved successfully!");
    } catch (error) {
      console.error("Error submitting store information:", error);
      toast.error("Failed to save store information. Please try again.");
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="text-high-grey-II mb-4 !text-2xl font-semibold">{title}</h2>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Profile Image/Logo Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div
                onClick={triggerFileInput}
                className="border-border hover:border-primary relative h-32 w-32 cursor-pointer overflow-hidden rounded-full border-2 border-dashed bg-gray-100"
              >
                <BlurImage
                  src={previewImage || `/images/skicom.svg`}
                  alt="Store logo"
                  width={128}
                  height={128}
                  className="h-full w-full object-cover p-6"
                />
              </div>
              <div className="border-border bg-primary absolute right-0 bottom-0 rounded-full p-2 shadow-md">
                <Camera size={16} className="text-white" />
              </div>
            </div>
            <input
              type="file"
              ref={fileInputReference}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
          </div>

          {/* Store Information Fields */}
          <div className="space-y-4">
            <FormField label="Store Name" name="store.name" placeholder="Enter store name" className="h-12 w-full" />
            <FormField
              label="Store Description"
              name="store.description"
              type="textarea"
              placeholder="Enter store description"
              className="w-full"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <SkiButton
              variant={`primary`}
              type="submit"
              isDisabled={isLoading || isFetchingStore || updateProfileMutation.isPending}
              className="w-full max-w-md"
              isLoading={isLoading || isFetchingStore || updateProfileMutation.isPending}
            >
              {submitButtonText}
            </SkiButton>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
