import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { type Metadata } from 'next';
import { getBlogs } from '@/lib/api';
import { getImageUrl } from '@/lib/sanity';
import { localizedPortableContent, localizedText } from '@/lib/localized';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import { portableToPlainText } from '@/components/blog/PortableContent';

import { type Locale } from '@/types';

export const metadata: Metadata = {
  title: 'Curation Journal | Slow Living Chronicles',
  description: 'Step into a quiet reading space. Exploring silk textures, Zen meditation, and the craft behind slow creation.',
};

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;
  const blogs = await getBlogs();


  return (
    <Section spacing="default" className="bg-[#FAF8F4] min-h-[75vh]">
      <Container className="space-y-16">
        {/* Title */}
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <span className="font-body text-xs uppercase tracking-widest text-gray-soft">
            {locale === 'vi' ? 'Lưu Bút Nghệ Thuật' : 'The Creative Mind'}
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-charcoal tracking-wide">
            {locale === 'vi' ? 'Ghi Chép Của Kayla' : 'The Curation Journal'}
          </h1>
          <p className="font-body text-sm leading-relaxed text-gray-soft/90 max-w-sm mx-auto">
            {locale === 'vi'
              ? 'Những suy ngẫm trầm lắng về thực hành chánh niệm, nhịp điệu vẽ chậm, và lối bài trí tối giản.'
              : 'Quiet reflections on mindfulness, the patience of craft, and creating space in our busy lives.'}
          </p>
        </div>

        {/* List of articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto">
          {blogs.filter((blog) => blog.slug?.current).map((blog) => (
            <article key={blog._id} className="flex flex-col gap-6 text-left group">
              <Link
                href={`/${locale}/blog/${blog.slug.current}`}
                className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl border border-charcoal/5 shadow-sm block"
              >
                <Image
                  src={getImageUrl(blog.coverImage)}
                  alt={blog.coverImage?.alt_en || blog.coverImage?.alt_vi || localizedText(blog.title, loc, locale === 'vi' ? 'Bài viết' : 'Article')}
                  fill
                  className="object-cover transform scale-100 group-hover:scale-103 transition-transform duration-1000 ease-out"
                />
              </Link>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs tracking-widest text-gray-soft uppercase font-body">
                  <span>
                    {new Date(blog.publishedAt).toLocaleDateString(
                      locale === 'vi' ? 'vi-VN' : 'en-US',
                      { day: 'numeric', month: 'short', year: 'numeric' }
                    )}
                  </span>
                  <span>•</span>
                  <span>{blog.author?.name || 'Kayla Nguyen'}</span>
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-light text-charcoal tracking-wide group-hover:text-charcoal/80 transition-colors duration-300">
                  <Link href={`/${locale}/blog/${blog.slug.current}`}>
                    {localizedText(blog.title, loc, locale === 'vi' ? 'Bài viết' : 'Article')}
                  </Link>
                </h2>
                <p className="font-body text-sm leading-relaxed text-gray-soft/90 line-clamp-3">
                  {portableToPlainText(localizedPortableContent(blog.content, loc), 180)}
                </p>
                <div className="pt-2">
                  <Link
                    href={`/${locale}/blog/${blog.slug.current}`}
                    className="font-body text-xs text-charcoal/80 group-hover:text-charcoal font-semibold uppercase tracking-widest border-b border-charcoal/20 group-hover:border-charcoal transition-all duration-300 py-1"
                  >
                    {locale === 'vi' ? 'Đọc Tiếp' : 'Read Article'}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
