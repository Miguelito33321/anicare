/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "png.pngtree.com"
      },
      {
        protocol: "https",
        hostname: "tse3.mm.bing.net"
      }
    ]
  }
};

module.exports = nextConfig;