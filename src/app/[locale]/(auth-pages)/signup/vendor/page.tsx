"use client";

import { BaseSignupForm } from "../../_views/signup-form";

const VendorSignupPage = () => {
  return (
    <section className="hide-scrollbar mx-auto flex h-full flex-col items-center justify-center overflow-y-auto lg:max-w-[550px]">
      <div className="my-[22px] space-y-[5px]">
        <h3 className="!text-primary !text-2xl sm:!text-2xl lg:!text-3xl">Join the Ski-Shop Family</h3>
        <p className="text-mid-grey-II text-[14px] lg:text-[18px]">
          As a vendor, you can reach new customers and grow your business by joining our marketplace.
        </p>
      </div>
      <BaseSignupForm />
    </section>
  );
};
export default VendorSignupPage;
