'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/utils/cn';
import { type Locale } from '@/types';

export default function LanguageSwitcher() {
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
    <div className="inline-flex items-center gap-2 text-xs tracking-widest font-body uppercase select-none">
      <button
        onClick={() => toggleLanguage('vi')}
        className={cn(
          'transition-colors duration-300 py-1 hover:text-charcoal cursor-pointer',
          currentLocale === 'vi' ? 'text-charcoal border-b border-charcoal' : 'text-gray-soft'
        )}
      >
        VI
      </button>
      <span className="text-gray-soft/40 font-light">/</span>
      <button
        onClick={() => toggleLanguage('en')}
        className={cn(
          'transition-colors duration-300 py-1 hover:text-charcoal cursor-pointer',
          currentLocale === 'en' ? 'text-charcoal border-b border-charcoal' : 'text-gray-soft'
        )}
      >
        EN
      </button>
    </div>
  );
}
