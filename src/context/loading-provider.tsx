// src/context/LoadingContext.tsx
"use client";

import React, { createContext, useState } from "react";

interface LoadingContextProperties {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

export const LoadingContext = createContext<LoadingContextProperties | undefined>(undefined);

interface LoadingProviderProperties {
  children: React.ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProperties> = ({ children }) => {
  const [isLoading, setLoading] = useState(true);

  return <LoadingContext.Provider value={{ isLoading, setLoading }}>{children}</LoadingContext.Provider>;
};
