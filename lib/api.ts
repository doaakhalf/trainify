import { getClientApiHeaders } from './client-api-key';

const API_BASE = 'https://promax-node-production-7c35.up.railway.app';

export interface CoachAchievement {
  _id?: string;
  name: string;
  rank?: string;
  image?: string;
}

export interface CoachCertificate {
  _id?: string;
  name: string;
  year?: number;
  image?: string;
}

/** Public coach shape for the landing site — no email/phone. */
export interface Coach {
  _id: string;
  name: string;
  /** Unique 8-char share code from API (a-z0-9). */
  slug?: string | null;
  /** Ready-to-share public profile URL from API. */
  shareProfileUrl?: string | null;
  profileImage?: string;
  headline?: string;
  price?: number;
  gender?: 'male' | 'female' | string;
  status: string;
  sport?: string;
  introduction?: string;
  motivation?: string;
  trainingExperience?: string;
  experience?: number;
  subscribers?: number;
  /** Only set when the API provides a real rating — never invent one. */
  rating?: number;
  achievements: CoachAchievement[];
  certificates: CoachCertificate[];
  galleryImages: string[];
}

export function resolveImageUrl(path?: string | null): string {
  if (!path) return '/placeholder-coach.jpg';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('/')) {
    return path;
  }
  return `${API_BASE}/${path}`;
}

function extractImagePath(value: unknown): string | undefined {
  if (!value) return undefined;
  if (typeof value === 'string') return value;
  if (typeof value === 'object') {
    const obj = value as Record<string, unknown>;
    if (typeof obj.imageUrl === 'string') return obj.imageUrl;
    if (typeof obj.image === 'string') return obj.image;
    if (typeof obj.url === 'string') return obj.url;
  }
  return undefined;
}

function mapCoach(coach: Record<string, unknown>): Coach {
  const achievementsRaw = Array.isArray(coach.achievements) ? coach.achievements : [];
  const certificatesRaw = Array.isArray(coach.certificates) ? coach.certificates : [];
  const galleryRaw = Array.isArray(coach.galleryImages) ? coach.galleryImages : [];

  const ratingValue =
    typeof coach.rating === 'number'
      ? coach.rating
      : typeof coach.averageRating === 'number'
        ? coach.averageRating
        : undefined;

  return {
    _id: String(coach.id || coach._id || ''),
    name: String(coach.name || coach.coachName || ''),
    slug: coach.slug != null && coach.slug !== '' ? String(coach.slug) : null,
    shareProfileUrl:
      coach.shareProfileUrl != null && coach.shareProfileUrl !== ''
        ? String(coach.shareProfileUrl)
        : null,
    profileImage: coach.profileImage
      ? String(coach.profileImage)
      : coach.profilePhoto
        ? String(coach.profilePhoto)
        : undefined,
    headline: coach.headline ? String(coach.headline) : undefined,
    price: typeof coach.price === 'number' ? coach.price : undefined,
    gender: coach.gender ? String(coach.gender) : undefined,
    status: String(coach.status || 'active'),
    sport: coach.sport ? String(coach.sport) : undefined,
    introduction: coach.introduction ? String(coach.introduction) : undefined,
    motivation: coach.motivation ? String(coach.motivation) : undefined,
    trainingExperience: coach.trainingExperience
      ? String(coach.trainingExperience)
      : undefined,
    experience:
      typeof coach.yearOfExperience === 'number' ? coach.yearOfExperience : undefined,
    subscribers:
      typeof coach.subscriptionNumber === 'number' ? coach.subscriptionNumber : 0,
    rating: ratingValue,
    achievements: achievementsRaw.map((item) => {
      const a = item as Record<string, unknown>;
      return {
        _id: a._id ? String(a._id) : undefined,
        name: String(a.name || ''),
        rank: a.rank != null ? String(a.rank) : undefined,
        image: extractImagePath(a.image ?? a.imageUrl),
      };
    }),
    certificates: certificatesRaw.map((item) => {
      const c = item as Record<string, unknown>;
      return {
        _id: c._id ? String(c._id) : undefined,
        name: String(c.name || ''),
        year: typeof c.year === 'number' ? c.year : undefined,
        image: extractImagePath(c.image ?? c.imageUrl),
      };
    }),
    galleryImages: galleryRaw
      .map((img) => extractImagePath(img))
      .filter((path): path is string => Boolean(path)),
  };
}

/** Public guest list — GET /api/coaches (same as ProMax GuestCoachesScreen). */
export interface CoachesListParams {
  page?: number;
  limit?: number;
  status?: string;
  gender?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  minYearsOfExperience?: number;
  maxYearsOfExperience?: number;
  signal?: AbortSignal;
}

export interface CoachesListResult {
  coaches: Coach[];
  page: number;
  limit: number;
  hasMore: boolean;
  totalPages?: number;
  totalCoaches?: number;
}

