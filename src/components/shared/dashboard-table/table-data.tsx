// import { useRouter } from "next/navigation";

import { BlurImage } from "@/components/core/miscellaneous/blur-image";
import { formatDate } from "@/lib/tools/format";
import { cn, formatCurrency } from "@/lib/utils";

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

export const orderColumn: IColumnDefinition<Product>[] = [
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
      <span className={`rounded-md px-2 py-1 text-sm capitalize`}>{formatCurrency(product.price)}</span>
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
      <span className={`rounded-md px-2 py-1 text-sm capitalize`}>{formatDate(product.createdAt)}</span>
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

export const productColumn: IColumnDefinition<Product>[] = [
  {
    header: "IMG",
    accessorKey: "images",
    render: (_, product: Product) => (
      <BlurImage className={`bg-muted`} width={49} height={45} src={product.images[0]} alt={product.name} />
    ),
  },
  {
    header: "Product Name",
    accessorKey: "name",
  },
  {
    header: "Category",
    accessorKey: "category",
  },
  {
    header: "Price",
    accessorKey: "price",
    render: (_, product: Product) => <span className={`capitalize`}>&#8358;{product.price.toLocaleString()}</span>,
  },
  {
    header: "Stock",
    accessorKey: "stockCount",
  },
  {
    header: "Date Added",
    accessorKey: "createdAt",
    render: (_, product: Product) => <span className={`capitalize`}>{formatDate(product.createdAt)}</span>,
  },
];

export const userColumn: IColumnDefinition<User>[] = [
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
