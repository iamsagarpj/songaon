import { useState } from 'react';
import { cn } from '@/utils/helpers';
import { imageFallback } from '@/config/images';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  wrapperClassName?: string;
}

export function SafeImage({
  src,
  alt,
  className,
  fallbackSrc = imageFallback,
  wrapperClassName,
  loading = 'lazy',
  ...props
}: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src || fallbackSrc);
  const [failed, setFailed] = useState(false);

  return (
    <div className={cn('overflow-hidden bg-primary-50', wrapperClassName)}>
      {!failed ? (
        <img
          {...props}
          src={currentSrc}
          alt={alt}
          loading={loading}
          decoding="async"
          className={cn('w-full h-full object-cover', className)}
          onError={() => {
            if (currentSrc !== fallbackSrc) {
              setCurrentSrc(fallbackSrc);
            } else {
              setFailed(true);
            }
          }}
        />
      ) : (
        <div
          className={cn(
            'flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200 text-primary-800 font-semibold text-center p-4',
            className
          )}
          role="img"
          aria-label={alt}
        >
          {alt || 'Image'}
        </div>
      )}
    </div>
  );
}
