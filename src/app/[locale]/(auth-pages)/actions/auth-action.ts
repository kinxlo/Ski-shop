/* eslint-disable no-console */
"use server";

import { signIn } from "@/lib/next-auth/auth";
import { LoginFormData } from "@/schemas";
import { AuthErrorCode, AuthResponse } from "@/types/auth";
import { CredentialsSignin } from "next-auth";

export const login = async (data: LoginFormData): Promise<AuthResponse> => {
  try {
    const result = await signIn("credentials", {
      redirect: false,
      ...data,
    });

    if (result?.error) {
      return {
        success: false,
        error: result.error === "CredentialsSignin" ? "Invalid email or password. Please try again." : result.error,
        code: AuthErrorCode.INVALID_CREDENTIALS,
      };
    }

    if (result?.ok) {
      return {
        success: true,
        message: "Login successful",
      };
    }

    return {
      success: false,
      error: "Login failed. Please try again.",
      code: AuthErrorCode.LOGIN_FAILED,
    };
  } catch (error) {
    console.error("Login error:", error);

    if (error instanceof CredentialsSignin) {
      return {
        success: false,
        error: error.message || "Invalid email or password. Please try again.",
        code: AuthErrorCode.CREDENTIALS_ERROR,
      };
    }

    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
      code: AuthErrorCode.UNEXPECTED_ERROR,
    };
  }
};

export async function handleGoogleCallback(code: string): Promise<AuthResponse> {
  try {
    if (!code) {
      return {
        success: false,
        error: "No authentication code received from Google",
        code: AuthErrorCode.MISSING_CODE,
      };
    }

    const result = await signIn("google", {
      code,
      redirect: false,
    });

    if (result?.error) {
      // Map specific NextAuth errors to user-friendly messages
      const errorMessage = mapGoogleAuthError(result.error);
      return {
        success: false,
        error: errorMessage,
        code: AuthErrorCode.GOOGLE_AUTH_FAILED,
      };
    }

    if (result?.ok) {
      return {
        success: true,
        message: "Google authentication successful",
      };
    }

    return {
      success: false,
      error: "Google authentication failed. Please try again.",
      code: "GOOGLE_AUTH_FAILED",
    };
  } catch (error) {
    console.error("Google callback error:", error);

    if (error instanceof CredentialsSignin) {
      return {
        success: false,
        error: mapGoogleAuthError(error.message),
        code: AuthErrorCode.GOOGLE_CREDENTIALS_ERROR,
      };
    }

    // Handle server action specific errors
    if (error instanceof Error) {
      if (error.message.includes("unexpected response") || error.message.includes("ECONNREFUSED")) {
        return {
          success: false,
          error: "Backend service is currently unavailable. Please try again later.",
          code: AuthErrorCode.SERVICE_UNAVAILABLE,
        };
      }

      if (error.message.includes("timeout")) {
        return {
          success: false,
          error: "Authentication request timed out. Please try again.",
          code: AuthErrorCode.TIMEOUT_ERROR,
        };
      }

      return {
        success: false,
        error: "Authentication failed. Please try again.",
        code: AuthErrorCode.GOOGLE_ERROR,
      };
    }

    return {
      success: false,
      error: "An unexpected error occurred during Google authentication.",
      code: AuthErrorCode.UNEXPECTED_ERROR,
    };
  }
}

// Helper function to map Google auth errors to user-friendly messages
function mapGoogleAuthError(error: string): string {
  const errorMappings: Record<string, string> = {
    "Missing Google authentication data": "Google authentication data is missing. Please try signing in again.",
    "Backend configuration error": "Authentication service is misconfigured. Please contact support.",
    "Backend service not found. Please check your configuration.":
      "Authentication service is currently unavailable. Please try again later.",
    "Backend service error. Please try again later.":
      "Authentication service is experiencing issues. Please try again later.",
    "Google authentication failed": "Google authentication failed. Please try again.",
    CredentialsSignin: "Google authentication failed. Please try again.",
  };

  return errorMappings[error] || error || "Google authentication failed. Please try again.";
}
