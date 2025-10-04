"use client";

import { Icons } from "@/components/core/miscellaneous/icons";
import { SearchInput } from "@/components/core/miscellaneous/search-input";
import { DashboardTable } from "@/components/shared/dashboard-table";
import { useProductColumn } from "@/components/shared/dashboard-table/table-data";
import { DownloadCsvButton } from "@/components/shared/download-csv-button";
import { EmptyState, ErrorState, FilteredEmptyState } from "@/components/shared/empty-state";
import { useDashboardSearchParameters } from "@/lib/nuqs/use-dashboard-search-parameters";
import { useDashboardProductService } from "@/services/dashboard/vendor/products/use-product-service";
import { useSession } from "next-auth/react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import { DashboardHeader } from "../../../_components/dashboard-header";
import { TableSkeleton } from "../../home/page-skeleton";

export const PublishedProducts = () => {
  const productColumn = useProductColumn();
  const locale = useLocale();
  const router = useRouter();
  const { data: session } = useSession();
  const { search: searchQuery, page, setSearch: setSearchQuery, resetToFirstPage } = useDashboardSearchParameters();

  const filters = useMemo(
    () => ({
      page,
      limit: 10,
      sort: "newest",
      status: "published" as const,
      ...(searchQuery && { search: searchQuery }),
    }),
    [page, searchQuery],
  );

  // Initialize product service
  const { useGetAllProducts } = useDashboardProductService();

  // Fetch products data
  const {
    data: productData,
    isLoading: isProductsLoading,
    isError,
    refetch,
  } = useGetAllProducts(filters, {
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });

  const handleSearchChange = useCallback(
    (newSearch: string) => {
      // Prevent rapid search changes that could cause throttling
      if (newSearch !== searchQuery) {
        setSearchQuery(newSearch);
        resetToFirstPage(); // Reset to first page when search changes
      }
    },
    [setSearchQuery, resetToFirstPage, searchQuery],
  );

  const handleRowClick = useCallback(
    (product: Product) => {
      router.push(`/${locale}/dashboard/products/${product.id}`);
    },
    [router, locale],
  );

  // Extract data from the correct structure (similar to shop page)
  const products = productData?.data?.items || [];
  const totalProducts = productData?.data?.metadata?.total || 0;
  const totalPages = productData?.data?.metadata?.totalPages || 0;
  const hasNextPage = productData?.data?.metadata?.hasNextPage || false;
  const hasPreviousPage = productData?.data?.metadata?.hasPreviousPage || false;

  const renderLoadingSkeleton = () => <TableSkeleton />;

  const renderErrorState = () => <ErrorState onRetry={() => refetch()} />;

  const renderFilteredEmptyState = () => (
    <FilteredEmptyState
      onReset={() => {
        setSearchQuery("");
        resetToFirstPage();
      }}
    />
  );

  const renderEmptyState = () => (
    <EmptyState
      button={{
        text: "Add Product",
        onClick: () => {
          router.push(`/${locale}/dashboard/products/new`);
        },
      }}
    />
  );

  const renderProductsTable = () => (
    <DashboardTable
      data={products}
      columns={productColumn}
      totalPages={totalPages}
      itemsPerPage={totalProducts}
      hasPreviousPage={hasPreviousPage}
      hasNextPage={hasNextPage}
      showPagination
      pageParameter="page"
      onRowClick={handleRowClick}
    />
  );

  const renderHeader = () => (
    <DashboardHeader
      actionComponent={
        <div className="flex items-center gap-2">
          <SearchInput onSearch={handleSearchChange} initialValue={searchQuery} delay={500} />
          {(session?.user?.role?.name === "admin" || session?.user?.role?.name === "vendor") && (
            <DownloadCsvButton
              data={products}
              filename="published-products.csv"
              headers={{
                name: "Product Name",
                category: "Category",
                price: "Price",
                stockCount: "Stock",
                createdAt: "Date Added",
                status: "Status",
              }}
            />
          )}
        </div>
      }
      title="Published Products"
      subtitle={`View all published skishop products`}
      showSubscriptionBanner={false}
      titleClassName={`!text-lg`}
      subtitleClassName={`!text-sm`}
      icon={<Icons.product className={`mt-[-4] size-4`} />}
    />
  );

  const renderProductsContent = () => {
    if (isProductsLoading) {
      return renderLoadingSkeleton();
    }

    if (products.length > 0) {
      return renderProductsTable();
    }

    if (searchQuery) {
      return renderFilteredEmptyState();
    }

    return renderEmptyState();
  };

  const renderPublishedProductsView = () => {
    if (isError) {
      return renderErrorState();
    }

    return (
      <section className="space-y-6">
        {renderHeader()}
        <section>{renderProductsContent()}</section>
      </section>
    );
  };

  return renderPublishedProductsView();
};
