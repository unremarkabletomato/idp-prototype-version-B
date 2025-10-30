/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable production source maps so Vercel/production stack traces map to original source
  // This helps debug runtime errors (like ReferenceError) in production builds.
  productionBrowserSourceMaps: true,
}

module.exports = nextConfig
