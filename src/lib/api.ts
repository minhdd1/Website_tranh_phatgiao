import { defineQuery } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import { mockArtistStory, mockArtworks, mockBlogs } from './mockData';
import { type ArtistStoryDocument, type ArtworkCategory, type ArtworkDocument, type BlogDocument } from '@/types';

const useMockFallback = process.env.NODE_ENV !== 'production';
const publicFetchOptions = { next: { revalidate: 3600 } } as const;
const artistStoryFetchOptions = { next: { revalidate: 60 } } as const;

const imageProjection = /* groq */ `
  _key,
  _type,
  asset,
  alt_vi,
  alt_en
`;

const seoProjection = /* groq */ `
  title,
  description,
  keywords,
  ogImage { ${imageProjection} }
`;

const artworkProjection = /* groq */ `
  _id,
  _type,
  _createdAt,
  _updatedAt,
  title,
  slug,
  excerpt,
  description,
  category,
  images[] { ${imageProjection} },
  video,
  dimensions,
  materials,
  specifications[]{
    _key,
    label,
    value
  },
  contentSections[]{
    _key,
    _type,
    _type == "textBlock" => {
      eyebrow,
      title,
      body
    },
    _type == "imageGallery" => {
      title,
      description,
      images[] { ${imageProjection} }
    }
  },
  price,
  currency,
  status,
  featured,
  seo { ${seoProjection} }
`;

const blogProjection = /* groq */ `
  _id,
  _type,
  _createdAt,
  _updatedAt,
  publishedAt,
  title,
  slug,
  coverImage { ${imageProjection} },
  "content": coalesce(richContent, content),
  "author": coalesce(author->{name, avatar { ${imageProjection} }}, author),
  seo { ${seoProjection} }
`;

const artistStoryProjection = /* groq */ `
  _id,
  _type,
  _createdAt,
  _updatedAt,
  title,
  intro,
  body,
  heroImage { ${imageProjection} },
  storySections[]{
    _key,
    eyebrow,
    title,
    body
  },
  seo { ${seoProjection} }
`;

const ARTWORKS_QUERY = defineQuery(`*[_type == "artwork"] | order(_createdAt desc) { ${artworkProjection} }`);
const FEATURED_ARTWORKS_QUERY = defineQuery(`*[_type == "artwork" && featured == true] | order(_createdAt desc) { ${artworkProjection} }`);
const ARTWORK_BY_SLUG_QUERY = defineQuery(`*[_type == "artwork" && slug.current == $slug][0] { ${artworkProjection} }`);
const ARTWORKS_BY_CATEGORY_QUERY = defineQuery(`*[_type == "artwork" && category == $category] | order(_createdAt desc) { ${artworkProjection} }`);
const BLOGS_QUERY = defineQuery(`*[_type == "blog"] | order(publishedAt desc) { ${blogProjection} }`);
const LATEST_BLOGS_QUERY = defineQuery(`*[_type == "blog"] | order(publishedAt desc)[0...$limit] { ${blogProjection} }`);
const BLOG_BY_SLUG_QUERY = defineQuery(`*[_type == "blog" && slug.current == $slug][0] { ${blogProjection} }`);
const ARTIST_STORY_QUERY = defineQuery(`*[_type == "artistStory"] | order(_updatedAt desc)[0] { ${artistStoryProjection} }`);

function fallbackList<T>(items: T[]): T[] {
  return useMockFallback ? items : [];
}

function fallbackItem<T>(item: T | undefined): T | null {
  return useMockFallback ? item || null : null;
}

function logSanityError(scope: string, error: unknown) {
  console.error(`Error fetching ${scope} from Sanity:`, error);
}

export async function getArtworks(): Promise<ArtworkDocument[]> {
  try {
    const results = await client.fetch<ArtworkDocument[]>(ARTWORKS_QUERY, {}, publicFetchOptions);
    if (results.length > 0) return results;
  } catch (error) {
    logSanityError('artworks', error);
  }

  return fallbackList(mockArtworks);
}

export async function getFeaturedArtworks(): Promise<ArtworkDocument[]> {
  try {
    const results = await client.fetch<ArtworkDocument[]>(FEATURED_ARTWORKS_QUERY, {}, publicFetchOptions);
    if (results.length > 0) return results;
  } catch (error) {
    logSanityError('featured artworks', error);
  }

  return fallbackList(mockArtworks.filter((art) => art.featured));
}

export async function getArtworkBySlug(slug: string): Promise<ArtworkDocument | null> {
  try {
    const result = await client.fetch<ArtworkDocument | null>(ARTWORK_BY_SLUG_QUERY, { slug }, publicFetchOptions);
    if (result) return result;
  } catch (error) {
    logSanityError(`artwork "${slug}"`, error);
  }

  return fallbackItem(mockArtworks.find((art) => art.slug.current === slug));
}

export async function getArtworksByCategory(category: ArtworkCategory): Promise<ArtworkDocument[]> {
  try {
    const results = await client.fetch<ArtworkDocument[]>(ARTWORKS_BY_CATEGORY_QUERY, { category }, publicFetchOptions);
    if (results.length > 0) return results;
  } catch (error) {
    logSanityError(`artworks in category "${category}"`, error);
  }

  return fallbackList(mockArtworks.filter((art) => art.category === category));
}

export async function getBlogs(): Promise<BlogDocument[]> {
  try {
    const results = await client.fetch<BlogDocument[]>(BLOGS_QUERY, {}, publicFetchOptions);
    if (results.length > 0) return results;
  } catch (error) {
    logSanityError('blogs', error);
  }

  return fallbackList(mockBlogs);
}

export async function getLatestBlogs(limit = 2): Promise<BlogDocument[]> {
  try {
    const results = await client.fetch<BlogDocument[]>(LATEST_BLOGS_QUERY, { limit }, publicFetchOptions);
    if (results.length > 0) return results;
  } catch (error) {
    logSanityError('latest blogs', error);
  }

  return fallbackList(mockBlogs.slice(0, limit));
}

export async function getBlogBySlug(slug: string): Promise<BlogDocument | null> {
  try {
    const result = await client.fetch<BlogDocument | null>(BLOG_BY_SLUG_QUERY, { slug }, publicFetchOptions);
    if (result) return result;
  } catch (error) {
    logSanityError(`blog "${slug}"`, error);
  }

  return fallbackItem(mockBlogs.find((post) => post.slug.current === slug));
}

export async function getArtistStory(): Promise<ArtistStoryDocument | null> {
  try {
    const result = await client.fetch<ArtistStoryDocument | null>(ARTIST_STORY_QUERY, {}, artistStoryFetchOptions);
    if (result) return result;
  } catch (error) {
    logSanityError('artist story', error);
  }

  return fallbackItem(mockArtistStory);
}
