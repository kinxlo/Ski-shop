"use client";

import SkiButton from "@/components/shared/button";
import { FormField } from "@/components/shared/inputs/FormFields";
import { LocaleLink } from "@/components/shared/locale-link";
import { RegisterFormData, registerSchema } from "@/schemas";
import { useAuthService } from "@/services/auth/use-auth-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
// import { useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
// import { FaGoogle } from "react-icons/fa";
import { toast } from "sonner";

export const BaseSignupForm = () => {
  // const [isGooglePending, startGoogleTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const { useSignUp } = useAuthService();
  const { mutateAsync: signUp, isPending: isSigningUp } = useSignUp();

  // Determine role based on pathname
  const role = pathname.includes("/vendor") ? "vendor" : "customer";

  const methods = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      role: role,
    },
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const handleSubmitForm = async (data: RegisterFormData) => {
    await signUp(data, {
      onSuccess: (response) => {
        if (response?.success && !pathname.includes("/vendor")) {
          toast.success("Registration Successful", {
            description: "Registration Successful",
          });
          router.push(`/${locale}/onboarding/verify-email?email=${data?.email}&token=${response?.data?.token}`);
        } else if (response?.success && pathname.includes("/vendor")) {
          toast.success("Registration Successful", {
            description: "Please verify your email to complete registration",
          });
          router.push(`/${locale}/onboarding/vendor/verify-email?email=${data?.email}&token=${response?.data?.token}`);
        }
      },
    });
  };

  // const handleGoogleSignIn = () => {
  //   startGoogleTransition(async () => {
  //     router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/oauth/google/redirect`);
  //   });
  // };

  const renderFormFields = () => (
    <section className="space-y-4">
      <FormField placeholder="Enter email address" className="h-14 w-full" name="email" />
      <div className="grid grid-cols-1 gap-4 space-y-2 lg:grid-cols-2">
        <FormField placeholder="Enter first name" className="h-14 w-full" name="firstName" />
        <FormField placeholder="Enter last name" className="h-14 w-full" name="lastName" />
      </div>
      <FormField type="password" placeholder="Enter password" className="h-14 w-full" name="password" />
      <FormField type="password" placeholder="Enter confirm password" className="h-14 w-full" name="confirmPassword" />
    </section>
  );

  const renderTermsSection = () => (
    <section className="mt-[23px] flex items-center justify-between">
      <div className="text-muted-foreground mb-4">
        <p>
          By signing up, you&apos;re agreeing to Skicom&apos;s
          <LocaleLink href={`/${locale}/privacy`} className="text-primary hover:underline">
            {" "}
            Privacy Policy
          </LocaleLink>
          , and{" "}
          <LocaleLink href={`/${locale}/terms`} className="text-primary hover:underline">
            Terms & Conditions.
          </LocaleLink>
        </p>
      </div>
    </section>
  );

  const renderActionButtons = () => (
    <section className="flex flex-col items-center justify-center gap-[20px] pt-[20px]">
      <SkiButton
        isDisabled={!isValid}
        isLoading={isSigningUp}
        size="lg"
        className="h-[56px] w-full rounded-full"
        variant="primary"
        type="submit"
      >
        {isSigningUp ? "Signing up.." : " Sign up"}
      </SkiButton>
      {/* <span className="text-mid-grey-II">-------------------- OR --------------------</span>
      <SkiButton
        size="lg"
        className="border-primary text-primary h-[56px] w-full rounded-full"
        variant="outline"
        isRightIconVisible
        icon={<FaGoogle />}
        isDisabled={isGooglePending}
        isLoading={isGooglePending}
        onClick={handleGoogleSignIn}
      >
        Signup with Google
      </SkiButton> */}
    </section>
  );

  const renderLoginPrompt = () => (
    <p className="mt-6 text-center text-gray-500">
      Already a user?{" "}
      <LocaleLink href={`/${locale}/login`} className="text-primary font-medium hover:underline">
        Log In
      </LocaleLink>
    </p>
  );

  const renderSignupForm = () => (
    <section>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          {renderFormFields()}
          {renderTermsSection()}
          {renderActionButtons()}
          {renderLoginPrompt()}
        </form>
      </FormProvider>
    </section>
  );

  return renderSignupForm();
};
