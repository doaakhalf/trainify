import type { Coach } from '@/lib/api';

const MONGO_ID = /^[a-f0-9]{24}$/i;

export function isCoachId(value: string): boolean {
  return MONGO_ID.test(value.trim());
}

/** Shareable path segment from the coach display name (Arabic-friendly). */
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

export function getCoachSlug(
  coach: Pick<Coach, '_id' | 'name'>,
  coaches: Pick<Coach, '_id' | 'name'>[] = []
): string {
  const base = slugifyCoachName(coach.name);
  if (!base) return coach._id;

  const clashes = coaches.filter(
    (item) => item._id !== coach._id && slugifyCoachName(item.name) === base
  );
  if (clashes.length > 0) {
    return `${base}-${coach._id.slice(-6)}`;
  }
  return base;
}

export function getCoachPath(
  coach: Pick<Coach, '_id' | 'name'>,
  coaches: Pick<Coach, '_id' | 'name'>[] = []
): string {
  return `/coaches/${getCoachSlug(coach, coaches)}`;
}

export function findCoachByParam(coaches: Coach[], param: string): Coach | null {
  const decoded = decodeURIComponent(param || '').trim();
  if (!decoded) return null;

  if (isCoachId(decoded)) {
    return coaches.find((coach) => coach._id === decoded) ?? null;
  }

  const normalized = decoded.toLowerCase();

  const byCanonical = coaches.find(
    (coach) => getCoachSlug(coach, coaches).toLowerCase() === normalized
  );
  if (byCanonical) return byCanonical;

  const byName = coaches.filter(
    (coach) => slugifyCoachName(coach.name).toLowerCase() === normalized
  );
  return byName[0] ?? null;
}
