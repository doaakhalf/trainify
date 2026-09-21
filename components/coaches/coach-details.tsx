'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, type ReactNode } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BadgeCheck,
  Calendar,
  ShieldCheck,
} from 'lucide-react';
import { content } from '@/content/ar';
import {
  AppDownloadButtons,
  openPrimaryStore,
} from '@/components/coaches/app-download-buttons';
import type { Coach } from '@/lib/api';
import { resolveImageUrl } from '@/lib/api';
import { getCoachesListUrl } from '@/lib/coaches-list-url';
import { CoachName } from '@/components/coaches/coach-name';

interface CoachDetailsProps {
  coach: Coach;
  coaches?: Coach[];
}

function ImageLogoBadge({ size = 28 }: { size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.png"
      alt="Trainify"
      width={size}
      height={size}
      className="absolute bottom-2 left-2 object-contain"
      style={{ width: size, height: size, borderRadius: 6 }}
    />
  );
}

function WidgetEndLogo({ size = 24 }: { size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.png"
      alt="Trainify"
      width={size}
      height={size}
      className="pointer-events-none absolute bottom-4 left-4 object-contain opacity-80"
      style={{ width: size, height: size, borderRadius: 6 }}
    />
  );
}

function WhiteWidget({
  children,
  className,
  showEndLogo = true,
}: {
  children: ReactNode;
  className?: string;
  showEndLogo?: boolean;
}) {
  return (
    <section
      className={`relative overflow-hidden rounded-2xl bg-white p-4 shadow-sm sm:rounded-[28px] sm:p-6 ${
        showEndLogo ? 'pb-9 sm:pb-10' : ''
      } ${className || ''}`}
    >
      <div className="relative z-10">{children}</div>
      {showEndLogo && <WidgetEndLogo />}
    </section>
  );
}

