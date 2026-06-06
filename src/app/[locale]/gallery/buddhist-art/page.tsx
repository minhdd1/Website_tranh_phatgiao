import React from 'react';
import { getArtworksByCategory } from '@/lib/api';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import ArtworkGrid from '@/components/artwork/ArtworkGrid';

export default async function BuddhistArtCategoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const artworks = await getArtworksByCategory('buddhist-art');

  return (
    <Section spacing="default" className="bg-[#FAF8F4] min-h-[75vh]">
      <Container className="space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="font-body text-xs uppercase tracking-widest text-gray-soft">
            {locale === 'vi' ? 'Năng Lượng Thiền Định Từ Hòa' : 'Zen & Reverence'}
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-charcoal tracking-wide">
            {locale === 'vi' ? 'Tranh Phật Giáo Tối Giản' : 'Buddhist Artworks'}
          </h1>
          <p className="font-body text-sm leading-relaxed text-gray-soft/90 max-w-md mx-auto">
            {locale === 'vi'
              ? 'Tác phẩm nghệ thuật tâm linh kết hợp vẽ mịn màu tự nhiên và kỹ thuật dát vàng lá tinh tế.'
              : 'Contemplative and serene spiritual designs highlighted with genuine hand-gilded gold leaf details.'}
          </p>
        </div>

        <div className="pt-8">
          <ArtworkGrid artworks={artworks} />
        </div>
      </Container>
    </Section>
  );
}
