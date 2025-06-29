"use client";

import Loading from "@/app/Loading";
import { SearchInput } from "@/components/core/miscellaneous/search-input";
import { DashboardTable } from "@/components/shared/dashboard-table";
import { orderColumn } from "@/components/shared/dashboard-table/table-data";
import { useProductService } from "@/services/products/use-product-service";
import { useState } from "react";
import { FaWallet } from "react-icons/fa";
import { GiWallet } from "react-icons/gi";
import { HiMiniUserGroup } from "react-icons/hi2";

import { FilterDropdown } from "../_components/dashboard-table/_components/filter-dropdown";
import { OverViewCard } from "../_components/overview-card";
import { CurrencyDropdown } from "./_components/currency-dropdown";
import { SectionTwo } from "./_components/currency-dropdown/section-two";

const Page = () => {
  // const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isError) {
    return (
      <div className="flex items-center justify-center p-20">
        <p>Error loading products. Please try again later.</p>
      </div>
    );
  }

  return (
    <main>
      <section className="mb-5 flex items-center justify-between">
        <h4 className="text-mid-grey-III text-[18px] lg:text-[30px]">Dashboard Overview</h4>
        <div>
          <CurrencyDropdown />
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <OverViewCard
          title={"Total Products"}
          value={productData?.products.length || "0"}
          icon={<FaWallet />}
          iconClassName="bg-low-blue text-[24px] blue text-primary"
        />
        <OverViewCard
          title={"Total Revenue"}
          value={0}
          icon={<HiMiniUserGroup />}
          iconClassName="bg-low-warning text-[24px] text-high-warning"
        />
        <OverViewCard
          title={"Active Products"}
          value={0}
          icon={<GiWallet />}
          iconClassName="bg-[#F2EBFB] text-[24px] text-purple"
        />
      </section>

      <section>
        <SectionTwo />
      </section>

      <section className={`space-y-4 bg-white p-6`}>
        <section className={`flex flex-col-reverse justify-between gap-4 lg:flex-row lg:items-center`}>
          <div className="">
            <p className="text-lg font-bold">Resent Orders</p>
          </div>
          <div className="">
            <div className="flex items-center gap-2">
              <SearchInput className={``} onSearch={setSearchQuery} />
              <FilterDropdown />
            </div>
          </div>
        </section>
        <section>
          {isProductsLoading ? (
            <Loading text="Loading products..." className="w-fill h-fit p-20" />
          ) : productData?.products?.length ? (
            <DashboardTable
              data={productData.products.slice(0, 6)}
              columns={orderColumn}
              currentPage={currentPage}
              totalPages={productData.total || 1}
              itemsPerPage={productData.limit || 10}
              hasPreviousPage={false}
              hasNextPage={false}
              onPageChange={handlePageChange}
              showPagination
            />
          ) : (
            <div className="flex items-center justify-center p-20">
              <p>No products found. Add your first product to get started.</p>
            </div>
          )}
        </section>
      </section>
    </main>
  );
};

export default Page;
