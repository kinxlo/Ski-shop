"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const VendorOnboardingPage = () => {
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    // Redirect to the first step of onboarding
    router.replace(`/${locale}/onboarding/vendor/verify-email`);
  }, [router, locale]);

  return null; // This page will redirect immediately
};

export default VendorOnboardingPage;
