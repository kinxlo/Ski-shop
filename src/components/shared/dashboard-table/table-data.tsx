// import { useRouter } from "next/navigation";

import { BlurImage } from "@/components/core/miscellaneous/blur-image";
import { formatDate } from "@/lib/tools/format";

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
    accessorKey: "title",
  },
  {
    header: "Order ID",
    accessorKey: "id",
  },
  {
    header: "Amount",
    accessorKey: "price",
  },
  {
    header: "Customer Name",
    accessorKey: "id",
  },
  {
    header: "Date & Time",
    accessorKey: "id",
  },
  {
    header: "Status",
    accessorKey: "status",
    render: (_, product: Product) => (
      <span className={`rounded-md px-2 py-1 text-sm capitalize ${"bg-green-100 text-green-800"}`}>
        {product.status || `Completed`}
      </span>
    ),
  },
];

export const productColumn: IColumnDefinition<Product>[] = [
  {
    header: "IMG",
    accessorKey: "thumbnail",
    render: (_, product: Product) => (
      <BlurImage className={`bg-muted`} width={49} height={45} src={product.thumbnail} alt={product.title} />
    ),
  },
  {
    header: "Product Name",
    accessorKey: "title",
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
    accessorKey: "stock",
  },
  {
    header: "Date Added",
    accessorKey: "meta",
    render: (_, product: Product) => <span className={`capitalize`}>{formatDate(product.meta.createdAt)}</span>,
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
