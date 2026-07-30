import { type SchemaTypeDefinition } from 'sanity'
import { localizedString } from '../schemas/localizedString'
import { localizedText } from '../schemas/localizedText'
import { localizedPortableContent } from '../schemas/localizedPortableContent'
import { artwork } from '../schemas/artwork'
import { collection } from '../schemas/collection'
import { blog } from '../schemas/blog'
import { author } from '../schemas/author'
import { artistStory } from '../schemas/artistStory'
import { blockContentType } from './blockContentType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    localizedString,
    localizedText,
    localizedPortableContent,
    blockContentType,
    artwork,
    collection,
    blog,
    author,
    artistStory,
  ],
}
