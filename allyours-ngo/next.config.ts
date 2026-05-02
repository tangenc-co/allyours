import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'
import type { NextConfig } from 'next'

// Optional: only when testing Cloudflare Workers locally (`npm run preview` stack).
// Starting Miniflare on every `next dev` can log SQLITE_BUSY / ERR_RUNTIME_FAILURE while the
// Node dev server still works fine — APIs use Firebase in Node, not the Workers stub.
if (
  process.env.NODE_ENV !== 'production' &&
  (process.env.OPENNEXT_CLOUDFLARE_DEV === '1' ||
    process.env.OPENNEXT_CLOUDFLARE_DEV === 'true')
) {
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
