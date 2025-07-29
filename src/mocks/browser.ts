import { setupWorker } from "msw/browser";

import { dashboardHandler } from "./handlers/dashboard/analytics";
import { orderHandlers } from "./handlers/order/orders";
import { productHandlers } from "./handlers/products/products";

const handlers = [...productHandlers, ...dashboardHandler, ...orderHandlers];
// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...handlers);
