import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { type Metadata } from 'next';
import { getFeaturedArtworks, getLatestBlogs } from '@/lib/api';
import { getImageUrl } from '@/lib/sanity';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import ArtworkGrid from '@/components/artwork/ArtworkGrid';
import Button from '@/components/ui/Button';
import { portableToPlainText } from '@/components/blog/PortableContent';
import { type Locale } from '@/types';

export const metadata: Metadata = {
  title: 'Kayla Nguyen | Quiet Art Curation & Gallery',
  description: 'Handcrafted contemporary artworks inspired by stillness, mindfulness, nature and slow living. Experience silk and sculptural paintings.',
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;


  // Fetch featured artworks and blogs from API
  const featuredArtworks = await getFeaturedArtworks();
  const latestBlogs = await getLatestBlogs(2);

  // Harmonious high-res studio/hero images from Unsplash
  const heroImageSrc = 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1600&auto=format&fit=crop'; // Zen abstract
  const studioImageSrc = 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop'; // Painter easel setup
  const signatureImageSrc = 'https://images.unsplash.com/photo-1459908676235-d5f02a50184b?q=80&w=1600&auto=format&fit=crop'; // close painting canvas

  return (
    <div className="w-full flex flex-col -mt-20 md:-mt-28">
      {/* 1. HERO SECTION - Full screen immersive atmosphere */}
      <section className="relative w-full h-[90vh] md:h-[85vh] min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden border-b border-charcoal/5">
        <Image
          src={heroImageSrc}
          alt="Atmospheric gallery background"
          fill
          priority
          className="object-cover brightness-[0.93] transition-all duration-1000 ease-out"
        />
        {/* Backdrop Frost Overlay */}
        <div className="absolute inset-0 bg-[#2F2F2F]/5 backdrop-blur-[2px]" />

        {/* Floating Statement Block */}
        <div className="relative z-10 max-w-3xl text-center px-6 md:px-8 space-y-6 md:space-y-8 animate-fade-in">
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-light text-[#FAF8F4] tracking-wide leading-tight drop-shadow-sm">
            {locale === 'vi' ? 'Kiến Tạo Sự Tĩnh Lặng' : 'Created in Stillness'}
          </h1>
          <p className="font-body text-base sm:text-lg md:text-xl text-[#FAF8F4]/80 max-w-xl mx-auto leading-relaxed drop-shadow-sm italic">
            {locale === 'vi'
              ? 'Tranh đương đại lấy cảm hứng từ thiên nhiên, chánh niệm và vẻ đẹp thô mộc của lụa tơ tằm.'
              : 'Handcrafted contemporary artworks exploring texture, mindfulness, and the breathing grain of silk.'}
          </p>
          <div className="pt-4">
            <Link href={`/${locale}/gallery`}>
              <Button variant="rose" size="lg" className="shadow-sm">
                {locale === 'vi' ? 'Chiêm Ngưỡng Tác Phẩm' : 'Explore the Gallery'}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. SILENCE - Spacious visual boundary offering breathing room */}
      <Section spacing="default" className="bg-[#FAF8F4] text-center">
        <Container>
          <div className="max-w-xl mx-auto py-12 md:py-20 border-y border-charcoal/5">
            <p className="font-display text-xl sm:text-2xl md:text-3xl font-light italic text-charcoal/70 tracking-wide leading-relaxed">
              {locale === 'vi'
                ? '“Giữa khoảng lặng sâu thẳm của gian phòng, nét cọ cất lời từ sự kiên tâm.”'
                : '“In the silence of the studio, the canvas speaks in brushstrokes of patience.”'}
            </p>
            <div className="w-12 h-[1px] bg-charcoal/20 mx-auto mt-6" />
          </div>
        </Container>
      </Section>

      {/* 3. STORY SECTION - Two-column editorial biography */}
      <Section spacing="default" className="bg-[#EFE7DF]/10">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Image block in 3:4 crop */}
            <div className="relative w-full aspect-[3/4] max-w-md mx-auto lg:max-w-none rounded-2xl overflow-hidden shadow-sm border border-charcoal/5">
              <Image
                src={studioImageSrc}
                alt="Artist studio atmosphere"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Typography narrative block */}
            <div className="space-y-6 text-left">
              <h2 className="font-display text-4xl md:text-5xl font-light text-charcoal tracking-wide">
                {locale === 'vi' ? 'Triết Lý Sáng Tạo' : 'The Creative Path'}
              </h2>
              <p className="font-body text-base md:text-lg text-gray-soft leading-relaxed space-y-4">
                {locale === 'vi' ? (
                  <>
                    Nghệ thuật của tôi được kiến tạo từ những thớ lụa tự nhiên mộc mạc và bột màu khoáng tinh khiết.
                    Mỗi tác phẩm là kết quả của hàng tuần dài pha trộn chất liệu thạch cao, cát mịn, kéo căng khuôn vẽ
                    và chờ đợi màu thấm đẫm.
                    <br />
                    <br />
                    Tôi tin rằng mỗi tác phẩm nghệ thuật không đơn thuần chỉ là một vật thể trang trí, mà là một thực thể
                    sống mang lại năng lượng an tĩnh, xoa dịu những nhịp sống vội vã của cuộc sống hiện đại.
                  </>
                ) : (
                  <>
                    My practice centers around raw organic silk and natural mineral pigments. Every canvas undergoes a patient
                    process of wood stretching, plaster application, and slow pigment layering, taking weeks of slow work.
                    <br />
                    <br />
                    I believe that art is not a commercial product to be rushed. Instead, each piece is designed to serve as a 
                    silent anchor in a fast-paced world, bringing calmness and breathing room to contemporary spaces.
                  </>
                )}
              </p>
              <div className="pt-4">
                <Link href={`/${locale}/about`}>
                  <Button variant="secondary" size="md">
                    {locale === 'vi' ? 'Đọc Câu Chuyện' : 'Discover the Story'}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. FEATURED GALLERY SECTION - 3-column curated grids */}
      <Section id="exhibition" spacing="large" className="bg-[#FAF8F4]">
        <Container className="space-y-16">
          <div className="text-center space-y-4">
            <span className="font-body text-xs uppercase tracking-widest text-gray-soft">
              {locale === 'vi' ? 'Tác Phẩm Tiêu Biểu' : 'Curated Highlights'}
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-light text-charcoal tracking-wide">
              {locale === 'vi' ? 'Trưng Bày Chuyên Đề' : 'Featured Exhibition'}
            </h2>
          </div>

          <ArtworkGrid artworks={featuredArtworks} />

          <div className="text-center pt-8">
            <Link href={`/${locale}/gallery`}>
              <Button variant="primary" size="md">
                {locale === 'vi' ? 'Xem Toàn Bộ Triển Lãm' : 'View the Entire Gallery'}
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* 5. REFLECTION SECTION - Large editorial banner */}
      <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
        <Image
          src={signatureImageSrc}
          alt="Textured paint strokes detail"
          fill
          className="object-cover brightness-[0.88]"
        />
        <div className="absolute inset-0 bg-[#2F2F2F]/20 backdrop-blur-[1px]" />

        <div className="relative z-10 max-w-xl text-center px-6 md:px-8 space-y-6">
          <h2 className="font-display text-3xl md:text-4xl font-light text-[#FAF8F4] tracking-wide leading-relaxed">
            {locale === 'vi'
              ? 'Nghệ thuật không chỉ để nhìn ngắm. Nó là sự chiêm nghiệm vô thanh giữa ánh sáng và bóng tối.'
              : 'Art is not merely to be looked at. It is a quiet dialogue between light and shadow.'}
          </h2>
          <div className="w-8 h-[1px] bg-[#FAF8F4]/50 mx-auto" />
        </div>
      </section>

      {/* 6. JOURNAL HIGHLIGHTS - Curation articles */}
      <Section spacing="large" className="bg-[#FAF8F4] border-b border-charcoal/5">
        <Container className="space-y-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-charcoal/10 pb-6 text-left">
            <div className="space-y-2">
              <span className="font-body text-xs uppercase tracking-widest text-gray-soft">
                {locale === 'vi' ? 'Nhật Ký Của Kayla' : 'Studio Chronicles'}
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-light text-charcoal tracking-wide">
                {locale === 'vi' ? 'Ghi Chép Sáng Tác' : 'The Curation Journal'}
              </h2>
            </div>
            <Link href={`/${locale}/blog`}>
              <span className="font-body text-sm text-charcoal/70 hover:text-charcoal hover:underline underline-offset-4 tracking-wider transition-colors duration-300">
                {locale === 'vi' ? 'Đọc Toàn Bộ Nhật Ký' : 'Read All Journals'}
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {latestBlogs.map((blog) => (
              <article key={blog._id} className="flex flex-col gap-6 text-left group">
                <Link href={`/${locale}/blog/${blog.slug.current}`} className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl border border-charcoal/5 shadow-sm block">
                  <Image
                    src={getImageUrl(blog.coverImage)}
                    alt={blog.title[loc]}
                    fill
                    className="object-cover transform scale-100 group-hover:scale-103 transition-transform duration-1000 ease-out"
                  />
                </Link>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs tracking-widest text-gray-soft uppercase font-body">
                    <span>{new Date(blog.publishedAt).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    <span>•</span>
                    <span>{blog.author.name}</span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-light text-charcoal tracking-wide group-hover:text-charcoal/80 transition-colors duration-300">
                    <Link href={`/${locale}/blog/${blog.slug.current}`}>{blog.title[loc]}</Link>
                  </h3>
                  <p className="font-body text-sm leading-relaxed text-gray-soft/90 max-w-xl line-clamp-3">
                    {portableToPlainText(blog.content[loc], 180)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
