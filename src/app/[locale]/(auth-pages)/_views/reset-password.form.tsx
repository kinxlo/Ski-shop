"use client";

import SkiButton from "@/components/shared/button";
import { FormField } from "@/components/shared/FormFields";
import { useSearchParameters } from "@/hooks/use-search-parameters";
import { ResetPasswordData, resetPasswordSchema } from "@/schemas";
import { useAuthService } from "@/services/auth/use-auth-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

export const ResetPasswordForm = () => {
  const token = useSearchParameters("token");
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
    const tokenizedData: {
      token?: string;
      password: string;
      confirmPassword: string;
    } = {
      ...data,
      ...(token ? { token } : {}),
    };
    try {
      const response = await resetPassword(tokenizedData);
      toast.success(`Password Reset Successful`, {
        description: response?.data,
      });
      router.push(`/login`);
    } catch (error) {
      toast.error("Password Reset Failed", {
        description: error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  };

  return (
    <section className="mx-auto lg:min-w-[550px]">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleSubmitForm)} className="">
          <section className={`space-y-4`}>
            <FormField
              type={`password`}
              placeholder={`Enter new password`}
              className={`h-14 w-full`}
              name={"password"}
            />
            <FormField
              type={`password`}
              placeholder={` confirm password`}
              className={`h-14 w-full`}
              name={"confirmPassword"}
            />
          </section>

          {/* CTA */}
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
        </form>
      </FormProvider>
    </section>
  );
};
