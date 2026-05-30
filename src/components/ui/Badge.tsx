import React from 'react';
import { cn } from '@/utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: 'available' | 'sold' | 'commission-open';
  children?: React.ReactNode;
}

export default function Badge({
  status,
  className,
  children,
  ...props
}: BadgeProps) {
  const getStatusLabel = () => {
    switch (status) {
      case 'available':
        return 'Available';
      case 'sold':
        return 'Private Collection';
      case 'commission-open':
        return 'Accepting Commission';
      default:
        return '';
    }
  };

  return (
    <span
      className={cn(
        'inline-flex items-center text-xs tracking-widest uppercase font-body font-normal px-4 py-1.5 rounded-full border',
        status === 'available' && 'bg-ivory text-charcoal border-charcoal/20',
        status === 'sold' && 'bg-transparent text-gray-soft border-gray-soft/20 line-through',
        status === 'commission-open' && 'bg-rose-dusty text-charcoal border-rose-dusty/30',
        className
      )}
      {...props}
    >
      {children || getStatusLabel()}
    </span>
  );
}
