import React from 'react';
import { mockArtworks } from '@/lib/mockData';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import ArtworkGrid from '@/components/artwork/ArtworkGrid';

export default async function CommissionedCategoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const artworks = mockArtworks.filter((art) => art.category === 'commissioned');

  return (
    <Section spacing="default" className="bg-[#FAF8F4] min-h-[75vh]">
      <Container className="space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="font-body text-xs uppercase tracking-widest text-gray-soft">
            {locale === 'vi' ? 'Không Gian Sống Độc Bản' : 'Co-Created Journals'}
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-charcoal tracking-wide">
            {locale === 'vi' ? 'Tác Phẩm Đã Giao Của Kayla' : 'Commissioned Works'}
          </h1>
          <p className="font-body text-sm leading-relaxed text-gray-soft/90 max-w-md mx-auto">
            {locale === 'vi'
              ? 'Tuyển tập những tác phẩm được hợp tác thiết kế riêng, hài hòa cùng không gian sống tối giản Japandi.'
              : 'A portfolio of bespoke co-created artworks custom-designed for collectors across Hanoi and beyond.'}
          </p>
        </div>

        <div className="pt-8">
          <ArtworkGrid artworks={artworks} />
        </div>
      </Container>
    </Section>
  );
}
