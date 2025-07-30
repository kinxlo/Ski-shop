import { Meta, StoryObj } from "@storybook/react";

import { ShopCard } from "./shop-card";

const meta: Meta<typeof ShopCard> = {
  title: "Molecules/Shop Card",
  component: ShopCard,
};

export default meta;

type Story = StoryObj<typeof ShopCard>;

export const Default: Story = {
  args: {
    id: "1",
    category: "gaming",
    title: "Sony PlayStation VR2 Headset, 110° FOV, 4K HDR Display",
    rating: 5,
    price: 55_000,
    oldPrice: 800_000,
    image: "/images/shop/hero.svg",
    isStarSeller: false,
    className: "max-w-[300px]",
  },
};

export const WithSalesTag: Story = {
  args: {
    id: "1",
    category: "gaming",
    title: "Sony PlayStation VR2 Headset, 110° FOV, 4K HDR Display",
    rating: 2,
    price: 55_000,
    oldPrice: 800_000,
    image: "/images/shop/hero.svg",
    isStarSeller: true,
    className: "max-w-[300px]",
  },
};
