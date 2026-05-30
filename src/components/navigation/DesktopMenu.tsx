'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/utils/cn';

export default function DesktopMenu() {
  const pathname = usePathname();
  const { t, locale } = useTranslation();

  const menuItems = [
    { label: t('nav.home'), path: `/${locale}` },
    { label: t('nav.gallery'), path: `/${locale}/gallery` },
    { label: t('nav.about'), path: `/${locale}/about` },
    { label: t('nav.blog'), path: `/${locale}/blog` },
    { label: t('nav.commissions'), path: `/${locale}/commissions` },
    { label: t('nav.contact'), path: `/${locale}/contact` },
  ];

  return (
    <nav className="hidden md:flex items-center gap-8 lg:gap-10">
      {menuItems.map((item) => {
        const isActive = pathname === item.path;
        return (
          <Link
            key={item.path}
            href={item.path}
            className={cn(
              'text-[13px] tracking-widest font-body uppercase transition-colors duration-500 hover:text-charcoal',
              isActive ? 'text-charcoal font-medium' : 'text-gray-soft'
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
