"use client";

import SkiButton from "@/components/shared/button";
import { FormField } from "@/components/shared/inputs/FormFields";
import { LocaleLink } from "@/components/shared/locale-link";
import { Checkbox } from "@/components/ui/checkbox";
import { LoginFormData, loginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

import { login } from "../actions/auth-action";

export const LoginForm = () => {
  const [isGooglePending, startGoogleTransition] = useTransition();
  const router = useRouter();
  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
    setError,
  } = methods;

  const handleSubmitForm = async (data: LoginFormData) => {
    const result = await login(data);

    if (result?.error) {
      toast.error("Login Failed", {
        description: result.error,
      });

      // Optionally set field errors
      if (result.error.toLowerCase().includes("email")) {
        setError("email", { message: result.error });
      } else if (result.error.toLowerCase().includes("password")) {
        setError("password", { message: result.error });
      }
    } else {
      toast.success("Login Successful");
      router.push("/dashboard/home");
    }
  };

  const handleGoogleSignIn = () => {
    startGoogleTransition(async () => {
      router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/oauth/google/redirect`);
    });
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
            <LocaleLink href="/forgot-password">
              <p className="text-mid-danger text-sm">Forgot Password ?</p>
            </LocaleLink>
          </section>

          {/* CTA */}
          <section className="flex flex-col items-center justify-center gap-[20px] pt-[20px]">
            <SkiButton
              isDisabled={isSubmitting || !isValid}
              isLoading={isSubmitting}
              size="lg"
              className="h-[56px] w-full rounded-full"
              variant="primary"
              type="submit"
            >
              Login
            </SkiButton>
            <span className="text-mid-grey-II">-------------------- OR --------------------</span>
            <SkiButton
              size="lg"
              className="border-primary text-primary h-[56px] w-full rounded-full"
              variant="outline"
              isRightIconVisible
              icon={<FcGoogle />}
              isDisabled={isGooglePending}
              isLoading={isGooglePending}
              onClick={handleGoogleSignIn}
            >
              Login with Google
            </SkiButton>
          </section>
          <p className="mt-6 text-center text-gray-500">
            New user?{" "}
            <LocaleLink href="/signup" className="text-primary font-medium hover:underline">
              Sign up
            </LocaleLink>
          </p>
        </form>
      </FormProvider>
    </section>
  );
};
