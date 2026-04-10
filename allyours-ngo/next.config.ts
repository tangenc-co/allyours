import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'
import type { NextConfig } from 'next'

// Only for `next dev`. On `next build` (e.g. Vercel) this would spawn Wrangler/miniflare
// and can fail with EPIPE when the adapter thinks dev context init should run.
if (process.env.NODE_ENV !== 'production') {
  initOpenNextCloudflareForDev()
}

const nextConfig: NextConfig = {
  serverExternalPackages: ['firebase-admin', 'jose', 'jwks-rsa'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'yt3.ggpht.com',
      },
    ],
  },
  reactStrictMode: true,
  
  
}

export default nextConfig
