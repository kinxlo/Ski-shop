/* eslint-disable @typescript-eslint/no-explicit-any */

import { queryKeys } from "@/lib/react-query/query-keys";
import { createServiceHooks } from "@/lib/react-query/use-service-query";
import { dependencies } from "@/lib/tools/dependencies";

import { HomeService } from "./home.service";

export const useHomeService = () => {
  const { useServiceQuery } = createServiceHooks<HomeService>(dependencies.HOME_SERVICE);

  // Query for dashboard overview
  const useGetOverview = (options?: any) =>
    useServiceQuery([...queryKeys.dashboard.overview()], (service) => service.getOverview(), options);

  return {
    useGetOverview,
  };
};
