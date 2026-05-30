import React from 'react';
import { mockArtworks } from '@/lib/mockData';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import ArtworkGrid from '@/components/artwork/ArtworkGrid';

export default async function SculpturalPaintingsCategoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const artworks = mockArtworks.filter((art) => art.category === 'sculptural-painting');

  return (
    <Section spacing="default" className="bg-[#FAF8F4] min-h-[75vh]">
      <Container className="space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="font-body text-xs uppercase tracking-widest text-gray-soft">
            {locale === 'vi' ? 'Điêu Khắc Xúc Giác Wabi-sabi' : 'Tactile Shadows'}
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-charcoal tracking-wide">
            {locale === 'vi' ? 'Tranh Đắp Nổi Thạch Cao' : 'Sculptural Paintings'}
          </h1>
          <p className="font-body text-sm leading-relaxed text-gray-soft/90 max-w-md mx-auto">
            {locale === 'vi'
              ? 'Tác phẩm thạch cao đắp nổi ba chiều, bột cát mịn tôn vinh vẻ đẹp đổ bóng của ánh sáng.'
              : 'Minimalist white plaster relief panels expressing depth through physical shadow play.'}
          </p>
        </div>

        <div className="pt-8">
          <ArtworkGrid artworks={artworks} />
        </div>
      </Container>
    </Section>
  );
}
