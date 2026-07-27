export const artwork = {
  name: 'artwork',
  title: 'Artwork',
  type: 'document',
  groups: [
    { name: 'main', title: 'Main Info', default: true },
    { name: 'media', title: 'Images & Video' },
    { name: 'details', title: 'Specifications' },
    { name: 'content', title: 'Flexible Sections' },
    { name: 'commerce', title: 'Commerce' },
    { name: 'seo', title: 'SEO' },
  ],
  initialValue: {
    currency: 'VND',
    status: 'available',
    featured: false,
  },
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localizedString',
      group: 'main',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'main',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'excerpt',
      title: 'Short Excerpt',
      type: 'localizedString',
      group: 'main',
    },
    {
      name: 'description',
      title: 'Artwork Story / Narrative',
      type: 'localizedText',
      group: 'main',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'main',
      options: {
        list: [
          { title: 'Silk Painting', value: 'silk-painting' },
          { title: 'Sculptural Painting', value: 'sculptural-painting' },
          { title: 'Buddhist Art', value: 'buddhist-art' },
          { title: 'Commissioned Works', value: 'commissioned' },
        ],
        layout: 'radio',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      group: 'media',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt_vi',
              type: 'string',
              title: 'Alt Text (Vietnamese)',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'alt_en',
              type: 'string',
              title: 'Alt Text (English)',
              validation: (Rule: any) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule: any) => Rule.min(1).error('Artworks need at least 1 image (Hero).'),
    },
    {
      name: 'video',
      title: 'Texture Video Demonstration',
      description: 'Slow panning close-up of textural details (10-30s duration, soft ambient studio audio).',
      type: 'file',
      group: 'media',
      options: {
        accept: 'video/mp4,video/quicktime',
      },
    },
    {
      name: 'dimensions',
      title: 'Dimensions',
      type: 'localizedString',
      description: 'Example: "80 x 100 cm (with frame)"',
      group: 'details',
    },
    {
      name: 'materials',
      title: 'Materials & Techniques',
      type: 'localizedString',
      description: 'Example: "Natural mineral pigment on traditional silk"',
      group: 'details',
    },
    {
      name: 'specifications',
      title: 'Custom Artwork Specifications',
      description: 'Flexible label/value rows for details such as artist, year, technique, frame, finish, certificate, or shipping notes.',
      type: 'array',
      group: 'details',
      of: [
        {
          type: 'object',
          title: 'Specification Row',
          preview: {
            select: {
              title: 'label.vi',
              subtitle: 'value.vi',
            },
          },
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'localizedString',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'value',
              title: 'Value',
              type: 'localizedText',
              validation: (Rule: any) => Rule.required(),
            },
          ],
        },
      ],
    },
    {
      name: 'contentSections',
      title: 'Flexible Detail Sections',
      description: 'Optional artwork-specific sections. Use these instead of hard-coded detail text on the website.',
      type: 'array',
      group: 'content',
      of: [
        {
          name: 'textBlock',
          title: 'Text Section',
          type: 'object',
          preview: {
            select: {
              title: 'title.vi',
              subtitle: 'eyebrow.vi',
            },
          },
          fields: [
            {
              name: 'eyebrow',
              title: 'Small Label / Eyebrow',
              description: 'Example: "Chi Tiết Xúc Giác"',
              type: 'localizedString',
            },
            {
              name: 'title',
              title: 'Section Title',
              description: 'Example: "Sự Dung Dị Của Chất Liệu"',
              type: 'localizedString',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'body',
              title: 'Section Body',
              type: 'localizedText',
              validation: (Rule: any) => Rule.required(),
            },
          ],
        },
        {
          name: 'imageGallery',
          title: 'Image Gallery Section',
          type: 'object',
          preview: {
            select: {
              title: 'title.vi',
              media: 'images.0',
            },
          },
          fields: [
            {
              name: 'title',
              title: 'Gallery Title',
              type: 'localizedString',
            },
            {
              name: 'description',
              title: 'Gallery Description',
              type: 'localizedText',
            },
            {
              name: 'images',
              title: 'Gallery Images',
              type: 'array',
              of: [
                {
                  type: 'image',
                  options: { hotspot: true },
                  fields: [
                    {
                      name: 'alt_vi',
                      type: 'string',
                      title: 'Alt Text (Vietnamese)',
                      validation: (Rule: any) => Rule.required(),
                    },
                    {
                      name: 'alt_en',
                      type: 'string',
                      title: 'Alt Text (English)',
                      validation: (Rule: any) => Rule.required(),
                    },
                  ],
                },
              ],
              validation: (Rule: any) => Rule.min(1).error('Add at least one image or remove this section.'),
            },
          ],
        },
      ],
    },
    {
      name: 'price',
      title: 'Price Tag',
      type: 'number',
      group: 'commerce',
      validation: (Rule: any) => Rule.min(0),
    },
    {
      name: 'currency',
      title: 'Currency',
      type: 'string',
      group: 'commerce',
      options: {
        list: [
          { title: 'VND', value: 'VND' },
          { title: 'USD', value: 'USD' },
        ],
      },
      initialValue: 'VND',
    },
    {
      name: 'status',
      title: 'Availability Status',
      type: 'string',
      group: 'commerce',
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'Sold', value: 'sold' },
          { title: 'Commission Open', value: 'commission-open' },
        ],
      },
      initialValue: 'available',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'featured',
      title: 'Featured Placement',
      description: 'Displays item prominently on front page curation highlights.',
      type: 'boolean',
      group: 'commerce',
      initialValue: false,
    },
    {
      name: 'seo',
      title: 'SEO Metadata',
      type: 'object',
      group: 'seo',
      fields: [
        { name: 'title', title: 'Meta Title Override', type: 'localizedString' },
        { name: 'description', title: 'Meta Description Override', type: 'localizedText' },
      ],
    },
  ],
  preview: {
    select: {
      titleVi: 'title.vi',
      titleEn: 'title.en',
      subtitle: 'category',
      status: 'status',
      media: 'images.0',
    },
    prepare(selection: { titleVi?: string; titleEn?: string; subtitle?: string; status?: string; media?: any }) {
      const status = selection.status ? ` · ${selection.status}` : '';
      return {
        title: selection.titleVi || selection.titleEn || 'Untitled artwork',
        subtitle: `${selection.subtitle || 'No category'}${status}`,
        media: selection.media,
      };
    },
  },
};
