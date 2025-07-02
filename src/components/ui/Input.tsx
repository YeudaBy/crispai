import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/src/lib/utils';

const inputVariants = cva(
  "flex w-full rounded-lg border bg-white px-3 py-2 text-body placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
  {
    variants: {
      variant: {
        default: "border-neutral-300 focus-visible:border-brown-400 focus-visible:ring-brown-400/20",
        secondary: "border-neutral-300 focus-visible:border-blue-mint-300 focus-visible:ring-blue-mint-300/20",
        success: "border-success-500 focus-visible:border-success-600 focus-visible:ring-success-500/20",
        warning: "border-warning-500 focus-visible:border-warning-600 focus-visible:ring-warning-500/20",
        error: "border-error-500 focus-visible:border-error-600 focus-visible:ring-error-500/20",
      },
      size: {
        sm: "h-9 px-3 text-body-sm",
        default: "h-10 px-3 text-body",
        lg: "h-11 px-4 text-body-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const labelVariants = cva(
  "text-label font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      variant: {
        default: "text-neutral-700",
        error: "text-error-600",
        success: "text-success-600",
        warning: "text-warning-600",
        ghost: "text-neutral-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const helperTextVariants = cva(
  "text-caption mt-1",
  {
    variants: {
      variant: {
        default: "text-neutral-600",
        error: "text-error-600",
        success: "text-success-600",
        warning: "text-warning-600",
        ghost: "text-neutral-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    variant, 
    size, 
    label, 
    helperText, 
    errorMessage, 
    leftIcon, 
    rightIcon, 
    isLoading,
    id,
    ...props 
  }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = !!errorMessage;
    const finalVariant = hasError ? 'error' : variant;

    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={inputId}
            className="block text-label text-neutral-700 font-medium mb-2"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
              {leftIcon}
            </div>
          )}
          
          <input
            id={inputId}
            className={cn(
              inputVariants({ variant: finalVariant, size }),
              leftIcon && "pl-10",
              (rightIcon || isLoading) && "pr-10",
              className
            )}
            ref={ref}
            {...props}
          />
          
          {(rightIcon || isLoading) && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
              {isLoading ? (
                <svg 
                  className="animate-spin h-4 w-4" 
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
              ) : rightIcon}
            </div>
          )}
        </div>
        
        {(helperText || errorMessage) && (
          <p className={cn(
            "mt-2 text-caption",
            hasError ? "text-error-600" : "text-neutral-500"
          )}>
            {errorMessage || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input, inputVariants };