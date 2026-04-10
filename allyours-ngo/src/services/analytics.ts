declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function trackEvent(name: string, params?: Record<string, string | number | boolean>) {
  if (typeof window === 'undefined') return
  window.gtag?.('event', name, params)
}

export function trackDonationIntent(tier?: string) {
  trackEvent('donation_intent', tier ? { tier } : undefined)
}

export function trackSupportCta(action: 'donate_now' | 'talk_to_us') {
  trackEvent('support_cta', { action })
}
