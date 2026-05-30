'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  altText?: string;
}

export default function Lightbox({
  isOpen,
  onClose,
  imageUrl,
  altText = 'Artwork closeup',
}: LightboxProps) {
  // Lock body scroll when active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Bind escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAF8F4]/98 backdrop-blur-md animate-fade-in">
      {/* Outer Click Close Area */}
      <div className="absolute inset-0 cursor-zoom-out" onClick={onClose} />

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-charcoal/50 hover:text-charcoal transition-colors duration-300 p-2 cursor-pointer z-10"
        aria-label="Close fullscreen inspection"
      >
        <X className="w-6 h-6 stroke-[1.5]" />
      </button>

      {/* Image Wrapper */}
      <div className="relative w-full max-w-[90vw] max-h-[85vh] aspect-[4/5] sm:aspect-auto sm:h-[80vh] flex items-center justify-center select-none z-0">
        <Image
          src={imageUrl}
          alt={altText}
          fill
          className="object-contain rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-transform duration-700 ease-out"
          sizes="90vw"
          priority
        />
      </div>
    </div>
  );
}
