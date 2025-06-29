"use server";

import { signIn } from "@/lib/next-auth";
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
