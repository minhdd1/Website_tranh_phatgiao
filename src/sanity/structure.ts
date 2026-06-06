import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Kayla Nguyen Gallery')
    .items([
      S.documentTypeListItem('artwork').title('Artworks'),
      S.documentTypeListItem('blog').title('Journal & Blogs'),
      S.documentTypeListItem('collection').title('Collections'),
      S.documentTypeListItem('author').title('Authors'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => 
          item.getId() && 
          !['artwork', 'blog', 'collection', 'author', 'localizedString', 'localizedText'].includes(item.getId()!),
      ),
    ])
