/* eslint-disable @typescript-eslint/no-explicit-any */

import { createServiceHooks } from "@/lib/react-query/use-service-query";
import { dependencies } from "@/lib/tools/dependencies";

import { ProductService } from "./product.service";

export const useProductService = () => {
  const { useServiceQuery } = createServiceHooks<ProductService>(dependencies.APP_SERVICE);

  // Queries
  const useGetAllProducts = (filters: IFilters = Object.create({ page: 1 }), options?: any) =>
    useServiceQuery(["product", "list", filters], (service) => service.getAllProducts(filters), options);

  const useGetAllUsers = (filters: IFilters = Object.create({ page: 1 }), options?: any) =>
    useServiceQuery(["user", "list", filters], (service) => service.getAllUsers(filters), options);

  // const useGetEmployeeById = (id: string, options?: any) =>
  //   useServiceQuery(["employees", "detail", id], (service) => service.getEmployeeById(id), options);

  return {
    // Queries
    useGetAllProducts,
    useGetAllUsers,
    // useGetEmployeeById,

    // Mutations
  };
};
