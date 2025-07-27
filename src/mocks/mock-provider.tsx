"use client";

import { ReactNode, useEffect } from "react";

import { worker } from "./browser";

type MockServiceWorkerProviderProperties = {
  children: ReactNode;
  isEnabled: boolean;
};

export const MockServiceWorkerProvider = ({ children, isEnabled }: MockServiceWorkerProviderProperties) => {
  // const [isReady] = useState(false);

  useEffect(() => {
    const initMocks = async () => {
      // if (isEnabled) {
      //   await worker.start({
      //     onUnhandledRequest: "bypass", // or "warn" or "error"
      //     quiet: false, // set to true to suppress MSW logs
      //   });
      //   setIsReady(true);
      // } else {
      //   setIsReady(true);
      // }
      if (typeof window === "undefined") {
        const { server } = await import("./server");
        server.listen();
      } else {
        const { worker } = await import("./browser");
        worker.start();
      }
    };

    initMocks();

    return () => {
      if (isEnabled) {
        worker.stop();
      }
    };
  }, [isEnabled]);

  // if (!isReady) {
  //   return null;
  // }

  return <>{children}</>;
};
