import SkiButton from "@/components/shared/button";
import type { Meta, StoryObj } from "@storybook/react";

import { RatingModal } from "./index";

const meta: Meta<typeof RatingModal> = {
  title: "Components/RatingModal",
  component: RatingModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onRatingSubmit: { action: "rating submitted" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockProduct = {
  id: "1",
  name: "Sony PlayStation VR2",
  images: ["/images/ps5.jpg"],
  description: "Sony PlayStation VR2 Approx. 110°, Communication with PS5",
};

export const Default: Story = {
  args: {
    product: mockProduct,
    triggerStructure: (
      <SkiButton variant="primary" size="lg">
        Rate Product
      </SkiButton>
    ),
  },
};

export const WithCustomTrigger: Story = {
  args: {
    product: mockProduct,
    triggerStructure: (
      <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">Click to Rate</button>
    ),
  },
};
