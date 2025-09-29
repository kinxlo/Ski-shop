import * as z from "zod";

// Create functions that return schemas with translated messages
export const createRegisterSchema = (t: (key: string) => string) =>
  z
    .object({
      firstName: z.string().min(2, t("auth.firstNameMin")),
      lastName: z.string().min(2, t("auth.lastNameMin")),
      role: z.string().min(2, "Role must be at least 2 characters"),
      email: z.string().email(t("auth.invalidEmail")),
      password: z.string().min(8, t("auth.passwordMin")),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("auth.passwordsDoNotMatch"),
      path: ["confirmPassword"],
    });

export const createLoginSchema = (t: (key: string) => string) =>
  z.object({
    email: z
      .string()
      .min(1, t("auth.emailRequired"))
      .email(t("auth.invalidEmail"))
      .refine((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), {
        message: t("auth.invalidEmailFormat"),
      }),
    password: z.string().min(1, t("auth.passwordRequired")),
  });

export const createForgotPasswordSchema = (t: (key: string) => string) =>
  z.object({
    email: z.string().email({
      message: t("auth.invalidEmail"),
    }),
  });

export const createResetPasswordSchema = (t: (key: string) => string) =>
  z
    .object({
      token: z.string().min(1, "Token is required").optional(),
      password: z.string().min(1, t("auth.passwordRequired")).min(8, t("auth.passwordMin")),
      confirmPassword: z.string().min(1, t("auth.confirmPasswordRequired")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("auth.passwordsDoNotMatch"),
      path: ["confirmPassword"],
    });

// Export types
export type RegisterFormData = z.infer<ReturnType<typeof createRegisterSchema>>;
export type LoginFormData = z.infer<ReturnType<typeof createLoginSchema>>;
export type ForgotPasswordData = z.infer<ReturnType<typeof createForgotPasswordSchema>>;
export type ResetPasswordData = z.infer<ReturnType<typeof createResetPasswordSchema>>;
