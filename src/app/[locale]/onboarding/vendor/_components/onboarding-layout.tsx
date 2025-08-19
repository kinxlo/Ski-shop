"use client";

import { Logo } from "@/components/shared/logo";
import { ReactNode } from "react";

import { ProgressIndicator } from "./progress-indicator";

interface OnboardingLayoutProperties {
  children: ReactNode;
  currentStep?: number;
  showProgress?: boolean;
}

const steps = [
  { id: "verify-email", title: "Email Verification", step: 1 },
  { id: "business-info", title: "Business Info", step: 2 },
  { id: "store-setup", title: "Store Setup", step: 3 },
  { id: "bank-payout", title: "Bank & Payout", step: 4 },
];

export const OnboardingLayout = ({ children, currentStep, showProgress = true }: OnboardingLayoutProperties) => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="bg-primary/10 mx-auto mt-20 flex h-16 w-16 items-center justify-center rounded-full">
        <Logo width={40} height={40} className="text-primary" />
      </div>
      {showProgress && currentStep && (
        <div className="mx-auto px-4 py-4">
          <ProgressIndicator currentStep={currentStep} totalSteps={4} steps={steps} />
        </div>
      )}
      {/* Content */}
      <div className="flex flex-1 justify-center p-4">
        <div className="w-full max-w-xl">{children}</div>
      </div>
    </div>
  );
};
