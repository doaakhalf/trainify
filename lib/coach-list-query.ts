export interface CoachFiltersState {
  gender: 'male' | 'female' | null;
  minPrice: string;
  maxPrice: string;
  minExperience: string;
  maxExperience: string;
}

export const defaultCoachFilters: CoachFiltersState = {
  gender: null,
  minPrice: '',
  maxPrice: '',
  minExperience: '',
  maxExperience: '',
};

type SearchParamValue = string | string[] | undefined;
type SearchParamsInput =
  | URLSearchParams
  | { get: (key: string) => string | null }
  | Record<string, SearchParamValue>;

function firstParam(value: SearchParamValue): string {
  if (Array.isArray(value)) return value[0]?.trim() ?? '';
  return value?.trim() ?? '';
}

function readParam(source: SearchParamsInput, key: string): string {
  if (typeof (source as { get?: unknown }).get === 'function') {
    return ((source as { get: (k: string) => string | null }).get(key) || '').trim();
  }
  return firstParam((source as Record<string, SearchParamValue>)[key]);
}

/** Read filters + search from `/coaches?...` query string. */
export function parseCoachListQuery(source: SearchParamsInput): {
  filters: CoachFiltersState;
  search: string;
} {
  const genderRaw = readParam(source, 'gender');
  const gender =
    genderRaw === 'male' || genderRaw === 'female' ? genderRaw : null;

  return {
    search: readParam(source, 'search'),
    filters: {
      gender,
      minPrice: readParam(source, 'minPrice'),
      maxPrice: readParam(source, 'maxPrice'),
      minExperience:
        readParam(source, 'minYearsOfExperience') ||
        readParam(source, 'minExperience'),
      maxExperience:
        readParam(source, 'maxYearsOfExperience') ||
        readParam(source, 'maxExperience'),
    },
  };
}

/** Build a stable query string for shareable coach list URLs.
 *  Note: `status=active` is always sent to the API, never written to the browser URL.
 */
export function serializeCoachListQuery(
  filters: CoachFiltersState,
  search = ''
): string {
  const params = new URLSearchParams();
  const q = search.trim();
  if (q) params.set('search', q);
  if (filters.gender) params.set('gender', filters.gender);
  if (filters.minPrice.trim()) params.set('minPrice', filters.minPrice.trim());
  if (filters.maxPrice.trim()) params.set('maxPrice', filters.maxPrice.trim());
  if (filters.minExperience.trim()) {
    params.set('minYearsOfExperience', filters.minExperience.trim());
  }
  if (filters.maxExperience.trim()) {
    params.set('maxYearsOfExperience', filters.maxExperience.trim());
  }
  // Never expose internal API-only params (e.g. status) in the browser URL.
  params.delete('status');
  return params.toString();
}
