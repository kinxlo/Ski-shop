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

export const OutOfStockProducts = () => {
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
      ...(searchQuery && { search: searchQuery }),
    }),
    [page, searchQuery],
  );

  // Initialize product service
  const { useGetAllProducts } = useDashboardProductService();

  // Fetch all products data
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

  // Filter out-of-stock products
  const outOfStockProducts = useMemo(() => {
    return productData?.data?.items?.filter((product) => product.stockCount === 0) || [];
  }, [productData?.data?.items]);

  // Calculate pagination for out-of-stock products
  const totalOutOfStock = outOfStockProducts.length;
  const itemsPerPage = 10; // Assuming 10 items per page
  const totalPages = Math.max(1, Math.ceil(totalOutOfStock / itemsPerPage));
  const currentPage = page ?? 1;
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  if (isError) {
    return <ErrorState onRetry={() => refetch()} />;
  }

  return (
    <div className="space-y-4">
      {/* Header */}

      <DashboardHeader
        actionComponent={
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-2">
            <div className="w-full sm:w-64">
              <SearchInput className="w-full" onSearch={handleSearchChange} initialValue={searchQuery} delay={500} />
            </div>
            {(session?.user?.role?.name === "admin" || session?.user?.role?.name === "vendor") && (
              <DownloadCsvButton
                data={outOfStockProducts}
                filename="out-of-stock-products.csv"
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
        title="Out of Stock Products"
        subtitle={`View all out of stock skishop products`}
        showSubscriptionBanner={false}
        titleClassName={`!text-lg`}
        subtitleClassName={`!text-sm`}
        icon={<Icons.product className={`mt-[-4] size-4`} />}
      />

      {/* Content */}
      <section className="min-h-[400px]">
        {isProductsLoading ? (
          <TableSkeleton />
        ) : outOfStockProducts.length > 0 ? (
          <div className="overflow-x-auto">
            <DashboardTable
              data={outOfStockProducts}
              columns={productColumn}
              totalPages={totalPages}
              itemsPerPage={totalOutOfStock}
              hasPreviousPage={hasPreviousPage}
              hasNextPage={hasNextPage}
              showPagination={totalOutOfStock > itemsPerPage}
              pageParameter="page"
              onRowClick={handleRowClick}
            />
          </div>
        ) : searchQuery ? (
          <FilteredEmptyState
            onReset={() => {
              setSearchQuery("");
              resetToFirstPage();
            }}
          />
        ) : (
          <EmptyState
            button={{
              text: "View All Products",
              onClick: () => {
                router.push(`/${locale}/dashboard/products`);
              },
            }}
          />
        )}
      </section>
    </div>
  );
};
