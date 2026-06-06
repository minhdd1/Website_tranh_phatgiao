import React from 'react';
import { type Locale } from '@/types';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import GalleryCatalog from '@/components/gallery/GalleryCatalog';
import { getArtworks } from '@/lib/api';

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const artworks = await getArtworks();

  return (
    <Section spacing="default" className="bg-[#FAF8F4] min-h-[75vh]">
      <Container className="space-y-12">
        {/* Title block */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="font-body text-xs uppercase tracking-widest text-gray-soft">
            {locale === 'vi' ? 'Triển Lãm Đương Đại' : 'The Exhibition Catalog'}
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-charcoal tracking-wide">
            {locale === 'vi' ? 'Không Gian Trưng Bày' : 'The Digital Gallery'}
          </h1>
          <p className="font-body text-sm leading-relaxed text-gray-soft/90 max-w-md mx-auto">
            {locale === 'vi'
              ? 'Tất cả tác phẩm đều được thực hiện thủ công bằng sự chú tâm trọn vẹn, màu khoáng tự nhiên vẽ trên lụa tơ tằm hay đắp thạch cao trắng.'
              : 'Every artwork is sculpted or painted by hand with total presence, using fine mineral pigments, white plaster, and raw silk.'}
          </p>
        </div>

        {/* Dynamic Curated Artworks Grid */}
        <GalleryCatalog initialArtworks={artworks} locale={locale as Locale} />
      </Container>
    </Section>
  );
}
