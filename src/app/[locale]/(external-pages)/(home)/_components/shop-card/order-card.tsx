import { Ratings } from "@/components/shared/ratings";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { HTMLAttributes } from "react";

interface OrderCardProperties extends HTMLAttributes<HTMLDivElement> {
  id: string | undefined;
  title: string;
  rating: number;
  image: string;
  isStarSeller?: boolean;
  discount?: number;
  status: OrderStatus;
}

export const OrderCard = ({
  id,
  title,
  rating,
  image,
  className,
  isStarSeller = false,
  status,
}: OrderCardProperties) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-8 rounded-lg border bg-no-repeat p-2 lg:flex-row lg:items-start",
        isStarSeller && "bg-[url('/images/star-seller.svg')]",
        className,
      )}
    >
      <div className="overflow-hidden rounded-lg">
        <Image
          priority
          src={image}
          alt={title}
          width={400}
          height={400}
          className="object-contain transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="w-full space-y-2">
        <p className="!truncate !text-[10px] capitalize md:!text-sm">Order #{id}</p>
        <p className="!text-foreground line-clamp-2 !text-sm !font-semibold md:!text-base lg:!text-xl">{title}</p>
        <Ratings rating={rating} />
        <div className="mt-8 space-y-2 text-xl">
          <Link href={`/shop/cart/orders/${id}`} className="text-primary !text-sm md:!text-base">
            View Order Details
          </Link>
          <p className="hidden !text-sm md:!text-base">To be delivered 27-01-2025</p>
        </div>
      </div>
      <Badge
        className={cn(
          `!text-xs capitalize md:!text-sm`,
          status === "pending" && "bg-[#C5A83C]",
          status === "paid" && "bg-[#008000]",
          status === "delivered" && "bg-mid-success",
          status === "cancelled" && "bg-mid-danger",
        )}
      >
        {status}
      </Badge>
    </div>
  );
};
