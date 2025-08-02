// import { useRouter } from "next/navigation";

import { BlurImage } from "@/components/core/miscellaneous/blur-image";
import { Locale } from "@/lib/i18n/config";
import { formatCurrency, formatDate } from "@/lib/i18n/utils";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";

import { User } from "./type";

// export const useEmployeeproductActions = () => {
//   const router = useRouter();

//   const getproductActions = (employee: Employee) => {
//     const actions: IproductAction<Employee>[] = [];
//     actions.push(
//       {
//         label: "View employee",
//         onClick: async () => {
//           router.push(`/admin/employees/${employee.id}`);
//         },
//         // icon: <MinusCircle className={`text-high-warning`} />,
//       },
//       {
//         label: "Edit Employee",
//         onClick: () => {
//           router.push(`/admin/employees/add-employee?employeeid=${employee.id}`);
//         },
//         // icon: <Eye className={`text-high-primary`} />,
//       },
//     );
//     return actions;
//   };
//   return { getproductActions };
// };

export const useOrderColumn = (): IColumnDefinition<Product>[] => {
  const locale = useLocale();

  return [
    {
      header: "Product",
      accessorKey: "name",
    },
    {
      header: "Order ID",
      accessorKey: "store",
      render: (_, product: Product) => (
        <span className={`rounded-md px-2 py-1 text-sm capitalize`}>{product.store.id}</span>
      ),
    },
    {
      header: "Amount",
      accessorKey: "price",
      render: (_, product: Product) => (
        // <span className={`rounded-md px-2 py-1 text-sm capitalize`}>&#8358;{product.price.toLocaleString()}</span>
        <span className={`rounded-md px-2 py-1 text-sm capitalize`}>
          {formatCurrency(product.price, locale as Locale)}
        </span>
      ),
    },
    {
      header: "Customer Name",
      accessorKey: "user",
      render: (_, product: Product) => (
        <span className={`rounded-md px-2 py-1 text-sm capitalize`}>{product.user.name}</span>
      ),
    },
    {
      header: "Date & Time",
      accessorKey: "createdAt",
      render: (_, product: Product) => (
        <span className={`rounded-md px-2 py-1 text-sm capitalize`}>
          {formatDate(product.createdAt, locale as Locale)}
        </span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      render: (_, product: Product) => (
        <span
          className={cn(
            `rounded-full px-2 py-1 text-xs capitalize`,
            product.status.includes(`published`) && `bg-low-success text-mid-success`,
            product.status.includes(`draft`) && `bg-yellow-100 text-yellow-600`,
          )}
        >
          {product.status}
        </span>
      ),
    },
  ];
};

export const useProductColumn = (): IColumnDefinition<Product>[] => {
  const locale = useLocale();

  return [
    {
      header: "IMG",
      accessorKey: "images",
      render: (_, product: Product) => (
        // <BlurImage className={`bg-muted`} width={49} height={45} src={product.images[0]} alt={product.name} />
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded bg-gray-100">
          <div className="flex h-full items-center justify-center text-gray-400">
            {product.images.length > 0 ? (
              <BlurImage
                className={`bg-muted rounded-md`}
                width={50}
                height={50}
                src={product.images[0]}
                alt={product.name}
              />
            ) : (
              <div className="flex h-full items-center justify-center text-gray-400">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      header: "Product Name",
      accessorKey: "name",
      render: (_, product: Product) => <span className="font-medium text-gray-900">{product.name}</span>,
    },
    {
      header: "Category",
      accessorKey: "category",
    },
    {
      header: "Price",
      accessorKey: "price",
      render: (_, product: Product) => (
        <span className={`capitalize`}>{formatCurrency(product.price, locale as Locale)}</span>
      ),
    },
    {
      header: "Stock",
      accessorKey: "stockCount",
    },
    {
      header: "Date Added",
      accessorKey: "createdAt",
      render: (_, product: Product) => (
        <span className={`capitalize`}>{formatDate(product.createdAt, locale as Locale)}</span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      render: (_, product: Product) => (
        <span
          className={cn(
            `rounded-full px-2 py-1 text-xs capitalize`,
            product.status.includes(`published`) && `bg-low-success text-mid-success`,
            product.status.includes(`draft`) && `bg-yellow-100 text-yellow-600`,
          )}
        >
          {product.status}
        </span>
      ),
    },
  ];
};

export const useUserColumn = (): IColumnDefinition<User>[] => {
  return [
    {
      header: "Name",
      accessorKey: "firstName",
      render: (_, user: User) => {
        return <span>{`${user.firstName} ${user.lastName}`}</span>;
      },
    },
    {
      header: "Phone Number",
      accessorKey: "phone",
    },
    {
      header: "Email Address",
      accessorKey: "email",
    },
    {
      header: "Date & Time",
      accessorKey: "id",
    },
    {
      header: "Status",
      accessorKey: "status",
      render: (_, user: User) => (
        <span
          className={`rounded-md px-2 py-1 text-sm capitalize ${Math.floor(Math.random() + 1 * 2) % 2 === 0 ? "bg-green-100 text-green-800" : "bg-green-100 text-green-800"}`}
        >
          {user.status || `Completed`}
        </span>
      ),
    },
  ];
};
