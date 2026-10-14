import type { Metadata } from 'next';
import './globals.css';

import { COMPANY_ADDRESS, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from './site-config';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'BLG Transporte Internacional | Transporte de carga en Paraguay',
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: '/',
    languages: {
      'es-PY': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_PY',
    url: '/',
    siteName: SITE_NAME,
    title: 'BLG Transporte Internacional | Transporte de carga en Paraguay',
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/images/blg-carretera.jpg',
        width: 2500,
        height: 825,
        alt: 'Flota de BLG Transporte Internacional en ruta',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BLG Transporte Internacional | Transporte de carga en Paraguay',
    description: SITE_DESCRIPTION,
    images: ['/images/blg-carretera.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  category: 'transportation and logistics',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-48x48.png', type: 'image/png', sizes: '48x48' },
    ],
    shortcut: '/favicon-32x32.png',
    apple: [{ url: '/apple-touch-icon.png', type: 'image/png', sizes: '180x180' }],
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: 'es-PY',
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      legalName: 'BLG Transporte Internacional',
      url: SITE_URL,
      logo: `${SITE_URL}/images/blg-logo.png`,
      image: `${SITE_URL}/images/blg-carretera.jpg`,
      description: SITE_DESCRIPTION,
      email: 'comercial@blgtransporte.com',
      telephone: '+595981916919',
      address: {
        '@type': 'PostalAddress',
        ...COMPANY_ADDRESS,
      },
      areaServed: [
        { '@type': 'Country', name: 'Paraguay' },
        { '@type': 'Country', name: 'Argentina' },
        { '@type': 'Country', name: 'Bolivia' },
        { '@type': 'Country', name: 'Brasil' },
        { '@type': 'Country', name: 'Chile' },
        { '@type': 'Country', name: 'Uruguay' },
      ],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'ventas nacionales',
          telephone: '+595981916919',
          email: 'comercial@blgtransporte.com',
          areaServed: 'PY',
          availableLanguage: ['es'],
        },
        {
          '@type': 'ContactPoint',
          contactType: 'ventas internacionales',
          telephone: '+595973926605',
          email: 'comercial@blgtransporte.com',
          areaServed: ['AR', 'BO', 'BR', 'CL', 'PY', 'UY'],
          availableLanguage: ['es'],
        },
        {
          '@type': 'ContactPoint',
          contactType: 'recursos humanos',
          email: 'rrhh@blgtransporte.com',
          areaServed: 'PY',
          availableLanguage: ['es'],
        },
      ],
    },
    {
      '@type': 'Service',
      '@id': `${SITE_URL}/#transport-service`,
      name: 'Transporte terrestre nacional e internacional de cargas',
      description:
        'Servicios de transporte de carga general, refrigerada, especial y puerta a puerta desde Paraguay hacia la región.',
      provider: { '@id': `${SITE_URL}/#organization` },
      areaServed: ['Paraguay', 'Argentina', 'Bolivia', 'Brasil', 'Chile', 'Uruguay'],
      serviceType: [
        'Transporte nacional de cargas',
        'Transporte internacional de cargas',
        'Carga refrigerada',
        'Carga general',
        'Servicio puerta a puerta',
      ],
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-PY">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
        />
      </body>
    </html>
  );
}
