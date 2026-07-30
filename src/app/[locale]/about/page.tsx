import Image from 'next/image';
import { type Metadata } from 'next';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import { getArtistStory } from '@/lib/api';
import { localizedText } from '@/lib/localized';
import { getImageUrl } from '@/lib/sanity';
import { type Locale } from '@/types';

interface PageProps {
  params: Promise<{ locale: string }>;
}

function paragraphs(value: string) {
  return value
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const story = await getArtistStory();

  if (!story) return {};

  const title = localizedText(story.title, loc, loc === 'vi' ? 'Hành Trình Người Nghệ Sĩ' : 'The Artist Story');
  const metaTitle = localizedText(story.seo?.title, loc);
  const metaDescription = localizedText(story.seo?.description, loc) || localizedText(story.intro, loc);

  return {
    title: metaTitle || `${title} | Kayla Nguyen`,
    description: metaDescription,
    openGraph: {
      title: metaTitle || title,
      description: metaDescription,
      type: 'profile',
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle || title,
      description: metaDescription,
    },
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  const loc = locale as Locale;
  const story = await getArtistStory();

  const title = localizedText(story?.title, loc, loc === 'vi' ? 'Hành Trình Người Nghệ Sĩ' : 'The Artist Story');
  const intro = localizedText(
    story?.intro,
    loc,
    loc === 'vi'
      ? 'Tìm hiểu thêm về triết lý và sự lựa chọn chất liệu lụa.'
      : 'Discover the creative philosophy and choice of silk as a medium.'
  );
  const body = localizedText(story?.body, loc);
  const heroImage = story?.heroImage;
  const heroSrc = heroImage ? getImageUrl(heroImage) : '';
  const heroAlt = loc === 'vi' ? heroImage?.alt_vi || title : heroImage?.alt_en || title;

  return (
    <main className="w-full min-h-screen bg-[#FAF8F4]">
      <Section spacing="large" as="header">
        <Container>
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <p className="font-body text-xs tracking-[0.28em] text-gray-soft uppercase">
              {loc === 'vi' ? 'Câu chuyện người nghệ sĩ' : 'Artist Story'}
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-light text-[#2F2F2F] tracking-wide leading-tight">
              {title}
            </h1>
            <p className="font-body text-lg md:text-xl text-[#8D8D8D] max-w-2xl mx-auto leading-relaxed">
              {intro}
            </p>
          </div>
        </Container>
      </Section>

      {heroSrc ? (
        <section className="relative w-full h-[42vh] md:h-[58vh] border-y border-charcoal/5">
          <Image src={heroSrc} alt={heroAlt} fill priority className="object-cover" />
        </section>
      ) : null}

      {body ? (
        <Section spacing="default">
          <Container>
            <div className="max-w-3xl mx-auto space-y-6 text-left font-body text-base md:text-lg leading-relaxed text-gray-soft">
              {paragraphs(body).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {story?.storySections?.length ? (
        <Section spacing="default" className="pt-0">
          <Container>
            <div className="max-w-5xl mx-auto grid gap-10 md:grid-cols-2">
              {story.storySections.map((section) => {
                const sectionTitle = localizedText(section.title, loc);
                const sectionBody = localizedText(section.body, loc);
                const eyebrow = localizedText(section.eyebrow, loc);

                return (
                  <article key={section._key || sectionTitle} className="space-y-4 text-left">
                    {eyebrow ? (
                      <p className="font-body text-xs tracking-[0.24em] text-gray-soft uppercase">{eyebrow}</p>
                    ) : null}
                    <h2 className="font-display text-3xl font-light text-charcoal leading-tight">{sectionTitle}</h2>
                    <div className="space-y-4 font-body text-base leading-relaxed text-gray-soft">
                      {paragraphs(sectionBody).map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </Container>
        </Section>
      ) : null}
    </main>
  );
}
