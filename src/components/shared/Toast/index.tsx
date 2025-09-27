"use client";

import { Toaster } from "@/components/ui/sonner";

export const Toast = () => {
  return (
    <Toaster
      richColors
      position={`bottom-center`}
      theme={"light"}
      // toastOptions={{
      //   classNames: {
      //     toast: "!bg-accent !w-full !absolute",
      //   },
      // }}
    />
  );
};
