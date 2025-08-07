// src/context/LoadingContext.tsx
"use client";

import React, { createContext, useState } from "react";

// Types are now globally available in src/types/

export const LoadingContext = createContext<LoadingContextProperties | undefined>(undefined);

export const LoadingProvider: React.FC<LoadingProviderProperties> = ({ children }) => {
  const [isLoading, setLoading] = useState(true);

  return <LoadingContext.Provider value={{ isLoading, setLoading }}>{children}</LoadingContext.Provider>;
};
