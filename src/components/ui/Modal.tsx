'use client';

import React, { useEffect } from 'react';
import { cn } from '@/utils/cn';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  closeOnBackdropClick?: boolean;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  className,
  closeOnBackdropClick = true,
}: ModalProps) {
  // Lock screen scroll when open
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

  // Handle escape key click
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#2F2F2F]/20 backdrop-blur-sm transition-opacity duration-700 ease-out"
        onClick={() => closeOnBackdropClick && onClose()}
      />

      {/* Content Container */}
      <div
        className={cn(
          'relative w-full max-w-lg bg-[#FAF8F4] rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-charcoal/5 p-6 md:p-8 animate-fade-in z-10 focus:outline-none max-h-[90vh] overflow-y-auto',
          className
        )}
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-charcoal/50 hover:text-charcoal transition-colors duration-300 p-1 cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5 stroke-[1.5]" />
        </button>

        {children}
      </div>
    </div>
  );
}
