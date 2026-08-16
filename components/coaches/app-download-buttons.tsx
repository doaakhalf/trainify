'use client';

import Image from 'next/image';
import { content } from '@/content/ar';
import { cn } from '@/lib/utils';

interface AppDownloadButtonsProps {
  className?: string;
  size?: 'sm' | 'md';
}

export function AppDownloadButtons({ className, size = 'md' }: AppDownloadButtonsProps) {
  const height = size === 'sm' ? 'h-10' : 'h-12';

  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      <a
        href={content.footer.download.appStore}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-transform hover:scale-105"
      >
        <Image
          src="/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg"
          alt="Download on the App Store"
          width={135}
          height={40}
          className={`${height} w-auto`}
        />
      </a>
      <a
        href={content.footer.download.googlePlay}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-transform hover:scale-105"
      >
        <Image
          src="/Google_Play_Store_badge_EN.svg"
          alt="Get it on Google Play"
          width={135}
          height={40}
          className={`${height} w-auto`}
        />
      </a>
    </div>
  );
}

export function openPrimaryStore() {
  if (typeof window === 'undefined') return;
  const ua = window.navigator.userAgent || '';
  const isAndroid = /Android/i.test(ua);
  const url = isAndroid
    ? content.footer.download.googlePlay
    : content.footer.download.appStore;
  window.open(url, '_blank', 'noopener,noreferrer');
}
