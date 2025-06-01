"use client";

import SkiButton from "@/components/shared/button";
import { FormField } from "@/components/shared/FormFields";
import { Checkbox } from "@/components/ui/checkbox";
import { LoginFormData, loginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";

export const LoginForm = () => {
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
            <FormField
              placeholder={`Enter email address`}
              className={`h-14 w-full`}
              label={`Email Address`}
              name={"email"}
            />
            <div className="space-y-2">
              <FormField
                type={`password`}
                placeholder={`Enter password`}
                className={`h-14 w-full`}
                label={`Password`}
                name={"password"}
              />
            </div>
          </section>
          <section className="mt-[23px] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <label
                htmlFor="remember"
                className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember Me
              </label>
            </div>
            <Link href="/forgot-password">
              <p className="text-mid-danger text-sm">Forgot Password ?</p>
            </Link>
          </section>

          {/* CTA */}
          <section className="flex flex-col items-center justify-center gap-[20px] pt-[20px]">
            <SkiButton size="lg" className="h-[56px] w-full rounded-full" variant="primary" type="submit">
              Login
            </SkiButton>
            <span className="text-mid-grey-II">-------------------- OR --------------------</span>
            <SkiButton
              size="lg"
              className="border-primary text-primary h-[56px] w-full rounded-full"
              variant="outline"
              isRightIconVisible
              icon={<FaGoogle />}
            >
              Login with Google
            </SkiButton>
          </section>
          <p className="mt-6 text-center text-gray-500">
            New user?{" "}
            <Link href="/signup" className="text-primary font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </FormProvider>
    </section>
  );
};
