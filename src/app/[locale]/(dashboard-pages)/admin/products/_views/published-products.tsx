// "use client";

// import Loading from "@/app/Loading";
// import { SearchInput } from "@/components/core/miscellaneous/search-input";
// import { DashboardTable } from "@/components/shared/dashboard-table";
// import { productColumn } from "@/components/shared/dashboard-table/table-data";
// import { EmptyState, FilteredEmptyState } from "@/components/shared/empty-state";
// import { useProductService } from "@/services/externals/products/use-product-service";
// import { useState } from "react";

// import empty1 from "~/images/empty-state.svg";

// // Define product-specific filter options
// const productStatusOptions = [
//   { value: "all", label: "All Products" },
//   { value: "published", label: "Published" },
//   { value: "draft", label: "Draft" },
//   { value: "archived", label: "Archived" },
// ];

// export const PublishedProducts = () => {
//   // const { data: session } = useSession();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [status, setStatus] = useState<string>("all");

//   // Initialize product service
//   const { useGetAllProducts } = useProductService();

//   const filters: IFilters = {
//     page: currentPage,
//     ...(status !== "all" && { status: status as "published" | "draft" }),
//     ...(searchQuery && { search: searchQuery }),
//   };

//   // Fetch products data
//   // const {a
//     // data: productData,
//     // isLoading: isProductsLoading,
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
//     <>
//       <div className="mb-2 flex items-center justify-between gap-2">
//         <h6 className={`!text-lg font-semibold`}>Published</h6>
//         <div className={`flex items-center gap-2`}>
//           <SearchInput className={``} onSearch={setSearchQuery} />
//           {/* <FilterDropdown
//             value={status}
//             onValueChange={setStatus}
//             options={productStatusOptions}
//             placeholder="Product Status"
//           /> */}
//         </div>
//       </div>
//       {/* <section>
//         {isProductsLoading ? (
//           <Loading text="Loading products..." className="w-fill h-fit p-20" />
//         ) : productData?.products?.length ? (
//           <DashboardTable
//             data={productData.products.slice(0, 6)}
//             columns={productColumn}
//             currentPage={currentPage}
//             totalPages={productData.total || 1}
//             itemsPerPage={productData.limit || 10}
//             hasPreviousPage={false}
//             hasNextPage={false}
//             onPageChange={handlePageChange}
//           />
//         ) : status === "all" ? (
//           <FilteredEmptyState
//             onReset={() => {
//               setStatus("all");
//               setCurrentPage(1);
//             }}
//           />
//         ) : (
//           <EmptyState
//             images={[{ src: empty1.src, alt: "No employees", width: 100, height: 100 }]}
//             title="No employee yet."
//             description="Once you add team members, you’ll see their details here, including department, role, work status, and more."
//             button={{
//               text: "Add New Employee",
//               onClick: () => {
//                 return;
//                 // router.push(`/dashboard/products/new`);
//               },
//             }}
//           />
//         )}
//       </section> */}
//     </>
//   );
// };

export {};
