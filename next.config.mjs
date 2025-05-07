/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
  // Ignore TypeScript errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Enable SWC minification
  swcMinify: true,
  // Optimize asset loading
  optimizeFonts: true,
  // Set production asset prefix
  assetPrefix: process.env.NODE_ENV === 'production' ? undefined : undefined,
  // Ensure proper loading of static paths
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
}

export default nextConfig
