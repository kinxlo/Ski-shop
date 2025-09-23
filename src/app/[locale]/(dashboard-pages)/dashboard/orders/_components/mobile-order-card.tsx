import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/i18n/utils";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FC } from "react";

interface MobileOrderCardProperties {
  order: {
    id: string;
    orderId: string;
    status: "pending" | "delivered" | "cancelled";
    products: Array<{
      id: string;
      name: string;
      image: string;
      price: number;
      quantity: number;
    }>;
    buyer: {
      name: string;
      email: string;
    };
    delivery: {
      address: string;
      city: string;
      state: string;
    };
    totalAmount: number;
    createdAt: string;
  };
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending": {
      return "bg-yellow-500 text-white";
    }
    case "delivered": {
      return "bg-green-500 text-white";
    }
    case "cancelled": {
      return "bg-red-500 text-white";
    }
    default: {
      return "bg-gray-500 text-white";
    }
  }
};

export const MobileOrderCard: FC<MobileOrderCardProperties> = ({ order }) => {
  const mainProduct = order.products[0];
  const additionalProductsCount = order.products.length - 1;

  return (
    <Card className="space-y-3 p-4">
      {/* Status Badge */}
      <div className="flex justify-end">
        <Badge className={cn("rounded-full px-2 py-1 text-xs", getStatusColor(order.status))}>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </Badge>
      </div>

      {/* Order ID */}
      <div className="text-sm text-gray-600">
        Order ID: <span className="font-medium">{order.orderId}</span>
      </div>

      {/* Product Info */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="text-sm text-gray-600">
            Product(s): <span className="font-medium">{mainProduct.name}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Image
              src={mainProduct.image}
              alt={mainProduct.name}
              width={40}
              height={40}
              className="rounded-md object-cover"
            />
            {additionalProductsCount > 0 && (
              <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
                +{additionalProductsCount}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Buyer Info */}
      <div className="text-sm text-gray-600">
        Buyer: <span className="font-medium">{order.buyer.name}</span>
      </div>

      {/* Delivery Address */}
      <div className="text-sm text-gray-600">
        Delivery: <span className="font-medium">{order.delivery.address}</span>
      </div>

      {/* Date */}
      <div className="text-sm text-gray-600">
        Date: <span className="font-medium">{formatDate(order.createdAt)}</span>
      </div>
    </Card>
  );
};
