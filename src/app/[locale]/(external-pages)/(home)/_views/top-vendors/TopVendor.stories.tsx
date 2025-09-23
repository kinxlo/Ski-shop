import { TopVendors } from ".";
import type { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const meta: Meta<typeof TopVendors> = {
  title: "Views/Top Vendors",
  component: TopVendors,
  parameters: {
    layout: "fullscreen",
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
type Story = StoryObj<typeof TopVendors>;

// Success state
export const Default: Story = {};
