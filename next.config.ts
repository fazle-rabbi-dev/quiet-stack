import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  partialPrefetching: true,
  typescript: {
    ignoreBuildErrors: true,
  },

  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
