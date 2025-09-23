/* eslint-disable no-console */
"use client";

import { ReactNode, useEffect, useState } from "react";

import { worker } from "./browser";

type MockServiceWorkerProviderProperties = {
  children: ReactNode;
  isEnabled: boolean;
};

export const MockServiceWorkerProvider = ({ children, isEnabled }: MockServiceWorkerProviderProperties) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initMocks = async () => {
      if (isEnabled) {
        try {
          await worker?.start({
            onUnhandledRequest: "bypass", // or "warn" or "error"
            quiet: false, // set to true to suppress MSW logs
          });
          console.log("[MSW] Mocking enabled.");
        } catch (error) {
          console.error("[MSW] Failed to start worker:", error);
        }
        setIsReady(true);
      } else {
        console.log("[MSW] Mocking disabled.");
        setIsReady(true);
      }
    };

    initMocks();

    return () => {
      if (isEnabled) {
        worker?.stop();
      }
    };
  }, [isEnabled]);

  if (!isReady) {
    return null;
  }

  return <>{children}</>;
};
