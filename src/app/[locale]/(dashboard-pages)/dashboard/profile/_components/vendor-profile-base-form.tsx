/* eslint-disable no-console */
"use client";

import { BlurImage } from "@/components/core/miscellaneous/blur-image";
import MainButton from "@/components/shared/button";
import { FormField } from "@/components/shared/inputs/FormFields";
import { PhoneInput } from "@/components/shared/inputs/phone-input";
import { FormControl, FormItem, FormField as UIFormField } from "@/components/ui/form";
import { vendorProfileSchema, type VendorProfileFormData } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera } from "lucide-react";
import { useRef, useState } from "react";
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

interface VendorProfileBaseFormProperties {
  initialData?: VendorProfile | null;
  onSubmit: (data: VendorProfileFormData) => Promise<void>;
  isLoading?: boolean;
  submitButtonText: string;
  title: string;
}

export const VendorProfileBaseForm = ({
  initialData,
  onSubmit,
  isLoading = false,
  submitButtonText,
  title,
}: VendorProfileBaseFormProperties) => {
  const fileInputReference = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(initialData?.store?.logo || null);

  const methods = useForm<VendorProfileFormData>({
    resolver: zodResolver(vendorProfileSchema),
    defaultValues: {
      store: {
        name: initialData?.store?.name || "",
        description: initialData?.store?.description || "",
        category: initialData?.store?.category || "",
      },
      user: {
        firstName: initialData?.user?.firstName || "",
        lastName: initialData?.user?.lastName || "",
        email: initialData?.user?.email || "",
        phone: initialData?.user?.phone || "",
      },
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

  const { handleSubmit, setValue } = methods;

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

  const handleFormSubmit = async (data: VendorProfileFormData) => {
    try {
      await onSubmit(data);
      toast.success(`Profile ${initialData ? "updated" : "created"} successfully!`);
    } catch (error) {
      console.error("Error submitting profile:", error);
      toast.error(`Failed to ${initialData ? "update" : "create"} profile. Please try again.`);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <h1 className="!text-3xl font-bold text-gray-900">{title}</h1>
        <p className="mt-2 text-gray-600">
          {initialData ? "Update your store profile information" : "Set up your store profile to get started"}
        </p>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
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

          {/* Store Information Section */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="text-high-grey-II mb-4 !text-2xl font-semibold">Store Information</h2>
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
          </div>

          {/* Personal Information Section */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="text-high-grey-II mb-4 !text-2xl font-semibold">Personal Information</h2>
            <div className="grid gap-4 lg:grid-cols-2">
              <FormField
                label="Full Name"
                name="user.firstName"
                placeholder="Enter your full name"
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
          </div>

          {/* Business Information Section */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="text-high-grey-II mb-4 !text-2xl font-semibold">Business Information</h2>
            <div className="grid gap-4 lg:grid-cols-2">
              <FormField
                label="Business Type"
                name="business.type"
                type="select"
                options={businessTypes}
                placeholder="Select business type"
                className="!h-14 w-full"
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
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <MainButton
              type="submit"
              isDisabled={isLoading}
              className="bg-primary hover:bg-primary/80 h-12 w-full max-w-md rounded-lg font-medium text-white"
            >
              {isLoading ? "Processing..." : submitButtonText}
            </MainButton>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
