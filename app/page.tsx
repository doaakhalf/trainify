import type { Metadata } from 'next';
import { content } from '@/content/ar';
import HomeClient from './home-client';
import { getActiveCoaches } from '@/lib/api';

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

export default async function Home() {
  // Fetch coaches from API (only top 3)
  const allCoaches = await getActiveCoaches();
  const coaches = allCoaches.slice(0, 3);

  return <HomeClient coaches={coaches} />;
}
