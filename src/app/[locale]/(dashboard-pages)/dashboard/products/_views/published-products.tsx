"use client";

import Loading from "@/app/Loading";
import { SearchInput } from "@/components/core/miscellaneous/search-input";
import { DashboardTable } from "@/components/shared/dashboard-table";
import { useProductColumn } from "@/components/shared/dashboard-table/table-data";
import { EmptyState, FilteredEmptyState } from "@/components/shared/empty-state";
import { useProductService } from "@/services/externals/products/use-product-service";
import { useState } from "react";

import empty1 from "~/images/empty-state.svg";

export const PublishedProducts = () => {
  // const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState<string>("all");
  const productColumn = useProductColumn();
  // Initialize product service
  const { useGetAllProducts } = useProductService();

  const filters: IFilters = {
    page: currentPage,
    ...(status !== "all" && { status: status as "published" | "draft" }),
    ...(searchQuery && { search: searchQuery }),
  };

  // Fetch products data
  const {
    data: productData,
    isLoading: isProductsLoading,
    isError,
  } = useGetAllProducts(filters, {
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });

  if (isError) {
    return (
      <div className="flex items-center justify-center p-20">
        <p>Error loading products. Please try again later.</p>
      </div>
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
          <SearchInput className={``} onSearch={setSearchQuery} />
        </div>
      </div>
      <section>
        {isProductsLoading ? (
          <Loading text="Loading products..." className="w-fill h-fit p-20" />
        ) : productData?.items?.length ? (
          <DashboardTable
            data={products}
            columns={productColumn}
            totalPages={totalPages}
            itemsPerPage={totalProducts}
            hasPreviousPage={hasPreviousPage}
            hasNextPage={hasNextPage}
            showPagination
            pageParameter="page"
          />
        ) : status === "all" ? (
          <FilteredEmptyState
            onReset={() => {
              setStatus("all");
              setCurrentPage(1);
            }}
          />
        ) : (
          <EmptyState
            images={[{ src: empty1.src, alt: "No employees", width: 100, height: 100 }]}
            title="No employee yet."
            description="Once you add team members, you’ll see their details here, including department, role, work status, and more."
            button={{
              text: "Add New Employee",
              onClick: () => {
                return;
                // router.push(`/dashboard/products/new`);
              },
            }}
          />
        )}
      </section>
    </>
  );
};
