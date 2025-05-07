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
  // Generate a static export for Netlify
  output: 'export',
}

export default nextConfig
