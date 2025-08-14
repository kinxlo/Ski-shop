// "use client";

// import Loading from "@/app/Loading";
// import { SearchInput } from "@/components/core/miscellaneous/search-input";
// import { DashboardTable } from "@/components/shared/dashboard-table";
// import { orderColumn } from "@/components/shared/dashboard-table/table-data";
// import { useProductService } from "@/services/externals/products/use-product-service";
// import { useState } from "react";

// import { FilterDropdown } from "../../_components/dashboard-table/_components/filter-dropdown";

// export const AllUsers = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   // Initialize product service
//   const { useGetAllProducts } = useProductService();

//   const filters: IFilters = {
//     page: currentPage,
//     ...(status !== "all" && { status: status as "published" | "draft" }),
//     ...(searchQuery && { search: searchQuery }),
//   };

//   // Fetch products data
//   const {
//     data: productData,
//     isLoading: isProductsLoading,
//     isError,
//   } = useGetAllProducts(filters, {
//     keepPreviousData: true,
//     staleTime: 1000 * 60 * 5, // 5 minutes cache
//   });

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   if (isError) {
//     return (
//       <div className="flex items-center justify-center p-20">
//         <p>Error loading products. Please try again later.</p>
//       </div>
//     );
//   }
//   return (
//     <section>
//       <div className="mb-2 flex items-center justify-between gap-2">
//         <h6 className={`!text-lg font-semibold`}>All</h6>
//         <div className={`flex items-center gap-2`}>
//           <SearchInput className={``} onSearch={setSearchQuery} />
//           <FilterDropdown />
//         </div>
//       </div>
//       <div>
//         {isProductsLoading ? (
//           <Loading text="Loading all users..." className="w-fill h-fit p-20" />
//         ) : productData?.products?.length ? (
//           <DashboardTable
//             data={productData.products.slice(0, 6)}
//             columns={orderColumn}
//             currentPage={currentPage}
//             totalPages={productData.total || 1}
//             itemsPerPage={productData.limit || 10}
//             hasPreviousPage={false}
//             hasNextPage={false}
//             onPageChange={handlePageChange}
//             showPagination
//           />
//         ) : (
//           <div className="flex items-center justify-center p-20">
//             <p>No products found. Add your first product to get started.</p>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };
export {};
