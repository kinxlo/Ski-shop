"use client";

import SkiButton from "@/components/shared/button";
import { FormField } from "@/components/shared/FormFields";
import { StoreFormData, storeSchema } from "@/schemas";
import { useUserService } from "@/services/user/use-user-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

interface StoreFormProperties {
  data: StoreFormData;
  onComplete: (data: StoreFormData) => void;
}

export const StoreForm = ({ data, onComplete }: StoreFormProperties) => {
  const methods = useForm<StoreFormData>({
    resolver: zodResolver(storeSchema),
    defaultValues: data,
  });

  // User service hook
  const { useCreateStore } = useUserService();
  const { mutateAsync: createStore, isPending } = useCreateStore();

  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const handleSubmitForm = async (formData: StoreFormData) => {
    const response = await createStore(formData);
    if (response?.success) {
      toast.success("Store created successfully");
      onComplete(formData);
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-6 text-center">
        <h2 className="mb-2 text-xl font-semibold text-gray-900 sm:text-2xl">Create Your Store</h2>
        <p className="text-sm text-gray-600 sm:text-base">
          Set up your store profile to start selling on Ski-Shop. Add your store details and logo to build trust with
          customers.
        </p>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-6">
          <section className="space-y-4">
            {/* Store Name */}
            <div className="space-y-2">
              <FormField placeholder="Store Name" className="h-14 w-full" name="name" />
            </div>

            {/* Store Description */}
            <div className="w-full space-y-2">
              <FormField
                placeholder="Store Description"
                className="!h-30 w-full bg-white shadow-none"
                name="description"
                type={`textarea`}
              />
            </div>

            {/* Store Logo Upload */}
            <div className="!w-full space-y-2">
              <FormField
                label="Store Logo"
                name="logo"
                type="file"
                acceptedFileTypes="image/*"
                maxFiles={1}
                showPreview={true}
                containerClassName="!w-full"
                className="!w-full"
              />
            </div>
          </section>

          {/* CTA */}
          <section className="">
            <SkiButton
              type="submit"
              className="h-12 w-full sm:h-14"
              variant="primary"
              isDisabled={isPending || !isValid}
              isLoading={isPending}
            >
              Create Store
            </SkiButton>
          </section>
        </form>
      </FormProvider>
    </div>
  );
};
