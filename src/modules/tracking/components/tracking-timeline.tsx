"use client";

import { Clock } from "lucide-react";

import { TrackingStep } from "../types";

interface TrackingTimelineProperties {
  steps: TrackingStep[];
}

export const TrackingTimeline = ({ steps }: TrackingTimelineProperties) => {
  return (
    <div className="space-y-4">
      <h3 className="text-high-grey-II !text-2xl font-semibold">Delivery Progress</h3>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.status} className="relative flex items-start space-x-3">
            {/* Status Icon */}
            <div className="flex-shrink-0">
              {step.completed ? (
                <div className="border-accent flex h-8 w-8 items-center justify-center rounded-full border-10 bg-white" />
              ) : (
                <div className="border-border flex h-8 w-8 items-center justify-center rounded-full border-2 bg-white">
                  <Clock className="text-mid-grey-II h-4 w-4" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <h4 className={`!text-sm font-medium ${step.completed ? "text-high-grey-II" : "!text-low-grey-II"}`}>
                  {step.title}
                </h4>
                {step.timestamp && (
                  <span className="text-mid-grey-II text-xs">
                    {new Date(step.timestamp).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </span>
                )}
              </div>
              <p className={`text-xs ${step.completed ? "text-high-grey-II" : "text-border"}`}>{step.description}</p>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="border-primary absolute top-8 left-3.5 h-8 w-0.5 border-2 border-dashed bg-white" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
