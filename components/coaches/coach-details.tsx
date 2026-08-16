'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowRight,
  Award,
  Calendar,
  Medal,
  Star,
  Trophy,
  Users,
} from 'lucide-react';
import { content } from '@/content/ar';
import { Button } from '@/components/ui/button';
import {
  AppDownloadButtons,
  openPrimaryStore,
} from '@/components/coaches/app-download-buttons';
import type { Coach } from '@/lib/api';
import { resolveImageUrl } from '@/lib/api';

interface CoachDetailsProps {
  coach: Coach;
}

export function CoachDetails({ coach }: CoachDetailsProps) {
  const t = content.coachesPage;
  const image = resolveImageUrl(coach.profileImage);
  const gallery = coach.galleryImages.filter(Boolean);
  const [activeGallery, setActiveGallery] = useState(0);

  return (
    <div className="bg-gradient-to-b from-white via-gray-50/30 to-white">
      <div className="container mx-auto px-4 pb-16 pt-6 lg:pb-20 lg:pt-8">
        <Link
          href="/coaches"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 transition-colors hover:text-primary"
        >
          <ArrowRight className="h-4 w-4" />
          {t.backToCoaches}
        </Link>

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-10">
          <div className="space-y-7">
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl bg-gray-100 sm:h-24 sm:w-24">
                <Image src={image} alt={coach.name} fill className="object-cover" />
              </div>
              <div className="min-w-0 pt-0.5">
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  {coach.name}
                </h1>
                <p className="mt-1.5 text-base text-gray-600">
                  {coach.headline || 'مدرب معتمد'}
                </p>
              </div>
            </div>

            <div
              className={`grid gap-3 rounded-2xl border border-gray-100 bg-white px-3 py-4 text-center shadow-sm sm:gap-6 sm:px-6 sm:py-5 ${
                typeof coach.rating === 'number' ? 'grid-cols-3' : 'grid-cols-2'
              }`}
            >
              {typeof coach.rating === 'number' && (
                <div>
                  <div className="mb-1 flex items-center justify-center gap-1 text-amber-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-lg font-bold text-gray-900">
                      {coach.rating}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 sm:text-sm">{t.rating}</p>
                </div>
              )}
              <div>
                <div className="mb-1 flex items-center justify-center gap-1 text-gray-700">
                  <Users className="h-4 w-4" />
                  <span className="text-lg font-bold text-gray-900">
                    {coach.subscribers ?? 0}
                  </span>
                </div>
                <p className="text-xs text-gray-500 sm:text-sm">{t.subscribers}</p>
              </div>
              <div>
                <div className="mb-1 flex items-center justify-center gap-1 text-gray-700">
                  <Calendar className="h-4 w-4" />
                  <span className="text-lg font-bold text-gray-900">
                    {coach.experience ?? 0}
                  </span>
                </div>
                <p className="text-xs text-gray-500 sm:text-sm">{t.experience}</p>
              </div>
            </div>

            {gallery.length > 0 && (
              <section>
                <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-gray-900">
                  <Award className="h-5 w-5 text-primary" />
                  {t.transformations}
                </h2>
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-gray-100">
                  <Image
                    src={resolveImageUrl(gallery[activeGallery])}
                    alt={`${coach.name} transformation`}
                    fill
                    className="object-cover"
                  />
                </div>
                {gallery.length > 1 && (
                  <div className="mt-3 flex justify-center gap-2">
                    {gallery.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setActiveGallery(index)}
                        className={`h-2 w-2 rounded-full transition-colors ${
                          index === activeGallery ? 'bg-primary' : 'bg-gray-300'
                        }`}
                        aria-label={`Image ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </section>
            )}

            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm lg:hidden">
              <div className="flex items-center justify-between gap-4">
                {typeof coach.price === 'number' && (
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {coach.price.toLocaleString('ar-EG')}
                    </p>
                    <p className="text-sm text-gray-500">{t.perMonth}</p>
                  </div>
                )}
                <Button onClick={openPrimaryStore}>{t.startWithCoach}</Button>
              </div>
              <p className="mt-3 text-sm text-gray-500">{t.downloadHint}</p>
            </div>

            {coach.introduction && (
              <section>
                <h2 className="mb-2 text-lg font-bold text-gray-900">{t.aboutMe}</h2>
                <p className="whitespace-pre-line leading-relaxed text-gray-600">
                  {coach.introduction}
                </p>
              </section>
            )}

            {coach.motivation && (
              <section>
                <h2 className="mb-2 text-lg font-bold text-gray-900">
                  {t.trainingStyle}
                </h2>
                <p className="whitespace-pre-line leading-relaxed text-gray-600">
                  {coach.motivation}
                </p>
              </section>
            )}

            {coach.trainingExperience && (
              <section>
                <h2 className="mb-2 text-lg font-bold text-gray-900">
                  {t.specializationAndExperience}
                </h2>
                <p className="whitespace-pre-line leading-relaxed text-gray-600">
                  {coach.trainingExperience}
                </p>
              </section>
            )}

            {coach.achievements.length > 0 && (
              <section>
                <h2 className="mb-3 text-lg font-bold text-gray-900">
                  {t.achievements}
                </h2>
                <div className="space-y-2.5">
                  {coach.achievements.map((item, index) => (
                    <div
                      key={item._id || `${item.name}-${index}`}
                      className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm"
                    >
                      <Trophy className="h-5 w-5 flex-shrink-0 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        {item.rank && (
                          <p className="text-sm text-gray-500">{item.rank}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {coach.certificates.length > 0 && (
              <section>
                <h2 className="mb-3 text-lg font-bold text-gray-900">
                  {t.certificates}
                </h2>
                <div className="space-y-2.5">
                  {coach.certificates.map((item, index) => (
                    <div
                      key={item._id || `${item.name}-${index}`}
                      className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm"
                    >
                      <Medal className="h-5 w-5 flex-shrink-0 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        {item.year != null && (
                          <p className="text-sm text-gray-500">{item.year}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="rounded-3xl bg-gradient-to-br from-primary/10 via-white to-primary/5 p-6 text-center sm:p-8">
              <h2 className="mb-2 text-xl font-bold text-gray-900 sm:text-2xl">
                {t.finalCtaTitle}
              </h2>
              <p className="mb-5 text-gray-600">{t.finalCtaSubtitle}</p>
              <AppDownloadButtons className="justify-center" />
            </section>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-4 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
              {typeof coach.price === 'number' && (
                <div>
                  <p className="text-3xl font-bold text-gray-900">
                    {coach.price.toLocaleString('ar-EG')}
                  </p>
                  <p className="text-sm text-gray-500">{t.perMonth}</p>
                </div>
              )}
              <p className="text-sm leading-relaxed text-gray-600">
                {t.downloadHint}
              </p>
              <Button size="lg" className="w-full" onClick={openPrimaryStore}>
                {t.startWithCoach}
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
