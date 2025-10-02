"use client";

import { PageSection } from "@/lib/animation";
import { useTranslations } from "next-intl";

import { LoginForm } from "../_views/login-form";

const LoginPage = () => {
  const tAuth = useTranslations("auth");
  return (
    <main className="w-full">
      <div className="mb-6 space-y-2 text-center sm:mt-8">
        <h3 className="!text-primary !text-2xl sm:!text-2xl lg:!text-3xl">{tAuth("welcome")}</h3>
        <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">{tAuth("welcomeMessage")}</p>
      </div>
      <PageSection index={1} className={`w-full`}>
        <LoginForm />
      </PageSection>
    </main>
  );
};
export default LoginPage;
