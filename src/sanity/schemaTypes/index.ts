import { type SchemaTypeDefinition } from 'sanity'
import { localizedString } from '../schemas/localizedString'
import { localizedText } from '../schemas/localizedText'
import { artwork } from '../schemas/artwork'
import { collection } from '../schemas/collection'
import { blog } from '../schemas/blog'
import { author } from '../schemas/author'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [localizedString, localizedText, artwork, collection, blog, author],
}
