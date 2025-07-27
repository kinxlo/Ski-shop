import { setupWorker } from "msw/browser";

import { dashboardHandler } from "./handlers/dashboard/analytics";
import { productHandlers } from "./handlers/products";

const handlers = [...productHandlers, ...dashboardHandler];
// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...handlers);
