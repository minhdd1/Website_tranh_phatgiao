export const localizedString = {
  title: 'Localized String',
  name: 'localizedString',
  type: 'object',
  fields: [
    {
      title: 'Vietnamese (Default)',
      name: 'vi',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      title: 'English',
      name: 'en',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
  ],
};
