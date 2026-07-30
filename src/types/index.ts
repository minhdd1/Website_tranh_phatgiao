/**
 * Core Language Structure matching /docs/internationalization.md
 */
export type Locale = 'vi' | 'en';

export interface LocalizedString {
  vi: string;
  en: string;
}

export interface LocalizedText {
  vi: string;
  en: string; // Long form or paragraphs
}

export interface PortableTextSpan {
  _key: string;
  _type: 'span';
  text: string;
  marks?: string[];
}

export interface PortableTextMarkDef {
  _key: string;
  _type: string;
  href?: string;
}

export interface PortableTextBlock {
  _key: string;
  _type: 'block';
  style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'blockquote';
  listItem?: 'bullet' | 'number';
  level?: number;
  children?: PortableTextSpan[];
  markDefs?: PortableTextMarkDef[];
}

export interface PortableTextImageBlock {
  _key: string;
  _type: 'image';
  asset: SanityImageReference['asset'];
  alt?: string;
  caption?: string;
}

export type PortableTextContentBlock = PortableTextBlock | PortableTextImageBlock;

export type LocalizedPortableContent = {
  vi: string | PortableTextContentBlock[];
  en: string | PortableTextContentBlock[];
};

/**
 * Common SEO Specifications
 */
export interface LocalizedSeoMetadata {
  title: LocalizedString;
  description: LocalizedString;
  keywords?: LocalizedString;
  ogImage?: SanityImageReference;
}

/**
 * Image Object derived from Sanity CDN responses
 */
export interface SanityImageReference {
  _key?: string;
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt_vi?: string;
  alt_en?: string;
}

export interface SanityFileReference {
  _type: 'file';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

/**
 * Artwork Document Type Definition
 */
export type ArtworkCategory = 'silk-painting' | 'sculptural-painting' | 'buddhist-art' | 'commissioned';
export type ArtworkStatus = 'available' | 'sold' | 'commission-open';
export type Currency = 'VND' | 'USD';

export interface ArtworkSpecification {
  _key?: string;
  label: LocalizedString;
  value: LocalizedText;
}

export interface ArtworkTextSection {
  _key?: string;
  _type: 'textBlock';
  eyebrow?: LocalizedString;
  title: LocalizedString;
  body: LocalizedText;
}

export interface ArtworkImageGallerySection {
  _key?: string;
  _type: 'imageGallery';
  title?: LocalizedString;
  description?: LocalizedText;
  images: SanityImageReference[];
}

export type ArtworkContentSection = ArtworkTextSection | ArtworkImageGallerySection;

export interface ArtistStorySection {
  _key?: string;
  eyebrow?: LocalizedString;
  title: LocalizedString;
  body: LocalizedText;
}

export interface ArtistStoryDocument {
  _id: string;
  _type: 'artistStory';
  _createdAt: string;
  _updatedAt: string;
  title: LocalizedString;
  intro: LocalizedText;
  body?: LocalizedText;
  heroImage?: SanityImageReference;
  storySections?: ArtistStorySection[];
  seo?: LocalizedSeoMetadata;
}

export interface ArtworkDocument {
  _id: string;
  _type: 'artwork';
  _createdAt: string;
  _updatedAt: string;
  title: LocalizedString;
  slug: {
    _type: 'slug';
    current: string;
  };
  excerpt: LocalizedString;
  description: LocalizedText;
  category: ArtworkCategory;
  images: SanityImageReference[];
  video?: SanityFileReference; // Texture movement demonstration (10-30s)
  dimensions: LocalizedString;  // E.g. "80x100cm"
  materials: LocalizedString;   // E.g. "Sculptural plaster, linen canvas"
  specifications?: ArtworkSpecification[];
  contentSections?: ArtworkContentSection[];
  price: number;
  currency: Currency;
  status: ArtworkStatus;
  featured: boolean;
  seo: LocalizedSeoMetadata;
}

/**
 * Collection Document Type Definition
 */
export interface CollectionDocument {
  _id: string;
  _type: 'collection';
  _createdAt: string;
  _updatedAt: string;
  title: LocalizedString;
  slug: {
    _type: 'slug';
    current: string;
  };
  description: LocalizedText;
  coverImage: SanityImageReference;
  artworks?: ArtworkDocument[]; // Populated via GROQ references
}

/**
 * Blog/Journal Document Type Definition
 */
export interface BlogDocument {
  _id: string;
  _type: 'blog';
  _createdAt: string;
  _updatedAt: string;
  publishedAt: string;
  title: LocalizedString;
  slug: {
    _type: 'slug';
    current: string;
  };
  coverImage: SanityImageReference;
  content: LocalizedPortableContent;
  author: {
    name: string;
    avatar?: SanityImageReference;
  };
  seo: LocalizedSeoMetadata;
}

/**
 * Supabase Schema Types (Operational / Interactive data)
 */
export type CommissionStatus = 
  | 'new'
  | 'contacted'
  | 'consultation'
  | 'proposal'
  | 'deposit_paid'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export interface CommissionRequestRow {
  id: string; // UUID v4
  name: string;
  email: string;
  phone: string | null;
  country: string;
  artwork_type: ArtworkCategory;
  dimensions: string; // Preferred dimensions from form input
  budget: string; // Budget range selected
  message: string; // Space description or notes
  inspiration_images?: string[] | null; // Array of storage URLs hosted in Supabase bucket
  status: CommissionStatus;
  created_at: string; // ISO Timestamp
}

export interface NewsletterSubscriberRow {
  id: string; // UUID v4
  email: string;
  created_at: string; // ISO Timestamp
}

export interface ContactMessageRow {
  id: string; // UUID v4
  name: string;
  email: string;
  message: string;
  created_at: string; // ISO Timestamp
}
