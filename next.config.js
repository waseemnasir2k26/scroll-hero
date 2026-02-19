/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Required for frame sequences
  },
  // Enable React strict mode for better development experience
  reactStrictMode: true,
};

module.exports = nextConfig;
