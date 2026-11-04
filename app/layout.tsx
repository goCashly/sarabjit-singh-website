import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { brand } from '@/lib/brand';
import { serviceAreas } from '@/lib/serviceAreas';
import NavBar from '@/components/NavBar';
import WhatsAppButton from '@/components/WhatsAppButton';
import './globals.css';

// Self-hosted (rather than next/font/google) because the Google Fonts
// build-time fetcher has a module-level cache race that intermittently
// crashes production builds with "Cannot read properties of null" when
// webpack compiles the server/edge/client bundles concurrently. These are
// the same Google-published variable font files, just fetched once up front
// instead of on every build.
const display = localFont({
  src: './fonts/big-shoulders-variable.woff2',
  weight: '500 800',
  variable: '--font-display',
  display: 'swap',
});

const body = localFont({
  src: './fonts/ibm-plex-sans-variable.woff2',
  weight: '400 600',
  variable: '--font-body',
  display: 'swap',
});

const editorial = localFont({
  src: [
    { path: './fonts/fraunces-normal-variable.woff2', weight: '400 600', style: 'normal' },
    { path: './fonts/fraunces-italic-variable.woff2', weight: '400 600', style: 'italic' },
  ],
  variable: '--font-editorial',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  title: `${brand.name} — ${brand.title}`,
  description: brand.aboutIntro,
  keywords: [
    'mortgage broker',
    'mortgage advisor',
    brand.name,
    ...serviceAreas.map((area) => `mortgage broker ${area.city}`),
  ],
  alternates: { canonical: brand.siteUrl },
  openGraph: {
    siteName: brand.name,
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary',
  },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FinancialService',
  name: brand.fullName,
  description: brand.aboutIntro,
  url: brand.siteUrl,
  telephone: brand.phone,
  email: brand.email,
  image: `${brand.siteUrl}/photos/hero-portrait.png`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: brand.officeAddress,
    addressRegion: 'ON',
    addressCountry: 'CA',
  },
  areaServed: serviceAreas.map((area) => ({ '@type': 'City', name: area.city })),
  founder: { '@type': 'Person', name: brand.name, jobTitle: brand.title },
  sameAs: [brand.linkedin, `https://www.instagram.com/${brand.instagram.replace('@', '')}/`],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${editorial.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
        <NavBar />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
