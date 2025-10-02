"use client";

import { Wrapper } from "@/components/core/layout/wrapper";
import { ErrorState } from "@/components/shared/empty-state";
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
      <main>
        <Wrapper className="px-4 sm:px-6 lg:px-8">
          <ProductDetailSkeleton />
        </Wrapper>
      </main>
    );
  if (isError || !productResponse?.data)
    return <ErrorState className={`mx-auto mt-30 max-w-[1240px]`} onRetry={() => refetch()} />;

  return (
    <main>
      <ProductDetail product={productResponse.data} />
    </main>
  );
}
