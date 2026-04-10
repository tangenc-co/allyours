import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
import { Suspense } from 'react'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import GA4RouteTracker from '@/components/GA4RouteTracker'

const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Allyours NGO - Making a Difference Together',
  description:
    'Allyours NGO is dedicated to creating positive change in communities worldwide through sustainable development, education, and humanitarian aid.',
  keywords: [
    'NGO',
    'non-profit',
    'charity',
    'community development',
    'humanitarian aid',
    'sustainable development',
    'education',
    'healthcare',
    'volunteer',
    'donate',
  ],
  authors: [{ name: 'Allyours NGO' }],
  openGraph: {
    title: 'Allyours NGO - Making a Difference Together',
    description:
      'Join us in creating positive change in communities worldwide through sustainable development and humanitarian aid.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Allyours NGO - Making a Difference Together',
    description: 'Join us in creating positive change in communities worldwide.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={` ${geistSans.variable} ${geistMono.variable} antialiased bg-[#f9f9f9]`} suppressHydrationWarning>
        {gaId ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy='afterInteractive' />
            <Script id='google-analytics' strategy='afterInteractive'>
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        ) : null}
        <Suspense fallback={null}>
          <GA4RouteTracker />
        </Suspense>
        <Nav />
        {children}
        <Footer />

      </body>
    </html>
  )
}
