'use client';

import { content } from '@/content/ar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { RotateCcw, User, X } from 'lucide-react';

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

interface CoachFiltersProps {
  value: CoachFiltersState;
  onChange: (next: CoachFiltersState) => void;
  onApply?: () => void;
  onReset?: () => void;
  onClose?: () => void;
  variant?: 'sidebar' | 'sheet';
  className?: string;
}

export function CoachFilters({
  value,
  onChange,
  onApply,
  onReset,
  onClose,
  variant = 'sidebar',
  className,
}: CoachFiltersProps) {
  const t = content.coachesPage;
  const isSheet = variant === 'sheet';

  const update = (patch: Partial<CoachFiltersState>) => {
    onChange({ ...value, ...patch });
  };

  return (
    <div
      className={cn(
        'bg-white',
        isSheet ? 'rounded-t-3xl' : 'rounded-2xl border border-gray-100 shadow-sm',
        className
      )}
    >
      {isSheet && (
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1.5 text-sm font-medium text-primary"
          >
            <RotateCcw className="h-4 w-4" />
            {t.reset}
          </button>
          <h2 className="text-lg font-bold text-gray-900">{t.filtersTitle}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-gray-500 hover:bg-gray-100"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      {!isSheet && (
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h2 className="text-lg font-bold text-gray-900">{t.filtersTitle}</h2>
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1.5 text-sm font-medium text-primary"
          >
            <RotateCcw className="h-4 w-4" />
            {t.reset}
          </button>
        </div>
      )}

      <div className="space-y-6 px-5 py-5">
        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-900">{t.gender}</h3>
          <div className="grid grid-cols-2 gap-3">
            {(
              [
                { key: 'male' as const, label: t.male },
                { key: 'female' as const, label: t.female },
              ]
            ).map((option) => {
              const selected = value.gender === option.key;
              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() =>
                    update({ gender: selected ? null : option.key })
                  }
                  className={cn(
                    'flex items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-medium transition-colors',
                    selected
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-gray-200 text-gray-700 hover:border-primary/40'
                  )}
                >
                  <User className="h-4 w-4" />
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-900">{t.monthlyPrice}</h3>
          <div className="grid grid-cols-2 gap-3">
            <label className="space-y-1.5">
              <span className="text-xs text-gray-500">{t.minPrice}</span>
              <input
                type="number"
                min={0}
                inputMode="numeric"
                value={value.minPrice}
                onChange={(e) => update({ minPrice: e.target.value })}
                placeholder="500"
                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-primary"
              />
            </label>
            <label className="space-y-1.5">
              <span className="text-xs text-gray-500">{t.maxPrice}</span>
              <input
                type="number"
                min={0}
                inputMode="numeric"
                value={value.maxPrice}
                onChange={(e) => update({ maxPrice: e.target.value })}
                placeholder="2000"
                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-primary"
              />
            </label>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-900">{t.experienceYears}</h3>
          <div className="grid grid-cols-2 gap-3">
            <label className="space-y-1.5">
              <span className="text-xs text-gray-500">{t.minYears}</span>
              <input
                type="number"
                min={0}
                inputMode="numeric"
                value={value.minExperience}
                onChange={(e) => update({ minExperience: e.target.value })}
                placeholder="0"
                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-primary"
              />
            </label>
            <label className="space-y-1.5">
              <span className="text-xs text-gray-500">{t.maxYears}</span>
              <input
                type="number"
                min={0}
                inputMode="numeric"
                value={value.maxExperience}
                onChange={(e) => update({ maxExperience: e.target.value })}
                placeholder="10"
                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-primary"
              />
            </label>
          </div>
        </div>
      </div>

      {isSheet && (
        <div className="border-t border-gray-100 px-5 py-4">
          <Button size="lg" className="w-full" onClick={onApply}>
            {t.applyFilters}
          </Button>
        </div>
      )}
    </div>
  );
}
