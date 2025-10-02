/* eslint-disable @typescript-eslint/no-explicit-any */

import { queryKeys } from "@/lib/react-query/query-keys";
import { createServiceHooks } from "@/lib/react-query/use-service-query";
import { dependencies } from "@/lib/tools/dependencies";

import { AdminSettingsService } from "./admin-settings.service";

export const useAdminSettingsService = () => {
  const { useServiceQuery, useServiceMutation } = createServiceHooks<AdminSettingsService>(
    dependencies.ADMIN_SETTINGS_SERVICE,
  );

  const useGetMySettings = (options?: any) =>
    useServiceQuery([...queryKeys.admin.settings.my()], (service) => service.getMySettings(), options);

  const useCreateSettings = (options?: any) =>
    useServiceMutation((service, payload: AdminSettingsPayload) => service.createSettings(payload), options);

  const useUpdateSettings = (options?: any) =>
    useServiceMutation(
      (service, variables: { settingId: string; payload: AdminSettingsPayload }) =>
        service.updateSettings(variables.settingId, variables.payload),
      options,
    );

  return {
    useGetMySettings,
    useCreateSettings,
    useUpdateSettings,
  };
};
