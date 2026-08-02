import type { Metadata, Viewport } from 'next';
import { Alexandria, Cairo } from 'next/font/google';
import './globals.css';
import { content } from '@/content/ar';
import { organizationSchema, softwareApplicationSchema, faqSchema, webPageSchema } from '@/lib/structured-data';

const alexandria = Alexandria({
  subsets: ['arabic'],
  variable: '--font-alexandria',
  display: 'swap',
  preload: true,
});

const cairo = Cairo({
  subsets: ['arabic'],
  variable: '--font-cairo',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://trainifypro.com'),
  title: {
    default: content.meta.title,
    template: '%s | Trainify',
  },
  description: content.meta.description,
  keywords: content.meta.keywords,
  authors: [{ name: 'Trainify', url: 'https://trainifypro.com' }],
  creator: 'Trainify',
  publisher: 'Trainify',
  applicationName: 'Trainify',
  category: 'Health & Fitness',
  classification: 'Fitness Training Platform',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/icon.png', color: '#F97316' },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    url: 'https://trainifypro.com',
    title: content.meta.title,
    description: content.meta.description,
    siteName: 'Trainify',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Trainify - منصة تربط الرياضيين بالمدربين المحترفين',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: content.meta.title,
    description: content.meta.description,
    images: ['/og-image.png'],
    creator: '@trainify',
    site: '@trainify',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://trainifypro.com',
    languages: {
      'ar-SA': 'https://trainifypro.com',
      'ar': 'https://trainifypro.com',
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  appleWebApp: {
    capable: true,
    title: 'Trainify',
    statusBarStyle: 'black-translucent',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F97316' },
    { media: '(prefers-color-scheme: dark)', color: '#F97316' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${alexandria.variable} ${cairo.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
        />
      </head>
      <body className="font-sans antialiased bg-background text-text-primary">
        {children}
      </body>
    </html>
  );
}
