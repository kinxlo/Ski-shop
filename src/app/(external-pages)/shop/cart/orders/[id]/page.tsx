/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAppService } from "@/services/app/use-app-service";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { ProductOrderDetail } from "./_views/product-order-detail";

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { useGetAllProducts } = useAppService();
  const { isLoading, data } = useGetAllProducts();

  const productId = Number(params.id);
  const product = data?.products.find((p: any) => Number(p.id) === productId);

  useEffect(() => {
    if (!isLoading && !product) {
      router.replace("/not-found");
    }
  }, [isLoading, product, router]);

  if (isLoading) return <div>Loading...</div>;
  if (!product) return null;

  return <ProductOrderDetail product={product} />;
}
