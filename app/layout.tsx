import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Footer } from '@/components/footer'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.priverelax.com'

const DEFAULT_TITLE = 'Masajistas en Buenos Aires y CABA | Privé Relax'
const DEFAULT_DESCRIPTION = 'Encontrá masajistas profesionales en Buenos Aires y CABA. Explorá perfiles por barrio, tipo de masaje y modalidad de atención en Privé Relax.'

export const metadata: Metadata = {
  title: {
    template: '%s | Privé Relax',
    default: DEFAULT_TITLE,
  },
  description: DEFAULT_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [
      { url: '/logo.jpeg' },
    ],
    apple: '/logo.jpeg',
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: 'Privé Relax',
    images: [{ url: '/logo.jpeg', width: 400, height: 400, alt: 'Privé Relax' }],
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ['/logo.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Privé Relax',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.jpeg`,
  description: 'Directorio de masajistas profesionales en Buenos Aires y CABA',
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Privé Relax',
  url: SITE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
