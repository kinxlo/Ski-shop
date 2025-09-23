import { ReusableBanner } from ".";
import type { Meta, StoryObj } from "@storybook/react";

import SkiButton from "../button";

const meta: Meta<typeof ReusableBanner> = {
  title: "Molecules/Banner",
  component: ReusableBanner,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof ReusableBanner>;

export const Default: Story = {
  args: {
    tagTitle: "Be A Vendor",
    title: "Start Selling on Ski-Shop",
    image: "/images/woman.svg",
    description:
      "Join thousands of vendors already growing their business with Ski-Shop. List your products, reach more customers, and manage orders easily—all in one place.",
    action: (
      <SkiButton size={`xl`} variant={`primary`} className={`px-14`}>
        Explore
      </SkiButton>
    ),
  },
};
