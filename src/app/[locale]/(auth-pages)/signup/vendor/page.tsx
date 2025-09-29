"use client";

import { useTranslations } from "next-intl";

import { BaseSignupForm } from "../../_views/signup-form";

const VendorSignupPage = () => {
  const tAuth = useTranslations("auth");
  return (
    <section className="hide-scrollbar mx-auto flex h-full flex-col items-center justify-center overflow-y-auto lg:max-w-[550px]">
      <div className="my-[22px] space-y-[5px] text-center">
        <h3 className="!text-primary !text-2xl sm:!text-2xl lg:!text-3xl">{tAuth("signup")}</h3>
        <p className="text-[14px] lg:text-[18px]">{tAuth("welcomeMessage")}</p>
      </div>
      <BaseSignupForm />
    </section>
  );
};
export default VendorSignupPage;
