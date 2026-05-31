'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/utils/cn';
import { Menu, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import LanguageSwitcher from './LanguageSwitcher';
import Container from '../layout/Container';

interface MobileMenuProps {
  isLight?: boolean;
}

export default function MobileMenu({ isLight = false }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { t, locale } = useTranslation();

  // Mount logic for Portal SSR safety
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Close menu on navigation transition with timeout to prevent sync-render lint issues
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Prevent scroll when fullscreen menu is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const menuItems = [
    { label: t('nav.home'), path: `/${locale}` },
    { label: t('nav.gallery'), path: `/${locale}/gallery` },
    { label: t('nav.about'), path: `/${locale}/about` },
    { label: t('nav.blog'), path: `/${locale}/blog` },
    { label: t('nav.commissions'), path: `/${locale}/commissions` },
    { label: t('nav.contact'), path: `/${locale}/contact` },
  ];

  const menuOverlay = (
    <div
      className={cn(
        'fixed inset-0 z-50 bg-[#FAF8F4] flex flex-col justify-between transition-all duration-700 ease-in-out transform',
        isOpen ? 'translate-x-0 opacity-100 pointer-events-auto' : 'translate-x-full opacity-0 pointer-events-none'
      )}
    >
      {/* 1. Header Row inside Menu - Matching standard header heights & lateral spacing */}
      <div className="w-full border-b border-charcoal/5 py-6 md:py-8 bg-transparent">
        <Container className="flex items-center justify-between">
          <Link
            href={`/${locale}`}
            onClick={() => setIsOpen(false)}
            className="font-display text-lg md:text-xl font-medium tracking-widest uppercase text-charcoal hover:opacity-75 transition-opacity duration-300"
          >
            Kayla Nguyen
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-charcoal focus:outline-none cursor-pointer hover:opacity-70 transition-opacity duration-200"
            aria-label="Close menu"
          >
            <X className="w-6 h-6 stroke-[1.5]" />
          </button>
        </Container>
      </div>

      {/* 2. Scrollable / Centered Navigation Links */}
      <div className="flex-1 flex flex-col justify-center py-8 overflow-y-auto">
        <Container className="flex flex-col gap-6 text-left">
          {menuItems.map((item, idx) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
                style={{
                  transitionDelay: isOpen ? `${idx * 60}ms` : '0ms',
                }}
                className={cn(
                  'text-3xl font-display font-light tracking-wider transition-all duration-500 transform',
                  isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
                  isActive ? 'text-charcoal pl-3 border-l-2 border-charcoal/30 font-medium' : 'text-gray-soft hover:text-charcoal'
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </Container>
      </div>

      {/* 3. Footer row at bottom inside menu */}
      <div className="border-t border-charcoal/5 py-8 bg-transparent">
        <Container
          className={cn(
            'flex flex-col gap-4 transition-all duration-700 delay-200 transform',
            isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          )}
        >
          <LanguageSwitcher />
          <p className="text-[10px] tracking-widest text-gray-soft uppercase font-body">
            © {new Date().getFullYear()} Studio Journal
          </p>
        </Container>
      </div>
    </div>
  );

  return (
    <div className="md:hidden">
      {/* Trigger Button inside Header (Hidden when menu is open to prevent duplicates) */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          'p-2 focus:outline-none cursor-pointer transition-all duration-300',
          isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100',
          isLight ? 'text-ivory hover:text-ivory/80' : 'text-charcoal hover:text-charcoal/80'
        )}
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6 stroke-[1.5]" />
      </button>

      {/* Render overlay via Portal to body to avoid header transformed stacking context bounds */}
      {mounted ? createPortal(menuOverlay, document.body) : null}
    </div>
  );
}

