"use client";

import { useTranslations } from "next-intl";

import { ResetPasswordForm } from "../_views/reset-password.form";

const Page = () => {
  const tAuth = useTranslations("auth");
  return (
    <section>
      <div className="mb-[22px] space-y-[5px]">
        <h3 className="text-[20px] lg:text-[28px]">{tAuth("resetPassword")}</h3>
        <p className="text-mid-grey-III text-[14px] lg:text-[18px]">{tAuth("passwordResetSent")}</p>
      </div>
      <ResetPasswordForm />
    </section>
  );
};
export default Page;
