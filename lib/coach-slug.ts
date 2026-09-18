import type { Coach } from '@/lib/api';

const MONGO_ID = /^[a-f0-9]{24}$/i;
/** Backend unique share slug: 8 chars, a-z + 0-9 */
const UNIQUE_SLUG = /^[a-z0-9]{8}$/i;

export function isCoachId(value: string): boolean {
  return MONGO_ID.test(value.trim());
}

export function isUniqueCoachSlug(value: string): boolean {
  return UNIQUE_SLUG.test(value.trim());
}

/** SEO/display path segment from the coach display name (Arabic-friendly). */
export function slugifyCoachName(name: string): string {
  return name
    .normalize('NFC')
    .trim()
    .replace(/[.\u060C,،_]+/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\p{L}\p{N}-]+/gu, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Extract the unique 8-char backend slug from a URL param.
 * e.g. "Medo-Z-k7m2xq9p" → "k7m2xq9p", "k7m2xq9p" → "k7m2xq9p"
 */
export function extractUniqueSlug(param: string): string | null {
  const decoded = decodeURIComponent(param || '').trim();
  if (!decoded) return null;
  if (isUniqueCoachSlug(decoded)) return decoded.toLowerCase();

  const last = decoded.split('-').pop() || '';
  if (isUniqueCoachSlug(last)) return last.toLowerCase();
  return null;
}

function pathSegmentFromShareUrl(shareProfileUrl?: string | null): string | null {
  if (!shareProfileUrl) return null;
  try {
    const pathname = new URL(shareProfileUrl).pathname;
    const segment = pathname.split('/').filter(Boolean).pop();
    return segment ? decodeURIComponent(segment) : null;
  } catch {
    return null;
  }
}

/**
 * Canonical public path segment for a coach.
 * Prefer API shareProfileUrl / unique slug — name prefix is SEO only.
 */
export function getCoachSlug(
  coach: Pick<Coach, '_id' | 'name' | 'slug' | 'shareProfileUrl'>,
  _coaches: Pick<Coach, '_id' | 'name' | 'slug'>[] = []
): string {
  const fromShareUrl = pathSegmentFromShareUrl(coach.shareProfileUrl);
  if (fromShareUrl) return fromShareUrl;

  if (coach.slug) {
    const namePart = slugifyCoachName(coach.name);
    return namePart ? `${namePart}-${coach.slug}` : coach.slug;
  }

  // Legacy fallback before slug backfill
  const legacy = slugifyCoachName(coach.name);
  return legacy || coach._id;
}

export function getCoachPath(
  coach: Pick<Coach, '_id' | 'name' | 'slug' | 'shareProfileUrl'>,
  coaches: Pick<Coach, '_id' | 'name' | 'slug'>[] = []
): string {
  return `/coaches/${getCoachSlug(coach, coaches)}`;
}

export function findCoachByParam(coaches: Coach[], param: string): Coach | null {
  const decoded = decodeURIComponent(param || '').trim();
  if (!decoded) return null;

  if (isCoachId(decoded)) {
    return coaches.find((coach) => coach._id === decoded) ?? null;
  }

  // Primary: unique trailing slug (stable even if display name changes)
  const unique = extractUniqueSlug(decoded);
  if (unique) {
    const bySlug = coaches.find(
      (coach) => coach.slug && coach.slug.toLowerCase() === unique
    );
    if (bySlug) return bySlug;
  }

  const normalized = decoded.toLowerCase();

  const byCanonical = coaches.find(
    (coach) => getCoachSlug(coach, coaches).toLowerCase() === normalized
  );
  if (byCanonical) return byCanonical;

  // Legacy: name-only URLs from before unique slugs
  const byName = coaches.filter(
    (coach) => slugifyCoachName(coach.name).toLowerCase() === normalized
  );
  return byName[0] ?? null;
}
