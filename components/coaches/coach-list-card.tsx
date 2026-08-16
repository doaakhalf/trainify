'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Calendar, Star, Users } from 'lucide-react';
import { content } from '@/content/ar';
import { Button, buttonVariants } from '@/components/ui/button';
import { openPrimaryStore } from '@/components/coaches/app-download-buttons';
import type { Coach } from '@/lib/api';
import { resolveImageUrl } from '@/lib/api';
import { cn } from '@/lib/utils';

interface CoachListCardProps {
  coach: Coach;
}

export function CoachListCard({ coach }: CoachListCardProps) {
  const router = useRouter();
  const t = content.coachesPage;
  const detailsHref = `/coaches/${coach._id}`;
  const image = resolveImageUrl(coach.profileImage);
  const bio = coach.introduction?.trim();
  const snippet =
    bio && bio.length > 140 ? `${bio.slice(0, 140).trim()}…` : bio;

  return (
    <article
      role="link"
      tabIndex={0}
      onClick={() => router.push(detailsHref)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          router.push(detailsHref);
        }
      }}
      className="cursor-pointer rounded-3xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="mb-4 flex items-start gap-4">
        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl bg-gray-100">
          <Image src={image} alt={coach.name} fill className="object-cover" />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-bold text-gray-900">{coach.name}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-gray-600">
            {coach.headline || 'مدرب معتمد'}
          </p>
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

      <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-700">
        {typeof coach.rating === 'number' && (
          <div className="flex items-center gap-1.5">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="font-semibold">{coach.rating}</span>
          </div>
        )}
        <div className="flex items-center gap-1.5">
          <Users className="h-4 w-4 text-gray-500" />
          <span>
            {coach.subscribers ?? 0} {t.subscribers}
          </span>
        </div>
        {typeof coach.experience === 'number' && (
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span>
              {coach.experience} {t.experience}
            </span>
          </div>
        )}
      </div>

      {snippet && (
        <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-gray-600">
          {snippet}
        </p>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Link
          href={detailsHref}
          onClick={(e) => e.stopPropagation()}
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
