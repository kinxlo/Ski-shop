"use client";

import { SearchInput } from "@/components/core/miscellaneous/search-input";
import SkiButton from "@/components/shared/button";
import { DashboardTable } from "@/components/shared/dashboard-table";
import { useProductColumn } from "@/components/shared/dashboard-table/table-data";
import { DownloadCsvButton } from "@/components/shared/download-csv-button";
import { EmptyState, FilteredEmptyState } from "@/components/shared/empty-state";
import { useDashboardSearchParameters } from "@/lib/nuqs/use-dashboard-search-parameters";
import { useDashboardProductService } from "@/services/dashboard/vendor/products/use-product-service";
import { useSession } from "next-auth/react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import empty1 from "~/images/empty-state.svg";
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
  const totalPages = Math.ceil(totalOutOfStock / itemsPerPage);
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  if (isError) {
    return (
      <EmptyState
        images={[{ src: empty1.src, alt: "No out of stock products", width: 50, height: 50 }]}
        className={`space-y-0`}
        titleClassName={`!text-2xl text-primary font-semibold`}
        descriptionClassName={`text-muted-foreground max-w-[500px] font-medium`}
        title="No out of stock products."
        description="Great! All your products are currently in stock."
        actionButton={
          <SkiButton
            onClick={() => refetch()}
            variant="outline"
            className="border-mid-danger text-mid-danger hover:bg-mid-danger/10 mt-4 border"
          >
            Retry
          </SkiButton>
        }
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h6 className="text-lg font-semibold sm:text-xl">Out of Stock Products</h6>
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
      </div>

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
            images={[{ src: empty1.src, alt: "No out of stock products", width: 50, height: 50 }]}
            className={`space-y-0`}
            titleClassName={`!text-2xl text-primary font-semibold`}
            descriptionClassName={`text-muted-foreground max-w-[500px] font-medium`}
            title="No out of stock products."
            description="Great! All your products are currently in stock."
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
