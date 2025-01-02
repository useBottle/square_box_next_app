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
      {
        protocol: "https",
        hostname: "*.hankookilbo.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "*.hankookilbo.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "i.ytimg.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "yt3.ggpht.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "yt3.ggpht.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
