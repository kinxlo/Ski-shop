"use client";

import { useAppService } from "@/services/externals/app/use-app-service";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { ProductOrderDetail } from "./_views/product-order-detail";

const LoadingSkeleton = () => (
  <div className="mt-[10rem] animate-pulse">
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 h-8 w-48 rounded bg-gray-200"></div>
      <div className="flex gap-8 rounded-lg border p-4">
        <div className="aspect-square flex-1 rounded-lg bg-gray-200"></div>
        <div className="flex-1 space-y-4">
          <div className="h-4 w-24 rounded bg-gray-200"></div>
          <div className="h-6 w-3/4 rounded bg-gray-200"></div>
          <div className="h-4 w-16 rounded bg-gray-200"></div>
          <div className="h-4 w-20 rounded bg-gray-200"></div>
          <div className="h-4 w-32 rounded bg-gray-200"></div>
          <div className="h-10 w-full rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
  </div>
);

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { useGetOrderById } = useAppService();
  const { data: orderResponse, isLoading, isError } = useGetOrderById(params.id);

  useEffect(() => {
    if (!isLoading && isError) {
      router.replace("/not-found");
    }
  }, [isLoading, isError, router]);

  if (isLoading) return <LoadingSkeleton />;
  if (!orderResponse?.data) return null;

  return <ProductOrderDetail order={orderResponse.data} />;
}
