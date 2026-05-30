import React from 'react';
import { type ArtworkDocument } from '@/types';
import ArtworkCard from './ArtworkCard';

interface ArtworkGridProps {
  artworks: ArtworkDocument[];
}

export default function ArtworkGrid({ artworks }: ArtworkGridProps) {
  if (artworks.length === 0) {
    return (
      <div className="w-full text-center py-16">
        <p className="font-body text-gray-soft text-sm italic">
          No works to display.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 lg:gap-x-12">
      {artworks.map((art) => (
        <ArtworkCard key={art._id} artwork={art} />
      ))}
    </div>
  );
}
