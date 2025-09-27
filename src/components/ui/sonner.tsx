"use client";

import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...properties }: ToasterProps) => {
  return <Sonner {...properties} />;
};

export { Toaster };
