import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/src/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        // Primary variants
        primary: "bg-brown-400 text-white hover:bg-brown-500 focus-visible:ring-brown-400 shadow-elevation-2 hover:shadow-elevation-3",
        secondary: "bg-blue-mint-300 text-white hover:bg-blue-mint-400 focus-visible:ring-blue-mint-300 shadow-elevation-2 hover:shadow-elevation-3",
        
        // Outline variants
        outline: "border-2 border-brown-400 text-brown-400 bg-transparent hover:bg-brown-400 hover:text-white focus-visible:ring-brown-400",
        "outline-secondary": "border-2 border-blue-mint-300 text-blue-mint-300 bg-transparent hover:bg-blue-mint-300 hover:text-white focus-visible:ring-blue-mint-300",
        
        // Ghost variants
        ghost: "text-brown-400 bg-transparent hover:bg-brown-50 focus-visible:ring-brown-400",
        "ghost-secondary": "text-blue-mint-300 bg-transparent hover:bg-blue-mint-50 focus-visible:ring-blue-mint-300",
        
        // Destructive
        destructive: "bg-error-500 text-white hover:bg-error-600 focus-visible:ring-error-500 shadow-elevation-2 hover:shadow-elevation-3",
        "destructive-outline": "border-2 border-error-500 text-error-500 bg-transparent hover:bg-error-500 hover:text-white focus-visible:ring-error-500",
        
        // Success
        success: "bg-success-500 text-white hover:bg-success-600 focus-visible:ring-success-500 shadow-elevation-2 hover:shadow-elevation-3",
        
        // Accent
        accent: "bg-accent-orange text-white hover:bg-accent-terracotta focus-visible:ring-accent-orange shadow-elevation-2 hover:shadow-elevation-3",
        
        // Neutral
        neutral: "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 focus-visible:ring-neutral-400 shadow-elevation-1 hover:shadow-elevation-2",
        
        // Link
        link: "text-brown-400 underline-offset-4 hover:underline focus-visible:ring-brown-400 p-0 h-auto",
      },
      size: {
        xs: "h-8 px-3 text-body-xs",
        sm: "h-9 px-4 text-body-sm",
        default: "h-10 px-6 text-body",
        lg: "h-11 px-8 text-body-lg",
        xl: "h-12 px-10 text-body-xl",
        "2xl": "h-14 px-12 text-h4",
        
        // Icon only sizes
        "icon-xs": "h-8 w-8",
        "icon-sm": "h-9 w-9",
        "icon": "h-10 w-10",
        "icon-lg": "h-11 w-11",
        "icon-xl": "h-12 w-12",
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto",
      },
      loading: {
        true: "cursor-not-allowed",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      fullWidth: false,
      loading: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    fullWidth, 
    loading, 
    leftIcon, 
    rightIcon, 
    children, 
    disabled,
    ...props 
  }, ref) => {
    const isDisabled = disabled || loading;
    
    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, loading, className }))}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {loading && (
          <svg 
            className="animate-spin -ml-1 mr-2 h-4 w-4" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && leftIcon && (
          <span className="mr-2 flex items-center">
            {leftIcon}
          </span>
        )}
        {children}
        {!loading && rightIcon && (
          <span className="ml-2 flex items-center">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };