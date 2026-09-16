import type { Coach } from '@/lib/api';
import { content } from '@/content/ar';

const t = content.coachesPage;

export function getCoachSpecialty(coach: Pick<Coach, 'headline' | 'sport'>): string {
  return coach.headline?.trim() || coach.sport?.trim() || 'مدرب معتمد';
}

/** og:title — اسم الكوتش وتخصصه */
export function getCoachOgTitle(coach: Pick<Coach, 'name' | 'headline' | 'sport'>): string {
  return `${coach.name} – ${getCoachSpecialty(coach)}`;
}

/** og:description — الخبرة وحماية الاشتراك */
export function getCoachOgDescription(coach: Pick<Coach, 'experience'>): string {
  const protection = t.protectedSubscription;
  if (typeof coach.experience === 'number') {
    return `${coach.experience} ${t.experience} · ${protection}`;
  }
  return `${protection} · ${t.moneyProtectedBody}`;
}
