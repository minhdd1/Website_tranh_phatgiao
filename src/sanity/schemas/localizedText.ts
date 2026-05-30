export const localizedText = {
  title: 'Localized Text',
  name: 'localizedText',
  type: 'object',
  fields: [
    {
      title: 'Vietnamese (Default)',
      name: 'vi',
      type: 'text',
      rows: 5,
      validation: (Rule: any) => Rule.required(),
    },
    {
      title: 'English',
      name: 'en',
      type: 'text',
      rows: 5,
      validation: (Rule: any) => Rule.required(),
    },
  ],
};
