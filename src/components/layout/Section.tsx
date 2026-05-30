import React from 'react';
import { cn } from '@/utils/cn';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  spacing?: 'default' | 'large' | 'none';
  as?: 'section' | 'div' | 'header' | 'footer';
}

export default function Section({
  children,
  className,
  spacing = 'default',
  as: Component = 'section',
  ...props
}: SectionProps) {
  return (
    <Component
      className={cn(
        'w-full relative',
        spacing === 'default' && 'py-8 md:py-16 lg:py-24',
        spacing === 'large' && 'py-16 md:py-24 lg:py-32',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
