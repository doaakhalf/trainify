import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteHeader } from '@/components/layout/site-header';
import { CoachDetails } from '@/components/coaches/coach-details';
import { Footer } from '@/components/sections/footer';
import { getCoachById } from '@/lib/api';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

interface CoachDetailsPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: CoachDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const coach = await getCoachById(id);

  if (!coach) {
    return { title: 'المدرب غير موجود' };
  }

  const title = `${coach.name}${coach.headline ? ` – ${coach.headline}` : ''}`;
  const description =
    coach.introduction?.slice(0, 160) ||
    coach.headline ||
    `تعرف على المدرب ${coach.name} على Trainify`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Trainify`,
      description,
      url: `https://trainifypro.com/coaches/${coach._id}`,
      siteName: 'Trainify',
      locale: 'ar_SA',
      type: 'profile',
    },
  };
}

export default async function CoachDetailsPage({ params }: CoachDetailsPageProps) {
  const { id } = await params;
  const coach = await getCoachById(id);

  if (!coach) {
    notFound();
  }

  return (
    <main>
      <SiteHeader />
      <CoachDetails coach={coach} />
      <Footer />
    </main>
  );
}
