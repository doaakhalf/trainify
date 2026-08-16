import type { Metadata } from 'next';
import { content } from '@/content/ar';
import { SiteHeader } from '@/components/layout/site-header';
import { CoachesDirectory } from '@/components/coaches/coaches-directory';
import { getActiveCoaches } from '@/lib/api';
import { Footer } from '@/components/sections/footer';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export const metadata: Metadata = {
  title: content.coachesPage.title,
  description: content.coachesPage.subtitle,
  openGraph: {
    title: content.coachesPage.title,
    description: content.coachesPage.subtitle,
    url: 'https://trainifypro.com/coaches',
    siteName: 'Trainify',
    locale: 'ar_SA',
    type: 'website',
  },
};

export default async function CoachesPage() {
  const coaches = await getActiveCoaches();

  return (
    <main>
      <SiteHeader />
      <CoachesDirectory coaches={coaches} />
      <Footer />
    </main>
  );
}
