'use client';

import { GenerateIcon } from '@sanity/icons';
import { useState } from 'react';
import { type ObjectInputProps, PatchEvent, set, setIfMissing, useFormValue } from 'sanity';
import { generateSeoMetadata } from '../lib/generateSeoMetadata';

export default function SeoMetadataInput(props: ObjectInputProps) {
  const document = useFormValue([]);
  const [status, setStatus] = useState('');

  function handleGenerate() {
    const seo = generateSeoMetadata((document || {}) as Parameters<typeof generateSeoMetadata>[0]);

    props.onChange(
      PatchEvent.from([
        setIfMissing({}),
        set(seo.title, ['title']),
        set(seo.description, ['description']),
      ])
    );

    setStatus('SEO metadata generated. Review and publish when ready.');
  }

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <div
        style={{
          alignItems: 'center',
          border: '1px solid var(--card-border-color)',
          borderRadius: 6,
          display: 'flex',
          gap: 12,
          justifyContent: 'space-between',
          padding: 12,
        }}
      >
        <div style={{ display: 'grid', gap: 4 }}>
          <strong style={{ fontSize: 13 }}>Generate SEO metadata</strong>
          <span style={{ color: 'var(--card-muted-fg-color)', fontSize: 13 }}>
            Creates Vietnamese and English title/description from this document.
          </span>
        </div>
        <button
          onClick={handleGenerate}
          style={{
            alignItems: 'center',
            background: 'var(--card-accent-fg-color)',
            border: 0,
            borderRadius: 4,
            color: 'var(--card-bg-color)',
            cursor: 'pointer',
            display: 'inline-flex',
            font: 'inherit',
            gap: 6,
            padding: '8px 10px',
            whiteSpace: 'nowrap',
          }}
          type="button"
        >
          <GenerateIcon />
          Generate SEO
        </button>
      </div>
      {status ? <span style={{ color: 'var(--card-muted-fg-color)', fontSize: 12 }}>{status}</span> : null}
      {props.renderDefault(props)}
    </div>
  );
}
