"use client";

import SkiButton from "@/components/shared/button";
import { FormField } from "@/components/shared/inputs/FormFields";
import { ForgotPasswordData, forgotPasswordSchema } from "@/schemas";
import { useAuthService } from "@/services/auth/use-auth-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

// import { toast } from "sonner";

export const ForgotPasswordForm = () => {
  const { useForgotPassword } = useAuthService();
  const { mutateAsync: forgotPassword, isPending } = useForgotPassword();
  const methods = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const handleSubmitForm = async (data: ForgotPasswordData) => {
    await forgotPassword(data, {
      onSuccess: (response) => {
        if (response?.data) {
          toast.success(`Sent Successfully`, {
            description: "Please check your email for the reset link.",
          });
          // the callback from the mail will serve as a redirect with the token attached to the url
        }
      },
    });
  };

  const renderEmailField = () => (
    <section className="space-y-4">
      <FormField
        type="email"
        placeholder="Enter email address"
        className="h-14 w-full"
        name="email"
        disabled={isPending}
      />
    </section>
  );

  const renderSubmitButton = () => (
    <section className="flex flex-col items-center justify-center gap-[20px] pt-[20px]">
      <SkiButton
        size="lg"
        isDisabled={isPending || !isValid}
        isLoading={isPending}
        className="h-[56px] w-full rounded-full"
        variant="primary"
        type="submit"
      >
        Send Reset Link
      </SkiButton>
    </section>
  );

  const renderResendPrompt = () => (
    <p className="mt-6 text-center text-gray-500">
      Link not received?{" "}
      <SkiButton variant="link" size="sm" className="font-meium text-primary text-sm">
        Resend Link
      </SkiButton>
    </p>
  );

  const renderForgotPasswordForm = () => (
    <section className="mx-auto lg:min-w-[550px]">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          {renderEmailField()}
          {renderSubmitButton()}
          {renderResendPrompt()}
        </form>
      </FormProvider>
    </section>
  );

  return renderForgotPasswordForm();
};
