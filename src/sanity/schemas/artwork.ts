export const artwork = {
  name: 'artwork',
  title: 'Artwork',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
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
      name: 'excerpt',
      title: 'Short Excerpt',
      type: 'localizedString',
    },
    {
      name: 'description',
      title: 'Artwork Story / Narrative',
      type: 'localizedText',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
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
      options: {
        accept: 'video/mp4,video/quicktime',
      },
    },
    {
      name: 'dimensions',
      title: 'Dimensions',
      type: 'localizedString',
      description: 'Example: "80 x 100 cm (with frame)"',
    },
    {
      name: 'materials',
      title: 'Materials & Techniques',
      type: 'localizedString',
      description: 'Example: "Natural mineral pigment on traditional silk"',
    },
    {
      name: 'price',
      title: 'Price Tag',
      type: 'number',
      validation: (Rule: any) => Rule.min(0),
    },
    {
      name: 'currency',
      title: 'Currency',
      type: 'string',
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
      initialValue: false,
    },
    {
      name: 'seo',
      title: 'SEO Metadata',
      type: 'object',
      fields: [
        { name: 'title', title: 'Meta Title Override', type: 'localizedString' },
        { name: 'description', title: 'Meta Description Override', type: 'localizedText' },
      ],
    },
  ],
};
