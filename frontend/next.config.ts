import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. The Proxy Rule
  async rewrites() {
    return [
      {
        source: '/api/:path*', // When the browser requests /api/...
        destination: 'https://todo-hackathon3.hf.space/api/:path*', // Forward it here
      },
    ];
  },
};

export default nextConfig;