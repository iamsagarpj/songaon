import { cn } from '@/utils/helpers';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'saffron' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  fullWidth?: boolean;
}

const variants = {
  primary:
    'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-400 shadow-md hover:shadow-lg',
  secondary:
    'bg-sky-600 text-white hover:bg-sky-700 focus:ring-sky-400 shadow-md hover:shadow-lg',
  outline:
    'border-2 border-primary-600 text-primary-700 hover:bg-primary-600 hover:text-white focus:ring-primary-500',
  ghost: 'text-primary-700 hover:bg-primary-50 focus:ring-primary-500',
  saffron:
    'bg-saffron-600 text-white hover:bg-saffron-700 focus:ring-saffron-400 shadow-md hover:shadow-lg',
  gold:
    'bg-amber-400 text-charcoal-900 hover:bg-amber-300 focus:ring-amber-300 shadow-md hover:shadow-lg',
};

const sizes = {
  sm: 'px-4 py-2 text-sm min-h-[40px]',
  md: 'px-6 py-3 text-base min-h-[48px]',
  lg: 'px-8 py-4 text-lg min-h-[56px]',
};

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
