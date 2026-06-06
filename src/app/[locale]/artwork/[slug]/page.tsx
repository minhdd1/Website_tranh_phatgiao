import React from 'react';
import { notFound } from 'next/navigation';
import { type Metadata } from 'next';
import { getArtworkBySlug } from '@/lib/api';
import { type Locale } from '@/types';
import ArtworkDetailInteractive from '@/components/artwork/ArtworkDetailInteractive';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const artwork = await getArtworkBySlug(slug);

  if (!artwork) return {};

  return {
    title: `${artwork.title[locale as Locale]} | Gallery Exhibition`,
    description: artwork.excerpt[locale as Locale],
  };
}

export default async function ArtworkPage({ params }: PageProps) {
  const { locale, slug } = await params;
  
  // Retrieve original artwork
  const artwork = await getArtworkBySlug(slug);

  if (!artwork) {
    notFound();
  }

  return (
    <ArtworkDetailInteractive 
      artwork={artwork} 
      locale={locale as Locale} 
    />
  );
}
