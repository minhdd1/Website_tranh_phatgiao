'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';
import Container from './Container';
import Button from '../ui/Button';
import Dialog from '../ui/Dialog';

export default function Footer() {
  const { t, locale } = useTranslation();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
        setIsAlertOpen(true);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const quickLinks = [
    { label: t('nav.home'), path: `/${locale}` },
    { label: t('nav.gallery'), path: `/${locale}/gallery` },
    { label: t('nav.about'), path: `/${locale}/about` },
    { label: t('nav.blog'), path: `/${locale}/blog` },
    { label: t('nav.commissions'), path: `/${locale}/commissions` },
    { label: t('nav.contact'), path: `/${locale}/contact` },
  ];

  const categories = [
    { label: locale === 'vi' ? 'Tranh Lụa' : 'Silk Paintings', path: `/${locale}/gallery/silk-paintings` },
    { label: locale === 'vi' ? 'Tranh Đắp Nổi' : 'Sculptural Paintings', path: `/${locale}/gallery/sculptural-paintings` },
    { label: locale === 'vi' ? 'Tranh Phật Giáo' : 'Buddhist Art', path: `/${locale}/gallery/buddhist-art` },
    { label: locale === 'vi' ? 'Tranh Napkin Decoupage' : 'Napkin Decoupage Portfolio', path: `/${locale}/gallery/commissioned` },
  ];

  return (
    <footer className="w-full bg-[#EFE7DF]/30 border-t border-charcoal/5 py-16 md:py-24 mt-auto">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Col 1: Brand Info */}
          <div className="flex flex-col gap-5">
            <h3 className="font-display text-2xl font-light tracking-widest uppercase text-charcoal">
              Kayla Nguyen
            </h3>
            <p className="font-body text-sm leading-relaxed text-gray-soft max-w-xs">
              {t('footer.storyText')}
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="flex flex-col gap-5">
            <h4 className="font-body text-xs uppercase tracking-widest font-medium text-charcoal">
              {t('footer.quickLinks')}
            </h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="font-body text-sm text-gray-soft hover:text-charcoal transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div className="flex flex-col gap-5">
            <h4 className="font-body text-xs uppercase tracking-widest font-medium text-charcoal">
              {t('footer.categories')}
            </h4>
            <ul className="flex flex-col gap-3">
              {categories.map((cat) => (
                <li key={cat.path}>
                  <Link
                    href={cat.path}
                    className="font-body text-sm text-gray-soft hover:text-charcoal transition-colors duration-300"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="flex flex-col gap-5">
            <h4 className="font-body text-xs uppercase tracking-widest font-medium text-charcoal">
              {t('footer.newsletterTitle')}
            </h4>
            <p className="font-body text-sm text-gray-soft leading-relaxed">
              {t('footer.newsletterSub')}
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('footer.placeholder')}
                className="w-full bg-[#FAF8F4] border border-charcoal/10 rounded-full px-5 py-3 text-sm font-body text-charcoal placeholder-gray-soft/50 focus:outline-none focus:border-charcoal/30 transition-colors duration-500"
              />
              <Button
                type="submit"
                variant="primary"
                size="sm"
                disabled={status === 'loading'}
                className="w-full"
              >
                {status === 'loading'
                  ? locale === 'vi'
                    ? 'Đang Đăng Ký...'
                    : 'Subscribing...'
                  : t('footer.subscribe')}
              </Button>
              {status === 'error' && (
                <p className="text-xs text-red-500 font-body">
                  {locale === 'vi' ? 'Đã xảy ra lỗi, vui lòng thử lại.' : 'An error occurred. Please try again.'}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-charcoal/5 mt-16 pt-8 gap-4">
          <p className="text-[11px] tracking-widest uppercase font-body text-gray-soft text-center sm:text-left">
            © {new Date().getFullYear()} Kayla Nguyen. {t('footer.copyright')}
          </p>
          <div className="flex items-center gap-6 text-[11px] tracking-widest uppercase font-body text-gray-soft">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-charcoal transition-colors duration-300">
              Instagram
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="hover:text-charcoal transition-colors duration-300">
              Pinterest
            </a>
            <Link href={`/${locale}/privacy`} className="hover:text-charcoal transition-colors duration-300">
              {locale === 'vi' ? 'Điều Khoản' : 'Privacy'}
            </Link>
          </div>
        </div>
      </Container>

      {/* Subscription Alert Dialog */}
      <Dialog
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        title={locale === 'vi' ? 'Đăng Ký Thành Công' : 'Successfully Subscribed'}
        description={
          locale === 'vi'
            ? 'Cảm ơn bạn đã quan tâm. Những bức thư tĩnh lặng sẽ được gửi tới bạn sớm.'
            : 'Thank you for subscribing. Quiet journals from the studio will be delivered to your inbox soon.'
        }
      />
    </footer>
  );
}
