import { queryKeys } from "@/lib/react-query/query-keys";
import { createServiceHooks } from "@/lib/react-query/use-service-query";
import { dependencies } from "@/lib/tools/dependencies";
import { VendorProfileFormData } from "@/schemas";
import { useQueryClient } from "@tanstack/react-query";

import { DashboardProfileService } from "./profile.service";

export const useDashboardProfileService = () => {
  const { useServiceMutation, useServiceQuery } = createServiceHooks<DashboardProfileService>(
    dependencies.DASHBOARD_PROFILE_SERVICE,
  );

  // Queries
  const useGetVendorStore = () => {
    return useServiceQuery([...queryKeys.dashboard.profile.details()], (service) => service.getVendorStore());
  };

  // Mutations
  const useUpdateVendorProfile = () => {
    const queryClient = useQueryClient();
    return useServiceMutation(
      (service, { data }: { data: Partial<VendorProfileFormData> }) => service.updateVendorProfile(data),
      {
        onSuccess: () => {
          // Invalidate and refetch profile data
          queryClient.invalidateQueries({ queryKey: [...queryKeys.dashboard.profile.details()] });
        },
      },
    );
  };

  const useUpdateVendorLogo = () => {
    const queryClient = useQueryClient();
    return useServiceMutation((service, { logo }: { logo: File }) => service.updateVendorLogo(logo), {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [...queryKeys.dashboard.profile.details()] });
      },
    });
  };

  const useGetVendorProfile = () => {
    return useServiceQuery([...queryKeys.dashboard.profile.details()], (service) => service.getVendorProfile());
  };

  return {
    // Queries
    useGetVendorStore,
    useGetVendorProfile,
    // Mutations
    useUpdateVendorProfile,
    useUpdateVendorLogo,
  };
};
