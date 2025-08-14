// "use client";

// import Loading from "@/app/Loading";
// import { SearchInput } from "@/components/core/miscellaneous/search-input";
// import { DashboardTable } from "@/components/shared/dashboard-table";
// import { EmptyState } from "@/components/shared/empty-state";
// import { productStatusOptions } from "@/lib/constants";
// import { formatCurrency } from "@/lib/i18n/utils";
// import { useDashboardSearchParameters } from "@/lib/nuqs/use-dashboard-search-parameters";
// import { useHomeService } from "@/services/dashboard/vendor/home/use-home-service";
// import { useDashboardProductService } from "@/services/dashboard/vendor/products/use-product-service";
// import { GiWallet } from "react-icons/gi";
// import { IoRibbonOutline } from "react-icons/io5";
// import { MdOutlineAddCard } from "react-icons/md";
// import { PiUsersThreeLight } from "react-icons/pi";
// import { RiShoppingCartLine } from "react-icons/ri";

// import { FilterDropdown } from "../../_components/dashboard-table/_components/filter-dropdown";
// import { OverViewCard } from "../../_components/overview-card";
// import { CurrencyDropdown } from "./_components/currency-dropdown";
// import { SectionTwo } from "./_components/currency-dropdown/section-two";
// import { AnalysisSkeleton, SectionTwoSkeleton, TableSkeleton } from "./page-skeleton";

// const Page = () => {
//   const {
//     // page: currentPage,
//     search: searchQuery,
//     productStatus,
//     // setPage: setCurrentPage,
//     setSearch: setSearchQuery,
//     setProductStatus,
//     resetToFirstPage,
//   } = useDashboardSearchParameters();

//   // const filters: IFilters = {
//   //   page: currentPage,
//   //   ...(productStatus !== "all" && { status: productStatus as "published" | "draft" }),
//   //   ...(searchQuery && { search: searchQuery }),
//   // };

//   // const { useGetAllProducts } = useDashboardProductService();
//   const { useGetOverview } = useHomeService();
//   // const { data: productData, isLoading: isProductsLoading, isError: isProductsError } = useGetAllProducts(filters);
//   const { data: overviewData, isLoading: isOverviewLoading, isError: isOverviewError } = useGetOverview();

//   // const handlePageChange = (page: number) => {
//   //   setCurrentPage(page.toString());
//   // };

//   const handleSearchChange = (newSearch: string) => {
//     setSearchQuery(newSearch);
//     resetToFirstPage(); // Reset to first page when search changes
//   };

//   const handleStatusChange = (newStatus: string) => {
//     setProductStatus(newStatus as "all" | "published" | "draft");
//     resetToFirstPage(); // Reset to first page when status changes
//   };

//   return (
//     <main>
//       <section className="mb-5 flex items-center justify-between">
//         <h4 className="text-mid-grey-III text-[18px] lg:text-[30px]">Dashboard Overview</h4>
//         <div>
//           <CurrencyDropdown />
//         </div>
//       </section>

