import { localizedString } from './localizedString';
import { localizedText } from './localizedText';
import { localizedPortableContent } from './localizedPortableContent';
import { artwork } from './artwork';
import { collection } from './collection';
import { blog } from './blog';
import { author } from './author';
import { blockContentType } from '../schemaTypes/blockContentType';

export const schemaTypes = [
  localizedString,
  localizedText,
  localizedPortableContent,
  blockContentType,
  artwork,
  collection,
  blog,
  author,
];
