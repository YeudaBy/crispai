import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/src/utils/cn';

const buttonVariants = cva(
  // Base styles
  "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group",
  {
    variants: {
      variant: {
        // Primary variants
        primary: "bg-brown-400 text-white hover:bg-brown-500 focus-visible:ring-brown-400 shadow-elevation-2 hover:shadow-elevation-3 active:scale-[0.98]",
        "primary-mint": "bg-blue-mint-300 text-white hover:bg-blue-mint-400 focus-visible:ring-blue-mint-300 shadow-elevation-2 hover:shadow-elevation-3 active:scale-[0.98]",
        
        // Secondary variants
        secondary: "bg-brown-100 text-brown-900 hover:bg-brown-200 focus-visible:ring-brown-300 border border-brown-200 hover:border-brown-300",
        "secondary-mint": "bg-blue-mint-100 text-blue-mint-900 hover:bg-blue-mint-200 focus-visible:ring-blue-mint-300 border border-blue-mint-200 hover:border-blue-mint-300",
        
        // Outline variants
        outline: "border border-brown-300 text-brown-700 hover:bg-brown-50 hover:border-brown-400 focus-visible:ring-brown-300",
        "outline-mint": "border border-blue-mint-300 text-blue-mint-700 hover:bg-blue-mint-50 hover:border-blue-mint-400 focus-visible:ring-blue-mint-300",
        
        // Ghost variants
        ghost: "text-brown-700 hover:bg-brown-100 focus-visible:ring-brown-300 hover:text-brown-900",
        "ghost-mint": "text-blue-mint-700 hover:bg-blue-mint-100 focus-visible:ring-blue-mint-300 hover:text-blue-mint-900",
        
        // Accent variants
        accent: "bg-accent-orange text-white hover:bg-accent-orange/90 focus-visible:ring-accent-orange shadow-elevation-2 hover:shadow-elevation-3 active:scale-[0.98]",
        coral: "bg-accent-coral text-white hover:bg-accent-coral/90 focus-visible:ring-accent-coral shadow-elevation-2 hover:shadow-elevation-3 active:scale-[0.98]",
        
        // Semantic variants
        success: "bg-success-500 text-white hover:bg-success-600 focus-visible:ring-success-500 shadow-elevation-2 hover:shadow-elevation-3 active:scale-[0.98]",
        warning: "bg-warning-500 text-white hover:bg-warning-600 focus-visible:ring-warning-500 shadow-elevation-2 hover:shadow-elevation-3 active:scale-[0.98]",
        error: "bg-error-500 text-white hover:bg-error-600 focus-visible:ring-error-500 shadow-elevation-2 hover:shadow-elevation-3 active:scale-[0.98]",
        
        // Special variants
        link: "text-brown-600 underline-offset-4 hover:underline focus-visible:ring-brown-300 p-0 h-auto",
        gradient: "bg-gradient-to-r from-brown-400 to-accent-orange text-white hover:from-brown-500 hover:to-accent-orange/90 focus-visible:ring-brown-400 shadow-elevation-2 hover:shadow-elevation-3 active:scale-[0.98]",
      },
      size: {
        xs: "h-7 px-2 text-caption rounded-md",
        sm: "h-8 px-3 text-body-sm rounded-md",
        default: "h-10 px-4 text-body",
        lg: "h-11 px-6 text-body-lg",
        xl: "h-12 px-8 text-body-xl",
        "2xl": "h-14 px-10 text-h5",
        icon: "h-10 w-10 p-0",
        "icon-sm": "h-8 w-8 p-0",
        "icon-lg": "h-12 w-12 p-0",
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
  children?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
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
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, loading, className }))}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {/* Loading spinner */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        
        {/* Content wrapper */}
        <div className={cn("flex items-center gap-2", loading && "opacity-0")}>
          {leftIcon && (
            <span className="flex-shrink-0">
              {leftIcon}
            </span>
          )}
          
          {children && (
            <span className="flex-1 text-center">
              {children}
            </span>
          )}
          
          {rightIcon && (
            <span className="flex-shrink-0">
              {rightIcon}
            </span>
          )}
        </div>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-[inherit]" />
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };