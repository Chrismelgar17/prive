declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

const CONVERSION_TARGET = 'AW-18076913641/sjNwCNzmvaQcEOmf36tD'

export function trackConversion(redirectUrl?: string) {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', 'conversion', {
    send_to: CONVERSION_TARGET,
    value: 1.0,
    currency: 'ARS',
    ...(redirectUrl && {
      event_callback: () => { window.location.href = redirectUrl },
    }),
  })
}

export function trackEvent(
  action: string,
  category: string,
  label?: string,
) {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
  })
}
