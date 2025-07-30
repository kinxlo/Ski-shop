"use client";

import SkiButton from "@/components/shared/button";
import { ReusableDialog } from "@/components/shared/dialog/Dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useAuthService } from "@/services/auth/use-auth-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Zod schema for form validation
const FormSchema = z.object({
  code: z.string().min(6, {
    message: "Verification code must be 6 digits.",
  }),
});

interface VerifyEmailModalProperties {
  email: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const VerifyEmailModal = ({ email, open, onOpenChange }: VerifyEmailModalProperties) => {
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
        // Replace with your actual API call
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
      // Replace with your actual API call
      await verifyOTP({ code: Number.parseInt(data.code) });
      toast.success("Email verified successfully");
      onOpenChange(false);
      router.refresh(); // Refresh to update auth state
    } catch {
      toast.error("Verification failed", {
        description: "The code is invalid or has expired. Please try again.",
      });
      form.reset();
    }
  };

  useEffect(() => {
    if (open && email) {
      //   handleResendEmail();
    }
  }, [open, email, handleResendEmail]);

  return (
    <ReusableDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Verify Your Email"
      description={`A verification code has been sent to ${email}`}
      hideClose={true} // Prevent closing the modal manually
      trigger={undefined}
      headerClassName={`text-center`}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className="mx-auto flex flex-col items-center">
                <FormLabel>Verification Code</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      {Array.from({ length: 6 }).map((_, index) => (
                        <InputOTPSlot key={index} index={index} />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>Enter the 6-digit code from your email</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-3">
            <SkiButton
              type="submit"
              className="w-full"
              variant={`primary`}
              isDisabled={!form.formState.isValid || form.formState.isSubmitting}
            >
              {isSubmitting ? "Verifying..." : "Verify Email"}
            </SkiButton>
            <SkiButton
              type="button"
              variant="outline"
              onClick={handleResendEmail}
              isDisabled={isResending}
              className="w-full"
            >
              {isResending ? "Sending..." : "Resend Code"}
            </SkiButton>
          </div>
        </form>
      </Form>
    </ReusableDialog>
  );
};
