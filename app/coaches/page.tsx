import type { Metadata } from 'next';
import { content } from '@/content/ar';
import { SiteHeader } from '@/components/layout/site-header';
import { CoachesDirectory } from '@/components/coaches/coaches-directory';
import {
  parseCoachListQuery,
  serializeCoachListQuery,
  type CoachFiltersState,
} from '@/lib/coach-list-query';
import { getActiveCoachesPage, type CoachesListParams } from '@/lib/api';
import { Footer } from '@/components/sections/footer';

export const dynamic = 'force-dynamic';

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

function parseOptionalNumber(value: string): number | undefined {
  if (!value.trim()) return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

function filtersToApiParams(
  filters: CoachFiltersState,
  searchQuery = ''
): CoachesListParams {
  const params: CoachesListParams = {};
  if (filters.gender) params.gender = filters.gender;

  const query = searchQuery.trim();
  if (query) params.search = query;

  const minPrice = parseOptionalNumber(filters.minPrice);
  const maxPrice = parseOptionalNumber(filters.maxPrice);
  const minExp = parseOptionalNumber(filters.minExperience);
  const maxExp = parseOptionalNumber(filters.maxExperience);

  if (minPrice != null) params.minPrice = minPrice;
  if (maxPrice != null) params.maxPrice = maxPrice;
  if (minExp != null) params.minYearsOfExperience = minExp;
  if (maxExp != null) params.maxYearsOfExperience = maxExp;

  return params;
}

type CoachesPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function CoachesPage({ searchParams }: CoachesPageProps) {
  const sp = await searchParams;
  const { filters, search } = parseCoachListQuery(sp);
  const listKey = serializeCoachListQuery(filters, search) || 'all';

  const firstPage = await getActiveCoachesPage({
    page: 1,
    limit: 10,
    ...filtersToApiParams(filters, search),
  });

  return (
    <main>
      <SiteHeader />
      <CoachesDirectory
        key={listKey}
        initialCoaches={firstPage.coaches}
        initialHasMore={firstPage.hasMore}
        initialFilters={filters}
        initialSearch={search}
        pageSize={10}
      />
      <Footer />
    </main>
  );
}
