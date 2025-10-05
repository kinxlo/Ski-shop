"use client";

import { Icons } from "@/components/core/miscellaneous/icons";
import { SearchInput } from "@/components/core/miscellaneous/search-input";
import { DashboardTable } from "@/components/shared/dashboard-table";
import { useAdminUserColumn } from "@/components/shared/dashboard-table/admin/admin-table-data";
import { DownloadCsvButton } from "@/components/shared/download-csv-button";
import { EmptyState, ErrorState } from "@/components/shared/empty-state";
import { FilterDropdown } from "@/components/shared/filter-dropdown";
import { useDashboardSearchParameters } from "@/lib/nuqs/use-dashboard-search-parameters";
import { useUserService } from "@/services/externals/user/use-user-service";
import { useParams, useRouter } from "next/navigation";

import { DashboardHeader } from "../../../_components/dashboard-header";
import { TableSkeleton } from "../../../_components/dashboard-table/_components/table-skeleton";

export const AllUsers = () => {
  const {
    search: searchQuery,
    status,
    limit,
    setSearch: setSearchQuery,
    setStatus,
    resetToFirstPage,
  } = useDashboardSearchParameters();

  const router = useRouter();
  const parameters = useParams();
  const locale = parameters.locale as string;

  const columns = useAdminUserColumn();
  const { useGetAllUsers } = useUserService();

  const handleSearchChange = (newSearch: string) => {
    setSearchQuery(newSearch);
    resetToFirstPage(); // Reset to first page when search changes
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus as "all" | "active" | "inactive");
    resetToFirstPage(); // Reset to first page when status changes
  };

  const handleRowClick = (row: Users) => {
    router.push(`/${locale}/admin/users/${row.id}`);
  };

  const filters: Filters = {
    ...(status !== "all" && { status: status as "active" | "inactive" }),
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

  const filterOptions = [
    { value: "all", label: "All Users" },
    { value: "active", label: "Active Users" },
    { value: "inactive", label: "Inactive Users" },
  ];

  if (isError) {
    return <ErrorState />;
  }

  return (
    <section>
      <div className="mb-2">
        <DashboardHeader
          title="All Users"
          subtitle="View all skishop users information"
          showSubscriptionBanner={false}
          icon={<Icons.users className={`mt-[-4]`} />}
          titleClassName={`!text-lg`}
          subtitleClassName={`!text-sm`}
          actionComponent={
            <div className={`flex items-center gap-2`}>
              <SearchInput className={``} onSearch={handleSearchChange} initialValue={searchQuery} />
              <FilterDropdown options={filterOptions} value={status} onValueChange={handleStatusChange} />
              <DownloadCsvButton
                data={(userData?.data?.items || []) as Record<string, unknown>[]}
                filename="all-users"
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
            itemsPerPage={limit}
            hasPreviousPage={userData.data.metadata.hasPreviousPage || false}
            hasNextPage={userData.data.metadata.hasNextPage || false}
            showPagination
            pageParameter="page"
            onRowClick={handleRowClick}
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
