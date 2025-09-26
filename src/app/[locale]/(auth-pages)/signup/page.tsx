"use client";

import { BaseSignupForm } from "../_views/signup-form";

const SignupPage = () => {
  return (
    <section className="hide-scrollbar mx-auto flex w-full flex-col items-center justify-center overflow-y-auto">
      <div className="mb-6 space-y-2 text-center sm:mb-8">
        <h3 className="!text-primary !text-2xl sm:!text-2xl lg:!text-3xl">Join the Ski-Shop Family</h3>
        <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">
          Create an account to unlock your shopping experience.
        </p>
      </div>
      <div className="w-full">
        <BaseSignupForm />
      </div>
    </section>
  );
};
export default SignupPage;
