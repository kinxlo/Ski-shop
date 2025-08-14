"use client";

import { Wrapper } from "@/components/core/layout/wrapper";

import { VendorBusinessForm } from "./_components/vendor-business-form";
import { VendorProfileForm } from "./_components/vendor-profile-form";
import { VendorStoreForm } from "./_components/vendor-store-form";

export default function ProfilePage() {
  return (
    <Wrapper className="max-w-4xl space-y-10 px-0">
      <VendorStoreForm />
      <VendorProfileForm />
      <VendorBusinessForm />
    </Wrapper>
  );
}
