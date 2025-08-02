"use client";

import { Logo } from "@/components/shared/logo";
import { useSearchParameters } from "@/hooks/use-search-parameters";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { BankPayoutForm } from "./_components/bank-payout-form";
import { BusinessInfoForm } from "./_components/business-info-form";
import { OnboardingSuccess } from "./_components/onboarding-success";
import { ProgressIndicator } from "./_components/progress-indicator";
import { StoreForm } from "./_components/store-form";
import { VerifyEmailComponent } from "./_components/verify-email";

export type OnboardingStep = "verify-email" | "business-info" | "store-setup" | "bank-payout" | "success";

const VendorOnboardingPage = () => {
  const router = useRouter();

  // Get current step from URL or default to verify-email
  const stepFromUrl = useSearchParameters("step");
  const [currentStep, setCurrentStep] = useState<OnboardingStep>((stepFromUrl as OnboardingStep) || "verify-email");

  const steps = [
    { id: "verify-email", title: "Email Verification", step: 1 },
    { id: "business-info", title: "Business Info", step: 2 },
    { id: "store-setup", title: "Store Setup", step: 3 },
    { id: "bank-payout", title: "Bank & Payout", step: 4 },
  ];

  // Update current step when URL changes
  useEffect(() => {
    if (stepFromUrl && stepFromUrl !== currentStep) {
      setCurrentStep(stepFromUrl as OnboardingStep);
    }
  }, [stepFromUrl, currentStep, router]);

  const getCurrentStepNumber = () => {
    return steps.findIndex((step) => step.id === currentStep) + 1;
  };

  const handleEmailVerified = () => {
    const nextStep = "business-info";
    setCurrentStep(nextStep);
  };

  const handleBusinessInfoComplete = () => {
    const nextStep = "store-setup";
    setCurrentStep(nextStep);
  };

  const handleStoreSetupComplete = () => {
    const nextStep = "bank-payout";
    setCurrentStep(nextStep);
  };

  const handleBankPayoutComplete = () => {
    const nextStep = "success";
    setCurrentStep(nextStep);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "verify-email": {
        return <VerifyEmailComponent onVerificationSuccess={handleEmailVerified} onVerificationFailure={() => {}} />;
      }

      case "business-info": {
        return <BusinessInfoForm onComplete={handleBusinessInfoComplete} />;
      }

      case "store-setup": {
        return <StoreForm onComplete={handleStoreSetupComplete} />;
      }

      case "bank-payout": {
        return <BankPayoutForm onComplete={handleBankPayoutComplete} />;
      }

      case "success": {
        return <OnboardingSuccess onComplete={() => router.push("/login")} />;
      }

      default: {
        return null;
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <div className="bg-primary/10 mx-auto mt-20 flex h-16 w-16 items-center justify-center rounded-full">
        <Logo width={40} height={40} className="text-primary" />
      </div>
      {currentStep !== "verify-email" && currentStep !== "success" && (
        <div className="mx-auto px-4 py-4">
          <ProgressIndicator currentStep={getCurrentStepNumber()} totalSteps={4} steps={steps} />
        </div>
      )}
      {/* Content */}
      <div className="flex flex-1 justify-center p-4">
        <div className="w-full max-w-xl">{renderCurrentStep()}</div>
      </div>
    </div>
  );
};

export default VendorOnboardingPage;
