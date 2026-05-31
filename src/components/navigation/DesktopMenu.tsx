'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/utils/cn';

interface DesktopMenuProps {
  isLight?: boolean;
}

export default function DesktopMenu({ isLight = false }: DesktopMenuProps) {
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
              'text-[13px] tracking-widest font-body uppercase transition-colors duration-500',
              isLight
                ? isActive
                  ? 'text-ivory border-b border-ivory/30 font-medium'
                  : 'text-ivory/70 hover:text-ivory'
                : isActive
                  ? 'text-charcoal font-medium border-b border-charcoal/30'
                  : 'text-gray-soft hover:text-charcoal'
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
