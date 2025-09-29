import SubscriptionBanner from "@/components/shared/banner/subscription-banner";
import { cn } from "@/lib/utils";

export const DashboardHeader = ({
  actionComponent,
  title,
  subtitle,
  showSubscriptionBanner = true,
  titleClassName,
  subtitleClassName,
  icon,
}: {
  actionComponent?: React.ReactNode;
  title: string;
  subtitle?: string;
  showSubscriptionBanner?: boolean;
  titleClassName?: string;
  subtitleClassName?: string;
  icon?: React.ReactNode;
}) => {
  return (
    <>
      <section className="flex items-center justify-between">
        <div>
          <h4 className={cn("flex items-center gap-2", titleClassName)}>
            {icon}
            {title}
          </h4>
          {subtitle && <p className={cn("text-muted-foreground", subtitleClassName)}>{subtitle}</p>}
        </div>
        {actionComponent}
      </section>
      {showSubscriptionBanner && <SubscriptionBanner />}
    </>
  );
};
