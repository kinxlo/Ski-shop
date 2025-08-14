"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { ForgotPasswordForm } from "../_views/forgot-password-form";

const Page = () => {
  const router = useRouter();
  return (
    <section>
      <div onClick={() => router.back()} className={`text-primary mb-4 flex cursor-pointer gap-2 font-medium`}>
        <ArrowLeft />
        <p>Back to Login</p>
      </div>
      <div className="mb-[22px] space-y-[5px]">
        <h3 className="text-[20px] lg:text-[28px]">Forgot Password</h3>
        <p className="text-mid-grey-III text-[14px] lg:text-[18px]">
          Input your email address for the password reset link.
        </p>
      </div>
      <ForgotPasswordForm />
    </section>
  );
};
export default Page;
