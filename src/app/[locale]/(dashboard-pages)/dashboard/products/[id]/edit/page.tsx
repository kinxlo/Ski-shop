"use client";

import { EditProductForm } from "@/app/[locale]/(dashboard-pages)/_components/forms/edit-product-form";
import { useDashboardProductService } from "@/services/dashboard/vendor/products/use-product-service";
import { useLocale } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function EditProductPage() {
  const locale = useLocale();
  const parameters = useParams();
  const router = useRouter();
  const productId = parameters.id as string;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { useGetSingleProduct } = useDashboardProductService();
  const { data: productResponse, isLoading, isError } = useGetSingleProduct(productId);

  const product = productResponse?.data;

  const handleSuccess = () => {
    toast.success("Product updated successfully");
    router.push(`/${locale}/dashboard/products/${productId}`);
  };

  const handleCancel = () => {
    router.push(`/${locale}/dashboard/products/${productId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="mb-8 h-8 w-64 rounded bg-gray-200"></div>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <div className="h-96 rounded bg-gray-200"></div>
              </div>
              <div className="space-y-4 lg:col-span-6">
                <div className="h-14 rounded bg-gray-200"></div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-14 rounded bg-gray-200"></div>
                  <div className="h-14 rounded bg-gray-200"></div>
                  <div className="h-14 rounded bg-gray-200"></div>
                </div>
                <div className="h-32 rounded bg-gray-200"></div>
                <div className="h-14 rounded bg-gray-200"></div>
                <div className="h-14 rounded bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Product Not Found</h2>
          <p className="mb-4 text-gray-600">
            The product you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <button
            onClick={() => router.push(`/${locale}/dashboard/products`)}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="">
        <EditProductForm
          product={product}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
        />
      </div>
    </div>
  );
}
