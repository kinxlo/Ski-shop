"use server";

import { signIn } from "@/lib/next-auth/auth";
import { LoginFormData } from "@/schemas";
import { CredentialsSignin } from "next-auth";

export const login = async (data: LoginFormData) => {
  try {
    const result = await signIn("credentials", {
      redirect: false,
      ...data,
    });
    if (result?.ok) {
      return { success: true };
    }
  } catch (error) {
    if (error instanceof CredentialsSignin) {
      return { error: error.message || "Invalid email or password, please try again" };
    }
    return { error: "An unexpected error occurred. Please try again." };
  }
};

export async function handleGoogleCallback(code: string) {
  try {
    const result = await signIn("google", {
      code,
      redirect: false,
    });

    return result?.ok ? { success: true } : { error: result?.error || "Google authentication failed" };
  } catch (error) {
    if (error instanceof CredentialsSignin) {
      return { error: error.message || "Google authentication failed" };
    }

    // Handle server action specific errors
    if (error instanceof Error) {
      if (error.message.includes("unexpected response")) {
        return { error: "Backend service unavailable. Please try again later." };
      }
      return { error: error.message };
    }

    return { error: "An unexpected error occurred during Google authentication." };
  }
}
