type Locale = 'vi' | 'en';

type LocalizedText = Partial<Record<Locale, string>>;

type PortableTextSpan = {
  _type?: string;
  text?: string;
};

type PortableTextBlock = {
  _type?: string;
  children?: PortableTextSpan[];
};

type SeoSourceDocument = {
  _type?: string;
  title?: LocalizedText;
  intro?: LocalizedText;
  body?: LocalizedText;
  excerpt?: LocalizedText;
  description?: LocalizedText;
  category?: string;
  materials?: LocalizedText;
  dimensions?: LocalizedText;
  content?: Partial<Record<Locale, string | PortableTextBlock[]>>;
  storySections?: {
    title?: LocalizedText;
    body?: LocalizedText;
  }[];
};

export type GeneratedSeoMetadata = {
  title: Record<Locale, string>;
  description: Record<Locale, string>;
};

const categoryLabels: Record<string, Record<Locale, string>> = {
  'silk-painting': {
    vi: 'tranh lụa',
    en: 'silk painting',
  },
  'sculptural-painting': {
    vi: 'tranh điêu khắc',
    en: 'sculptural painting',
  },
  'buddhist-art': {
    vi: 'nghệ thuật Phật giáo',
    en: 'Buddhist art',
  },
  commissioned: {
    vi: 'tranh đặt hàng',
    en: 'commissioned artwork',
  },
};

function cleanText(value: string | null | undefined) {
  return (value || '')
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.!?;:])/g, '$1')
    .trim();
}

function localized(value: LocalizedText | string | null | undefined, locale: Locale) {
  if (typeof value === 'string') return cleanText(value);
  return cleanText(value?.[locale] || value?.en || value?.vi);
}

function portableToPlainText(value: string | PortableTextBlock[] | null | undefined) {
  if (!value) return '';
  if (typeof value === 'string') return cleanText(value);

  return cleanText(
    value
      .filter((block) => block._type === 'block')
      .map((block) => (block.children || []).map((span) => span.text || '').join(''))
      .join(' ')
  );
}

function truncateAtWord(value: string, maxLength: number) {
  const text = cleanText(value);
  if (text.length <= maxLength) return text;

  const clipped = text.slice(0, maxLength + 1);
  const lastSpace = clipped.lastIndexOf(' ');
  const safeText = lastSpace > maxLength * 0.65 ? clipped.slice(0, lastSpace) : clipped.slice(0, maxLength);

  return safeText.replace(/[,.!?;:]+$/, '').trim();
}

function titleWithFallback(primary: string, suffix: string, maxLength = 60) {
  const full = cleanText(`${primary} | ${suffix}`);
  if (full.length <= maxLength) return full;

  const compact = cleanText(`${primary} | Kayla Nguyen`);
  if (compact.length <= maxLength) return compact;

  return truncateAtWord(primary, maxLength);
}

function descriptionFromSource(source: string, fallback: string, locale: Locale) {
  const base = cleanText(source || fallback);
  if (!base) return '';
  if (base.length >= 120) return truncateAtWord(base, 160);

  const suffix =
    locale === 'vi'
      ? ' Tác phẩm thuộc bộ sưu tập nghệ thuật thủ công của Kayla Nguyen.'
      : " Part of Kayla Nguyen's handcrafted art collection.";

  return truncateAtWord(`${base}${suffix}`, 160);
}

function artworkDescription(document: SeoSourceDocument, locale: Locale) {
  const title = localized(document.title, locale) || (locale === 'vi' ? 'tác phẩm nghệ thuật' : 'artwork');
  const category = categoryLabels[document.category || '']?.[locale];
  const materials = localized(document.materials, locale);
  const source = localized(document.excerpt, locale) || localized(document.description, locale);

  const fallback =
    locale === 'vi'
      ? `Khám phá ${title}, ${category || 'tác phẩm nghệ thuật'}${materials ? ` với chất liệu ${materials}` : ''}, được tạo tác cho không gian sống tinh tế.`
      : `Discover ${title}, ${category || 'an artwork'}${materials ? ` made with ${materials}` : ''}, created for refined living spaces.`;

  return descriptionFromSource(source, fallback, locale);
}

function blogDescription(document: SeoSourceDocument, locale: Locale) {
  const content = document.content?.[locale] || document.content?.en || document.content?.vi;
  const source = portableToPlainText(content);
  const title = localized(document.title, locale) || (locale === 'vi' ? 'bài viết nghệ thuật' : 'art article');
  const fallback =
    locale === 'vi'
      ? `Đọc ${title} trong nhật ký nghệ thuật của Kayla Nguyen, nơi chia sẻ góc nhìn về chất liệu, không gian và đời sống sáng tạo.`
      : `Read ${title} in Kayla Nguyen's curation journal, with reflections on materials, interiors, and creative practice.`;

  return descriptionFromSource(source, fallback, locale);
}

function artistStoryDescription(document: SeoSourceDocument, locale: Locale) {
  const sectionText = (document.storySections || [])
    .map((section) => `${localized(section.title, locale)} ${localized(section.body, locale)}`)
    .join(' ');
  const source = localized(document.intro, locale) || localized(document.body, locale) || cleanText(sectionText);
  const fallback =
    locale === 'vi'
      ? 'Tìm hiểu hành trình nghệ sĩ, triết lý sáng tác và lý do Kayla Nguyen lựa chọn chất liệu lụa.'
      : 'Discover Kayla Nguyen’s artist journey, creative philosophy, and choice of silk as a medium.';

  return descriptionFromSource(source, fallback, locale);
}

function generateForLocale(document: SeoSourceDocument, locale: Locale) {
  const title = localized(document.title, locale) || (locale === 'vi' ? 'Kayla Nguyen' : 'Kayla Nguyen');

  if (document._type === 'blog') {
    return {
      title: titleWithFallback(title, locale === 'vi' ? 'Nhật ký nghệ thuật Kayla Nguyen' : 'Curation Journal'),
      description: blogDescription(document, locale),
    };
  }

  if (document._type === 'artistStory') {
    return {
      title: titleWithFallback(title, locale === 'vi' ? 'Kayla Nguyen' : 'Kayla Nguyen'),
      description: artistStoryDescription(document, locale),
    };
  }

  const category = categoryLabels[document.category || '']?.[locale];
  const suffix =
    locale === 'vi'
      ? `${category ? `${category} ` : ''}Kayla Nguyen`
      : `${category ? `${category} ` : ''}by Kayla Nguyen`;

  return {
    title: titleWithFallback(title, suffix),
    description: artworkDescription(document, locale),
  };
}

export function generateSeoMetadata(document: SeoSourceDocument): GeneratedSeoMetadata {
  const vi = generateForLocale(document, 'vi');
  const en = generateForLocale(document, 'en');

  return {
    title: {
      vi: vi.title,
      en: en.title,
    },
    description: {
      vi: vi.description,
      en: en.description,
    },
  };
}
