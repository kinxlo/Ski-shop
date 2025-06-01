"use client";

import { Wrapper } from "@/components/core/layout/wrapper";
import { Paginations } from "@/components/shared/pagination/pagination";
import { CustomSelect } from "@/components/shared/select-dropdown";
import { Input } from "@/components/ui/input";
import { CATEGORIES, VENDORS } from "@/lib/constants";
import { useAppService } from "@/services/app/use-app-service";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { MobileDownloadBanner } from "../_components/mobile-download-banner";
import { ShopCardSkeleton } from "../_components/shop-card-skeleton";
import { ShopCard } from "../(home)/_components/shop-card/shop-card";
import { OptionsSelector } from "./_components/option/options";
import { Hero } from "./_views/hero";

const ITEMS_PER_PAGE = 16;

const Page = () => {
  const [category, setCategory] = useState<string>("All Categories");
  const [, setSort] = useState<string>("All Categories");
  const [vendor, setVendor] = useState<string>("All Vendor");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { useGetAllProducts } = useAppService();
  const { isLoading, isError, error, data } = useGetAllProducts();

  // Filter products based on category, vendor, and search query
  const filteredProducts = useMemo(() => {
    if (!data?.products) return [];

    return data?.products?.filter((product) => {
      // Category filter
      const categoryMatch = category === "All Categories" || product.category === category.toLowerCase();

      // Vendor filter
      //   const vendorMatch = vendor === "All Vendor" || product?.vendor === vendor;

      // Search filter (case insensitive)
      const searchMatch =
        searchQuery === "" ||
        product?.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product?.category.toLowerCase().includes(searchQuery.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [data, category, searchQuery]);

  useEffect(() => {
    if (filteredProducts) {
      // Calculate total pages
      const totalItems = filteredProducts?.length;
      const calculatedTotalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
      setTotalPages(calculatedTotalPages);

      // Reset to first page when filters change
      setCurrentPage(1);

      // Update displayed products for current page
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      setDisplayedProducts(filteredProducts?.slice(startIndex, endIndex));
    }
  }, [filteredProducts, currentPage]);

  // Handle error state
  if (isError) {
    toast.error("something went wrong", {
      description: error.message,
    });
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <Hero />
      <Wrapper className={`my-14 grid grid-cols-12 gap-6`}>
        <section className={`col-span-2 space-y-10`}>
          <OptionsSelector
            title={`Category`}
            categories={["All Categories", ...CATEGORIES]}
            onChange={(value) => setCategory(value)}
          />
          <OptionsSelector
            title={`Vendor`}
            categories={["All Vendor", ...VENDORS]}
            onChange={(value) => setVendor(value)}
          />
        </section>
        <section className={`col-span-10`}>
          <article className={`flex items-center justify-between`}>
            <div className={`w-[20rem]`}>
              <Input name={"search"} placeholder={`Search products...`} value={searchQuery} onChange={handleSearch} />
            </div>
            <div className={`flex items-center space-x-4`}>
              <p className={`text-sm`}>Sort By:</p>
              <CustomSelect
                options={["All Categories", ...CATEGORIES]}
                placeholder="Choose a category"
                onChange={(value) => setSort(value)}
              />
            </div>
          </article>
          <article className={`bg-high-grey-I my-4 flex items-center justify-between rounded-md p-4`}>
            <div>
              <span className={`text-mid-grey-II text-sm`}>Active Filters: </span>
              <span className={`space-x-4 text-sm`}>
                {category} / {vendor}
                {searchQuery && ` / Search: ${searchQuery}`}
              </span>
            </div>
            <div>
              <p className={`text-mid-grey-II text-sm`}>
                <span className={`text-high-grey-II text-sm font-semibold`}>{filteredProducts?.length || 0}</span>{" "}
                results found
              </p>
            </div>
          </article>
          <section className={`my-8`}>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {isLoading &&
                Array.from({ length: 12 }).map((_, index: number) => {
                  return <ShopCardSkeleton key={index} />;
                })}
              {!isLoading && displayedProducts?.length === 0 && (
                <div className="col-span-full py-10 text-center">
                  <p className="text-mid-grey-II text-lg">No products found matching your filters</p>
                </div>
              )}
              {displayedProducts?.map((product) => {
                return (
                  <ShopCard
                    key={product?.id.toString()}
                    id={product?.id.toString()}
                    category={product?.category}
                    title={product?.title}
                    rating={product?.rating}
                    price={product?.price}
                    discount={product.discountPercentage}
                    image={product?.thumbnail}
                  />
                );
              })}
            </div>
            <div className={`my-10`}>
              {!isLoading && totalPages > 1 && (
                <Paginations currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
              )}
            </div>
          </section>
        </section>
      </Wrapper>
      <MobileDownloadBanner />
    </>
  );
};
export default Page;
