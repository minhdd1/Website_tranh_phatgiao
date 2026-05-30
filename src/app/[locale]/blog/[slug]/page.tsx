import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { type Metadata } from 'next';
import { mockBlogs, getMockImageUrl } from '@/lib/mockData';
import { type Locale } from '@/types';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import { ArrowLeft } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const blog = mockBlogs.find((post) => post.slug.current === slug);

  if (!blog) return {};

  return {
    title: `${blog.title[locale as Locale]} | Curation Journal`,
    description: blog.content[locale as Locale].substring(0, 150),
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;

  // Retrieve active journal article
  const blog = mockBlogs.find((post) => post.slug.current === slug);

  if (!blog) {
    notFound();
  }

  const title = blog.title[locale as Locale];
  const content = blog.content[locale as Locale];
  const bannerSrc = getMockImageUrl(blog.coverImage.asset?._ref);

  return (
    <article className="w-full bg-[#FAF8F4] min-h-screen">
      {/* 1. Header Metadata & Title */}
      <Section spacing="default" className="pb-4 md:pb-6 text-left">
        <Container>
          <div className="max-w-3xl mx-auto space-y-6">
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 text-xs tracking-widest text-gray-soft uppercase font-body hover:text-charcoal transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              {locale === 'vi' ? 'Quay Lại Nhật Ký' : 'Back to Chronicles'}
            </Link>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs tracking-widest text-gray-soft uppercase font-body">
                <span>
                  {new Date(blog.publishedAt).toLocaleDateString(
                    locale === 'vi' ? 'vi-VN' : 'en-US',
                    { day: 'numeric', month: 'short', year: 'numeric' }
                  )}
                </span>
                <span>•</span>
                <span>{blog.author.name}</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-charcoal tracking-wide leading-tight">
                {title}
              </h1>
            </div>
          </div>
        </Container>
      </Section>

      {/* 2. Fullscreen Widescreen Banner Image */}
      <section className="relative w-full h-[50vh] md:h-[60vh] border-y border-charcoal/5">
        <Image
          src={bannerSrc}
          alt={blog.coverImage.alt_en || title}
          fill
          priority
          className="object-cover"
        />
      </section>

      {/* 3. Article Content Block */}
      <Section spacing="default">
        <Container>
          {/* Centered reading column layout */}
          <div className="max-w-2xl mx-auto font-body text-base sm:text-lg leading-relaxed text-gray-soft space-y-6 text-left whitespace-pre-line first-letter:text-5xl first-letter:font-display first-letter:float-left first-letter:mr-3 first-letter:text-charcoal">
            {content}
          </div>
          
          {/* Divider */}
          <div className="max-w-2xl mx-auto mt-16 pt-8 border-t border-charcoal/5 text-left">
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 text-xs tracking-widest text-gray-soft uppercase font-body hover:text-charcoal transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              {locale === 'vi' ? 'Xem các bài viết khác' : 'Discover more chronicles'}
            </Link>
          </div>
        </Container>
      </Section>
    </article>
  );
}
