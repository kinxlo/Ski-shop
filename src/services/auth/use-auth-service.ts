/* eslint-disable @typescript-eslint/no-explicit-any */

import { createServiceHooks } from "@/lib/react-query/use-service-query";
import { dependencies } from "@/lib/tools/dependencies";
import { ForgotPasswordData, RegisterFormData, ResetPasswordData } from "@/schemas";

import { AuthService } from "./auth.service";

export const useAuthService = () => {
  const { useServiceQuery, useServiceMutation } = createServiceHooks<AuthService>(dependencies.AUTH_SERVICE);

  // Queries
  // const useGoogleSignIn = (options?: any) =>
  //   useServiceQuery(["auth", "google-signin"], (service) => service.googleSignIn(), options);

  const useHandleGoogleCallback = (credentials: { code: string }, options?: any) =>
    useServiceQuery(["auth", "google-callback"], (service) => service.handleGoogleCallback(credentials), options);

  // Mutations
  const useSignUp = () => useServiceMutation((service, data: RegisterFormData) => service.signUp(data));

  const useForgotPassword = () =>
    useServiceMutation((service, data: ForgotPasswordData) => service.forgotPassword(data));

  const useResetPassword = () => useServiceMutation((service, data: ResetPasswordData) => service.resetPassword(data));

  const useResendOTP = () => useServiceMutation((service, data: { email: string }) => service.resendOTP(data));
  const useVerifyOTP = () => useServiceMutation((service, data: { code: number }) => service.verifyOTP(data));

  return {
    // Queries
    // useGoogleSignIn,
    useHandleGoogleCallback,

    // Mutations
    useResendOTP,
    useVerifyOTP,
    useSignUp,
    useForgotPassword,
    useResetPassword,
  };
};