//       {/* Overview Cards Section */}
//       {isOverviewLoading ? (
//         <AnalysisSkeleton />
//       ) : isOverviewError ? (
//         <EmptyState
//           title="Error loading data"
//           description="There was a problem fetching the overview data. Please try again later."
//           className="min-h-fit space-y-0 rounded-lg bg-red-50 p-6"
//           titleClassName={`!text-lg font-bold !text-mid-danger`}
//           descriptionClassName={`!text-mid-danger`}
//           images={[]}
//         />
//       ) : (
//         <section className="grid grid-cols-1 gap-5 lg:grid-cols-3">
//           <OverViewCard
//             title={"Total Revenue"}
//             value={formatCurrency(overviewData?.data?.overview?.totalRevenue || 0)}
//             icon={<GiWallet />}
//             iconClassName="bg-[#F2EBFB] text-[24px] text-purple"
//           />
//           <OverViewCard
//             title={"Total Orders"}
//             value={overviewData?.data?.overview?.totalOrders || "0"}
//             icon={<RiShoppingCartLine />}
//             iconClassName="bg-low-blue text-[24px] blue text-primary"
//           />
//           <OverViewCard
//             title={"Total Users"}
//             value={overviewData?.data?.overview?.totalUsers || "0"}
//             icon={<PiUsersThreeLight />}
//             iconClassName="bg-low-success text-[24px] text-mid-success"
//           />
//           <OverViewCard
//             title={"New Orders"}
//             value={overviewData?.data?.overview?.newOrders || "0"}
//             icon={<RiShoppingCartLine />}
//             iconClassName="bg-low-blue text-[24px] blue text-primary"
//           />
//           <OverViewCard
//             title={"Pending Payouts"}
//             value={overviewData?.data?.overview?.pendingPayouts || "0"}
//             icon={<MdOutlineAddCard />}
//             iconClassName="bg-low-danger text-[24px] text-mid-danger"
//           />
//           <OverViewCard
//             title={"Active Subscriptions"}
//             value={overviewData?.data?.overview?.activeSubscription || "0"}
//             icon={<IoRibbonOutline />}
//             iconClassName="bg-low-success text-[24px] text-mid-success"
//           />
//         </section>
//       )}

//       {/* Section Two */}
//       <section>
//         {isOverviewLoading ? (
//           <SectionTwoSkeleton />
//         ) : isOverviewError ? (
//           <EmptyState
//             title="Error loading Graph data"
//             description="There was a problem fetching the graph data. Please try again later."
//             className="min-h-fit space-y-0 rounded-lg bg-red-50 p-6"
//             titleClassName={`!text-lg font-bold !text-mid-danger`}
//             descriptionClassName={`!text-mid-danger`}
//             images={[]}
//           />
//         ) : (
//           <SectionTwo />
//         )}
//       </section>

//       {/* Products Table Section */}
//       <section>
//         {isProductsLoading ? (
//           <TableSkeleton />
//         ) : isProductsError ? (
//           <EmptyState
//             title="Error loading products"
//             description="There was a problem fetching the table data. Please try again later."
//             className="min-h-fit space-y-0 rounded-lg bg-red-50 p-6"
//             titleClassName={`!text-lg font-bold !text-mid-danger`}
//             descriptionClassName={`!text-mid-danger`}
//             images={[]}
//           />
//         ) : (
//           <section className={`mt-6 space-y-4 rounded-lg bg-white p-6`}>
//             <section className={`flex flex-col-reverse justify-between gap-4 lg:flex-row lg:items-center`}>
//               <div className="">
//                 <p className="text-lg font-bold">Recent Orders</p>
//               </div>
//               <div className="">
//                 <div className="flex items-center gap-2">
//                   <SearchInput className={``} onSearch={handleSearchChange} initialValue={searchQuery} />
//                   <FilterDropdown
//                     options={productStatusOptions}
//                     value={productStatus}
//                     onValueChange={handleStatusChange}
//                   />
//                 </div>
//               </div>
//             </section>
//             {/* <section>
//               {isProductsLoading ? (
//                 <Loading text="Loading products..." className="w-fill h-fit p-20" />
//               ) : productData?.data?.items?.length ? (
//                 <DashboardTable
//                   data={productData?.data?.items}
//                   columns={[]}
//                   pageParameter={currentPage.toString()}
//                   totalPages={productData?.data?.metadata?.totalPages}
//                   itemsPerPage={Number(productData?.data?.metadata?.total)}
//                   hasPreviousPage={productData?.data?.metadata?.hasPreviousPage || false}
//                   hasNextPage={productData?.data?.metadata?.hasNextPage || false}
//                   onPageChange={(page) => setCurrentPage(page.toString())}
//                   showPagination
//                 />
//               ) : (
//                 <div className="flex items-center justify-center p-20">
//                   <p>No products found. Add your first product to get started.</p>
//                 </div>
//               )}
//             </section> */}
//           </section>
//         )}
//       </section>
//     </main>
//   );
// };

// export default Page;
export {};
