import SeoMetadataInput from '../components/SeoMetadataInput';
import { seoDescriptionValidation, seoTitleValidation } from '../lib/seoValidation';

export const blog = {
  name: 'blog',
  title: 'Journal Article',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Tiêu đề bài viết / Article Title',
      type: 'localizedString',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'coverImage',
      title: 'Banner Cover Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'content',
      title: 'Legacy plain text content',
      description: 'Read-only fallback for older articles. Use Rich editorial content for new edits.',
      type: 'localizedText',
      readOnly: true,
      hidden: ({ value }: { value?: unknown }) => value === undefined,
      deprecated: {
        reason: 'Use richContent for formatted bilingual article content.',
      },
    },
    {
      name: 'richContent',
      title: 'Nội dung bài viết / Rich Editorial Content',
      description: 'Nhập nội dung giàu định dạng riêng cho tiếng Việt và tiếng Anh.',
      type: 'localizedPortableContent',
    },
    {
      name: 'author',
      title: 'Author Profile',
      type: 'reference',
      to: [{ type: 'author' }],
    },
    {
      name: 'publishedAt',
      title: 'Publication Date',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'seo',
      title: 'SEO Overrides',
      type: 'object',
      components: {
        input: SeoMetadataInput,
      },
      fields: [
        {
          name: 'title',
          title: 'Meta Title Override',
          type: 'localizedString',
          validation: (Rule: any) => Rule.custom(seoTitleValidation).warning(),
        },
        {
          name: 'description',
          title: 'Meta Description Override',
          type: 'localizedText',
          validation: (Rule: any) => Rule.custom(seoDescriptionValidation).warning(),
        },
      ],
    },
  ],
};