export function CoachDetails({ coach }: CoachDetailsProps) {
  const t = content.coachesPage;
  const image = resolveImageUrl(coach.profileImage);
  const gallery = coach.galleryImages.filter(Boolean);
  const [activeGallery, setActiveGallery] = useState(0);
  const [coachesListHref, setCoachesListHref] = useState('/coaches');

  useEffect(() => {
    setCoachesListHref(getCoachesListUrl('/coaches'));
  }, []);

  return (
    <div className="relative overflow-hidden bg-[#FFF7F1]">
      {/* Desktop width unchanged (lg:w-[70%]). Mobile/tablet get safer padding. */}
      <div className="relative z-10 mx-auto w-full max-w-[100%] px-4 pb-12 pt-5 sm:px-6 sm:pb-14 sm:pt-6 md:w-[90%] md:px-0 lg:w-[70%] lg:pb-20 lg:pt-10">
        <Link
          href={coachesListHref}
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 transition-colors hover:text-primary"
        >
          <ArrowRight className="h-4 w-4" />
          {t.backToCoaches}
        </Link>

        <WhiteWidget className="lg:p-8" showEndLogo={false}>
          {/* —— Mobile / tablet only: compact layout —— */}
          <div className="lg:hidden">
            <div className="flex items-center gap-3">
              <div className="relative h-32 w-28 flex-shrink-0 overflow-hidden rounded-2xl bg-gray-100 sm:h-36 sm:w-32">
                <Image
                  src={image}
                  alt={coach.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                  priority
                />
                <ImageLogoBadge size={24} />
              </div>
              <div className="min-w-0 flex-1 text-right">
                <div className="mb-1.5 inline-flex items-center gap-1 rounded-full bg-orange-50 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                  <BadgeCheck className="h-3.5 w-3.5" />
                  {t.verifiedOnTrainify}
                </div>
                <h1 className="text-xl font-bold leading-tight text-gray-900 sm:text-2xl">
                  <CoachName name={coach.name} />
                </h1>
                <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                  {coach.headline || 'مدرب معتمد'}
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {typeof coach.experience === 'number' && (
                <div className="rounded-2xl bg-[#FFF7F1] px-3 py-3 text-center">
                  <div className="inline-flex items-center justify-center gap-1.5">
                    <Calendar className="h-4 w-4 text-gray-400" strokeWidth={1.75} />
                    <span className="text-2xl font-bold leading-none text-gray-900">
                      {coach.experience}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">{t.experience}</p>
                </div>
              )}
              {typeof coach.price === 'number' && (
                <div className="rounded-2xl bg-[#FFF7F1] px-3 py-3 text-center">
                  <p className="text-2xl font-bold leading-none text-gray-900">
                    {coach.price.toLocaleString('ar-EG')}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">{t.perMonth}</p>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={openPrimaryStore}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition hover:bg-primary-dark"
            >
              <span>{t.contactOnTrainify}</span>
              <ArrowLeft className="h-4 w-4" />
            </button>
          </div>

          {/* —— Desktop only: unchanged layout —— */}
          <div className="hidden items-center gap-6 lg:grid lg:grid-cols-[auto_minmax(0,1fr)_1px_auto]">
            <div className="relative h-40 w-36 overflow-hidden rounded-2xl bg-gray-100">
              <Image
                src={image}
                alt={coach.name}
                fill
                className="object-cover"
                sizes="150px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              <ImageLogoBadge size={30} />
            </div>

            <div className="flex min-w-0 flex-col text-right">
              <div className="mb-3 inline-flex items-center gap-1.5 self-start rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-primary">
                <BadgeCheck className="h-4 w-4" />
                {t.verifiedOnTrainify}
              </div>
              <div className="flex items-center">
                <div className="min-w-0">
                  <h1 className="mb-2 text-[2.5rem] font-bold leading-tight text-gray-900">
                    <CoachName name={coach.name} />
                  </h1>
                  <p className="text-lg text-gray-500">
                    {coach.headline || 'مدرب معتمد'}
                  </p>
                </div>
                {typeof coach.experience === 'number' && (
                  <div className="flex flex-1 justify-center">
                    <div className="inline-flex items-center gap-2.5">
                      <Calendar className="h-6 w-6 text-gray-400" strokeWidth={1.75} />
                      <div className="text-center">
                        <p className="text-[2.5rem] font-bold leading-none text-gray-900">
                          {coach.experience}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">{t.experience}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="h-full min-h-[100px] w-px self-stretch bg-gray-200" />

            <div className="flex min-w-[220px] flex-col items-stretch justify-center gap-3">
              {typeof coach.price === 'number' && (
                <div className="w-full text-center">
                  <p className="text-[2.5rem] font-bold leading-tight tracking-tight text-gray-900">
                    {coach.price.toLocaleString('ar-EG')}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">{t.perMonth}</p>
                </div>
              )}
              <button
                type="button"
                onClick={openPrimaryStore}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition hover:bg-primary-dark"
              >
                <span>{t.contactOnTrainify}</span>
                <ArrowLeft className="h-4 w-4" />
              </button>
            </div>
          </div>
        </WhiteWidget>

        <div className="mt-4 flex flex-col items-center justify-center gap-2 rounded-2xl bg-[#FFE4D1] px-4 py-3 text-center sm:mt-5 sm:flex-row sm:items-center sm:justify-start sm:gap-3 sm:px-5 sm:py-3.5 sm:px-6 sm:text-right">
          <ShieldCheck className="h-7 w-7 flex-shrink-0 text-primary sm:h-8 sm:w-8" />
          <div className="min-w-0">
            <p className="text-sm font-bold leading-snug text-gray-800">
              {t.moneyProtectedTitle}
            </p>
            <p className="mt-0.5 text-xs leading-relaxed text-gray-600 sm:text-sm">
              {t.moneyProtectedBody}
            </p>
          </div>
        </div>

        <div className="mt-4 grid items-start gap-4 sm:mt-5 sm:gap-5 lg:grid-cols-1">
          {(coach.introduction || coach.motivation) && (
            <WhiteWidget className="lg:p-8">
              {coach.introduction && (
                <>
                  <h2 className="mb-3 text-right text-lg font-bold text-gray-900 sm:mb-4 sm:text-xl">
                    {t.aboutMe}
                  </h2>
                  <p className="whitespace-pre-line text-right text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
                    {coach.introduction}
                  </p>
                </>
              )}
              {coach.motivation && (
                <>
                  <h2
                    className={`text-right text-lg font-bold text-gray-900 sm:text-xl ${
                      coach.introduction ? 'mb-3 mt-7 sm:mb-4 sm:mt-10' : 'mb-3 sm:mb-4'
                    }`}
                  >
                    {t.trainingStyle}
                  </h2>
                  <p className="whitespace-pre-line text-right text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
                    {coach.motivation}
                  </p>
                </>
              )}
            </WhiteWidget>
          )}

          {coach.trainingExperience && (
            <WhiteWidget className="lg:p-8">
              <h2 className="mb-3 text-right text-lg font-bold text-gray-900 sm:mb-4 sm:text-xl">
                {t.specializationAndExperience}
              </h2>
              <p className="whitespace-pre-line text-right text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
                {coach.trainingExperience}
              </p>
            </WhiteWidget>
          )}
        </div>

        {(coach.achievements.length > 0 || coach.certificates.length > 0) && (
          <WhiteWidget className="mt-4 sm:mt-5 lg:p-7">
              {coach.achievements.length > 0 && (
                <>
                  <h2 className="mb-3 text-lg font-bold text-gray-900 sm:mb-4 sm:text-xl">
                    {t.achievements}
                  </h2>
                  <div className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-100">
                    {coach.achievements.map((item, index) => (
                      <div
                        key={item._id || `${item.name}-${index}`}
                        className="flex items-center justify-between gap-3 px-3 py-3 sm:gap-4 sm:px-4 sm:py-3.5"
                      >
                        <p className="text-sm font-medium text-gray-800 sm:text-base">
                          {item.name}
                          {item.rank ? ` — ${item.rank}` : ''}
                        </p>
                        <Award className="h-5 w-5 flex-shrink-0 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </>
              )}

              {coach.certificates.length > 0 && (
                <>
                  <h2 className="mb-3 mt-6 text-lg font-bold text-gray-900 sm:mb-4 sm:mt-8 sm:text-xl">
                    {t.certificates}
                  </h2>
                  <div className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-100">
                    {coach.certificates.map((item, index) => (
                      <div
                        key={item._id || `${item.name}-${index}`}
                        className="flex items-center justify-between gap-3 px-3 py-3 sm:gap-4 sm:px-4 sm:py-3.5"
                      >
                        <p className="text-sm font-medium text-gray-800 sm:text-base">
                          {item.name}
                        </p>
                        <div className="flex flex-shrink-0 items-center gap-2 text-gray-500">
                          {item.year != null && (
                            <span className="text-sm font-medium">{item.year}</span>
                          )}
                          <Award className="h-5 w-5" />
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
          </WhiteWidget>
        )}

        {gallery.length > 0 && (
          <WhiteWidget className="mt-4 sm:mt-5 lg:p-6">
            <h2 className="mb-3 text-lg font-bold text-gray-900">
              {t.transformations}
            </h2>
            <div className="mx-auto w-full max-w-[280px] sm:max-w-xs lg:max-w-sm">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100">
                <Image
                  key={gallery[activeGallery]}
                  src={resolveImageUrl(gallery[activeGallery])}
                  alt={`${coach.name} transformation ${activeGallery + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 280px, 320px"
                />
                {gallery.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveGallery((prev) =>
                          prev === 0 ? gallery.length - 1 : prev - 1
                        )
                      }
                      className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition hover:bg-black/60 sm:h-7 sm:w-7"
                      aria-label="Previous image"
                    >
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveGallery((prev) =>
                          prev === gallery.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition hover:bg-black/60 sm:h-7 sm:w-7"
                      aria-label="Next image"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                    </button>
                  </>
                )}
              </div>
              {gallery.length > 1 && (
                <div className="mt-2 flex justify-center gap-1.5">
                  {gallery.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setActiveGallery(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === activeGallery
                          ? 'w-5 bg-primary'
                          : 'w-2 bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Image ${index + 1}`}
                      aria-current={index === activeGallery}
                    />
                  ))}
                </div>
              )}
            </div>
          </WhiteWidget>
        )}

        <section className="relative mt-4 overflow-hidden rounded-2xl bg-[#FFF1E8] p-4 sm:mt-5 sm:rounded-[28px] sm:p-6 lg:p-8">
          <div className="relative flex flex-col gap-5 sm:gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="text-center lg:text-right">
              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl">
                {t.readyWithCoach.split('{name}')[0]}
                <CoachName name={coach.name} />
                {t.readyWithCoach.split('{name}')[1]}
              </h2>
              <p className="mt-2 text-sm text-gray-600 sm:text-base">
                {t.readyWithCoachSubtitle}
              </p>
              <div className="mt-4 flex justify-center sm:mt-5 lg:justify-start">
                <AppDownloadButtons />
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-700 lg:justify-start">
              <ShieldCheck className="h-6 w-6 flex-shrink-0 text-primary" />
              {t.protectedSubscription}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
