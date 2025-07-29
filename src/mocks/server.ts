// src/mocks/server.ts
import { setupServer } from "msw/node";

import { dashboardHandler } from "./handlers/dashboard/analytics";
import { productHandlers } from "./handlers/products/products";

const handlers = [...productHandlers, ...dashboardHandler];

export const server = setupServer(...handlers);
