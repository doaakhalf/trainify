import type { Metadata } from 'next';
import { content } from '@/content/ar';
import HomeClient from './home-client';

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
  openGraph: {
    title: content.meta.title,
    description: content.meta.description,
    url: 'https://trainify.app',
    siteName: 'Trainify',
    locale: 'ar_SA',
    type: 'website',
  },
};

export default function Home() {
  return <HomeClient />;
}
