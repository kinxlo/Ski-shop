import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  serverExternalPackages: ["msw"],
  typescript: {
    ignoreBuildErrors: true,
  },
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "cdn.dummyjson.com",
      },
      {
        hostname: "picsum.photos",
      },
      {
        hostname: "nyc3.digitaloceanspaces.com",
      },
      {
        hostname: "loremflickr.com",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
