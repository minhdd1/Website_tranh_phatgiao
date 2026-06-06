'use client';

import React, { useState } from 'react';
import { type ArtworkDocument, type ArtworkCategory, type Locale } from '@/types';
import ArtworkGrid from '@/components/artwork/ArtworkGrid';
import { cn } from '@/utils/cn';

interface GalleryCatalogProps {
  initialArtworks: ArtworkDocument[];
  locale: Locale;
}

export default function GalleryCatalog({ initialArtworks, locale }: GalleryCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<ArtworkCategory | 'all'>('all');

  const filteredArtworks = selectedCategory === 'all'
    ? initialArtworks
    : initialArtworks.filter(art => art.category === selectedCategory);

  const categories = [
    { value: 'all', label: locale === 'vi' ? 'Tất Cả' : 'All Works' },
    { value: 'silk-painting', label: locale === 'vi' ? 'Tranh Lụa' : 'Silk Paintings' },
    { value: 'sculptural-painting', label: locale === 'vi' ? 'Tranh Đắp Nổi' : 'Sculptural Paintings' },
    { value: 'buddhist-art', label: locale === 'vi' ? 'Tranh Phật Giáo' : 'Buddhist Art' },
    { value: 'commissioned', label: 'Napkin Decoupage' },
  ];

  return (
    <div className="space-y-12">
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
    </div>
  );
}
