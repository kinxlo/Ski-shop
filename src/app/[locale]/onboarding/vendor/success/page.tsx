"use client";

import { OnboardingLayout } from "../_components/onboarding-layout";
import { OnboardingSuccess } from "../_components/onboarding-success";

const SuccessPage = () => {
  return (
    <OnboardingLayout showProgress={false}>
      <OnboardingSuccess />
    </OnboardingLayout>
  );
};

export default SuccessPage;
