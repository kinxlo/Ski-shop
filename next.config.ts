import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["msw"],
  },
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

export default nextConfig;
