import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/i18n/utils";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface OrderTableProperties {
  orders: Array<{
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
  }>;
  onStatusUpdate?: (orderId: string, status: "pending" | "delivered" | "cancelled") => void;
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

export const OrderTable: FC<OrderTableProperties> = ({ orders, onStatusUpdate }) => {
  const router = useRouter();

  const handleRowClick = (orderId: string) => {
    router.push(`/dashboard/orders/${orderId}`);
  };

  const handleActionClick = (
    event: React.MouseEvent,
    orderId: string,
    status: "pending" | "delivered" | "cancelled",
  ) => {
    event.stopPropagation(); // Prevent row click when clicking action buttons
    onStatusUpdate?.(orderId, status);
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Products</TableHead>
            <TableHead>Buyer</TableHead>
            <TableHead>Delivery Address</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order.id}
              className="cursor-pointer transition-colors hover:bg-gray-50"
              onClick={() => handleRowClick(order.id)}
            >
              <TableCell className="font-medium">{order.orderId}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Image
                      src={order.products[0].image}
                      alt={order.products[0].name}
                      width={40}
                      height={40}
                      className="rounded-md object-cover"
                    />
                    {order.products.length > 1 && (
                      <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
                        +{order.products.length - 1}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{order.products[0].name}</div>
                    <div className="text-sm text-gray-500">
                      {order.products.length} item{order.products.length > 1 ? "s" : ""}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{order.buyer.name}</div>
                  <div className="text-sm text-gray-500">{order.buyer.email}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="max-w-xs truncate">{order.delivery.address}</div>
              </TableCell>
              <TableCell className="font-medium">{formatCurrency(order.totalAmount)}</TableCell>
              <TableCell>{formatDate(order.createdAt)}</TableCell>
              <TableCell>
                <Badge className={cn("px-2 py-1 text-xs", getStatusColor(order.status))}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(event) => handleActionClick(event, order.id, "delivered")}
                    disabled={order.status === "delivered"}
                  >
                    Mark Delivered
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(event) => handleActionClick(event, order.id, "cancelled")}
                    disabled={order.status === "cancelled"}
                  >
                    Cancel
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
