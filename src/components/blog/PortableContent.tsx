import React from 'react';
import Image from 'next/image';
import {
  type PortableTextBlock,
  type PortableTextContentBlock,
  type PortableTextImageBlock,
  type PortableTextSpan,
} from '@/types';
import { getImageUrl } from '@/lib/sanity';

interface PortableContentProps {
  value?: string | PortableTextContentBlock[];
}

function spanText(span: PortableTextSpan) {
  return span.text;
}

export function portableToPlainText(value: string | PortableTextContentBlock[] | undefined, maxLength?: number) {
  if (!value) return '';

  const text = typeof value === 'string'
    ? value
    : value
        .filter((block) => block._type === 'block')
        .map((block) => (block.children || []).map(spanText).join(''))
        .join('\n\n');

  if (!maxLength || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

function renderSpan(span: PortableTextSpan, block: PortableTextBlock) {
  const markDefs = block.markDefs || [];
  const linkMark = (span.marks || [])
    .map((mark) => markDefs.find((def) => def._key === mark && def._type === 'link'))
    .find(Boolean);

  let content: React.ReactNode = span.text;

  if (span.marks?.includes('strong')) {
    content = <strong>{content}</strong>;
  }

  if (span.marks?.includes('em')) {
    content = <em>{content}</em>;
  }

  if (linkMark?.href) {
    content = (
      <a
        href={linkMark.href}
        className="underline underline-offset-4 hover:text-charcoal transition-colors"
        rel="noreferrer"
        target={linkMark.href.startsWith('http') ? '_blank' : undefined}
      >
        {content}
      </a>
    );
  }

  return <React.Fragment key={span._key}>{content}</React.Fragment>;
}

function renderBlock(block: PortableTextBlock) {
  const children = (block.children || []).map((span) => renderSpan(span, block));

  if (block.style === 'h2') {
    return <h2 key={block._key} className="font-display text-3xl text-charcoal mt-10 mb-4">{children}</h2>;
  }

  if (block.style === 'h3') {
    return <h3 key={block._key} className="font-display text-2xl text-charcoal mt-8 mb-3">{children}</h3>;
  }

  if (block.style === 'blockquote') {
    return (
      <blockquote key={block._key} className="border-l border-charcoal/20 pl-5 italic text-charcoal/80">
        {children}
      </blockquote>
    );
  }

  return <p key={block._key}>{children}</p>;
}

function renderImage(block: PortableTextImageBlock) {
  if (!block.asset) return null;

  return (
    <figure key={block._key} className="my-10 space-y-3">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-beige-warm/20">
        <Image
          src={getImageUrl(block)}
          alt={block.alt || ''}
          fill
          sizes="(min-width: 768px) 672px, calc(100vw - 48px)"
          className="object-cover"
        />
      </div>
      {block.caption && (
        <figcaption className="text-sm leading-relaxed text-gray-soft/80">{block.caption}</figcaption>
      )}
    </figure>
  );
}

function renderList(blocks: PortableTextBlock[], listItem: 'bullet' | 'number', key: string) {
  const ListTag = listItem === 'number' ? 'ol' : 'ul';
  const listClassName = listItem === 'number'
    ? 'list-decimal space-y-2 pl-6'
    : 'list-disc space-y-2 pl-6';

  return (
    <ListTag key={key} className={listClassName}>
      {blocks.map((block) => (
        <li key={block._key}>
          {(block.children || []).map((span) => renderSpan(span, block))}
        </li>
      ))}
    </ListTag>
  );
}

function renderPortableBlocks(blocks: PortableTextContentBlock[]) {
  const rendered: React.ReactNode[] = [];
  let index = 0;

  while (index < blocks.length) {
    const block = blocks[index];

    if (block._type === 'image') {
      rendered.push(renderImage(block));
      index += 1;
      continue;
    }

    if (block._type === 'block' && block.listItem) {
      const listItem = block.listItem;
      const listBlocks: PortableTextBlock[] = [];

      while (
        index < blocks.length &&
        blocks[index]._type === 'block' &&
        (blocks[index] as PortableTextBlock).listItem === listItem
      ) {
        listBlocks.push(blocks[index] as PortableTextBlock);
        index += 1;
      }

      rendered.push(renderList(listBlocks, listItem, `list-${listBlocks[0]?._key || index}`));
      continue;
    }

    rendered.push(renderBlock(block));
    index += 1;
  }

  return rendered;
}

export default function PortableContent({ value }: PortableContentProps) {
  if (!value) return null;

  if (typeof value === 'string') {
    return <>{value}</>;
  }

  return (
    <>
      {renderPortableBlocks(value)}
    </>
  );
}
