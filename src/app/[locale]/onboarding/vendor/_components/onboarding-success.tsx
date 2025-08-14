"use client";

import { BlurImage } from "@/components/core/miscellaneous/blur-image";
import SkiButton from "@/components/shared/button";
import { useLocale } from "next-intl";

export const OnboardingSuccess = () => {
  const locale = useLocale();
  return (
    <div className="flex flex-col items-center space-y-6 px-4 py-6 text-center">
      {/* Success Icon */}
      <div className="flex items-center justify-center rounded-full bg-green-100">
        <BlurImage src={"/images/success.svg"} alt="success" width={100} height={100} />
      </div>

      {/* Success Message */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-gray-900">You&apos;re All Set!</h2>
        <p className="max-w-sm text-sm text-gray-600">
          Your setup is complete. You can now start adding products, managing your listings, and reaching thousands of
          customers.
        </p>
      </div>

      {/* Action Button */}
      <div className="pt-4">
        <SkiButton href={`/${locale}/dashboard/home`} className="" variant="primary">
          Go to Dashboard
        </SkiButton>
      </div>
    </div>
  );
};
