import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/src/lib/utils';

// Loading Spinner Component
const spinnerVariants = cva(
  "animate-spin rounded-full border-solid",
  {
    variants: {
      variant: {
        default: "border-brown-400 border-t-transparent",
        secondary: "border-blue-mint-300 border-t-transparent",
        neutral: "border-neutral-400 border-t-transparent",
        white: "border-white border-t-transparent",
      },
      size: {
        xs: "h-3 w-3 border",
        sm: "h-4 w-4 border-2",
        default: "h-6 w-6 border-2",
        lg: "h-8 w-8 border-2",
        xl: "h-12 w-12 border-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface LoadingSpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  label?: string;
}

export const LoadingSpinner = React.forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({ className, variant, size, label, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center justify-center", className)}
      {...props}
    >
      <div className={cn(spinnerVariants({ variant, size }))} />
      {label && (
        <span className="ml-2 text-body-sm text-neutral-600">{label}</span>
      )}
    </div>
  )
);

LoadingSpinner.displayName = "LoadingSpinner";

// Skeleton Component
const skeletonVariants = cva(
  "animate-pulse bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 bg-[length:200%_100%] animate-shimmer",
  {
    variants: {
      variant: {
        default: "bg-neutral-200",
        text: "bg-neutral-200 rounded",
        avatar: "bg-neutral-200 rounded-full",
        image: "bg-neutral-200 rounded-lg",
        button: "bg-neutral-200 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(skeletonVariants({ variant }), className)}
      {...props}
    />
  )
);

Skeleton.displayName = "Skeleton";

// Recipe Card Skeleton
export const RecipeCardSkeleton: React.FC<{ variant?: 'default' | 'compact' | 'large' | 'featured' }> = ({ 
  variant = 'default' 
}) => {
  const getImageHeight = () => {
    switch (variant) {
      case 'compact': return 'aspect-square';
      case 'featured': return 'aspect-[21/9]';
      default: return 'aspect-video';
    }
  };

  return (
    <div className={cn(
      "bg-white rounded-xl border border-neutral-200 overflow-hidden",
      variant === 'compact' && 'max-w-xs',
      variant === 'large' && 'max-w-lg',
      variant === 'featured' && 'max-w-2xl lg:flex lg:flex-row',
      variant === 'default' && 'max-w-sm'
    )}>
      {/* Image Skeleton */}
      <Skeleton 
        variant="image" 
        className={cn(
          getImageHeight(),
          variant === 'featured' && "lg:w-96 lg:aspect-auto lg:h-48"
        )} 
      />
      
      {/* Content Skeleton */}
      <div className={cn(
        "p-4 space-y-3",
        variant === 'featured' && "flex-1 p-6"
      )}>
        {/* Title */}
        <div className="space-y-2">
          <Skeleton variant="text" className="h-5 w-3/4" />
          {variant !== 'compact' && (
            <Skeleton variant="text" className="h-4 w-full" />
          )}
        </div>
        
        {/* Author */}
        <div className="flex items-center gap-2">
          <Skeleton variant="avatar" className="h-8 w-8" />
          <div className="space-y-1 flex-1">
            <Skeleton variant="text" className="h-3 w-20" />
            <Skeleton variant="text" className="h-3 w-16" />
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
          <div className="flex gap-4">
            <Skeleton variant="text" className="h-4 w-12" />
            <Skeleton variant="text" className="h-4 w-16" />
          </div>
          <Skeleton variant="button" className="h-8 w-20" />
        </div>
      </div>
    </div>
  );
};

// Loading Page Component
export interface LoadingPageProps {
  title?: string;
  description?: string;
  variant?: 'default' | 'minimal';
}

export const LoadingPage: React.FC<LoadingPageProps> = ({
  title = "טוען...",
  description,
  variant = 'default'
}) => {
  if (variant === 'minimal') {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <LoadingSpinner size="lg" label={title} />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <LoadingSpinner size="xl" />
      <div className="text-center space-y-2">
        <h2 className="text-h3 font-semibold text-neutral-900">{title}</h2>
        {description && (
          <p className="text-body text-neutral-600 max-w-md">{description}</p>
        )}
      </div>
    </div>
  );
};

// Loading Grid for Recipe Cards
export const RecipeGridSkeleton: React.FC<{ 
  count?: number; 
  variant?: 'default' | 'compact' | 'large' 
}> = ({ 
  count = 6, 
  variant = 'default' 
}) => {
  return (
    <div className={cn(
      "grid gap-6",
      variant === 'compact' ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    )}>
      {Array.from({ length: count }).map((_, index) => (
        <RecipeCardSkeleton key={index} variant={variant} />
      ))}
    </div>
  );
};

// Dots Loading Animation
export const DotsLoading: React.FC<{ size?: 'sm' | 'default' | 'lg' }> = ({ 
  size = 'default' 
}) => {
  const dotSize = {
    sm: 'w-1 h-1',
    default: 'w-2 h-2',
    lg: 'w-3 h-3'
  };

  return (
    <div className="flex items-center space-x-1">
      <div className={cn("bg-brown-400 rounded-full animate-pulse", dotSize[size])} style={{ animationDelay: '0ms' }} />
      <div className={cn("bg-brown-400 rounded-full animate-pulse", dotSize[size])} style={{ animationDelay: '150ms' }} />
      <div className={cn("bg-brown-400 rounded-full animate-pulse", dotSize[size])} style={{ animationDelay: '300ms' }} />
    </div>
  );
};

export { spinnerVariants, skeletonVariants };