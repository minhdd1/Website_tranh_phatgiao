export const blog = {
  name: 'blog',
  title: 'Blog / Curation Journal',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Article Title',
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
      title: 'Manually Translated Editorial Rich Content',
      type: 'object',
      fields: [
        {
          name: 'vi',
          title: 'Vietnamese Block Text',
          type: 'array',
          of: [{ type: 'block' }, { type: 'image' }],
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'en',
          title: 'English Block Text',
          type: 'array',
          of: [{ type: 'block' }, { type: 'image' }],
          validation: (Rule: any) => Rule.required(),
        },
      ],
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
      fields: [
        { name: 'title', title: 'Meta Title Override', type: 'localizedString' },
        { name: 'description', title: 'Meta Description Override', type: 'localizedText' },
      ],
    },
  ],
};
