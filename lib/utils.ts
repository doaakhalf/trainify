import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Remove Arabic letters (and Arabic presentation forms) from auth fields. */
export function stripArabicChars(text: string | null | undefined): string {
  if (text == null || text === '') return '';
  return String(text).replace(
    /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/g,
    ''
  );
}
