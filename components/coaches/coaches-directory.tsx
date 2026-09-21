'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Search, SlidersHorizontal } from 'lucide-react';
import { content } from '@/content/ar';
import {
  CoachFilters,
  defaultCoachFilters,
  type CoachFiltersState,
} from '@/components/coaches/coach-filters';
import { serializeCoachListQuery } from '@/lib/coach-list-query';
import { CoachListCard } from '@/components/coaches/coach-list-card';
import {
  getActiveCoachesPage,
  type Coach,
  type CoachesListParams,
} from '@/lib/api';

interface CoachesDirectoryProps {
  initialCoaches: Coach[];
  initialHasMore?: boolean;
  initialFilters?: CoachFiltersState;
  initialSearch?: string;
  pageSize?: number;
}

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

function isAbortError(error: unknown): boolean {
  return (
    (error instanceof DOMException && error.name === 'AbortError') ||
    (error instanceof Error && error.name === 'AbortError')
  );
}

export function CoachesDirectory({
  initialCoaches,
  initialHasMore = false,
  initialFilters = defaultCoachFilters,
  initialSearch = '',
  pageSize = 10,
}: CoachesDirectoryProps) {
  const t = content.coachesPage;
  const pathname = usePathname();

  const [search, setSearch] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);
  const [draftFilters, setDraftFilters] =
    useState<CoachFiltersState>(initialFilters);
  const [appliedFilters, setAppliedFilters] =
    useState<CoachFiltersState>(initialFilters);
  const [debouncedFilters, setDebouncedFilters] =
    useState<CoachFiltersState>(initialFilters);
  const [sheetOpen, setSheetOpen] = useState(false);

  const [coaches, setCoaches] = useState<Coach[]>(initialCoaches);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const filtersRef = useRef(debouncedFilters);
  const searchRef = useRef(debouncedSearch);
  const abortRef = useRef<AbortController | null>(null);
  const skipFirstQueryEffect = useRef(true);
  filtersRef.current = debouncedFilters;
  searchRef.current = debouncedSearch;

  const syncUrl = useCallback(
    (filters: CoachFiltersState, searchQuery: string) => {
      if (typeof window === 'undefined') return;
      const qs = serializeCoachListQuery(filters, searchQuery);
      const next = qs ? `${pathname}?${qs}` : pathname;
      const current = `${window.location.pathname}${window.location.search}`;
      if (current === next) return;
      // History API avoids Next.js RSC soft-nav (_rsc) fighting client fetches.
      window.history.replaceState(window.history.state, '', next);
    },
    [pathname]
  );

  // Debounce search typing
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 350);
    return () => window.clearTimeout(timer);
  }, [search]);

  // Debounce sidebar filter inputs (min/max) so we fetch the final values
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedFilters(appliedFilters);
    }, 350);
    return () => window.clearTimeout(timer);
  }, [appliedFilters]);

  const fetchPage = useCallback(
    async (
      pageNum: number,
      append: boolean,
      filters: CoachFiltersState,
      searchQuery: string
    ) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        if (append) {
          setLoadingMore(true);
        } else {
          setLoading(true);
        }

        const result = await getActiveCoachesPage({
          page: pageNum,
          limit: pageSize,
          signal: controller.signal,
          ...filtersToApiParams(filters, searchQuery),
        });

        if (controller.signal.aborted) return;

        setCoaches((prev) =>
          append
            ? [
                ...prev,
                ...result.coaches.filter(
                  (c) => !prev.some((p) => p._id === c._id)
                ),
              ]
            : result.coaches
        );
        setHasMore(result.hasMore);
        setPage(pageNum);
      } catch (error) {
        if (isAbortError(error) || controller.signal.aborted) return;
        console.error('Error loading coaches:', error);
        if (!append) {
          setCoaches([]);
          setHasMore(false);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
          setLoadingMore(false);
        }
      }
    },
    [pageSize]
  );

  // Refetch + sync URL when debounced filters or search change
  useEffect(() => {
    if (skipFirstQueryEffect.current) {
      skipFirstQueryEffect.current = false;
      syncUrl(debouncedFilters, debouncedSearch);
      return;
    }
    syncUrl(debouncedFilters, debouncedSearch);
    fetchPage(1, false, debouncedFilters, debouncedSearch);
  }, [debouncedFilters, debouncedSearch, fetchPage, syncUrl]);

  const loadMore = useCallback(() => {
    if (!hasMore || loadingMore || loading) return;
    fetchPage(page + 1, true, filtersRef.current, searchRef.current);
  }, [fetchPage, hasMore, loading, loadingMore, page]);

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          loadMore();
        }
      },
      { root: null, rootMargin: '400px 0px', threshold: 0 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasMore, loadMore, coaches.length]);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const resetFilters = () => {
    setDraftFilters(defaultCoachFilters);
    setAppliedFilters(defaultCoachFilters);
    setDebouncedFilters(defaultCoachFilters);
  };

  const applySheetFilters = () => {
    setAppliedFilters(draftFilters);
    setDebouncedFilters(draftFilters);
    setSheetOpen(false);
  };

  const searchInput = (
    <div className="relative w-full">
      <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={t.searchPlaceholder}
        className="w-full rounded-xl border border-gray-200 bg-white py-3 pr-10 pl-4 text-sm shadow-sm outline-none focus:border-primary"
      />
    </div>
  );

  return (
    <div className="bg-gradient-to-b from-white via-gray-50/40 to-white">
      <div className="container mx-auto px-4 pb-16 pt-6 lg:pb-24 lg:pt-8">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 transition-colors hover:text-primary"
        >
          <ArrowRight className="h-4 w-4" />
          {t.backToHome}
        </Link>

        <div className="mb-5 flex gap-3 lg:hidden">
          <div className="flex-1">{searchInput}</div>
          <button
            type="button"
            onClick={() => {
              setDraftFilters(appliedFilters);
              setSheetOpen(true);
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm"
          >
            <SlidersHorizontal className="h-4 w-4" />
            {t.filtersLabel}
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[400px_minmax(0,1fr)] lg:gap-8">
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-4">
              {searchInput}
              <CoachFilters
                variant="sidebar"
                value={appliedFilters}
                onChange={setAppliedFilters}
                onReset={resetFilters}
              />
            </div>
          </aside>

          <div className="space-y-4">
            {loading ? (
              <div className="flex justify-center py-16">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-primary" />
              </div>
            ) : coaches.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-16 text-center text-gray-600">
                {t.empty}
              </div>
            ) : (
              <>
                {coaches.map((coach) => (
                  <CoachListCard
                    key={coach._id}
                    coach={coach}
                    coaches={coaches}
                  />
                ))}

                {hasMore && (
                  <div
                    ref={loadMoreRef}
                    className="flex flex-col items-center justify-center gap-3 py-8"
                  >
                    {loadingMore && (
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-primary" />
                    )}
                    <button
                      type="button"
                      onClick={loadMore}
                      disabled={loadingMore}
                      className="text-sm font-semibold text-primary hover:underline disabled:opacity-50"
                    >
                      عرض المزيد
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {sheetOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Close filters"
            onClick={() => setSheetOpen(false)}
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[90vh] overflow-y-auto">
            <CoachFilters
              variant="sheet"
              value={draftFilters}
              onChange={setDraftFilters}
              onApply={applySheetFilters}
              onReset={() => {
                resetFilters();
                setSheetOpen(false);
              }}
              onClose={() => setSheetOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
