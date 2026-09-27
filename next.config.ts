import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  typescript: {
    ignoreBuildErrors: false,
  },

  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
