"use client";

import { SearchInput } from "@/components/core/miscellaneous/search-input";
import { DashboardTable } from "@/components/shared/dashboard-table";
import { useProductColumn } from "@/components/shared/dashboard-table/table-data";
import { EmptyState, FilteredEmptyState } from "@/components/shared/empty-state";
import { useDashboardSearchParameters } from "@/lib/nuqs/use-dashboard-search-parameters";
import { useDashboardProductService } from "@/services/dashboard/vendor/products/use-product-service";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import empty1 from "~/images/empty-state.svg";
import { TableSkeleton } from "../../home/page-skeleton";

export const PublishedProducts = () => {
  const productColumn = useProductColumn();
  const locale = useLocale();
  const router = useRouter();
  const { search: searchQuery, page, setSearch: setSearchQuery, resetToFirstPage } = useDashboardSearchParameters();

  const filters = useMemo(
    () => ({
      page,
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
        images={[{ src: empty1.src, alt: "No products", width: 50, height: 50 }]}
        className={`space-y-0`}
        titleClassName={`!text-2xl text-primary font-semibold`}
        descriptionClassName={`text-muted-foreground max-w-[500px] font-medium`}
        title="No published products yet."
        description="Once you publish products, you'll see their details here, including name, category, price, stock, and more."
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
    <>
      <div className="mb-2 flex items-center justify-between gap-2">
        <h6 className={`!text-lg font-semibold`}>Published</h6>
        <div className={`flex items-center gap-2`}>
          <SearchInput className={``} onSearch={handleSearchChange} initialValue={searchQuery} delay={500} />
        </div>
      </div>
      <section>
        {isProductsLoading ? (
          <TableSkeleton />
        ) : products.length > 0 ? (
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
            className={`space-y-0`}
            titleClassName={`!text-2xl text-primary font-semibold`}
            descriptionClassName={`text-muted-foreground max-w-[500px] font-medium`}
            title="No published products yet."
            description="Once you publish products, you'll see their details here, including name, category, price, stock, and more."
            button={{
              text: "Add New Product",
              onClick: () => {
                router.push(`/${locale}/dashboard/products/new`);
              },
            }}
          />
        )}
      </section>
    </>
  );
};
