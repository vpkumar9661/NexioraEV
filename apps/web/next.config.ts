import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@nexiora/shared"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
