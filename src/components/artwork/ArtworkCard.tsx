'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { type ArtworkDocument } from '@/types';
import { getImageUrl } from '@/lib/sanity';
import { useTranslation } from '@/hooks/useTranslation';
import Badge from '../ui/Badge';

interface ArtworkCardProps {
  artwork: ArtworkDocument;
}

export default function ArtworkCard({ artwork }: ArtworkCardProps) {
  const { locale } = useTranslation();
  const title = artwork.title[locale];
  const excerpt = artwork.excerpt[locale];
  const materials = artwork.materials[locale];
  const imageSrc = getImageUrl(artwork.images[0]);

  return (
    <Link
      href={`/${locale}/artwork/${artwork.slug.current}`}
      className="group block w-full text-left"
    >
      {/* 4:5 Portrait Luxury Image Frame */}
      <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl bg-[#EFE7DF]/20 border border-charcoal/5 shadow-sm">
        <Image
          src={imageSrc}
          alt={artwork.images[0]?.alt_en || title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Discrete Status Badge Overlay */}
        <div className="absolute top-4 right-4 z-10 opacity-90">
          <Badge status={artwork.status} />
        </div>
      </div>

      {/* Artwork Metadata - Minimal and spacious */}
      <div className="mt-6 space-y-2">
        <h3 className="font-display text-2xl font-light text-charcoal tracking-wide group-hover:text-charcoal/80 transition-colors duration-300">
          {title}
        </h3>
        <p className="font-body text-xs text-gray-soft uppercase tracking-widest leading-relaxed">
          {materials}
        </p>
        <p className="font-body text-sm text-gray-soft/80 line-clamp-2 max-w-sm pt-1 leading-relaxed">
          {excerpt}
        </p>
      </div>
    </Link>
  );
}
