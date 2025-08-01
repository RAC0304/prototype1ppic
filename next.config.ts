import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Handle hydration issues
  reactStrictMode: true,

  // Optimize for production
  compress: true,
  poweredByHeader: false,

  // Handle client-side routing
  trailingSlash: false,

  // Optimize images
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  // Server external packages (moved from experimental)
  serverExternalPackages: [],

  // Experimental features
  experimental: {
    // Remove unsupported options
  },

  // Headers for security and performance
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
