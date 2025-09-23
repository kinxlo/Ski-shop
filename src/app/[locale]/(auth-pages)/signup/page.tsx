"use client";

import { BaseSignupForm } from "../_views/signup-form";

const SignupPage = () => {
  return (
    <section className="hide-scrollbar mx-auto flex h-full flex-col items-center justify-center overflow-y-auto lg:max-w-[550px]">
      <div className="my-[22px] space-y-[5px]">
        <h3 className="">Join the Ski-Shop Family</h3>
        <p className="text-mid-grey-III text-[14px] lg:text-[18px]">
          Create an account to unlock your shopping experience.
        </p>
      </div>
      <BaseSignupForm />
    </section>
  );
};
export default SignupPage;
