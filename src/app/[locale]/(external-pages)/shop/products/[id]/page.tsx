"use client";

import { Wrapper } from "@/components/core/layout/wrapper";
import SkiButton from "@/components/shared/button";
import { EmptyState } from "@/components/shared/empty-state";
import { useAppService } from "@/services/externals/app/use-app-service";
import { useParams } from "next/navigation";

import { ProductDetail, ProductDetailSkeleton } from "../../../(home)/_views/product-detail";

export default function Page() {
  const { id } = useParams();
  const { useGetSingleProduct } = useAppService();

  // Convert id to string since useParams returns string | string[]
  const productId = Array.isArray(id) ? id[0] : id;

  const { data: productResponse, isLoading, isError, refetch } = useGetSingleProduct(productId || "");

  if (isLoading)
    return (
      <Wrapper>
        <ProductDetailSkeleton />
      </Wrapper>
    );
  if (isError || !productResponse?.data)
    return (
      <Wrapper className="min-h-[480px] pt-16">
        <EmptyState
          images={[
            {
              src: "/images/empty-state.svg",
              alt: "Empty Cart",
              width: 100,
              height: 100,
            },
          ]}
          description={"Failed to load product. Please try again."}
          actionButton={
            <SkiButton onClick={() => refetch()} variant="default" className="bg-high-grey-I mt-4">
              Retry
            </SkiButton>
          }
        />
      </Wrapper>
    );

  return <ProductDetail product={productResponse.data} />;
}
