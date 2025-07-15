/** @type {import('next').NextConfig} */
const nextConfig = {
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
};

module.exports = nextConfig;
