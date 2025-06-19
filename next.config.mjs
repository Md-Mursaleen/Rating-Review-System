/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'localhost',
            port: '8080',
            pathname: '/uploads/**',
          },
          {
            protocol: 'https',
            hostname: 'images.pexels.com',
            pathname: '/photos/**',
          }
        ],
      },
};

export default nextConfig;
