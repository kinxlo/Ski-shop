import { Logo } from ".";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Logo> = {
  title: "Atoms/Logo",
  component: Logo,
};

export default meta;

type Story = StoryObj<typeof Logo>;

export const Primary: Story = {
  args: {
    logo: "/images/skicom.svg",
    width: 120,
    height: 37,
  },
};
