import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { SiteHeader } from '@/components/layout/site-header';
import { CoachDetails } from '@/components/coaches/coach-details';
import { Footer } from '@/components/sections/footer';
import { getCoachByParam } from '@/lib/api';
import { getCoachPath, getCoachSlug, isCoachId } from '@/lib/coach-slug';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

interface CoachDetailsPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: CoachDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const { coach, coaches } = await getCoachByParam(id);

  if (!coach) {
    return { title: 'المدرب غير موجود' };
  }

  const path = getCoachPath(coach, coaches);
  const title = `${coach.name}${coach.headline ? ` – ${coach.headline}` : ''}`;
  const description =
    coach.introduction?.slice(0, 160) ||
    coach.headline ||
    `تعرف على المدرب ${coach.name} على Trainify`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://trainifypro.com${path}`,
    },
    openGraph: {
      title: `${title} | Trainify`,
      description,
      url: `https://trainifypro.com${path}`,
      siteName: 'Trainify',
      locale: 'ar_SA',
      type: 'profile',
    },
  };
}

export default async function CoachDetailsPage({ params }: CoachDetailsPageProps) {
  const { id } = await params;
  const { coach, coaches } = await getCoachByParam(id);

  if (!coach) {
    notFound();
  }

  const canonicalSlug = getCoachSlug(coach, coaches);
  if (isCoachId(id) && canonicalSlug !== id) {
    redirect(`/coaches/${canonicalSlug}`);
  }

  return (
    <main>
      <SiteHeader />
      <CoachDetails coach={coach} coaches={coaches} />
      <Footer />
    </main>
  );
}
