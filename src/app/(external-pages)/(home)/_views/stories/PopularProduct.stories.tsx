// popular-products.stories.tsx

// import { products } from "@/lib/constants";
import type { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// import { http, HttpResponse } from "msw";

import { PopularProducts } from "../popular-products";

const meta: Meta<typeof PopularProducts> = {
  title: "Views/Popular Products",
  component: PopularProducts,
  parameters: {
    layout: "fullscreen",
    // msw: {
    //   handlers: [
    //     // Base handler that will be overridden by story-specific handlers
    //     http.get("/products", () => {
    //       return HttpResponse.json({ products });
    //     }),
    //   ],
    // },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            staleTime: 0,
          },
        },
      });
      return (
        <QueryClientProvider client={queryClient}>
          <Story />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof PopularProducts>;

// Success state
export const Default: Story = {};
