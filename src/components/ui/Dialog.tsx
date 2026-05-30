'use client';

import React from 'react';
import Modal from './Modal';
import Button from './Button';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  onConfirm?: () => void;
}

export default function Dialog({
  isOpen,
  onClose,
  title,
  description,
  confirmLabel,
  onConfirm,
}: DialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-md text-center">
      <h3 className="font-display text-2xl md:text-3xl font-light text-charcoal tracking-wide mb-4 mt-2">
        {title}
      </h3>
      <p className="font-body text-sm leading-relaxed text-gray-soft mb-8 px-2">
        {description}
      </p>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        {onConfirm && confirmLabel && (
          <Button variant="primary" size="sm" onClick={onConfirm} className="w-full sm:w-auto">
            {confirmLabel}
          </Button>
        )}
        <Button variant="secondary" size="sm" onClick={onClose} className="w-full sm:w-auto">
          {onConfirm ? 'Cancel' : 'Close'}
        </Button>
      </div>
    </Modal>
  );
}
