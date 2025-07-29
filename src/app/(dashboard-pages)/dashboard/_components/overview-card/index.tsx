import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

interface OverviewProperties {
  title: string;
  value: number | string;
  icon: ReactNode;
  iconClassName: string;
}

export const OverViewCard: FC<OverviewProperties> = ({ title, value, icon, iconClassName }) => {
  return (
    <Card className="min-h-[144px] w-full border-none px-[22px] py-[33px] shadow-none">
      <section className="flex w-full items-start justify-between self-center">
        <div className="space-y-[13px]">
          <p className="text-[18px] font-[500]">{title}</p>
          <p className="text-[24px] font-extrabold">{value}</p>
        </div>
        <div className={cn(`flex h-[42px] w-[42px] items-center justify-center rounded`, iconClassName)}>{icon}</div>
      </section>
    </Card>
  );
};
