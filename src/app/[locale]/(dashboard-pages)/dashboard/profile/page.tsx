"use client";

import { VendorBusinessForm } from "./_components/vendor-business-form";
import { VendorProfileForm } from "./_components/vendor-profile-form";
import { VendorStoreForm } from "./_components/vendor-store-form";

export default function ProfilePage() {
  return (
    <section className="space-y-8">
      <VendorStoreForm />
      <VendorProfileForm />
      <VendorBusinessForm />
    </section>
  );
}
