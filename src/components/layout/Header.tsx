'use client';

import React from 'react';
import Link from 'next/link';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/utils/cn';
import Container from './Container';
import DesktopMenu from '../navigation/DesktopMenu';
import MobileMenu from '../navigation/MobileMenu';
import LanguageSwitcher from '../navigation/LanguageSwitcher';

export default function Header() {
  const { scrollDirection, isAtTop } = useScrollDirection();
  const { locale } = useTranslation();

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 w-full transition-all duration-700 ease-in-out border-b',
        isAtTop
          ? 'bg-transparent border-transparent py-6 md:py-8'
          : 'bg-ivory/80 backdrop-blur-md border-charcoal/5 py-4 md:py-5 shadow-[0_2px_10px_rgba(0,0,0,0.01)]',
        scrollDirection === 'down' && !isAtTop ? '-translate-y-full' : 'translate-y-0'
      )}
    >
      <Container className="flex items-center justify-between">
        {/* Brand Logo - Minimal luxury serif */}
        <Link
          href={`/${locale}`}
          className="font-display text-lg md:text-xl font-medium tracking-widest uppercase text-charcoal hover:opacity-75 transition-opacity duration-300"
        >
          Kayla Nguyen
        </Link>

        {/* Desktop Curation Navigation */}
        <DesktopMenu />

        {/* Action Items */}
        <div className="flex items-center gap-6">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          {/* Mobile Overlay Navigation */}
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
