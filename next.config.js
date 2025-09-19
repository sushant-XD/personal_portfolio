/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  images: {
    unoptimized: true, // Required for static export compatibility
  },
  // Uncomment the lines below if you want static export (optional)
  // output: 'export',
  // trailingSlash: true,
};

module.exports = nextConfig;