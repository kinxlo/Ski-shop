/* eslint-disable @typescript-eslint/no-explicit-any */
// services/user/use-user-service.ts
import { queryClient } from "@/lib/react-query/query-client";
import { queryKeys } from "@/lib/react-query/query-keys";
import { createServiceHooks } from "@/lib/react-query/use-service-query";
import { dependencies } from "@/lib/tools/dependencies";

import { UserService } from "./user.service";

export const useUserService = () => {
  const { useServiceQuery, useServiceMutation } = createServiceHooks<UserService>(dependencies.USER_SERVICE);

  // Queries
  const useGetUserProfile = (options?: any) => {
    return useServiceQuery(
      [...queryKeys.user.profile()],
      (service) => service.getUserProfile(),
      { staleTime: 1000 * 60 * 5, ...options }, // 5 minutes cache
    );
  };

  const useGetAllUsers = (filters?: Filters, options?: any) => {
    const appliedFilters = filters ?? { role: "" };
    return useServiceQuery([...queryKeys.user.list(appliedFilters)], (service) => service.getAllUsers(appliedFilters), {
      staleTime: 0,
      ...options,
    });
  };

  const useGetUserById = (userId: string, options?: any) =>
    useServiceQuery([...queryKeys.user.details(userId)], (service) => service.getUserById(userId), options);

  // Mutations

  const useUpdateUserProfile = (options?: any) =>
    useServiceMutation((service, data: UpdateUserProfile) => service.updateUserProfile(data), {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.user.profile() });
      },
      ...options,
    });

  const useDeleteUser = (options?: any) =>
    useServiceMutation((service, userId: string) => service.deleteUser(userId), {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.user.list() });
      },
      ...options,
    });

  return {
    // User Queries
    useGetUserProfile,
    useGetAllUsers,
    useGetUserById,

    // User Mutations
    useUpdateUserProfile,
    useDeleteUser,
  };
};
