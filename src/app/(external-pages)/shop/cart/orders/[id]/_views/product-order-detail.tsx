import { ProductBreadcrumb } from "@/app/(external-pages)/(home)/_components/product-breadcrumb";
import { Wrapper } from "@/components/core/layout/wrapper";
import SkiButton from "@/components/shared/button";
import { Ratings } from "@/components/shared/ratings";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ProductDetailProperties {
  product: {
    weight: number;
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage?: number;
    rating: number;
    stock: number;
    brand: string;
    thumbnail: string;
    images: string[];
    reviews: {
      rating: number;
      comment: string;
      date: string;
      reviewerName: string;
      reviewerEmail: string;
    }[];
    availabilityStatus: string;
    // Add other properties as needed
  };
}

export const ProductOrderDetail = ({ product }: ProductDetailProperties) => {
  const oldPrice = product.discountPercentage ? product.price / (1 - product.discountPercentage / 100) : null;
  return (
    <section className={`mt-[10rem]`}>
      <ProductBreadcrumb productTitle={`Order Details`} />
      <Wrapper className={`py-16`}>
        <div className={cn(`mb-8 flex items-baseline justify-between`)}>
          <h2 className={cn("text-high-grey-II text-sm font-black lg:text-3xl")}>Orders Details</h2>
        </div>
        <div
          className={cn(
            "flex items-center gap-8 rounded-lg border bg-no-repeat p-4",
            "bg-[url('/images/star-seller.svg')]",
          )}
        >
          <div className="relative z-[-1] aspect-square flex-1 overflow-hidden rounded-lg">
            <Image
              src={product.thumbnail}
              alt={product.title}
              width={600}
              height={600}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div className="flex-1 space-y-2">
            <p className="text-mid-grey-II text-[10px] capitalize lg:text-xl">Order #124376</p>
            <p className="line-clamp-2 text-xs font-medium lg:text-2xl">{product.title}</p>
            <Ratings rating={product.rating} />
            <p>QTY: 2</p>
            <div className="flex items-baseline gap-2">
              <p className="text-primary text-xs font-medium lg:text-xl">₦{product.price.toLocaleString()}</p>
              {oldPrice && (
                <p className="text-mid-danger text-[10px] line-through lg:text-lg">₦{oldPrice.toLocaleString()}</p>
              )}
            </div>
            <p className={`text-mid-grey-II text-[10px] underline lg:text-sm`}>By Skicom</p>
            <div className="mt-8 space-y-2 text-xl">
              <p className={`text-mid-grey-II text-sm`}>Placed On 22-01- 2025</p>
              <Badge className={`bg-mid-success text-[10px] lg:text-sm`}>Delivered</Badge>
              <p>On 27-01-2025</p>
            </div>
            <SkiButton variant="primary" size="xl" className="flex w-full items-center gap-2 rounded-full px-8">
              Rate Product
            </SkiButton>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};
