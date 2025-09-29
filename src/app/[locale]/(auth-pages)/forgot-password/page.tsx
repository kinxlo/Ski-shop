"use client";

import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { ForgotPasswordForm } from "../_views/forgot-password-form";

const Page = () => {
  const router = useRouter();
  const tAuth = useTranslations("auth");
  return (
    <section>
      <div onClick={() => router.back()} className={`text-primary mb-4 flex cursor-pointer gap-2 font-medium`}>
        <ArrowLeft />
        <p>{tAuth("back") || tAuth("login")}</p>
      </div>
      <div className="mb-[22px] space-y-[5px]">
        <h3 className="text-[20px] lg:text-[28px]">{tAuth("forgotPassword")}</h3>
        <p className="text-mid-grey-III text-[14px] lg:text-[18px]">{tAuth("passwordResetSent")}</p>
      </div>
      <ForgotPasswordForm />
    </section>
  );
};
export default Page;