export async function getActiveCoachesPage(
  params: CoachesListParams = {}
): Promise<CoachesListResult> {
  const page = params.page ?? 1;
  // API caps at 10 — keep in sync with ProMax GuestCoachesScreen
  const limit = params.limit ?? 10;

  try {
    const searchParams = new URLSearchParams();
    searchParams.set('page', String(page));
    searchParams.set('limit', String(limit));

    if (params.gender) searchParams.set('gender', params.gender);
    if (params.search?.trim()) searchParams.set('search', params.search.trim());
    if (params.minPrice != null) searchParams.set('minPrice', String(params.minPrice));
    if (params.maxPrice != null) searchParams.set('maxPrice', String(params.maxPrice));
    if (params.minYearsOfExperience != null) {
      searchParams.set('minYearsOfExperience', String(params.minYearsOfExperience));
    }
    if (params.maxYearsOfExperience != null) {
      searchParams.set('maxYearsOfExperience', String(params.maxYearsOfExperience));
    }

    const timeoutController = new AbortController();
    const timeoutId = setTimeout(() => timeoutController.abort(), 8000);
    const onExternalAbort = () => timeoutController.abort();
    params.signal?.addEventListener('abort', onExternalAbort);

    const response = await fetch(
      `${API_BASE}/api/coaches?status=active&${searchParams.toString()}`,
      {
        cache: 'no-store',
        signal: timeoutController.signal,
        headers: getClientApiHeaders(),
      }
    );

    clearTimeout(timeoutId);
    params.signal?.removeEventListener('abort', onExternalAbort);

    if (!response.ok) {
      throw new Error('Failed to fetch coaches');
    }

    const data = await response.json();
    const raw = data.coaches || data.data || [];
    const coaches = (Array.isArray(raw) ? raw : []).map(
      (coach: Record<string, unknown>) => mapCoach(coach)
    );

    const pagination = (data.pagination || {}) as {
      hasNextPage?: boolean;
      totalPages?: number;
      totalCoaches?: number;
      currentPage?: number;
      limit?: number;
    };

    const hasMore =
      typeof pagination.hasNextPage === 'boolean'
        ? pagination.hasNextPage
        : coaches.length === limit;

    return {
      coaches,
      page,
      limit,
      hasMore,
      totalPages: pagination.totalPages,
      totalCoaches: pagination.totalCoaches,
    };
  } catch (error) {
    if (
      (error instanceof DOMException && error.name === 'AbortError') ||
      (error instanceof Error && error.name === 'AbortError')
    ) {
      throw error;
    }
    console.error('Error fetching coaches page:', error);
    return { coaches: [], page, limit, hasMore: false };
  }
}

/** Aggregates all pages — for sitemap / home / coach slug lookup. */
export async function getActiveCoaches(): Promise<Coach[]> {
  const all: Coach[] = [];
  const seen = new Set<string>();
  let page = 1;
  const limit = 10;

  while (page <= 50) {
    const result = await getActiveCoachesPage({ page, limit });
    for (const coach of result.coaches) {
      if (!coach._id || seen.has(coach._id)) continue;
      seen.add(coach._id);
      all.push(coach);
    }
    if (!result.hasMore || result.coaches.length === 0) break;
    page += 1;
  }

  return all;
}

export async function getCoachById(id: string): Promise<Coach | null> {
  const { coach } = await getCoachByParam(id);
  return coach;
}

/**
 * Resolve coach by unique share slug, Mongo id, or legacy name slug.
 * Pages through the list API until the match is found (does not always load everyone).
 */
export async function getCoachByParam(param: string): Promise<{
  coach: Coach | null;
  coaches: Coach[];
}> {
  const { extractUniqueSlug, findCoachByParam, isCoachId } = await import('./coach-slug');
  const decoded = decodeURIComponent(param || '').trim();
  if (!decoded) return { coach: null, coaches: [] };

  const collected: Coach[] = [];
  const seen = new Set<string>();
  let page = 1;
  const limit = 10;
  const uniqueSlug = extractUniqueSlug(decoded);

  while (page <= 50) {
    const result = await getActiveCoachesPage({ page, limit });

    for (const coach of result.coaches) {
      if (!coach._id || seen.has(coach._id)) continue;
      seen.add(coach._id);
      collected.push(coach);
    }

    if (isCoachId(decoded)) {
      const byId = collected.find((c) => c._id === decoded) ?? null;
      if (byId) return { coach: byId, coaches: collected };
    } else if (uniqueSlug) {
      const bySlug =
        collected.find((c) => c.slug && c.slug.toLowerCase() === uniqueSlug) ?? null;
      if (bySlug) return { coach: bySlug, coaches: collected };
    } else {
      const match = findCoachByParam(collected, decoded);
      if (match) return { coach: match, coaches: collected };
    }

    if (!result.hasMore || result.coaches.length === 0) break;
    page += 1;
  }

  return { coach: findCoachByParam(collected, decoded), coaches: collected };
}
