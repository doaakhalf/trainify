'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { content } from '@/content/ar';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', labelKey: 'home' as const },
  { href: '/coaches', labelKey: 'coaches' as const },
  { href: '/coach-signup', labelKey: 'forCoaches' as const },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const t = content.header;

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href.startsWith('/#')) return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100/80 bg-white/90 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4 lg:h-[4.25rem]">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo.png"
            alt="Trainify"
            width={36}
            height={36}
            className="h-9 w-9 rounded-xl"
            priority
          />
          <span className="text-lg font-bold tracking-tight text-gray-900">
            Trainify
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive(item.href)
                  ? 'bg-primary/10 text-primary'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              {t[item.labelKey]}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/#download"
            className={cn(buttonVariants({ size: 'sm' }), 'shadow-md')}
          >
            {t.download}
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-700 lg:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label={open ? t.closeMenu : t.openMenu}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-gray-100 bg-white lg:hidden">
          <nav className="container mx-auto flex flex-col gap-1 px-4 py-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'rounded-xl px-3 py-3 text-sm font-medium',
                  isActive(item.href)
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-700 hover:bg-gray-50'
                )}
              >
                {t[item.labelKey]}
              </Link>
            ))}
            <Link
              href="/#download"
              onClick={() => setOpen(false)}
              className={cn(buttonVariants({ size: 'sm' }), 'mt-2 w-full')}
            >
              {t.download}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
