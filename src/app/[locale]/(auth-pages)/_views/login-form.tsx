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
    <section className="w-full">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-6">
          <section className="space-y-4 sm:space-y-5">
            <FormField
              placeholder="Enter email address"
              className="h-12 w-full sm:h-14"
              label="Email Address"
              name="email"
            />
            <div className="space-y-2">
              <FormField
                type="password"
                placeholder="Enter password"
                className="h-12 w-full sm:h-14"
                label="Password"
                name="password"
              />
            </div>
          </section>

          <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
              <p className="text-destructive text-sm hover:underline">Forgot Password?</p>
            </LocaleLink>
          </section>

          {/* CTA */}
          <section className="flex flex-col items-center justify-center gap-5 pt-2">
            <SkiButton
              isDisabled={isSubmitting || !isValid}
              isLoading={isSubmitting}
              size="lg"
              className="h-12 w-full rounded-full sm:h-14"
              variant="primary"
              type="submit"
            >
              Login
            </SkiButton>
            <span className="text-muted-foreground text-xs sm:text-sm">
              -------------------- OR --------------------
            </span>
            <SkiButton
              size="lg"
              className="border-primary text-primary h-12 w-full rounded-full sm:h-14"
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

          <p className="text-muted-foreground mt-6 text-center text-sm sm:text-base">
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
