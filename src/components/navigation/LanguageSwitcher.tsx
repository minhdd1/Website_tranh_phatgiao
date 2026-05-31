'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/utils/cn';
import { type Locale } from '@/types';

interface LanguageSwitcherProps {
  isLight?: boolean;
}

export default function LanguageSwitcher({ isLight = false }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Extract current locale from path (e.g., /vi/about -> vi)
  const currentLocale = (pathname?.split('/')[1] as Locale) || 'vi';

  const toggleLanguage = (targetLocale: Locale) => {
    if (currentLocale === targetLocale) return;

    const segments = pathname ? pathname.split('/') : [];
    if (segments.length > 1) {
      // Replace the first segment with targetLocale
      segments[1] = targetLocale;
      router.push(segments.join('/'));
    } else {
      router.push(`/${targetLocale}`);
    }
  };

  return (
    <div className={cn(
      'inline-flex items-center gap-2 text-xs tracking-widest font-body uppercase select-none',
      isLight ? 'text-ivory/70' : 'text-gray-soft'
    )}>
      <button
        onClick={() => toggleLanguage('vi')}
        className={cn(
          'transition-colors duration-300 py-1 cursor-pointer',
          isLight
            ? currentLocale === 'vi'
              ? 'text-ivory border-b border-ivory font-medium'
              : 'text-ivory/70 hover:text-ivory'
            : currentLocale === 'vi'
              ? 'text-charcoal border-b border-charcoal font-medium'
              : 'text-gray-soft hover:text-charcoal'
        )}
      >
        VI
      </button>
      <span className={cn('font-light', isLight ? 'text-ivory/30' : 'text-gray-soft/40')}>/</span>
      <button
        onClick={() => toggleLanguage('en')}
        className={cn(
          'transition-colors duration-300 py-1 cursor-pointer',
          isLight
            ? currentLocale === 'en'
              ? 'text-ivory border-b border-ivory font-medium'
              : 'text-ivory/70 hover:text-ivory'
            : currentLocale === 'en'
              ? 'text-charcoal border-b border-charcoal font-medium'
              : 'text-gray-soft hover:text-charcoal'
        )}
      >
        EN
      </button>
    </div>
  );
}
