import React from 'react';
import { mockArtworks } from '@/lib/mockData';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import ArtworkGrid from '@/components/artwork/ArtworkGrid';

export default async function SilkPaintingsCategoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const artworks = mockArtworks.filter((art) => art.category === 'silk-painting');

  return (
    <Section spacing="default" className="bg-[#FAF8F4] min-h-[75vh]">
      <Container className="space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="font-body text-xs uppercase tracking-widest text-gray-soft">
            {locale === 'vi' ? 'Dệt Lụa Và Màu Khoáng' : 'The Silk Medium'}
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-charcoal tracking-wide">
            {locale === 'vi' ? 'Tranh Lụa Tự Nhiên' : 'Silk Paintings'}
          </h1>
          <p className="font-body text-sm leading-relaxed text-gray-soft/90 max-w-md mx-auto">
            {locale === 'vi'
              ? 'Nghệ thuật vẽ chậm màu khoáng tự nhiên xếp lớp tỉ mỉ trên tơ tằm mộc hữu cơ kéo căng.'
              : 'The patient layering of organic mineral colors over raw hand-stretched silken fabrics.'}
          </p>
        </div>

        <div className="pt-8">
          <ArtworkGrid artworks={artworks} />
        </div>
      </Container>
    </Section>
  );
}
