'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

/** Sends GA updates on client-side navigations; initial load is handled by gtag in the root layout. */
export default function GA4RouteTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const skipFirst = useRef(true)

  useEffect(() => {
    const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
    if (!id || typeof window === 'undefined') return
    if (skipFirst.current) {
      skipFirst.current = false
      return
    }
    const query = searchParams?.toString()
    const pagePath = query ? `${pathname}?${query}` : pathname
    window.gtag?.('config', id, { page_path: pagePath })
  }, [pathname, searchParams])

  return null
}
