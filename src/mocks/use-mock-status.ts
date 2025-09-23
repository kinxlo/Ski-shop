import { useEffect, useState } from "react";

import { mockConfig } from "./mock.config";

export interface MockStatus {
  enabled: boolean;
  error?: string;
  config: typeof mockConfig;
}

export const useMockStatus = (): MockStatus => {
  const [status, setStatus] = useState<MockStatus>({
    enabled: mockConfig.enableMock,
    config: mockConfig,
  });

  useEffect(() => {
    // Update status when config changes
    setStatus({
      enabled: mockConfig.enableMock,
      config: mockConfig,
    });
  }, []);

  return status;
};

// Utility function to check if specific endpoint is mocked
export const isEndpointMocked = (endpoint: keyof typeof mockConfig.mockEndpoints): boolean => {
  return mockConfig.enableMock && mockConfig.mockEndpoints[endpoint];
};

// Utility function to get all mocked endpoints
export const getMockedEndpoints = (): string[] => {
  if (!mockConfig.enableMock) return [];

  return Object.entries(mockConfig.mockEndpoints)
    .filter(([, enabled]) => enabled)
    .map(([endpoint]) => endpoint);
};
