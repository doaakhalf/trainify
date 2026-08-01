import { content } from '@/content/ar';

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Trainify',
  url: 'https://trainify.app',
  logo: 'https://trainify.app/icon-512.png',
  description: content.meta.description,
  sameAs: [
    'https://twitter.com/trainify',
    'https://instagram.com/trainify',
    'https://facebook.com/trainify',
  ],
};

export const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Trainify',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'iOS, Android',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'SAR',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '2000',
  },
};

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'كيف أختار المدرب المناسب؟',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'يمكنك تصفح ملفات المدربين، مراجعة تقييماتهم، والتواصل معهم مباشرة قبل الاشتراك.',
      },
    },
    {
      '@type': 'Question',
      name: 'هل الدفع آمن؟',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'نعم، جميع المدفوعات تتم عبر بوابات دفع آمنة ومشفرة.',
      },
    },
  ],
};

export const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Trainify - منصة تربط الرياضيين بالمدربين المحترفين',
  description: 'اعثر على المدرب المناسب لهدفك من بين أفضل المدربين المعتمدين في الوطن العربي',
  url: 'https://trainify.app',
  inLanguage: 'ar',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Trainify',
    url: 'https://trainify.app',
  },
  about: {
    '@type': 'Thing',
    name: 'Fitness Training',
    description: 'Online fitness training and coaching platform',
  },
  primaryImageOfPage: {
    '@type': 'ImageObject',
    url: 'https://trainify.app/og-image.png',
    width: 1200,
    height: 630,
  },
};
