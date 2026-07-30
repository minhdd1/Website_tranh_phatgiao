import { defineField, defineType } from 'sanity';

export const localizedPortableContent = defineType({
  title: 'Localized Portable Content',
  name: 'localizedPortableContent',
  type: 'object',
  fields: [
    defineField({
      title: 'Vietnamese (Default)',
      name: 'vi',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'English',
      name: 'en',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    }),
  ],
});
