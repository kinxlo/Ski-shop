import SkiButton from ".";
import PlayToWinBanner from ".";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof SkiButton> = {
  title: "Molecules/Play To Win Banner",
  component: PlayToWinBanner,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof SkiButton>;

export const Default: Story = {
  args: {},
};
