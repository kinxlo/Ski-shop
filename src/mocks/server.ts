"use server";

import { setupServer } from "msw/node";

import { dashboardHandler } from "./handlers/dashboard/analytics";
import { orderHandlers } from "./handlers/orders/orders";
import { productHandlers } from "./handlers/products/products";

const handlers = [...productHandlers, ...dashboardHandler, ...orderHandlers];

export const server = setupServer(...handlers);
