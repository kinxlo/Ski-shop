/* eslint-disable no-console */
"use client";

// NotificationSettingsForm.tsx
import MainButton from "@/components/shared/button";
import { SwitchField } from "@/components/shared/inputs/FormFields";
import { FormProvider, useForm } from "react-hook-form";

type NotificationSettingsData = {
  newOrder: boolean;
  pendingOrder: boolean;
};

export const NotificationSettingsForm = () => {
  const methods = useForm<NotificationSettingsData>({
    // resolver: zodResolver(),
    defaultValues: {
      newOrder: false,
      pendingOrder: false,
    },
  });

  const {
    handleSubmit,
    formState: { isDirty },
  } = methods;

  const onSubmit = (data: NotificationSettingsData) => {
    
    // Handle form submission
  };

  return (
    <section>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <h2 className="!text-2xl font-semibold">Notification Settings</h2>
            <p className="text-gray-600">Set order notification</p>
          </div>

          <div className="space-y-4">
            <SwitchField
              name={"new-order"}
              label={`New Order`}
              className={`flex h-12 w-full items-center justify-between`}
            />
            <SwitchField
              name={"pending-order"}
              label={`Pending Order`}
              className={`flex w-full items-center justify-between`}
            />

            {isDirty && (
              <div className="flex gap-4 pt-4">
                <MainButton
                  variant="outline"
                  type="button"
                  className="text-destructive border-destructive w-full shadow-none"
                >
                  Cancel
                </MainButton>
                <MainButton variant="primary" type="submit" className="w-full">
                  Save Changes
                </MainButton>
              </div>
            )}
          </div>
        </form>
      </FormProvider>
    </section>
  );
};
