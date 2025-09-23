// import { useRouter } from "next/navigation";

import { BlurImage } from "@/components/core/miscellaneous/blur-image";
import { Locale } from "@/lib/i18n/config";
import { formatCurrency, formatDate, formatTime } from "@/lib/i18n/utils";
import { cn } from "@/lib/utils";
import { Ban, CircleCheck } from "lucide-react";
import { useLocale } from "next-intl";

export const useAdminOrderColumn = (): TableColumnDefinition<Order>[] => {
  const locale = useLocale();

  return [
    {
      header: "Products",
      accessorKey: "products",
      render: (_, order: Order) => (
        <div className="flex items-center space-x-2">
          <div className="relative">
            {order.products.length > 0 && order.products[0].images.length > 0 && (
              <BlurImage
                src={order.products[0].images[0]}
                alt={order.products[0].name}
                width={40}
                height={40}
                className="rounded-md object-cover"
              />
            )}
            {order.products.length > 1 && (
              <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
                +{order.products.length - 1}
              </div>
            )}
          </div>
          <div>
            <div className="text-xs font-medium">{order.products[0]?.name || "N/A"}</div>
            <div className="text-xs text-gray-500">
              {order.products[0].quantity} item{order.products[0].quantity > 1 ? "s" : ""}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Order ID",
      accessorKey: "id",
      render: (_, order: Order) => (
        <span className="inline-block max-w-[100px] cursor-help truncate text-xs font-medium" title={order.reference}>
          {order.reference.length > 10 ? `${order.reference.slice(0, 10)}...` : order.reference}
        </span>
      ),
    },
    {
      header: "Total Amount",
      accessorKey: "products",
      render: (_, order: Order) => {
        const totalAmount = order.products.reduce((sum, product) => sum + product.price * product.quantity, 0);
        return <span className="text-xs font-medium">{formatCurrency(totalAmount, locale as Locale)}</span>;
      },
    },
    {
      header: "Customer Name",
      accessorKey: "order",
      render: (_, order: Order) => (
        <span className="inline-block max-w-[100px] cursor-help truncate text-xs font-medium" title={order.buyer.name}>
          {order.buyer.name}
        </span>
      ),
    },
    {
      header: "Date and Time",
      accessorKey: "createdAt",
      render: (_, order: Order) => {
        return (
          <div>
            <span className={`text-xs`}>{formatDate(order.createdAt, locale as Locale)}</span> |{" "}
            <span className={`text-xs`}>{formatTime(order.createdAt, locale as Locale)}</span>
          </div>
        );
      },
    },
    {
      header: "Payment Status",
      accessorKey: "status",
      render: (_, order: Order) => (
        <span
          className={cn(
            `rounded-full px-2 py-1 text-xs capitalize`,
            order.status === "paid" && "bg-low-success text-mid-success",
            order.status === "pending" && "bg-yellow-100 text-yellow-600",
            order.status === "cancelled" && "bg-red-100 text-red-600",
            order.status === "delivered" && "bg-blue-100 text-blue-600",
          )}
        >
          {order.status}
        </span>
      ),
    },
    {
      header: "Delivery Status",
      accessorKey: "deliveryStatus",
      render: (_, order: Order) => (
        <span
          className={cn(
            `rounded-full px-2 py-1 text-xs capitalize`,
            order.deliveryStatus === "paid" && "bg-low-success text-mid-success",
            order.deliveryStatus === "pending" && "bg-yellow-100 text-yellow-600",
            order.deliveryStatus === "cancelled" && "bg-red-100 text-red-600",
            order.deliveryStatus === "delivered" && "bg-blue-100 text-blue-600",
          )}
        >
          {order.deliveryStatus}
        </span>
      ),
    },
  ];
};

export const useAdminUserColumn = (): TableColumnDefinition<Users>[] => {
  return [
    {
      header: "Name",
      accessorKey: "firstName",
      render: (_, user: Users) => (
        <span
          className="inline-block max-w-[150px] cursor-help truncate text-xs font-medium"
          title={`${user.firstName} ${user.lastName}`}
        >
          {user.firstName} {user.lastName}
        </span>
      ),
    },
    {
      header: "Phone Number",
      accessorKey: "phoneNumber",
      render: (_, user: Users) => <span className="text-xs font-medium">{user.phoneNumber || "N/A"}</span>,
    },
    {
      header: "Email Address",
      accessorKey: "email",
      render: (_, user: Users) => (
        <span className="inline-block max-w-[180px] cursor-help truncate text-xs font-medium" title={user.email}>
          {user.email}
        </span>
      ),
    },
    // there is a logical error here, isEmailVerified is being used to determine if user is active or inactive
    // ideally there should be a separate field in the user model to determine if user is active or inactive
    // for now, we will keep it as is
    {
      header: "Status",
      accessorKey: "isEmailVerified",
      render: (_, user: Users) => (
        <span
          className={cn(
            `rounded-full px-2 py-1 text-xs capitalize`,
            user.isEmailVerified && "bg-low-success text-mid-success",
            !user.isEmailVerified && "bg-red-100 text-red-600",
          )}
        >
          {user.isEmailVerified ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      header: "Orders",
      accessorKey: "ordersCount",
      render: (_, user: Users) => <span className="text-xs font-medium">{user.ordersCount || "-"}</span>,
    },
  ];
};

export const useAdminVendorColumn = (): TableColumnDefinition<Users>[] => {
  return [
    {
      header: "Store Name",
      accessorKey: "storeName",
      render: (_, user: Users) => {
        const storeName = (user as Users & { storeName?: string }).storeName;
        const displayName = storeName || `${user.firstName} ${user.lastName}`;
        return (
          <span className="inline-block max-w-[150px] cursor-help truncate text-xs font-medium" title={displayName}>
            {displayName}
          </span>
        );
      },
    },
    {
      header: "Phone Number",
      accessorKey: "phoneNumber",
      render: (_, user: Users) => <span className="text-xs font-medium">{user.phoneNumber || "N/A"}</span>,
    },
    {
      header: "Email Address",
      accessorKey: "email",
      render: (_, user: Users) => (
        <span className="inline-block max-w-[180px] cursor-help truncate text-xs font-medium" title={user.email}>
          {user.email}
        </span>
      ),
    },
    {
      header: "KYC Status",
      accessorKey: "kycStatus",
      render: (_, user: Users) => {
        const kycStatus = (user as Users & { kycStatus?: string }).kycStatus;
        return (
          <span
            className={cn(
              `rounded-full px-2 py-1 text-xs capitalize`,
              kycStatus === "approved" && "bg-low-success text-mid-success",
              kycStatus === "pending" && "bg-yellow-100 text-yellow-600",
              kycStatus === "rejected" && "bg-red-100 text-red-600",
              !kycStatus && "bg-yellow-100 text-yellow-600",
            )}
          >
            {kycStatus || "Pending"}
          </span>
        );
      },
    },
    {
      header: "Orders",
      accessorKey: "ordersCount",
      render: (_, user: Users) => <span className="text-xs font-medium">{user.ordersCount || "-"}</span>,
    },
    {
      header: "Status",
      accessorKey: "isEmailVerified",
      render: (_, user: Users) => (
        <span
          className={cn(
            `rounded-full px-2 py-1 text-xs capitalize`,
            user.isEmailVerified && "bg-low-success text-mid-success",
            !user.isEmailVerified && "bg-red-100 text-red-600",
          )}
        >
          {user.isEmailVerified ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];
};

export const useAdminPayoutRequestColumn = (): TableColumnDefinition<PayoutRequest>[] => {
  const locale = useLocale();

  return [
    {
      header: "Store/Rider's Name",
      accessorKey: "userName",
      render: (_, request: PayoutRequest) => (
        <span className="inline-block max-w-[150px] cursor-help truncate text-xs font-medium" title={request.userName}>
          {request.userName}
        </span>
      ),
    },
    {
      header: "Role",
      accessorKey: "role",
      render: (_, request: PayoutRequest) => (
        <span
          className={cn(
            "inline-block max-w-[100px] cursor-help truncate rounded-full px-2 py-1 text-xs font-medium capitalize",
            request.role === "vendor" && "text-primary",
            request.role === "rider" && "text-mid-warning",
          )}
          title={request.role}
        >
          {request.role}
        </span>
      ),
    },
    {
      header: "Wallet Balance",
      accessorKey: "walletBalance",
      render: (_, request: PayoutRequest) => (
        <span className="text-xs font-medium">{formatCurrency(request.walletBalance, locale as Locale)}</span>
      ),
    },
    {
      header: "Amount",
      accessorKey: "amount",
      render: (_, request: PayoutRequest) => (
        <span className="text-xs font-medium">{formatCurrency(request.amount, locale as Locale)}</span>
      ),
    },
    {
      header: "Date & Time",
      accessorKey: "dateTime",
      render: (_, request: PayoutRequest) => {
        const date = new Date(request.dateTime);
        return (
          <div>
            <span className="text-xs">{formatDate(date, locale as Locale)}</span> |{" "}
            <span className="text-xs">{formatTime(date, locale as Locale)}</span>
          </div>
        );
      },
    },
    {
      header: "Action",
      accessorKey: "payoutAction",
      render: () => {
        return (
          <div className="flex items-center gap-4">
            <button
              onClick={(event) => {
                event.stopPropagation();
                // TODO: Implement approve logic
              }}
              className="cursor-pointer rounded p-1 transition-colors hover:bg-green-50"
              title="Approve payout request"
            >
              <CircleCheck className="text-mid-success h-5 w-5 stroke-3" />
            </button>
            <button
              onClick={(event) => {
                event.stopPropagation();
                // TODO: Implement reject logic
              }}
              className="cursor-pointer rounded p-1 transition-colors hover:bg-red-50"
              title="Reject payout request"
            >
              <Ban className="text-mid-danger h-5 w-5 stroke-3" />
            </button>
          </div>
        );
      },
    },
  ];
};

export const useAdminPayoutHistoryColumn = (): TableColumnDefinition<PayoutHistory>[] => {
  const locale = useLocale();

  return [
    {
      header: "Store/Rider's Name",
      accessorKey: "userName",
      render: (_, history: PayoutHistory) => (
        <span className="inline-block max-w-[150px] cursor-help truncate text-xs font-medium" title={history.userName}>
          {history.userName}
        </span>
      ),
    },
    {
      header: "Role",
      accessorKey: "role",
      render: (_, history: PayoutHistory) => (
        <span
          className={cn(
            "inline-block max-w-[100px] cursor-help truncate rounded-full px-2 py-1 text-xs font-medium capitalize",
            history.role === "vendor" && "text-primary",
            history.role === "rider" && "text-mid-warning",
          )}
          title={history.role}
        >
          {history.role}
        </span>
      ),
    },
    {
      header: "Amount",
      accessorKey: "amount",
      render: (_, history: PayoutHistory) => (
        <span className="text-xs font-medium">{formatCurrency(history.amount, locale as Locale)}</span>
      ),
    },
    {
      header: "Date & Time",
      accessorKey: "dateTime",
      render: (_, history: PayoutHistory) => {
        const date = new Date(history.dateTime);
        return (
          <div>
            <span className="text-xs">{formatDate(date, locale as Locale)}</span> |{" "}
            <span className="text-xs">{formatTime(date, locale as Locale)}</span>
          </div>
        );
      },
    },
    {
      header: "Status",
      accessorKey: "status",
      render: (_, history: PayoutHistory) => (
        <span
          className={cn(
            "rounded-full px-2 py-1 text-xs capitalize",
            history.status === "completed" && "bg-low-success text-mid-success",
            history.status === "failed" && "bg-red-100 text-red-600",
          )}
        >
          {history.status}
        </span>
      ),
    },
  ];
};

export const useAdminRiderColumn = (): TableColumnDefinition<Users>[] => {
  return [
    {
      header: "Name",
      accessorKey: "firstName",
      render: (_, user: Users) => (
        <span
          className="inline-block max-w-[150px] cursor-help truncate text-xs font-medium"
          title={`${user.firstName} ${user.lastName}`}
        >
          {user.firstName} {user.lastName}
        </span>
      ),
    },
    {
      header: "Phone Number",
      accessorKey: "phoneNumber",
      render: (_, user: Users) => <span className="text-xs font-medium">{user.phoneNumber || "N/A"}</span>,
    },
    {
      header: "Email Address",
      accessorKey: "email",
      render: (_, user: Users) => (
        <span className="inline-block max-w-[180px] cursor-help truncate text-xs font-medium" title={user.email}>
          {user.email}
        </span>
      ),
    },
    {
      header: "Availability",
      accessorKey: "availability",
      render: (_, user: Users) => {
        const availability = (user as Users & { availability?: string }).availability;
        return (
          <span
            className={cn(
              `rounded-full px-2 py-1 text-xs capitalize`,
              availability === "online" && "bg-low-success text-mid-success",
              availability === "offline" && "bg-red-100 text-red-600",
              !availability && "bg-red-100 text-red-600",
            )}
          >
            {availability || "Offline"}
          </span>
        );
      },
    },
    {
      header: "Deliveries",
      accessorKey: "deliveriesCount",
      render: (_, user: Users) => {
        const deliveriesCount = (user as Users & { deliveriesCount?: number }).deliveriesCount;
        return <span className="text-xs font-medium">{deliveriesCount || 0}</span>;
      },
    },
    {
      header: "Status",
      accessorKey: "isEmailVerified",
      render: (_, user: Users) => (
        <span
          className={cn(
            `rounded-full px-2 py-1 text-xs capitalize`,
            user.isEmailVerified && "bg-low-success text-mid-success",
            !user.isEmailVerified && "bg-red-100 text-red-600",
          )}
        >
          {user.isEmailVerified ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];
};

export const useAdminOrderHistoryColumn = (): TableColumnDefinition<Order>[] => {
  const locale = useLocale();

  return [
    {
      header: "Order ID",
      accessorKey: "id",
      render: (_, order: Order) => (
        <span className="inline-block max-w-[100px] cursor-help truncate text-xs font-medium" title={order.reference}>
          {order.reference.length > 10 ? `${order.reference.slice(0, 10)}...` : order.reference}
        </span>
      ),
    },
    {
      header: "Date and Time",
      accessorKey: "createdAt",
      render: (_, order: Order) => {
        return (
          <div>
            <span className={`text-xs`}>{formatDate(order.createdAt, locale as Locale)}</span> |{" "}
            <span className={`text-xs`}>{formatTime(order.createdAt, locale as Locale)}</span>
          </div>
        );
      },
    },
    {
      header: "Vendor",
      accessorKey: "order",
      render: (_, order: Order) => {
        const vendors = [
          ...new Set(
            (order.products || [])
              .map((product) => product?.vendor?.name)
              .filter((name): name is string => Boolean(name && name.trim())),
          ),
        ];
        const display = vendors[0] || "N/A";
        const extraCount = vendors.length > 1 ? vendors.length - 1 : 0;
        const title = vendors.length > 0 ? vendors.join(", ") : "N/A";

        return (
          <span className="inline-block max-w-[140px] cursor-help truncate text-xs font-medium" title={title}>
            {display}
            {extraCount > 0 ? ` (+${extraCount})` : ""}
          </span>
        );
      },
    },
    {
      header: "Total Amount",
      accessorKey: "products",
      render: (_, order: Order) => {
        const totalAmount = order.products.reduce((sum, product) => sum + product.price * product.quantity, 0);
        return <span className="text-xs font-medium">{formatCurrency(totalAmount, locale as Locale)}</span>;
      },
    },
    // {
    //   header: "Payment Status",
    //   accessorKey: "status",
    //   render: (_, order: Order) => (
    //     <span
    //       className={cn(
    //         `rounded-full px-2 py-1 text-xs capitalize`,
    //         order.status === "paid" && "bg-low-success text-mid-success",
    //         order.status === "pending" && "bg-yellow-100 text-yellow-600",
    //         order.status === "cancelled" && "bg-red-100 text-red-600",
    //         order.status === "delivered" && "bg-blue-100 text-blue-600",
    //       )}
    //     >
    //       {order.status}
    //     </span>
    //   ),
    // },
    {
      header: "Delivery Status",
      accessorKey: "deliveryStatus",
      render: (_, order: Order) => (
        <span
          className={cn(
            `rounded-full px-2 py-1 text-xs capitalize`,
            order.deliveryStatus === "paid" && "bg-low-success text-mid-success",
            order.deliveryStatus === "pending" && "bg-yellow-100 text-yellow-600",
            order.deliveryStatus === "cancelled" && "bg-red-100 text-red-600",
            order.deliveryStatus === "delivered" && "bg-blue-100 text-blue-600",
          )}
        >
          {order.deliveryStatus}
        </span>
      ),
    },
  ];
};

export const useAdminProductColumn = (): TableColumnDefinition<Product>[] => {
  const locale = useLocale();

  return [
    {
      header: "Product",
      accessorKey: "name",
      render: (_, product: Product) => (
        <div className="flex items-center space-x-2">
          {product.images.length > 0 && (
            <BlurImage
              src={product.images[0]}
              alt={product.name}
              width={40}
              height={40}
              className="rounded-md object-cover"
            />
          )}
          <div>
            <div className="text-xs font-medium">{product.name}</div>
            <div className="text-xs text-gray-500">{product.category}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Store",
      accessorKey: "store",
      render: (_, product: Product) => (
        <span
          className="inline-block max-w-[150px] cursor-help truncate text-xs font-medium"
          title={product.store.name}
        >
          {product.store.name}
        </span>
      ),
    },
    {
      header: "Price",
      accessorKey: "price",
      render: (_, product: Product) => (
        <span className="text-xs font-medium">{formatCurrency(product.price, locale as Locale)}</span>
      ),
    },
    {
      header: "Stock",
      accessorKey: "stockCount",
      render: (_, product: Product) => <span className="text-xs font-medium">{product.stockCount}</span>,
    },
    {
      header: "Rating",
      accessorKey: "rating",
      render: (_, product: Product) => <span className="text-xs font-medium">{product.rating}</span>,
    },
    {
      header: "Status",
      accessorKey: "status",
      render: (_, product: Product) => (
        <span
          className={cn(
            `rounded-full px-2 py-1 text-xs capitalize`,
            product.status === "published" && "bg-low-success text-mid-success",
            product.status === "draft" && "bg-yellow-100 text-yellow-600",
          )}
        >
          {product.status}
        </span>
      ),
    },
  ];
};
