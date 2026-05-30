import React from 'react';
import { cn } from '@/utils/cn';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  clean?: boolean; // If true, removes lateral padding (for edge-to-edge content on specific viewports)
}

export default function Container({
  children,
  className,
  clean = false,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-7xl',
        !clean && 'px-6 sm:px-8 md:px-12 lg:px-16',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
