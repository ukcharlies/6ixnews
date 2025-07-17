/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Disables ESLint build failures
  },
  typescript: {
    ignoreBuildErrors: true, // Disables TypeScript build failures
  },
  images: {
    domains: ["agc-storage.s3.eu-north-1.amazonaws.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "agc-storage.s3.eu-north-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  reactStrictMode: true,
  experimental: {
    // Ensures consistent hydration
    optimizeFonts: true,
    scrollRestoration: true,
  },
};

module.exports = nextConfig;
