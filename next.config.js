/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: [
      "firebasestorage.googleapis.com",
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

