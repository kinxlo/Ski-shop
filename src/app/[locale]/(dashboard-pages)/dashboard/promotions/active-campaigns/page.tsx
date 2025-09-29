"use client";

import { BackButton } from "@/components/shared/back-button";
import { usePromotionService } from "@/services/dashboard/vendor/promotions/use-promotion-service";

import { CampaignCard } from "../_components/campaign-card";
import { DashboardHeader } from "../../../_components/dashboard-header";

const Page = () => {
  const { useGetActiveCampaigns } = usePromotionService();
  const { data: campaigns } = useGetActiveCampaigns();

  return (
    <main className="space-y-8">
      <DashboardHeader
        title="Active Campaigns"
        subtitle={`View your active campaigns, view the performance of your campaigns and view the details of your campaigns`}
        showSubscriptionBanner
        icon={<BackButton />}
      />

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
