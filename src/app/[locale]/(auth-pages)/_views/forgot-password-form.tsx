"use client";

import SkiButton from "@/components/shared/button";
import { FormField } from "@/components/shared/inputs/FormFields";
import { createForgotPasswordSchema, ForgotPasswordData } from "@/schemas/auth-schemas";
import { useAuthService } from "@/services/auth/use-auth-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

// import { toast } from "sonner";

export const ForgotPasswordForm = () => {
  const tAuth = useTranslations("auth");
  const { useForgotPassword } = useAuthService();
  const { mutateAsync: forgotPassword, isPending } = useForgotPassword();

  // Create schema with translations
  const forgotPasswordSchema = createForgotPasswordSchema((key: string) => {
    const keys = key.split(".");
    if (keys[0] === "auth") {
      return tAuth(keys[1]);
    }
    return key;
  });

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
          toast.success(tAuth("passwordResetSent"), {
            description: tAuth("checkEmail"),
          });
          // the callback from the mail will serve as a redirect with the token attached to the url
        }
      },
    });
  };

  const renderEmailField = () => (
    <section className="space-y-4">
      <FormField type="email" placeholder={tAuth("email")} className="h-14 w-full" name="email" disabled={isPending} />
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
        {tAuth("sendResetLink")}
      </SkiButton>
    </section>
  );

  const renderResendPrompt = () => (
    <p className="mt-6 text-center text-gray-500">
      {tAuth("didntReceiveEmail")}{" "}
      <SkiButton variant="link" size="sm" className="font-meium text-primary text-sm">
        {tAuth("resendEmail")}
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
