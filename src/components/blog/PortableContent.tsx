import React from 'react';
import { type PortableTextBlock, type PortableTextSpan } from '@/types';

interface PortableContentProps {
  value: string | PortableTextBlock[];
}

function spanText(span: PortableTextSpan) {
  return span.text;
}

export function portableToPlainText(value: string | PortableTextBlock[] | undefined, maxLength?: number) {
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

export default function PortableContent({ value }: PortableContentProps) {
  if (typeof value === 'string') {
    return <>{value}</>;
  }

  return (
    <>
      {value.map((block) => {
        if (block._type !== 'block') return null;

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
      })}
    </>
  );
}
