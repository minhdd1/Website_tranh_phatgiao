import { type Locale, type PortableTextBlock } from '@/types';

export function localizedText(
  value: Partial<Record<Locale, string>> | string | null | undefined,
  locale: Locale,
  fallback = ''
) {
  if (typeof value === 'string') return value;
  return value?.[locale] || value?.en || value?.vi || fallback;
}

export function localizedPortableContent(
  value: Partial<Record<Locale, string | PortableTextBlock[]>> | null | undefined,
  locale: Locale
) {
  const content = value?.[locale] || value?.en || value?.vi;
  return typeof content === 'string' || Array.isArray(content) ? content : [];
}
