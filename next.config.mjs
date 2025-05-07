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
  // Specify the asset prefix for static assets when deploying to Netlify
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : undefined,
  // Enable SWC minification
  swcMinify: true,
  // Set the trailingSlash configuration to be consistent
  trailingSlash: false,
  // Use file system routing (needed for Netlify)
  useFileSystemPublicRoutes: true,
}

export default nextConfig
