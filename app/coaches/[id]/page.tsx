import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { SiteHeader } from '@/components/layout/site-header';
import { CoachDetails } from '@/components/coaches/coach-details';
import { Footer } from '@/components/sections/footer';
import { getCoachByParam } from '@/lib/api';
import { getCoachOgDescription, getCoachOgTitle } from '@/lib/coach-og';
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
  const title = getCoachOgTitle(coach);
  const description = getCoachOgDescription(coach);
  const ogImage = {
    url: `https://trainifypro.com${path}/opengraph-image`,
    width: 1200,
    height: 630,
    alt: title,
  };

  return {
    title,
    description,
    alternates: {
      canonical: `https://trainifypro.com${path}`,
    },
    openGraph: {
      title,
      description,
      url: `https://trainifypro.com${path}`,
      siteName: 'Trainify',
      locale: 'ar_SA',
      type: 'website',
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage.url],
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
