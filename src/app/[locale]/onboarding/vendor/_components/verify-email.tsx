"use client";

import SkiButton from "@/components/shared/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useAuthService } from "@/services/auth/use-auth-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdEmail, MdRefresh, MdVerified } from "react-icons/md";
import { PiShieldCheck } from "react-icons/pi";
import { toast } from "sonner";
import { z } from "zod";

// Zod schema for form validation
const FormSchema = z.object({
  code: z.string().min(6, {
    message: "Verification code must be 6 digits.",
  }),
});

interface VerifyEmailComponentProperties {
  email: string | null;
  onVerificationSuccess?: () => void;
  onVerificationFailure?: () => void;
}

export const VerifyEmailComponent = ({
  email,
  onVerificationSuccess,
  onVerificationFailure,
}: VerifyEmailComponentProperties) => {
  const router = useRouter();
  const { useResendOTP, useVerifyOTP } = useAuthService();
  const { mutateAsync: resendOTP, isPending: isResending } = useResendOTP();
  const { mutateAsync: verifyOTP, isPending: isSubmitting } = useVerifyOTP();

  // Initialize the form
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      code: "",
    },
  });

  const handleResendEmail = useCallback(async () => {
    try {
      if (email) {
        await resendOTP({ email });
        toast.success("Verification code sent", {
          description: "A new verification code has been sent to your email address.",
        });
      }
    } catch {
      toast.error("Failed to send verification email", {
        description: "Please try again later.",
      });
    }
  }, [email, resendOTP]);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const response = await verifyOTP({ code: Number.parseInt(data.code) });
      if (response?.success) {
        toast.success("Email verified successfully");
        onVerificationSuccess?.();
        router.refresh();
      }
    } catch {
      toast.error("Verification failed", {
        description: "The code is invalid or has expired. Please try again.",
      });
      form.reset();
      onVerificationFailure?.();
    }
  };

  useEffect(() => {
    if (email) {
      //   handleResendEmail();
    }
  }, [email, handleResendEmail]);

  return (
    <div className="flex flex-col items-center space-y-6 px-4 py-6">
      {/* Header Section */}
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="bg-primary/10 flex h-16 w-16 items-center justify-center rounded-full">
          <PiShieldCheck className="text-primary h-8 w-8" />
        </div>
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
                      <InputOTPGroup className="gap-2">
                        <InputOTPSlot
                          index={0}
                          className="focus:border-primary focus:ring-primary/20 h-12 w-12 rounded-lg border-2 text-lg font-semibold transition-all duration-200 focus:ring-2"
                        />
                        <InputOTPSlot
                          index={1}
                          className="focus:border-primary focus:ring-primary/20 h-12 w-12 rounded-lg border-2 text-lg font-semibold transition-all duration-200 focus:ring-2"
                        />
                        <InputOTPSlot
                          index={2}
                          className="focus:border-primary focus:ring-primary/20 h-12 w-12 rounded-lg border-2 text-lg font-semibold transition-all duration-200 focus:ring-2"
                        />
                        <InputOTPSlot
                          index={3}
                          className="focus:border-primary focus:ring-primary/20 h-12 w-12 rounded-lg border-2 text-lg font-semibold transition-all duration-200 focus:ring-2"
                        />
                        <InputOTPSlot
                          index={4}
                          className="focus:border-primary focus:ring-primary/20 h-12 w-12 rounded-lg border-2 text-lg font-semibold transition-all duration-200 focus:ring-2"
                        />
                        <InputOTPSlot
                          index={5}
                          className="focus:border-primary focus:ring-primary/20 h-12 w-12 rounded-lg border-2 text-lg font-semibold transition-all duration-200 focus:ring-2"
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
              className="h-12 w-full rounded-lg font-medium transition-all duration-200 hover:shadow-md"
              variant={`primary`}
              isDisabled={!form.formState.isValid || form.formState.isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Verifying...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <MdVerified className="h-5 w-5" />
                  <span>Verify Email</span>
                </div>
              )}
            </SkiButton>

            <SkiButton
              type="button"
              variant="outline"
              onClick={(event) => {
                event.preventDefault();
                handleResendEmail();
              }}
              isDisabled={isResending}
              className="hover:bg-muted/50 h-12 w-full rounded-lg font-medium transition-all duration-200"
            >
              {isResending ? (
                <div className="flex items-center space-x-2">
                  <div className="border-primary h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
                  <span>Sending...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <MdRefresh className="h-5 w-5" />
                  <span>Resend Code</span>
                </div>
              )}
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
