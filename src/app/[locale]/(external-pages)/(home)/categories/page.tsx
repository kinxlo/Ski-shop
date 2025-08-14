// "use client";

// import { Wrapper } from "@/components/core/layout/wrapper";
// import { Paginations } from "@/components/shared/pagination/pagination";
// import { products } from "@/lib/constants";
// import { useState } from "react";

// import { ProductBreadcrumb } from "../_components/product-breadcrumb";
// import { ShopCard } from "../_components/shop-card/shop-card";

// const ITEMS_PER_PAGE = 8;

// const CategoriesProducts = () => {
//   const [currentPage, setCurrentPage] = useState(1);

//   const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const currentProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

//   return (
//     <section className="py-[10rem]">
//       <ProductBreadcrumb productTitle="Phones" />
//       <Wrapper className="py-16">
//         <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
//           {currentProducts.map((product) => (
//             <ShopCard
//               key={product.id}
//               id={product.id}
//               category={product.category}
//               title={product.title}
//               rating={product.rating}
//               price={product.price}
//               oldPrice={product.oldPrice}
//               image={product.image}
//             />
//           ))}
//         </div>
//         <div className="mt-8 flex justify-center">
//           <Paginations currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
//         </div>
//       </Wrapper>
//     </section>
//   );
// };

// export default CategoriesProducts;
export {};
