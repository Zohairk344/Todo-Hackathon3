/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://asdadsshu768-todo-hackathon3.hf.space/api/:path*',
      },
    ]
  },
};

export default nextConfig;