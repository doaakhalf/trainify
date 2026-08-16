'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Search, SlidersHorizontal } from 'lucide-react';
import { content } from '@/content/ar';
import {
  CoachFilters,
  defaultCoachFilters,
  type CoachFiltersState,
} from '@/components/coaches/coach-filters';
import { CoachListCard } from '@/components/coaches/coach-list-card';
import type { Coach } from '@/lib/api';

interface CoachesDirectoryProps {
  coaches: Coach[];
}

function parseOptionalNumber(value: string): number | null {
  if (!value.trim()) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function applyFilters(
  coaches: Coach[],
  search: string,
  filters: CoachFiltersState
): Coach[] {
  const query = search.trim().toLowerCase();
  const minPrice = parseOptionalNumber(filters.minPrice);
  const maxPrice = parseOptionalNumber(filters.maxPrice);
  const minExp = parseOptionalNumber(filters.minExperience);
  const maxExp = parseOptionalNumber(filters.maxExperience);

  return coaches.filter((coach) => {
    if (filters.gender && coach.gender !== filters.gender) return false;

    if (minPrice != null && (coach.price ?? 0) < minPrice) return false;
    if (maxPrice != null && (coach.price ?? Infinity) > maxPrice) return false;

    if (minExp != null && (coach.experience ?? 0) < minExp) return false;
    if (maxExp != null && (coach.experience ?? Infinity) > maxExp) return false;

    if (query) {
      const haystack = `${coach.name} ${coach.headline || ''}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }

    return true;
  });
}

export function CoachesDirectory({ coaches }: CoachesDirectoryProps) {
  const t = content.coachesPage;
  const [search, setSearch] = useState('');
  const [draftFilters, setDraftFilters] =
    useState<CoachFiltersState>(defaultCoachFilters);
  const [appliedFilters, setAppliedFilters] =
    useState<CoachFiltersState>(defaultCoachFilters);
  const [sheetOpen, setSheetOpen] = useState(false);

  const filtered = useMemo(
    () => applyFilters(coaches, search, appliedFilters),
    [coaches, search, appliedFilters]
  );

  const resetFilters = () => {
    setDraftFilters(defaultCoachFilters);
    setAppliedFilters(defaultCoachFilters);
  };

  const applySheetFilters = () => {
    setAppliedFilters(draftFilters);
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


        {/* Mobile: search + filters button */}
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

        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-8">
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
            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-16 text-center text-gray-600">
                {t.empty}
              </div>
            ) : (
              filtered.map((coach) => (
                <CoachListCard key={coach._id} coach={coach} />
              ))
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
