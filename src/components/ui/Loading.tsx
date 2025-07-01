import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/src/utils/cn';

// Spinner Component
const spinnerVariants = cva(
  "animate-spin rounded-full border-2 border-current border-t-transparent",
  {
    variants: {
      size: {
        xs: "h-3 w-3",
        sm: "h-4 w-4",
        default: "h-6 w-6",
        lg: "h-8 w-8",
        xl: "h-12 w-12",
        "2xl": "h-16 w-16",
      },
      variant: {
        default: "text-brown-400",
        mint: "text-blue-mint-300",
        neutral: "text-neutral-400",
        white: "text-white",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
);

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {}

export const Spinner: React.FC<SpinnerProps> = ({ 
  className, 
  size, 
  variant, 
  ...props 
}) => {
  return (
    <div
      className={cn(spinnerVariants({ size, variant }), className)}
      {...props}
    />
  );
};

// Skeleton Component
const skeletonVariants = cva(
  "animate-pulse rounded bg-neutral-200 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-neutral-200",
        light: "bg-neutral-100",
        dark: "bg-neutral-300",
        shimmer: "bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 bg-[length:200%_100%] animate-shimmer",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant,
  width,
  height,
  style,
  ...props
}) => {
  return (
    <div
      className={cn(skeletonVariants({ variant }), className)}
      style={{
        width,
        height,
        ...style,
      }}
      {...props}
    />
  );
};

// Loading Dots Component
export interface LoadingDotsProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'default' | 'lg';
  color?: 'brown' | 'mint' | 'neutral';
}

export const LoadingDots: React.FC<LoadingDotsProps> = ({
  className,
  size = 'default',
  color = 'brown',
  ...props
}) => {
  const sizeClasses = {
    sm: 'w-1 h-1',
    default: 'w-2 h-2',
    lg: 'w-3 h-3',
  };

  const colorClasses = {
    brown: 'bg-brown-400',
    mint: 'bg-blue-mint-300',
    neutral: 'bg-neutral-400',
  };

  return (
    <div className={cn("flex space-x-1", className)} {...props}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            "rounded-full animate-bounce",
            sizeClasses[size],
            colorClasses[color]
          )}
          style={{
            animationDelay: `${i * 0.1}s`,
            animationDuration: '0.6s',
          }}
        />
      ))}
    </div>
  );
};

// Loading Screen Component
export interface LoadingScreenProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string;
  variant?: 'overlay' | 'page' | 'inline';
  showLogo?: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  className,
  message = "Loading...",
  variant = 'page',
  showLogo = true,
  ...props
}) => {
  const variantClasses = {
    overlay: "fixed inset-0 z-50 bg-white/80 backdrop-blur-sm",
    page: "min-h-screen bg-white",
    inline: "w-full py-12",
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {showLogo && (
        <div className="mb-6 animate-float">
          <div className="w-16 h-16 bg-gradient-to-br from-brown-400 to-blue-mint-300 rounded-2xl flex items-center justify-center">
            <span className="text-white text-2xl font-bold">C</span>
          </div>
        </div>
      )}
      
      <Spinner size="lg" className="mb-4" />
      
      {message && (
        <p className="text-body text-neutral-600 animate-fade-in">
          {message}
        </p>
      )}
    </div>
  );
};

// Recipe Card Skeleton
export const RecipeCardSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("bg-white rounded-xl border border-neutral-200 overflow-hidden", className)}>
      {/* Image skeleton */}
      <Skeleton variant="shimmer" className="aspect-video w-full" />
      
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <Skeleton variant="shimmer" height="1.25rem" width="80%" />
        
        {/* Description */}
        <div className="space-y-2">
          <Skeleton variant="shimmer" height="0.875rem" width="100%" />
          <Skeleton variant="shimmer" height="0.875rem" width="60%" />
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2">
            <Skeleton variant="shimmer" className="w-6 h-6 rounded-full" />
            <Skeleton variant="shimmer" height="0.75rem" width="4rem" />
          </div>
          <Skeleton variant="shimmer" height="0.75rem" width="3rem" />
        </div>
      </div>
    </div>
  );
};

// Recipe List Skeleton
export const RecipeListSkeleton: React.FC<{ count?: number; className?: string }> = ({ 
  count = 6, 
  className 
}) => {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <RecipeCardSkeleton key={i} />
      ))}
    </div>
  );
};

// Profile Skeleton
export const ProfileSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("bg-white rounded-xl border border-neutral-200 p-6", className)}>
      <div className="flex items-center space-x-4 mb-6">
        <Skeleton variant="shimmer" className="w-16 h-16 rounded-full" />
        <div className="space-y-2">
          <Skeleton variant="shimmer" height="1.25rem" width="8rem" />
          <Skeleton variant="shimmer" height="0.875rem" width="12rem" />
        </div>
      </div>
      
      <div className="space-y-3">
        <Skeleton variant="shimmer" height="0.875rem" width="100%" />
        <Skeleton variant="shimmer" height="0.875rem" width="80%" />
        <Skeleton variant="shimmer" height="0.875rem" width="60%" />
      </div>
    </div>
  );
};

export {
  spinnerVariants,
  skeletonVariants,
};