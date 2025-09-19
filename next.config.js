/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  images: {
    unoptimized: true, // Required for static export compatibility
  },
  // Use static export for better Cloudflare Pages compatibility
  output: 'export',
  trailingSlash: true,
};

module.exports = nextConfig;