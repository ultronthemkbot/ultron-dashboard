import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Include data/ files in serverless function bundles for Vercel
  outputFileTracingIncludes: {
    '/api/*': ['./data/**/*'],
  },
};

export default nextConfig;
