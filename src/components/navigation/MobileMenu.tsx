'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/utils/cn';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { t, locale } = useTranslation();

  // Close menu on navigation transition
  useEffect(() => {
    setIsOpen(false);
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

  return (
    <div className="md:hidden">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50 p-2 text-charcoal focus:outline-none cursor-pointer"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6 stroke-[1.5]" /> : <Menu className="w-6 h-6 stroke-[1.5]" />}
      </button>

      {/* Screen Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-[#FAF8F4] flex flex-col justify-between p-8 pt-28 transition-transform duration-700 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Navigation Links */}
        <nav className="flex flex-col gap-6 text-left mt-8">
          {menuItems.map((item, idx) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                style={{
                  transitionDelay: isOpen ? `${idx * 80}ms` : '0ms',
                }}
                className={cn(
                  'text-3xl font-display font-light tracking-wider transition-all duration-700 transform',
                  isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
                  isActive ? 'text-charcoal pl-3 border-l-2 border-charcoal/30' : 'text-gray-soft hover:text-charcoal'
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer info inside menu */}
        <div
          className={cn(
            'flex flex-col gap-4 border-t border-charcoal/5 pt-6 transition-all duration-700 delay-300 transform',
            isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          )}
        >
          <LanguageSwitcher />
          <p className="text-[10px] tracking-widest text-gray-soft uppercase font-body">
            © {new Date().getFullYear()} Studio Journal
          </p>
        </div>
      </div>
    </div>
  );
}
