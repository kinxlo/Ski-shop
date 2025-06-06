"use client";

import { SignupForm } from "../_views/signup-form";

const LoginPage = () => {
  return (
    <section>
      <div className="mb-[22px] space-y-[5px]">
        <h3 className="text-[20px] lg:text-[28px]">Join the Ski-Shop Family</h3>
        <p className="text-mid-grey-III text-[14px] lg:text-[18px]">
          Create an account to unlock your shopping experience.
        </p>
      </div>
      <SignupForm />
    </section>
  );
};
export default LoginPage;
