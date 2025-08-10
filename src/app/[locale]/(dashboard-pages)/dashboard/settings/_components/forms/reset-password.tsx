"use client";

import MainButton from "@/components/shared/button";
import { FormField } from "@/components/shared/inputs/FormFields";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { changePasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type PasswordFormData = z.infer<typeof changePasswordSchema>;

export const PasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<PasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: "",
      new_password: "",
      new_password_confirmation: "",
    },
  });

  const {
    handleSubmit,
    formState: { isDirty },
    reset,
  } = methods;

  // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
  const onSubmit = async (data: PasswordFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Here you would typically make an API call to change the password
      // await updatePassword(data);

      toast.success("Password updated", {
        description: "Your password has been changed successfully.",
      });

      // Reset form
      reset();
    } catch {
      toast.error("Error", {
        description: "Failed to update password. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    reset();
  };

  return (
    <Card className="shadow-none">
      <CardHeader className="space-y-1">
        <div className="flex items-center space-x-2">
          <KeyRound className="h-5 w-5 text-blue-600" />
          <CardTitle className="text-xl">Change Password</CardTitle>
        </div>
        <CardDescription>Update your password to keep your account secure.</CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              label="Current Password"
              name="password"
              type="password"
              placeholder="Enter current password"
              className="h-12 w-full"
              required
            />

            <FormField
              label="New Password"
              name="new_password"
              type="password"
              placeholder="Enter new password"
              className="h-12 w-full"
              required
            />

            <FormField
              label="Confirm New Password"
              name="new_password_confirmation"
              type="password"
              placeholder="Confirm new password"
              className="h-12 w-full"
              required
            />

            {isDirty && (
              <div className="flex flex-col gap-3 pt-4 sm:flex-row">
                <MainButton
                  variant="outline"
                  type="button"
                  onClick={handleCancel}
                  isDisabled={isLoading}
                  className="sm:w-auto"
                >
                  Cancel
                </MainButton>
                <MainButton variant="primary" type="submit" isDisabled={isLoading} className="sm:w-auto">
                  {isLoading ? "Updating..." : "Update Password"}
                </MainButton>
              </div>
            )}
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};
