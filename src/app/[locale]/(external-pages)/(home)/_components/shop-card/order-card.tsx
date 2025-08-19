import SkiButton from "@/components/shared/button";
import { Ratings } from "@/components/shared/ratings";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { HTMLAttributes } from "react";

interface OrderCardProperties extends HTMLAttributes<HTMLDivElement> {
  id: string | undefined;
  title: string;
  rating: number;
  image: string;
  isStarSeller?: boolean;
  discount?: number;
  status: string;
}

export const OrderCard = ({
  id,
  title,
  rating,
  image,
  className,
  isStarSeller = true,
  status,
}: OrderCardProperties) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-8 rounded-lg border bg-no-repeat p-4 lg:flex-row",
        isStarSeller && "bg-[url('/images/star-seller.svg')]",
        className,
      )}
    >
      <div className="relative z-[-1] aspect-square overflow-hidden rounded-lg">
        <Image
          src={image}
          alt={title}
          width={400}
          height={400}
          className="h-[400px] w-[400px] object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="w-full space-y-2">
        <p className="text-mid-grey-II text-[10px] capitalize lg:text-sm">Order #{id}</p>
        <p className="line-clamp-2 text-xs font-medium lg:text-2xl">{title}</p>
        <Ratings rating={rating} />
        <div className="mt-8 space-y-2 text-xl">
          <Badge
            className={cn(
              `text-[10px] capitalize lg:text-sm`,
              status === "pending" && "bg-[#C5A83C]",
              status === "paid" && "bg-[#008000]",
            )}
          >
            {status}
          </Badge>
          <p className="text-mid-grey-III text-base">To be delivered 27-01-2025</p>
        </div>
      </div>
      <SkiButton variant={`link`} className={`text-primary`} href={`/shop/cart/orders/${id}`}>
        View Order Details
      </SkiButton>
    </div>
  );
};
