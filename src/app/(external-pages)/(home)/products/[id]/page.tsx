import { products } from "@/lib/constants";
import { notFound } from "next/navigation";

import { ProductDetail } from "../../_views/product-detail";

interface PageProperties {
  params: {
    id: string;
  };
}

const Page = ({ params }: PageProperties) => {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
};

export default Page;
