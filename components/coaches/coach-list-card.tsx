'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type MouseEvent } from 'react';
import { Calendar, Check, Copy, Star } from 'lucide-react';
import { content } from '@/content/ar';
import { Button, buttonVariants } from '@/components/ui/button';
import { openPrimaryStore } from '@/components/coaches/app-download-buttons';
import type { Coach } from '@/lib/api';
import { resolveImageUrl } from '@/lib/api';
import { getCoachPath } from '@/lib/coach-slug';
import { saveCoachesListUrl } from '@/lib/coaches-list-url';
import { cn } from '@/lib/utils';
import { CoachName } from '@/components/coaches/coach-name';

interface CoachListCardProps {
  coach: Coach;
  coaches?: Coach[];
}

function rememberListUrl() {
  if (typeof window === 'undefined') return;
  saveCoachesListUrl(
    `${window.location.pathname}${window.location.search}` || '/coaches'
  );
}

function coachShareUrl(
  coach: Coach,
  detailsHref: string
): string {
  const share = coach.shareProfileUrl?.trim();
  if (share?.startsWith('http://') || share?.startsWith('https://')) return share;
  if (share?.startsWith('/')) return `${window.location.origin}${share}`;
  return `${window.location.origin}${detailsHref}`;
}

export function CoachListCard({ coach, coaches = [] }: CoachListCardProps) {
  const router = useRouter();
  const t = content.coachesPage;
  const detailsHref = getCoachPath(coach, coaches);
  const [copied, setCopied] = useState(false);
  const image = resolveImageUrl(coach.profileImage);
  const bio = coach.introduction?.trim();
  const snippet =
    bio && bio.length > 140 ? `${bio.slice(0, 140).trim()}…` : bio;

  const goToDetails = () => {
    rememberListUrl();
    router.push(detailsHref);
  };

  const copyCoachLink = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    try {
      await navigator.clipboard.writeText(coachShareUrl(coach, detailsHref));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <article
      role="link"
      tabIndex={0}
      onClick={goToDetails}
      onKeyDown={(e) => {
        if (e.target !== e.currentTarget) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          goToDetails();
        }
      }}
      className="cursor-pointer rounded-3xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="mb-4 flex items-start gap-4">
        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl bg-gray-100">
          <Image src={image} alt={coach.name} fill className="object-cover" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-center gap-1.5">
            <h3 className="truncate text-lg font-bold text-gray-900">
              <CoachName name={coach.name} />
            </h3>
            <button
              type="button"
              aria-label={copied ? t.shareCopied : t.copyLink}
              title={copied ? t.shareCopied : t.copyLink}
              onClick={copyCoachLink}
              className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-green-600" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
          <p className="mt-1 line-clamp-2 text-sm text-gray-600">
            {coach.headline || 'مدرب معتمد'}
          </p>
          {typeof coach.experience === 'number' && (
            <div className="mt-2 flex items-center gap-1.5 text-sm text-gray-700">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span>
                {coach.experience} {t.experience}
              </span>
            </div>
          )}
        </div>

        {typeof coach.price === 'number' && (
          <div className="flex-shrink-0 text-left">
            <p className="text-xl font-bold text-gray-900">
              {coach.price.toLocaleString('ar-EG')}
            </p>
            <p className="text-xs text-gray-500">{t.perMonth}</p>
          </div>
        )}
      </div>

      {typeof coach.rating === 'number' && (
        <div className="mb-4 flex items-center gap-1.5 text-sm text-gray-700">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          <span className="font-semibold">{coach.rating}</span>
        </div>
      )}

      {snippet && (
        <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-gray-600">
          {snippet}
        </p>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Link
          href={detailsHref}
          onClick={(e) => {
            e.stopPropagation();
            rememberListUrl();
          }}
          className={cn(buttonVariants({ variant: 'secondary' }), 'w-full')}
        >
          {t.seeDetails}
        </Link>
        <Button
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            openPrimaryStore();
          }}
        >
          {t.subscribeViaApp}
        </Button>
      </div>
    </article>
  );
}
