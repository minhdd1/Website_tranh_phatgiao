import React from 'react';
import { cn } from '@/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'rose';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export default function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center font-body font-normal tracking-wide transition-all duration-500 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-charcoal/30 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
        // Variants
        variant === 'primary' && 'bg-charcoal text-ivory border border-charcoal hover:bg-transparent hover:text-charcoal rounded-full',
        variant === 'secondary' && 'bg-transparent text-charcoal border border-charcoal/40 hover:border-charcoal rounded-full',
        variant === 'ghost' && 'bg-transparent text-charcoal border border-transparent hover:text-charcoal/70 rounded-full',
        variant === 'rose' && 'bg-rose-dusty text-charcoal border border-rose-dusty hover:bg-transparent hover:border-charcoal/20 rounded-full',
        
        // Sizes
        size === 'sm' && 'px-5 py-2 text-xs uppercase tracking-widest',
        size === 'md' && 'px-7 py-3 text-sm tracking-wider',
        size === 'lg' && 'px-9 py-4 text-base tracking-wider',
        
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
