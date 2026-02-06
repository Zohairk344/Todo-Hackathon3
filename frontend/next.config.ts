import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        // We added the 'asdadsshu768-' prefix here to match your real backend
        destination: 'https://asdadsshu768-todo-hackathon3.hf.space/api/:path*', 
      },
    ];
  },
};

export default nextConfig;
