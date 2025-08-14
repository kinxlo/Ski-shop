"use client";

import { ResetPasswordForm } from "../_views/reset-password.form";

const Page = () => {
  return (
    <section>
      <div className="mb-[22px] space-y-[5px]">
        <h3 className="text-[20px] lg:text-[28px]">Reset password</h3>
        <p className="text-mid-grey-III text-[14px] lg:text-[18px]">
          Input your email address for the password reset link.
        </p>
      </div>
      <ResetPasswordForm />
    </section>
  );
};
export default Page;
