import { cn } from '@/utils/helpers';
import type { ReactNode, HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({ children, className, hover = false, padding = 'md', ...props }: CardProps) {
  const paddingClass = { none: '', sm: 'p-4', md: 'p-5', lg: 'p-6' }[padding];
  return (
    <div
      className={cn(
        'bg-white rounded-card border border-charcoal-100 shadow-card min-w-0 overflow-hidden transition-shadow duration-200',
        hover && 'hover:shadow-card-hover hover:border-primary-100 active:scale-[0.99]',
        paddingClass,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
