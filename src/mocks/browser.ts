import { setupWorker } from "msw/browser";

import { cartHandlers } from "./handlers/cart/cart";
import { dashboardHandler } from "./handlers/dashboard/analytics";
import { orderHandlers } from "./handlers/order/orders";
import { productHandlers } from "./handlers/products/products";

const handlers = [...productHandlers, ...cartHandlers, ...dashboardHandler, ...orderHandlers];
// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...handlers);
