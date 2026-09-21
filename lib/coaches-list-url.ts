const COACHES_LIST_URL_KEY = 'trainify.coachesListUrl';

/** Persist the shareable /coaches?... URL for back navigation & header. */
export function saveCoachesListUrl(pathWithQuery: string) {
  if (typeof window === 'undefined') return;
  try {
    const normalized = pathWithQuery.startsWith('/coaches')
      ? pathWithQuery
      : `/coaches${pathWithQuery.startsWith('?') ? pathWithQuery : ''}`;
    sessionStorage.setItem(COACHES_LIST_URL_KEY, normalized || '/coaches');
  } catch {
    // ignore quota / private mode
  }
}

/** Last coaches list URL with filters, or `/coaches`. */
export function getCoachesListUrl(fallback = '/coaches'): string {
  if (typeof window === 'undefined') return fallback;
  try {
    const stored = sessionStorage.getItem(COACHES_LIST_URL_KEY);
    if (stored && stored.startsWith('/coaches')) return stored;
  } catch {
    // ignore
  }
  return fallback;
}
