import { sanityClient, isSanityConfigured } from './sanity';
import { mockArtworks, mockBlogs } from './mockData';
import { type ArtworkDocument, type BlogDocument } from '@/types';

// ARTWORK FETCHING FUNCTIONS
export async function getArtworks(): Promise<ArtworkDocument[]> {
  if (isSanityConfigured && sanityClient) {
    try {
      console.log('⚡ [Sanity CMS] Fetching all artworks...');
      const query = `*[_type == "artwork"] | order(_createdAt desc)`;
      const results = await sanityClient.fetch<ArtworkDocument[]>(query);
      if (results && results.length > 0) return results;
    } catch (e) {
      console.error('Error fetching artworks from Sanity:', e);
    }
  }
  console.log('📦 [MockData] Loading artworks from local mockData.ts');
  return mockArtworks;
}

export async function getFeaturedArtworks(): Promise<ArtworkDocument[]> {
  if (isSanityConfigured && sanityClient) {
    try {
      const query = `*[_type == "artwork" && featured == true] | order(_createdAt desc)`;
      const results = await sanityClient.fetch<ArtworkDocument[]>(query);
      if (results && results.length > 0) return results;
    } catch (e) {
      console.error('Error fetching featured artworks from Sanity:', e);
    }
  }
  // Fallback to mock data
  return mockArtworks.filter((art) => art.featured);
}

export async function getArtworkBySlug(slug: string): Promise<ArtworkDocument | null> {
  if (isSanityConfigured && sanityClient) {
    try {
      console.log(`⚡ [Sanity CMS] Fetching artwork detail for slug: "${slug}"`);
      const query = `*[_type == "artwork" && slug.current == $slug][0]`;
      const result = await sanityClient.fetch<ArtworkDocument | null>(query, { slug });
      if (result) return result;
    } catch (e) {
      console.error(`Error fetching artwork by slug (${slug}) from Sanity:`, e);
    }
  }
  console.log(`📦 [MockData] Loading artwork detail for slug: "${slug}" from local mockData.ts`);
  return mockArtworks.find((art) => art.slug.current === slug) || null;
}

export async function getArtworksByCategory(category: string): Promise<ArtworkDocument[]> {
  if (isSanityConfigured && sanityClient) {
    try {
      const query = `*[_type == "artwork" && category == $category] | order(_createdAt desc)`;
      const results = await sanityClient.fetch<ArtworkDocument[]>(query, { category });
      if (results && results.length > 0) return results;
    } catch (e) {
      console.error(`Error fetching artworks by category (${category}) from Sanity:`, e);
    }
  }
  // Fallback to mock data
  return mockArtworks.filter((art) => art.category === category);
}

// BLOG FETCHING FUNCTIONS
export async function getBlogs(): Promise<BlogDocument[]> {
  if (isSanityConfigured && sanityClient) {
    try {
      console.log('⚡ [Sanity CMS] Fetching all journal posts...');
      const query = `*[_type == "blog"] | order(publishedAt desc)`;
      const results = await sanityClient.fetch<BlogDocument[]>(query);
      if (results && results.length > 0) return results;
    } catch (e) {
      console.error('Error fetching blogs from Sanity:', e);
    }
  }
  console.log('📦 [MockData] Loading journal posts from local mockData.ts');
  return mockBlogs;
}

export async function getLatestBlogs(limit = 2): Promise<BlogDocument[]> {
  if (isSanityConfigured && sanityClient) {
    try {
      const query = `*[_type == "blog"] | order(publishedAt desc)[0...$limit]`;
      const results = await sanityClient.fetch<BlogDocument[]>(query, { limit });
      if (results && results.length > 0) return results;
    } catch (e) {
      console.error('Error fetching latest blogs from Sanity:', e);
    }
  }
  // Fallback to mock data
  return mockBlogs.slice(0, limit);
}

export async function getBlogBySlug(slug: string): Promise<BlogDocument | null> {
  if (isSanityConfigured && sanityClient) {
    try {
      const query = `*[_type == "blog" && slug.current == $slug][0]`;
      const result = await sanityClient.fetch<BlogDocument | null>(query, { slug });
      if (result) return result;
    } catch (e) {
      console.error(`Error fetching blog by slug (${slug}) from Sanity:`, e);
    }
  }
  // Fallback to mock data
  return mockBlogs.find((post) => post.slug.current === slug) || null;
}
