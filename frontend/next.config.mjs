/** @type {import('next').NextConfig} */

const nextConfig = {
  allowedDevOrigins: [
    '168.110.210.101',
    'localhost',
    '127.0.0.1',
  ],
  async redirects() {
    return [
      {
        source: '/index',
        destination: '/',
        permanent: true,
      },
    ]
  },
  images: {
    qualities: [75, 100],
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
