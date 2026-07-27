import { type SanityImageSource } from '@sanity/image-url';
import { urlFor as sanityUrlFor } from '@/sanity/lib/image';
import { type SanityImageReference } from '@/types';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || '';

export const isSanityConfigured = !!(projectId && dataset);

export function urlFor(source: SanityImageSource | null | undefined) {
  if (!source) return null;
  return sanityUrlFor(source);
}

// Unified image helper that works for both mock Unsplash references and Sanity CDN references
export function getImageUrl(image: SanityImageReference | SanityImageSource | string | null | undefined): string {
  if (!image) {
    return 'https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?q=80&w=800&auto=format&fit=crop';
  }
  
  const ref = typeof image === 'object' && 'asset' in image && image.asset && '_ref' in image.asset
    ? image.asset._ref
    : '';
  
  const imagesMap: Record<string, string> = {
    'image-lotus-hero': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop',
    'image-lotus-detail': 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?q=80&w=800&auto=format&fit=crop',
    'image-lotus-room': 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop',
    'image-earth-hero': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    'image-earth-detail': 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop',
    'image-earth-room': 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop',
    'image-bodhi-hero': 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=800&auto=format&fit=crop',
    'image-bodhi-detail': 'https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=800&auto=format&fit=crop',
    'image-sand-hero': 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop',
    'image-blog-silk': 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=800&auto=format&fit=crop',
    'image-blog-silence': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
  };

  // If it's a mock reference, use our mockData mapping
  if (ref in imagesMap) {
    return imagesMap[ref];
  }

  // If it's a real Sanity image reference, build the URL
  if (isSanityConfigured) {
    try {
      const url = urlFor(image)?.url();
      if (url) return url;
    } catch (e) {
      console.warn('Error building Sanity image URL:', e);
    }
  }

  // Fallback to Unsplash URL if we have something in _ref or raw string url
  if (typeof image === 'string') return image;
  return 'https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?q=80&w=800&auto=format&fit=crop';
}
