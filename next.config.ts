import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Improve build performance and compatibility
  experimental: {
    // Enable server components stability
    serverComponentsExternalPackages: ["@neondatabase/serverless"],
  },

  // Environment variables configuration
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },

  // Optimize for deployment
  poweredByHeader: false,
  compress: true,

  // Better error handling during build
  typescript: {
    // Allow build to continue even with TypeScript errors during development
    ignoreBuildErrors: false,
  },

  // Handle static optimization
  staticPageGenerationTimeout: 1000,
};

export default nextConfig;
