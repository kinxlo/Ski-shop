"use client";

import Loading from "@/app/Loading";
import { SearchInput } from "@/components/core/miscellaneous/search-input";
import { DashboardTable } from "@/components/shared/dashboard-table";
import { useAdminUserColumn } from "@/components/shared/dashboard-table/admin/admin-table-data";
import { DownloadCsvButton } from "@/components/shared/download-csv-button";
import { useDashboardSearchParameters } from "@/lib/nuqs/use-dashboard-search-parameters";
import { useUserService } from "@/services/externals/user/use-user-service";

export const ActiveUsers = () => {
  const { search: searchQuery, limit, setSearch: setSearchQuery, resetToFirstPage } = useDashboardSearchParameters();

  const columns = useAdminUserColumn();
  const { useGetAllUsers } = useUserService();

  const filters: Filters = {
    status: "active",
    ...(searchQuery && { search: searchQuery }),
    ...(limit && { limit }),
  };

  const {
    data: userData,
    isLoading: isUsersLoading,
    isError,
  } = useGetAllUsers(filters, {
    staleTime: 0, // Always refetch when query changes
  });

  const handleSearchChange = (newSearch: string) => {
    setSearchQuery(newSearch);
    resetToFirstPage(); // Reset to first page when search changes
  };

  if (isError) {
    return (
      <div className="flex items-center justify-center p-20">
        <p>Error loading users. Please try again later.</p>
      </div>
    );
  }

  return (
    <section>
      <div className="mb-2 flex items-center justify-between gap-2">
        <h6 className={`!text-lg font-semibold`}>Active Users</h6>
        <div className={`flex items-center gap-2`}>
          <SearchInput className={``} onSearch={handleSearchChange} initialValue={searchQuery} />
          <DownloadCsvButton
            data={(userData?.data?.items || []) as Record<string, unknown>[]}
            filename="active-users"
            headers={{
              firstName: "First Name",
              lastName: "Last Name",
              email: "Email Address",
              phoneNumber: "Phone Number",
              ordersCount: "Orders",
              isEmailVerified: "Status",
            }}
          />
        </div>
      </div>
      <div>
        {isUsersLoading ? (
          <Loading text="Loading active users..." className="w-fill h-fit p-20" />
        ) : userData?.data?.items?.length ? (
          <DashboardTable
            data={userData.data.items as Users[]}
            columns={columns}
            totalPages={userData.data.metadata.totalPages || 1}
            itemsPerPage={limit || 10}
            hasPreviousPage={userData.data.metadata.hasPreviousPage || false}
            hasNextPage={userData.data.metadata.hasNextPage || false}
            showPagination
            pageParameter="page"
          />
        ) : (
          <div className="flex items-center justify-center p-20">
            <p>No active users found.</p>
          </div>
        )}
      </div>
    </section>
  );
};
