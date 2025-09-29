"use client";

import { PromoteProductModal } from "@/app/[locale]/(dashboard-pages)/dashboard/products/_components/promote-product-modal";
import { Icons } from "@/components/core/miscellaneous/icons";
import SkiButton from "@/components/shared/button";
import { useDashboardProductService } from "@/services/dashboard/vendor/products/use-product-service";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { DashboardHeader } from "../../_components/dashboard-header";
import { ProductPromotionCard } from "./_components/product-card";

const Page = () => {
  const { useGetAllProducts } = useDashboardProductService();
  const { data: products } = useGetAllProducts({});
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{
    id: string;
    name: string;
    price: number;
  } | null>(null);

  const handlePromoteProduct = (product: { id: string; name: string; price: number }) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleViewActiveCampaigns = () => {
    router.push("/dashboard/promotions/active-campaigns");
  };

  return (
    <main className="space-y-8">
      <DashboardHeader
        actionComponent={
          <SkiButton variant="primary" onClick={handleViewActiveCampaigns}>
            Active Campaigns
          </SkiButton>
        }
        title="Promotions"
        subtitle={`Manage your promotions, create new promotions and view active campaigns`}
        showSubscriptionBanner
        icon={<Icons.promotion />}
      />

      {/* Products for Promotion */}
      <div className="space-y-4">
        <h5 className="text-lg font-semibold">Promote Your Products</h5>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products?.data?.items?.map((product) => (
            <ProductPromotionCard key={product.id} product={product} onPromote={handlePromoteProduct} />
          ))}
        </div>
      </div>

      {/* Promotion Modal */}
      {selectedProduct && (
        <PromoteProductModal isOpen={isModalOpen} onClose={handleCloseModal} product={selectedProduct} />
      )}
    </main>
  );
};

export default Page;
