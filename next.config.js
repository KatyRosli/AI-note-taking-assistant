/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "oaidalleapiprodscus.blob.core.windows.net",
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

