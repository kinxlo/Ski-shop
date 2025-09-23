import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";
import Image from "next/image";

const typeBadgeClass: Record<Campaign["type"], string> = {
  "Search Boost": "bg-emerald-50 text-emerald-600 border-emerald-200",
  "Featured Products": "bg-blue-50 text-blue-600 border-blue-200",
  "Banner Ads": "bg-orange-50 text-orange-600 border-orange-200",
};

export function CampaignCard({ campaign }: { campaign: Campaign }) {
  return (
    <Card className="p-4 shadow-none sm:p-5">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="shrink-0">
            <Image
              src={campaign.product.images[0]}
              alt={campaign.product.name}
              width={44}
              height={44}
              className="size-4 rounded-md object-cover lg:h-12 lg:w-12"
            />
          </div>
          <p className="text-sm !font-bold lg:text-base">{campaign.product.name}</p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Badge className={cn("rounded-full px-2.5 py-1 text-[11px] sm:text-xs", typeBadgeClass[campaign.type])}>
            {campaign.type}
          </Badge>
          <Badge className="text-mid-danger bg-destructive/10 rounded-full px-2.5 py-1 text-[11px] sm:text-xs">
            <Clock className="h-3.5 w-3.5" /> {campaign.duration} days left
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-background rounded-md border p-3 text-center">
          <p className="text-foreground text-sm !font-semibold">{campaign.impressions.toLocaleString()}</p>
          <p className="text-muted-foreground text-[11px] sm:text-xs">Impressions</p>
        </div>
        <div className="bg-background rounded-md border p-3 text-center">
          <p className="text-foreground text-sm !font-semibold">{campaign.clicks.toLocaleString()}</p>
          <p className="text-muted-foreground text-[11px] sm:text-xs">Clicks</p>
        </div>
        <div className="bg-background rounded-md border p-3 text-center">
          <p className="text-foreground text-sm !font-semibold">{campaign.conversionRate}%</p>
          <p className="text-muted-foreground text-[11px] sm:text-xs">Conv. Rate</p>
        </div>
      </div>
    </Card>
  );
}
