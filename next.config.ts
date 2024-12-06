import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['remoteok.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'remoteok.com',
        pathname: '/**',
      },
    ],
  },
  
};

export default nextConfig;
