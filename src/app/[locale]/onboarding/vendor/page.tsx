"use client";

import { useSearchParameters } from "@/hooks/use-search-parameters";
import { RouteGuard } from "@/lib/routes/route-guard";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { BankPayoutForm } from "./_components/bank-payout-form";
import { BusinessInfoForm } from "./_components/business-info-form";
import { OnboardingSuccess } from "./_components/onboarding-success";
import { ProgressIndicator } from "./_components/progress-indicator";
import { StoreForm } from "./_components/store-form";
import { VerifyEmailComponent } from "./_components/verify-email";

export type OnboardingStep = "verify-email" | "business-info" | "store-setup" | "bank-payout" | "success";

const VendorOnboardingPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const searchParameters = useSearchParams();

  // Get current step from URL or default to verify-email
  const stepFromUrl = useSearchParameters("step");
  const [currentStep, setCurrentStep] = useState<OnboardingStep>((stepFromUrl as OnboardingStep) || "verify-email");

  const steps = [
    { id: "verify-email", title: "Email Verification", step: 0 },
    { id: "business-info", title: "Business Info", step: 1 },
    { id: "store-setup", title: "Store Setup", step: 2 },
    { id: "bank-payout", title: "Bank & Payout", step: 3 },
  ];

  // Update URL when step changes
  const updateStepInUrl = (step: OnboardingStep) => {
    const parameters = new URLSearchParams(searchParameters.toString());
    parameters.set("step", step);
    router.push(`${pathname}?${parameters.toString()}`, { scroll: false });
  };

  // Update current step when URL changes
  useEffect(() => {
    if (stepFromUrl && stepFromUrl !== currentStep) {
      setCurrentStep(stepFromUrl as OnboardingStep);
    }
  }, [stepFromUrl, currentStep]);

  const getCurrentStepNumber = () => {
    return steps.findIndex((step) => step.id === currentStep) + 1;
  };

  const handleEmailVerified = () => {
    const nextStep = "business-info";
    setCurrentStep(nextStep);
    updateStepInUrl(nextStep);
  };

  const handleBusinessInfoComplete = () => {
    const nextStep = "store-setup";
    setCurrentStep(nextStep);
    updateStepInUrl(nextStep);
  };

  const handleStoreSetupComplete = () => {
    const nextStep = "bank-payout";
    setCurrentStep(nextStep);
    updateStepInUrl(nextStep);
  };

  const handleBankPayoutComplete = () => {
    const nextStep = "success";
    setCurrentStep(nextStep);
    updateStepInUrl(nextStep);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "verify-email": {
        return (
          <VerifyEmailComponent
            email={session?.user?.email ?? null}
            onVerificationSuccess={handleEmailVerified}
            onVerificationFailure={() => {}}
          />
        );
      }

      case "business-info": {
        return (
          <BusinessInfoForm
            data={{
              type: "",
              registrationNumber: "",
              contactNumber: "",
              address: "",
              country: "",
              state: "",
              kycVerificationType: "",
              identificationNumber: "",
            }}
            onComplete={handleBusinessInfoComplete}
          />
        );
      }

      case "store-setup": {
        return (
          <StoreForm
            data={{
              name: "",
              description: "",
              logo: null,
            }}
            onComplete={handleStoreSetupComplete}
          />
        );
      }

      case "bank-payout": {
        return (
          <BankPayoutForm
            data={{
              bankName: "",
              accountNumber: "",
              accountName: "",
            }}
            onComplete={handleBankPayoutComplete}
          />
        );
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
    <RouteGuard allowedRoles={["vendor"]}>
      <div className="flex min-h-screen flex-col bg-gray-50">
        {currentStep !== "verify-email" && currentStep !== "success" && (
          <div className="mx-auto px-4 py-4">
            <ProgressIndicator currentStep={getCurrentStepNumber()} totalSteps={3} steps={steps} />
          </div>
        )}
        {/* Content */}
        <div className="flex flex-1 items-center justify-center p-4">
          <div className="w-full max-w-xl">{renderCurrentStep()}</div>
        </div>
      </div>
    </RouteGuard>
  );
};

export default VendorOnboardingPage;
