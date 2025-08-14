import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";
import Image from "next/image";

type Campaign = {
  id: string;
  productName: string;
  productImage: string;
  type: "Search Boost" | "Featured Products" | "Banner Ads";
  daysLeft: number;
  impressions: number;
  clicks: number;
  conversionRate: number; // percentage
};

const campaigns: Campaign[] = [
  {
    id: "1",
    productName: "Sony Playstation Console White Edition",
    productImage: "/images/Apple.png",
    type: "Search Boost",
    daysLeft: 3,
    impressions: 1240,
    clicks: 132,
    conversionRate: 7.5,
  },
  {
    id: "2",
    productName: "Sony Playstation Console White Edition",
    productImage: "/images/Apple.png",
    type: "Featured Products",
    daysLeft: 1,
    impressions: 1240,
    clicks: 132,
    conversionRate: 7.5,
  },
  {
    id: "3",
    productName: "Sony Playstation Console White Edition",
    productImage: "/images/Apple.png",
    type: "Banner Ads",
    daysLeft: 2,
    impressions: 1240,
    clicks: 132,
    conversionRate: 7.5,
  },
  {
    id: "4",
    productName: "Sony Playstation Console White Edition",
    productImage: "/images/Apple.png",
    type: "Search Boost",
    daysLeft: 3,
    impressions: 1240,
    clicks: 132,
    conversionRate: 7.5,
  },
];

const typeBadgeClass: Record<Campaign["type"], string> = {
  "Search Boost": "bg-emerald-50 text-emerald-600 border-emerald-200",
  "Featured Products": "bg-blue-50 text-blue-600 border-blue-200",
  "Banner Ads": "bg-orange-50 text-orange-600 border-orange-200",
};

function CampaignCard({ campaign }: { campaign: Campaign }) {
  return (
    <Card className="border-border p-4 shadow-none sm:p-5">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="shrink-0">
            <Image
              src={campaign.productImage}
              alt={campaign.productName}
              width={44}
              height={44}
              className="rounded-md object-cover"
            />
          </div>
          <p className="text-foreground truncate text-sm font-medium sm:text-base">{campaign.productName}</p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Badge className={cn("rounded-full px-2.5 py-1 text-[11px] sm:text-xs", typeBadgeClass[campaign.type])}>
            {campaign.type}
          </Badge>
          <Badge className="rounded-full border-rose-200 bg-rose-50 px-2.5 py-1 text-[11px] text-rose-600 sm:text-xs">
            <Clock className="h-3.5 w-3.5" /> {campaign.daysLeft} days left
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <div className="rounded-md border bg-white p-3 text-center">
          <p className="text-foreground text-sm font-semibold">{campaign.impressions.toLocaleString()}</p>
          <p className="text-muted-foreground text-[11px] sm:text-xs">Impressions</p>
        </div>
        <div className="rounded-md border bg-white p-3 text-center">
          <p className="text-foreground text-sm font-semibold">{campaign.clicks.toLocaleString()}</p>
          <p className="text-muted-foreground text-[11px] sm:text-xs">Clicks</p>
        </div>
        <div className="rounded-md border bg-white p-3 text-center">
          <p className="text-foreground text-sm font-semibold">{campaign.conversionRate}%</p>
          <p className="text-muted-foreground text-[11px] sm:text-xs">Conv. Rate</p>
        </div>
      </div>
    </Card>
  );
}

const Page = () => {
  return (
    <section className="space-y-4 sm:space-y-5">
      <header className="mb-2">
        <h4 className="text-mid-grey-III text-[18px] !font-bold lg:text-[30px]">Active Campaigns</h4>
      </header>

      <div className="space-y-4">
        {campaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </section>
  );
};

export default Page;
