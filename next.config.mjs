/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.yna.co.kr",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "*.yna.co.kr",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
