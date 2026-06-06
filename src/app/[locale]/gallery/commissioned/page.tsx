import React from 'react';
import { getArtworksByCategory } from '@/lib/api';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import ArtworkGrid from '@/components/artwork/ArtworkGrid';

export default async function CommissionedCategoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const artworks = await getArtworksByCategory('commissioned');

  return (
    <Section spacing="default" className="bg-[#FAF8F4] min-h-[75vh]">
      <Container className="space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="font-body text-xs uppercase tracking-widest text-gray-soft">
            {locale === 'vi' ? 'Nghệ Thuật Cắt Dán Thủ Công' : 'Bespoke Decoupage Craft'}
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-charcoal tracking-wide">
            {locale === 'vi' ? 'Tranh Napkin Decoupage' : 'Napkin Decoupage Art'}
          </h1>
          <p className="font-body text-sm leading-relaxed text-gray-soft/90 max-w-md mx-auto">
            {locale === 'vi'
              ? 'Tuyển tập những tác phẩm được thiết kế tỉ mỉ bằng kỹ thuật Napkin Decoupage, kết hợp hài hòa chất liệu mộc mạc.'
              : 'A curated collection of delicate Napkin Decoupage artworks, handcrafted onto minimal wabi-sabi textures.'}
          </p>
        </div>

        <div className="pt-8">
          <ArtworkGrid artworks={artworks} />
        </div>
      </Container>
    </Section>
  );
}
