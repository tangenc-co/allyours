'use client'

import { useEffect, useLayoutEffect } from 'react'
import { usePathname } from 'next/navigation'

function scrollToHash(): void {
  const hash = window.location.hash
  if (!hash || hash.length < 2) return
  const id = decodeURIComponent(hash.slice(1))
  requestAnimationFrame(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}

/** Ensures /#section… scrolls after client navigation from other routes. */
export default function HomeHashScroll() {
  const pathname = usePathname()

  useLayoutEffect(() => {
    if (pathname === '/') scrollToHash()
  }, [pathname])

  useEffect(() => {
    window.addEventListener('hashchange', scrollToHash)
    return () => window.removeEventListener('hashchange', scrollToHash)
  }, [])

  return null
}
