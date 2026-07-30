import { DocumentTextIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';
import SeoMetadataInput from '../components/SeoMetadataInput';
import { seoDescriptionValidation, seoTitleValidation } from '../lib/seoValidation';

export const artistStory = defineType({
  name: 'artistStory',
  title: 'Artist Story / About Page',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    { name: 'main', title: 'Main Content', default: true },
    { name: 'sections', title: 'Story Sections' },
    { name: 'media', title: 'Media' },
    { name: 'seo', title: 'SEO' },
  ],
  initialValue: {
    title: {
      vi: 'Hành Trình Người Nghệ Sĩ',
      en: 'The Artist Story',
    },
    intro: {
      vi: 'Tìm hiểu thêm về triết lý và sự lựa chọn chất liệu lụa.',
      en: 'Discover the creative philosophy and choice of silk as a medium.',
    },
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Tiêu đề trang / Page Title',
      type: 'localizedString',
      group: 'main',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Mô tả mở đầu / Intro',
      description: 'Đoạn mô tả ngắn dưới tiêu đề trang About.',
      type: 'localizedText',
      group: 'main',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Câu chuyện chính / Main Story',
      description: 'Phần kể chuyện dài về hành trình, triết lý sáng tác và lựa chọn chất liệu.',
      type: 'localizedText',
      group: 'main',
    }),
    defineField({
      name: 'heroImage',
      title: 'Ảnh chính / Hero Image',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt_vi',
          title: 'Alt Text (Vietnamese)',
          type: 'string',
        }),
        defineField({
          name: 'alt_en',
          title: 'Alt Text (English)',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'storySections',
      title: 'Các phần câu chuyện / Story Sections',
      description: 'Dùng cho các phần như Triết lý sáng tác, Vì sao chọn lụa, Hành trình nghệ sĩ.',
      type: 'array',
      group: 'sections',
      of: [
        defineArrayMember({
          name: 'storySection',
          title: 'Story Section',
          type: 'object',
          preview: {
            select: {
              title: 'title.vi',
              subtitle: 'eyebrow.vi',
            },
          },
          fields: [
            defineField({
              name: 'eyebrow',
              title: 'Nhãn nhỏ / Eyebrow',
              type: 'localizedString',
            }),
            defineField({
              name: 'title',
              title: 'Tiêu đề phần / Section Title',
              type: 'localizedString',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'body',
              title: 'Nội dung phần / Section Body',
              type: 'localizedText',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Metadata',
      type: 'object',
      group: 'seo',
      components: {
        input: SeoMetadataInput,
      },
      fields: [
        defineField({
          name: 'title',
          title: 'Meta Title Override',
          type: 'localizedString',
          validation: (Rule) => Rule.custom(seoTitleValidation).warning(),
        }),
        defineField({
          name: 'description',
          title: 'Meta Description Override',
          type: 'localizedText',
          validation: (Rule) => Rule.custom(seoDescriptionValidation).warning(),
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Artist Story / About Page',
      };
    },
  },
});
