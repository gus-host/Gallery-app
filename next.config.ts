import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, // Deshabilita el Strict Mode en desarrollo
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
