import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/src/lib/utils';
import { Skeleton } from './Loading';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  aspectRatio?: 'square' | 'video' | 'wide' | 'tall' | 'portrait';
  quality?: number;
  priority?: boolean;
  placeholder?: 'blur' | 'skeleton' | 'none';
  blurDataURL?: string;
  className?: string;
  containerClassName?: string;
  onLoad?: () => void;
  onError?: () => void;
  fallbackSrc?: string;
  lazy?: boolean;
  showLoadingState?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  fill = false,
  aspectRatio,
  quality = 75,
  priority = false,
  placeholder = 'skeleton',
  blurDataURL,
  className,
  containerClassName,
  onLoad,
  onError,
  fallbackSrc = '/default-recipe.jpg',
  lazy = true,
  showLoadingState = true
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);
  const [isInView, setIsInView] = useState(!lazy || priority);
  const imgRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, priority]);

  // Update src when prop changes
  useEffect(() => {
    setImageSrc(src);
    setHasError(false);
    setIsLoading(true);
  }, [src]);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    if (fallbackSrc && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
    }
    onError?.();
  };

  const getAspectRatio = () => {
    if (!aspectRatio) return '';
    
    switch (aspectRatio) {
      case 'square': return 'aspect-square';
      case 'video': return 'aspect-video';
      case 'wide': return 'aspect-[21/9]';
      case 'tall': return 'aspect-[3/4]';
      case 'portrait': return 'aspect-[4/5]';
      default: return '';
    }
  };

  const generateBlurDataURL = (color = '#f3f4f6') => {
    const svg = `
      <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="${color}"/>
      </svg>
    `;
    return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
  };

  const shouldShowSkeleton = isLoading && showLoadingState && placeholder === 'skeleton';
  const shouldShowImage = isInView && !shouldShowSkeleton;

  return (
    <div 
      ref={imgRef}
      className={cn(
        "relative overflow-hidden bg-neutral-100",
        getAspectRatio(),
        containerClassName
      )}
    >
      {/* Skeleton Loading State */}
      {shouldShowSkeleton && (
        <div className="absolute inset-0">
          <Skeleton className="w-full h-full" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-neutral-300 rounded-lg flex items-center justify-center animate-pulse">
              <svg className="w-6 h-6 text-neutral-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Actual Image */}
      {shouldShowImage && (
        <Image
          src={imageSrc}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          quality={quality}
          priority={priority}
          placeholder={placeholder === 'blur' ? 'blur' : 'empty'}
          blurDataURL={
            placeholder === 'blur' 
              ? blurDataURL || generateBlurDataURL() 
              : undefined
          }
          className={cn(
            "transition-all duration-500",
            isLoading ? "opacity-0 scale-105" : "opacity-100 scale-100",
            hasError && "grayscale",
            className
          )}
          onLoad={handleLoad}
          onError={handleError}
          sizes={
            fill 
              ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              : undefined
          }
        />
      )}

      {/* Error State */}
      {hasError && imageSrc === fallbackSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-100">
          <div className="text-center text-neutral-500">
            <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="text-body-sm">שגיאה בטעינת התמונה</p>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && !shouldShowSkeleton && (
        <div className="absolute inset-0 bg-neutral-100/80 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-brown-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

// Recipe Image Component with specific optimizations
interface RecipeImageProps extends Omit<OptimizedImageProps, 'aspectRatio'> {
  variant?: 'card' | 'hero' | 'thumbnail' | 'gallery';
  showOverlay?: boolean;
  overlayContent?: React.ReactNode;
}

export const RecipeImage: React.FC<RecipeImageProps> = ({
  variant = 'card',
  showOverlay = false,
  overlayContent,
  className,
  containerClassName,
  ...props
}) => {
  const getVariantProps = () => {
    switch (variant) {
      case 'hero':
        return {
          aspectRatio: 'wide' as const,
          quality: 90,
          priority: true
        };
      case 'thumbnail':
        return {
          aspectRatio: 'square' as const,
          quality: 60
        };
      case 'gallery':
        return {
          aspectRatio: 'video' as const,
          quality: 80
        };
      default: // card
        return {
          aspectRatio: 'video' as const,
          quality: 75
        };
    }
  };

  const variantProps = getVariantProps();

  return (
    <div className={cn("relative group", containerClassName)}>
      <OptimizedImage
        {...props}
        {...variantProps}
        className={cn(
          "group-hover:scale-105 transition-transform duration-300",
          className
        )}
      />
      
      {/* Overlay */}
      {showOverlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {overlayContent && (
            <div className="absolute bottom-4 left-4 right-4 text-white">
              {overlayContent}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Avatar Component with optimizations
interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'xs' | 'sm' | 'default' | 'lg' | 'xl' | '2xl';
  fallback?: string;
  className?: string;
  online?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'default',
  fallback,
  className,
  online = false
}) => {
  const [hasError, setHasError] = useState(!src);

  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    default: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    '2xl': 'w-20 h-20'
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={cn("relative inline-block", sizeClasses[size], className)}>
      <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-brown-400 to-blue-mint-300 flex items-center justify-center">
        {src && !hasError ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            onError={() => setHasError(true)}
            sizes="(max-width: 768px) 100px, 200px"
          />
        ) : (
          <span className="text-white font-medium text-sm">
            {fallback || getInitials(alt)}
          </span>
        )}
      </div>
      
      {/* Online indicator */}
      {online && (
        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success-500 border-2 border-white rounded-full" />
      )}
    </div>
  );
};

export default OptimizedImage;