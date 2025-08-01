"use client";

import { Wrapper } from "@/components/core/layout/wrapper";
import SkiButton from "@/components/shared/button";
import { EmptyState } from "@/components/shared/empty-state";
import { Paginations } from "@/components/shared/pagination/pagination";
import { CustomSelect } from "@/components/shared/select-dropdown";
import { Input } from "@/components/ui/input";
import { VENDORS } from "@/lib/constants";
import { useAppService } from "@/services/app/use-app-service";
import { useQueryState } from "nuqs";
import { useMemo } from "react";
import { useDebounce } from "use-debounce";

import { MobileDownloadBanner } from "../_components/mobile-download-banner";
import { ShopCardSkeleton } from "../_components/shop-card-skeleton";
import { ShopCard } from "../(home)/_components/shop-card/shop-card";
import { OptionsSelector } from "./_components/option/options";
import { Hero } from "./_views/hero";

interface IFilters {
  page?: number;
  category?: string;
  search?: string;
  vendor?: string;
  sort?: string;
}

const Page = () => {
  const { useGetAllProducts, useGetAllProductCategory } = useAppService();

  // Use nuqs for URL parameter management
  const [page, setPage] = useQueryState("page", { defaultValue: "1" });
  const [search, setSearch] = useQueryState("search");
  const [category, setCategory] = useQueryState("category");
  const [vendor, setVendor] = useQueryState("vendor");
  const [sort, setSort] = useQueryState("sort", { defaultValue: "newest" });

  // Debounce search input for better UX
  const [debouncedSearch] = useDebounce(search || "", 500);

  const {
    data: categoriesData,
    isError: isCategoriesError,
    isLoading: isCategoriesLoading,
  } = useGetAllProductCategory();

  // Prepare filters for API call
  const filters = useMemo<IFilters>(() => {
    return {
      page: page ? Number.parseInt(page) : 1,
      ...(category && category !== "All Categories" && { categories: category.toLowerCase() }),
      ...(debouncedSearch && { search: debouncedSearch }),
      ...(vendor && vendor !== "All Vendor" && { vendor }),
      ...(sort && { sort }),
    };
  }, [page, category, debouncedSearch, vendor, sort]);

  // Queries
  const {
    data: productData,
    isLoading: isLoadingProducts,
    isError: isProductError,
    refetch: refetchProducts,
  } = useGetAllProducts(filters);

  // Derived state
  const products = productData?.data?.items || [];
  const totalProducts = productData?.data?.metadata.total || 0;
  const totalPages = productData?.data?.metadata.totalPages || 0;
  const categories = categoriesData?.data || [];

  // Handle category change
  const handleCategoryChange = async (value: string) => {
    setCategory(value === "All Categories" ? null : value);
    setPage("1"); // Reset to first page when changing category
  };

  // Handle search input change
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value || null);
    setPage("1"); // Reset to first page when searching
  };

  // Handle vendor change
  const handleVendorChange = (value: string) => {
    setVendor(value === "All Vendor" ? null : value);
    setPage("1"); // Reset to first page when changing vendor
  };

  // Handle sort change
  const handleSortChange = (value: string) => {
    setSort(value);
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPage(newPage.toString());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isProductError) {
    return (
      <Wrapper className="py-12">
        <EmptyState
          images={[{ src: "/images/empty-state.svg", width: 80, height: 80, alt: "No featured products" }]}
          description="Failed to load products"
          descriptionClassName="text-mid-danger"
          className="bg-low-warning/5 space-y-0 rounded-lg py-10"
          actionButton={
            <SkiButton
              onClick={() => refetchProducts()}
              variant="outline"
              className="border-mid-danger text-mid-danger hover:bg-mid-danger/10 mt-4 border"
            >
              Retry
            </SkiButton>
          }
        />
      </Wrapper>
    );
  }

  if (isCategoriesError) return;

  return (
    <>
      <Hero />
      <Wrapper className="my-14 grid grid-cols-12 gap-6">
        {/* Filters sidebar */}
        <section className="col-span-2 space-y-10">
          {isCategoriesLoading ? (
            <div className="space-y-2">
              <h6 className="font-semibold uppercase">Categories</h6>
              <div className="space-y-4">
                {Array.from({ length: 7 }).map((_, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="bg-muted h-4 w-4 animate-pulse rounded-full" />
                    <div className="bg-muted h-4 w-24 animate-pulse rounded" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <OptionsSelector
              title="Categories"
              categories={["All Categories", ...categories]}
              value={category || "All Categories"}
              onChange={handleCategoryChange}
            />
          )}
          <OptionsSelector
            title="Vendor"
            categories={["All Vendor", ...VENDORS]}
            value={vendor || "All Vendor"}
            onChange={handleVendorChange}
          />
        </section>

        {/* Main content */}
        <section className="col-span-10">
          {/* Search and sort header */}
          <article className="flex items-center justify-between">
            <div className="w-[20rem]">
              <Input name="search" placeholder="Search products..." value={search || ""} onChange={handleSearch} />
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-sm">Sort By:</p>
              <CustomSelect
                options={["newest", "name", "price", "rating"]}
                placeholder="Choose sort option"
                value={sort || "newest"}
                onChange={handleSortChange}
              />
            </div>
          </article>

          {/* Active filters info */}
          <article className="bg-high-grey-I my-4 flex items-center justify-between rounded-md p-4">
            <div>
              <span className="text-mid-grey-II text-sm">Active Filters: </span>
              <span className="space-x-4 text-sm">
                {category || "All Categories"} / {vendor || "All Vendor"}
                {debouncedSearch && ` / Search: ${debouncedSearch}`}
              </span>
            </div>
            <div>
              <p className="text-mid-grey-II text-sm">
                <span className="text-high-grey-II text-sm font-semibold">{totalProducts}</span> results found
              </p>
            </div>
          </article>

          {/* Products grid */}
          <section className="my-8">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {isLoadingProducts && Array.from({ length: 12 }).map((_, index) => <ShopCardSkeleton key={index} />)}

              {!isLoadingProducts && products.length === 0 && (
                <div className="col-span-full py-10 text-center">
                  <EmptyState
                    images={[
                      {
                        src: "/images/empty-state.svg",
                        alt: "Empty Cart",
                        width: 80,
                        height: 80,
                      },
                    ]}
                    description={"No products found matching your filters"}
                    descriptionClassName="text-primary"
                    className={`bg-mid-grey-I min-h-fit space-y-0 rounded-lg py-10`}
                  />
                </div>
              )}

              {!isLoadingProducts &&
                products.map((product: Product) => (
                  <ShopCard
                    key={product.id.toString()}
                    id={product.id.toString()}
                    category={product.category}
                    title={product.name}
                    rating={3}
                    price={product.price}
                    discount={product.discountPrice || 0}
                    image={product.images[0]}
                    name={product.user.name || "Skicom"}
                  />
                ))}
            </div>

            {/* Pagination */}
            {!isLoadingProducts && totalPages > 1 && (
              <div className="my-10">
                <Paginations
                  currentPage={page ? Number.parseInt(page) : 1}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </section>
        </section>
      </Wrapper>
      <MobileDownloadBanner />
    </>
  );
};

export default Page;
