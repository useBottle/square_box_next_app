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
				hostname: "**",
				pathname: "/**",
			},
			{
				protocol: "http",
				hostname: "**",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
