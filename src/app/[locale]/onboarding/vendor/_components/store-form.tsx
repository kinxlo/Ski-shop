"use client";

import SkiButton from "@/components/shared/button";
import { FormField } from "@/components/shared/FormFields";
import { StoreFormData, storeSchema } from "@/schemas";
import { useOnboardingUserService } from "@/services/externals/onboarding/use-onboarding-user-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

interface StoreFormProperties {
  onComplete: () => void;
}

export const StoreForm = ({ onComplete }: StoreFormProperties) => {
  const methods = useForm<StoreFormData>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: "",
      description: "",
      image: null,
    },
  });

  const router = useRouter();
  const locale = useLocale();

  // Onboarding user service hook
  const { useCreateStore } = useOnboardingUserService();
  const { mutateAsync: createStore, isPending } = useCreateStore();

  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const handleSubmitForm = async (formData: StoreFormData) => {
    // eslint-disable-next-line no-console
    console.log(formData);
    createStore(formData, {
      onSuccess: (response) => {
        if (response?.success) {
          toast.success("Store created successfully");
          onComplete?.();
          router.push(`/${locale}/onboarding/vendor?step=bank-payout&token=${response?.data?.token}`);
        }
      },
      onError: () => {
        toast.error("Failed to create store");
      },
    });
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
                name="image"
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
              isDisabled={!isValid || isPending}
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
