"use client";

import { Check } from "lucide-react";

interface ProgressIndicatorProperties {
  currentStep: number;
  totalSteps: number;
  steps: Array<{ id: string; title: string; step: number }>;
}

export const ProgressIndicator = ({ currentStep, totalSteps, steps }: ProgressIndicatorProperties) => {
  return (
    <div className="mt-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">
          Step {currentStep}/{totalSteps}
        </span>
      </div>

      <div className="flex items-center space-x-4">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep - 1;
          const isCurrent = index === currentStep - 1;

          return (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors ${
                  isCompleted
                    ? "border-priamry bg-primary text-white"
                    : isCurrent
                      ? "border-orange-500 text-orange-500"
                      : "border-gray-300 text-gray-400"
                }`}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <span className="text-xs font-medium">{String(index + 1).padStart(2, "0")}</span>
                )}
              </div>

              {index < steps.length - 1 && (
                <div className={`mx-2 h-0.5 w-12 transition-colors ${isCompleted ? "bg-primary" : "bg-gray-300"}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
