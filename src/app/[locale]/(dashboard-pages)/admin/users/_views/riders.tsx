"use client";

import { Icons } from "@/components/core/miscellaneous/icons";
import { SearchInput } from "@/components/core/miscellaneous/search-input";
import { DashboardTable } from "@/components/shared/dashboard-table";
import { useAdminRiderColumn } from "@/components/shared/dashboard-table/admin/admin-table-data";
import { DownloadCsvButton } from "@/components/shared/download-csv-button";
import { EmptyState, ErrorState } from "@/components/shared/empty-state";
import { useDashboardSearchParameters } from "@/lib/nuqs/use-dashboard-search-parameters";
import { useUserService } from "@/services/externals/user/use-user-service";

import { DashboardHeader } from "../../../_components/dashboard-header";
import { TableSkeleton } from "../../../_components/dashboard-table/_components/table-skeleton";

export const Riders = () => {
  const { search: searchQuery, limit, setSearch: setSearchQuery, resetToFirstPage } = useDashboardSearchParameters();

  const columns = useAdminRiderColumn();
  const { useGetAllUsers } = useUserService();

  const filters: Filters = {
    role: "rider",
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
    return <ErrorState />;
  }

  return (
    <section>
      <div className="mb-2">
        <DashboardHeader
          title="Riders"
          subtitle="View all skishop riders information"
          showSubscriptionBanner={false}
          icon={<Icons.rider className={`mt-[-4]`} />}
          titleClassName={`!text-lg`}
          subtitleClassName={`!text-sm`}
          actionComponent={
            <div className={`flex items-center gap-2`}>
              <SearchInput className={``} onSearch={handleSearchChange} initialValue={searchQuery} />
              <DownloadCsvButton
                data={(userData?.data?.items || []) as Record<string, unknown>[]}
                filename="riders"
                headers={{
                  firstName: "First Name",
                  lastName: "Last Name",
                  email: "Email Address",
                  phoneNumber: "Phone Number",
                  availability: "Availability",
                  deliveriesCount: "Deliveries",
                  isEmailVerified: "Status",
                }}
              />
            </div>
          }
        />
      </div>
      <div>
        {isUsersLoading ? (
          <TableSkeleton />
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
          <EmptyState
            className={`bg-transparent`}
            title={`No match found`}
            description={`No user match your filters.`}
          />
        )}
      </div>
    </section>
  );
};
