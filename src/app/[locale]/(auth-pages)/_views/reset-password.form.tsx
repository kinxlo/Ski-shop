"use client";

import SkiButton from "@/components/shared/button";
import { FormField } from "@/components/shared/inputs/FormFields";
import { useSearchParameters } from "@/hooks/use-search-parameters";
import { ResetPasswordData, resetPasswordSchema } from "@/schemas";
import { useAuthService } from "@/services/auth/use-auth-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

export const ResetPasswordForm = () => {
  const token = useSearchParameters("token");
  const locale = useLocale();
  const router = useRouter();
  const { useResetPassword } = useAuthService();
  const { mutateAsync: resetPassword, isPending } = useResetPassword();
  const methods = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const handleSubmitForm = async (data: ResetPasswordData) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tokenizedData: any = {
      ...data,
      ...(token ? { token } : {}),
    };
    await resetPassword(tokenizedData, {
      onSuccess: (response) => {
        if (response?.data) {
          toast.success(`Successful`, {
            description: response?.data,
          });
          router.push(`/${locale}/login`);
        }
      },
    });
  };

  const renderPasswordFields = () => (
    <section className="space-y-4">
      <FormField type="password" placeholder="Enter new password" className="h-14 w-full" name="password" />
      <FormField type="password" placeholder="Confirm password" className="h-14 w-full" name="confirmPassword" />
    </section>
  );

  const renderSubmitButton = () => (
    <section className="flex flex-col items-center justify-center gap-[20px] pt-[20px]">
      <SkiButton
        isDisabled={isPending || !isValid}
        isLoading={isPending}
        size="lg"
        className="h-[56px] w-full rounded-full"
        variant="primary"
        type="submit"
      >
        Reset Password
      </SkiButton>
    </section>
  );

  const renderResetPasswordForm = () => (
    <section className="mx-auto lg:min-w-[550px]">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          {renderPasswordFields()}
          {renderSubmitButton()}
        </form>
      </FormProvider>
    </section>
  );

  return renderResetPasswordForm();
};
