"use client";

import SkiButton from "@/components/shared/button";
import { FormField } from "@/components/shared/FormFields";
import { LoginFormData, loginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

export const ForgotPasswordForm = () => {
  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    // formState: {},
  } = methods;

  // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
  const handleSubmitForm = async (data: LoginFormData) => {
    // await login(data);
  };

  return (
    <section className="mx-auto lg:min-w-[550px]">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleSubmitForm)} className="">
          <section className={`space-y-4`}>
            <FormField type={`email`} placeholder={`Enter email address`} className={`h-14 w-full`} name={"email"} />
          </section>

          {/* CTA */}
          <section className="flex flex-col items-center justify-center gap-[20px] pt-[20px]">
            <SkiButton size="lg" className="h-[56px] w-full rounded-full" variant="primary" type="submit">
              Send Reset Link
            </SkiButton>
          </section>

          <p className="mt-6 text-center text-gray-500">
            Link not received?{" "}
            <SkiButton variant={`link`} size={`sm`} className={`font-meium text-primary text-sm`}>
              Resend Link
            </SkiButton>
          </p>
        </form>
      </FormProvider>
    </section>
  );
};
