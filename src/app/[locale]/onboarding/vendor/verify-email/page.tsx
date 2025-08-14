import { OnboardingLayout } from "../_components/onboarding-layout";
import { VerifyEmailComponent } from "../_components/verify-email";

const VerifyEmailPage = () => {
  return (
    <OnboardingLayout showProgress={false}>
      <VerifyEmailComponent />
    </OnboardingLayout>
  );
};

export default VerifyEmailPage;
