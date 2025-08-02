"use client";

import SkiButton from "@/components/shared/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useResendEmail } from "@/hooks/use-resend-email";
import { useDecodedSearchParameters } from "@/hooks/use-search-parameters";
import { useOnboardingUserService } from "@/services/externals/onboarding/use-onboarding-user-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { MdEmail, MdRefresh, MdVerified } from "react-icons/md";
import { toast } from "sonner";
import { z } from "zod";

// Zod schema for form validation
const FormSchema = z.object({
  code: z.string().min(6, {
    message: "Verification code must be 6 digits.",
  }),
});

interface VerifyEmailComponentProperties {
  onVerificationSuccess?: () => void;
  onVerificationFailure?: () => void;
}

export const VerifyEmailComponent = ({
  onVerificationSuccess,
  onVerificationFailure,
}: VerifyEmailComponentProperties) => {
  const locale = useLocale();
  const email = useDecodedSearchParameters("email");
  const router = useRouter();
  const pathname = usePathname();
  const { useVerifyOTP } = useOnboardingUserService();
  const { mutateAsync: verifyOTP, isPending: isSubmitting } = useVerifyOTP();
  const { handleResendEmail, isResending } = useResendEmail();

  // Initialize the form
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    verifyOTP(
      { code: Number.parseInt(data.code) },
      {
        onSuccess: (response) => {
          if (response?.success && response?.data?.token) {
            toast.success("Email verified successfully");
            if (pathname.includes("/vendor")) {
              onVerificationSuccess?.();
              router.push(`/${locale}/onboarding/vendor?step=business-info&token=${response?.data?.token}`);
            } else {
              router.push("/login");
            }
          }
        },
        onError: () => {
          toast.error("Verification failed", {
            description: "The code is invalid or has expired. Please try again.",
          });
          form.reset();
          onVerificationFailure?.();
        },
      },
    );
  };

  return (
    <div className="flex flex-col items-center space-y-6 px-4 py-6">
      {/* Header Section */}
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-foreground !text-2xl font-semibold">Verify Your Email</h2>
          <p className="text-muted-foreground max-w-sm text-sm">
            We&apos;ve sent a verification code to your email address to complete your registration.
          </p>
        </div>
      </div>

      {/* Email Display */}
      {email && (
        <div className="bg-muted/50 flex items-center space-x-2 rounded-lg px-4 py-3">
          <MdEmail className="text-muted-foreground h-5 w-5" />
          <span className="text-foreground text-sm font-medium">{email}</span>
        </div>
      )}

      {/* Form Section */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <p className="text-foreground text-center text-sm font-medium">Enter Verification Code</p>
                <FormControl>
                  <div className="flex justify-center">
                    <InputOTP maxLength={6} {...field} className="gap-2">
                      <InputOTPGroup className="gap-1 sm:gap-2">
                        <InputOTPSlot
                          index={0}
                          className="focus:border-primary focus:ring-primary/20 h-8 w-8 rounded-lg border-2 text-base font-semibold shadow-none transition-all duration-200 focus:ring-2 sm:h-12 sm:w-12 sm:text-lg"
                        />
                        <InputOTPSlot
                          index={1}
                          className="focus:border-primary focus:ring-primary/20 h-8 w-8 rounded-lg border-2 text-base font-semibold shadow-none transition-all duration-200 focus:ring-2 sm:h-12 sm:w-12 sm:text-lg"
                        />
                        <InputOTPSlot
                          index={2}
                          className="focus:border-primary focus:ring-primary/20 h-8 w-8 rounded-lg border-2 text-base font-semibold shadow-none transition-all duration-200 focus:ring-2 sm:h-12 sm:w-12 sm:text-lg"
                        />
                        <InputOTPSlot
                          index={3}
                          className="focus:border-primary focus:ring-primary/20 h-8 w-8 rounded-lg border-2 text-base font-semibold shadow-none transition-all duration-200 focus:ring-2 sm:h-12 sm:w-12 sm:text-lg"
                        />
                        <InputOTPSlot
                          index={4}
                          className="focus:border-primary focus:ring-primary/20 h-8 w-8 rounded-lg border-2 text-base font-semibold shadow-none transition-all duration-200 focus:ring-2 sm:h-12 sm:w-12 sm:text-lg"
                        />
                        <InputOTPSlot
                          index={5}
                          className="focus:border-primary focus:ring-primary/20 h-8 w-8 rounded-lg border-2 text-base font-semibold shadow-none transition-all duration-200 focus:ring-2 sm:h-12 sm:w-12 sm:text-lg"
                        />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </FormControl>
                <FormDescription className="text-muted-foreground text-center text-xs">
                  Enter the 6-digit code sent to your email
                </FormDescription>
                <FormMessage className="text-center" />
              </FormItem>
            )}
          />

          {/* Action Buttons */}
          <div className="flex flex-col space-y-3">
            <SkiButton
              type="submit"
              className="w-full font-medium transition-all duration-200 hover:shadow-md"
              variant={`primary`}
              isDisabled={!form.formState.isValid || form.formState.isSubmitting}
              isLoading={isSubmitting}
              isLeftIconVisible
              icon={<MdVerified />}
            >
              {isSubmitting ? "Verifying..." : "Verify Email"}
            </SkiButton>

            <SkiButton
              type="button"
              variant="outline"
              onClick={(event) => {
                event.preventDefault();
                handleResendEmail();
              }}
              isDisabled={isResending}
              className="hover:bg-muted/50 w-full font-medium transition-all duration-200"
              isLeftIconVisible
              icon={<MdRefresh />}
              isLoading={isResending}
            >
              {isResending ? "Sending..." : "Resend Code"}
            </SkiButton>
          </div>
        </form>
      </Form>

      {/* Footer Note */}
      <div className="text-center">
        <p className="text-muted-foreground text-xs">
          Didn&apos;t receive the code? Check your spam folder or try resending.
        </p>
      </div>
    </div>
  );
};
