'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { mockArtworks } from '@/lib/mockData';
import { type ArtworkCategory, type Locale } from '@/types';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import ArtworkGrid from '@/components/artwork/ArtworkGrid';
import { cn } from '@/utils/cn';

export default function GalleryPage() {
  const params = useParams();
  const locale = (params?.locale as Locale) || 'vi';
  
  const [selectedCategory, setSelectedCategory] = useState<ArtworkCategory | 'all'>('all');

  const filteredArtworks = selectedCategory === 'all'
    ? mockArtworks
    : mockArtworks.filter(art => art.category === selectedCategory);

  const categories = [
    { value: 'all', label: locale === 'vi' ? 'Tất Cả' : 'All Works' },
    { value: 'silk-painting', label: locale === 'vi' ? 'Tranh Lụa' : 'Silk Paintings' },
    { value: 'sculptural-painting', label: locale === 'vi' ? 'Tranh Đắp Nổi' : 'Sculptural Paintings' },
    { value: 'buddhist-art', label: locale === 'vi' ? 'Tranh Phật Giáo' : 'Buddhist Art' },
    { value: 'commissioned', label: 'Napkin Decoupage' },
  ];

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

        {/* Filter Navigation Bar */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 border-b border-charcoal/5 pb-6">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value as ArtworkCategory | 'all')}
              className={cn(
                'font-body text-[13px] tracking-widest uppercase py-1 border-b transition-all duration-500 cursor-pointer',
                selectedCategory === cat.value
                  ? 'text-charcoal border-charcoal font-medium'
                  : 'text-gray-soft border-transparent hover:text-charcoal'
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Dynamic Curated Artworks Grid */}
        <div className="pt-8">
          <ArtworkGrid artworks={filteredArtworks} />
        </div>
      </Container>
    </Section>
  );
}
