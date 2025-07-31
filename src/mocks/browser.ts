/* eslint-disable no-console */
"use client";

import { setupWorker } from "msw/browser";

import { cartHandlers } from "./handlers/cart/cart";
import { dashboardHandler } from "./handlers/dashboard/analytics";
import { orderHandlers } from "./handlers/order/orders";
import { productHandlers } from "./handlers/products/products";

const handlers = [...productHandlers, ...cartHandlers, ...dashboardHandler, ...orderHandlers];

// Only create worker in browser environment
let worker: ReturnType<typeof setupWorker> | null = null;

if (typeof window !== "undefined") {
  try {
    worker = setupWorker(...handlers);
  } catch (error) {
    console.error("[MSW] Failed to setup worker:", error);
  }
}

export { worker };
