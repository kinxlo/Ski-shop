"use client";

import { SearchInput } from "@/components/core/miscellaneous/search-input";
import SkiButton from "@/components/shared/button";
import { DashboardTable } from "@/components/shared/dashboard-table";
import { useProductColumn } from "@/components/shared/dashboard-table/table-data";
import { EmptyState, FilteredEmptyState } from "@/components/shared/empty-state";
import { useDashboardSearchParameters } from "@/lib/nuqs/use-dashboard-search-parameters";
import { useDashboardProductService } from "@/services/dashboard/vendor/products/use-product-service";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
// import { useTranslations } from "next-intl";
import { useCallback, useMemo } from "react";

import empty1 from "~/images/empty-state.svg";
import { TableSkeleton } from "../../home/page-skeleton";

export const AllProducts = () => {
  const locale = useLocale();
  const router = useRouter();
  // const t = useTranslations("products");
  const productColumn = useProductColumn();

  const { search: searchQuery, page, setSearch: setSearchQuery, resetToFirstPage } = useDashboardSearchParameters();

  const filters = useMemo(
    () => ({
      page,
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

  if (isError) {
    return (
      <EmptyState
        images={[
          {
            src: "/images/empty-state.svg",
            alt: "Empty Cart",
            width: 80,
            height: 80,
          },
        ]}
        description={"Failed to load products"}
        descriptionClassName={`text-mid-danger`}
        className={`bg-low-warning/5 space-y-0 rounded-lg`}
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

  // Extract data from the correct structure (similar to shop page)
  const products = productData?.items || [];
  const totalProducts = productData?.metadata?.total || 0;
  const totalPages = productData?.metadata?.totalPages || 0;
  const hasNextPage = productData?.metadata?.hasNextPage || false;
  const hasPreviousPage = productData?.metadata?.hasPreviousPage || false;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h6 className="text-lg font-semibold sm:text-xl">All Products</h6>
        <div className="w-full sm:w-auto">
          <SearchInput
            className="w-full sm:w-64"
            onSearch={handleSearchChange}
            initialValue={searchQuery}
            delay={500}
          />
        </div>
      </div>

      {/* Content */}
      <section className="min-h-[400px]">
        {isProductsLoading ? (
          <TableSkeleton />
        ) : products.length > 0 ? (
          <div className="overflow-x-auto">
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
            images={[{ src: empty1.src, alt: "No products", width: 50, height: 50 }]}
            title="No products yet."
            description="Once you add products, you'll see their details here, including name, category, price, stock, and more."
            className={`space-y-0`}
            titleClassName={`!text-2xl text-primary font-semibold`}
            descriptionClassName={`text-muted-foreground max-w-[500px] font-medium`}
            button={{
              text: "Add New Product",
              onClick: () => {
                router.push(`/${locale}/dashboard/products/new`);
              },
            }}
          />
        )}
      </section>
    </div>
  );
};
