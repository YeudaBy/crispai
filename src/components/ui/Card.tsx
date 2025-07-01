import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/src/utils/cn';

const cardVariants = cva(
  "rounded-xl border bg-white text-neutral-950 shadow-soft transition-all duration-300 ease-smooth overflow-hidden group",
  {
    variants: {
      variant: {
        default: "border-neutral-200 hover:shadow-elevation-2 hover:border-neutral-300",
        elevated: "border-neutral-200 shadow-elevation-3 hover:shadow-elevation-4",
        outlined: "border-2 border-brown-200 hover:border-brown-300 hover:shadow-soft",
        ghost: "border-transparent shadow-none hover:shadow-soft hover:border-neutral-200",
        gradient: "border-transparent bg-gradient-to-br from-brown-50 to-blue-mint-50 hover:from-brown-100 hover:to-blue-mint-100",
      },
      size: {
        sm: "p-3",
        default: "p-4",
        lg: "p-6",
        xl: "p-8",
      },
      interactive: {
        true: "cursor-pointer hover:scale-[1.02] active:scale-[0.98]",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      interactive: false,
    },
  }
);

const cardHeaderVariants = cva(
  "flex flex-col space-y-1.5",
  {
    variants: {
      size: {
        sm: "pb-2",
        default: "pb-3",
        lg: "pb-4",
        xl: "pb-6",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const cardContentVariants = cva(
  "text-body",
  {
    variants: {
      size: {
        sm: "text-body-sm",
        default: "text-body",
        lg: "text-body-lg",
        xl: "text-body-xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const cardFooterVariants = cva(
  "flex items-center",
  {
    variants: {
      size: {
        sm: "pt-2",
        default: "pt-3",
        lg: "pt-4",
        xl: "pt-6",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

// Card Root Component
export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, interactive, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, size, interactive, className }))}
      {...props}
    />
  )
);
Card.displayName = "Card";

// Card Header Component
export interface CardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardHeaderVariants> {}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardHeaderVariants({ size, className }))}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

// Card Title Component
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as: Component = 'h3', ...props }, ref) => (
    <Component
      ref={ref}
      className={cn("text-h3 font-semibold leading-none tracking-tight text-neutral-900", className)}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

// Card Description Component
export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-body-sm text-neutral-600 leading-relaxed", className)}
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";

// Card Content Component
export interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardContentVariants> {}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardContentVariants({ size, className }))}
      {...props}
    />
  )
);
CardContent.displayName = "CardContent";

// Card Footer Component
export interface CardFooterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardFooterVariants> {}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardFooterVariants({ size, className }))}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

// Card Image Component
export interface CardImageProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  aspectRatio?: 'square' | 'video' | 'wide' | 'tall';
  overlay?: boolean;
  overlayContent?: React.ReactNode;
}

const CardImage = forwardRef<HTMLDivElement, CardImageProps>(
  ({ className, src, alt, aspectRatio = 'video', overlay, overlayContent, ...props }, ref) => {
    const aspectClasses = {
      square: 'aspect-square',
      video: 'aspect-video',
      wide: 'aspect-[21/9]',
      tall: 'aspect-[3/4]',
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden bg-neutral-100",
          aspectClasses[aspectRatio],
          className
        )}
        {...props}
      >
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {overlay && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        )}
        
        {overlayContent && (
          <div className="absolute inset-0 flex items-end p-4">
            <div className="text-white">
              {overlayContent}
            </div>
          </div>
        )}
      </div>
    );
  }
);
CardImage.displayName = "CardImage";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardImage,
  cardVariants,
};