// import Loading from "@/app/Loading";
// import { BlurImage } from "@/components/core/miscellaneous/blur-image";
// import { PayrollLineChart } from "@/components/shared/chart/payrool-linechart";
// import { Card, CardTitle } from "@/components/ui/card";
// import { useDashboardProductService } from "@/services/dashboard/vendor/products/use-product-service";

// export function SectionTwo() {
//   return (
//     <section className="grid grid-cols-1 gap-5 py-5 md:grid-cols-12">
//       <section className={`col-span-8`}>
//         <PayrollLineChart />
//       </section>
//       <section className={`col-span-4`}>
//         <BestSellerLayout />
//       </section>
//     </section>
//   );
// }

// const BestSellerLayout = () => {
//   const { useGetAllProducts } = useDashboardProductService();

//   const { data: productData, isLoading: isProductsLoading, isError } = useGetAllProducts();

//   if (isError) {
//     return (
//       <div className="flex items-center justify-center p-20">
//         <p>Error loading products. Please try again later.</p>
//       </div>
//     );
//   }

//   return (
//     <Card className={`h-full border-none p-6 shadow-none`}>
//       <CardTitle className="text-lg font-semibold text-gray-800">Best Sellers</CardTitle>
//       <section className={`h-[290px] space-y-4 overflow-auto`}>
//         {isProductsLoading ? (
//           <Loading text="Loading best selling products..." className="w-fill h-fit p-20" />
//         ) : productData?.items?.length ? (
//           productData.items.slice(0, 3).map((product) => (
//             <div key={product.id} className={`flex items-center justify-between gap-4`}>
//               <div className={`flex items-center gap-4`}>
//                 <div className={`flex size-[64px] items-center justify-center overflow-hidden rounded-lg bg-black/30`}>
//                   <BlurImage
//                     src={product.images[0]}
//                     alt={product.name}
//                     width={64}
//                     height={64}
//                     className={`h-fit w-fit rounded-lg object-contain`}
//                   />
//                 </div>
//                 <div>
//                   <h6 title={product.name} className={`max-w-[140px] truncate !text-sm font-black`}>
//                     {product.name}
//                   </h6>
//                   <p className={`text-sm text-gray-400`}>{formatCurrency(product.price)}</p>
//                 </div>
//               </div>
//               <p className={`text-sm text-gray-600`}>999 sales</p>
//             </div>
//           ))
//         ) : (
//           <div className="flex items-center justify-center p-20">
//             <p>No products found. Add your first product to get started.</p>
//           </div>
//         )}
//       </section>
//     </Card>
//   );
// };
export {};
