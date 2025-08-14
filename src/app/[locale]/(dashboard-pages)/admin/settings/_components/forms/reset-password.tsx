/* eslint-disable no-console */
"use client";

// PasswordForm.tsx
import MainButton from "@/components/shared/button";
import { FormField } from "@/components/shared/inputs/FormFields";
import { FormProvider, useForm } from "react-hook-form";

type PasswordFormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export const PasswordForm = () => {
  const methods = useForm<PasswordFormData>({
    // resolver: zodResolver(),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: PasswordFormData) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <section>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <h2 className="!text-2xl font-semibold">Reset password</h2>
            <p className="text-gray-600">Reset your password</p>
          </div>

          <div className="space-y-4">
            <FormField
              label={`Current password`}
              name={`password`}
              type="password"
              placeholder="Enter current password"
              className="h-12 w-full"
            />

            <FormField
              label={`New Password`}
              name={`new-password`}
              type="password"
              placeholder="Enter new password"
              className="h-12 w-full"
            />

            <FormField
              label={`Confirm password`}
              name={`confirm-password`}
              type="password"
              placeholder="Confirm new password"
              className="h-12 w-full"
            />

            <div className="flex gap-4 pt-4">
              <MainButton
                variant="outline"
                type="button"
                className="border-destructive text-destructive w-full shadow-none"
              >
                Cancel
              </MainButton>
              <MainButton variant="primary" type="submit" className="w-full">
                Save Changes
              </MainButton>
            </div>
          </div>
        </form>
      </FormProvider>
    </section>
  );
};
