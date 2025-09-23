"use client";

import SubscriptionBanner from "@/components/shared/banner/subscription-banner";
import { usePromotionService } from "@/services/dashboard/vendor/promotions/use-promotion-service";
import { ChevronLeft } from "lucide-react";

import { CampaignCard } from "../_components/campaign-card";

const Page = () => {
  const { useGetActiveCampaigns } = usePromotionService();
  const { data: campaigns } = useGetActiveCampaigns();

  return (
    <main className="space-y-8">
      <div className="flex items-center gap-4">
        <ChevronLeft
          onClick={() => {
            history.back();
          }}
          className="h-6 w-6 stroke-3"
        />
        <h4 className="">Active Campaigns</h4>
      </div>
      <SubscriptionBanner />
      <div className="space-y-4">
        {campaigns?.data?.items?.length ? (
          campaigns.data.items.map((campaign) => <CampaignCard key={campaign.id} campaign={campaign} />)
        ) : (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No active campaigns found.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Page;
