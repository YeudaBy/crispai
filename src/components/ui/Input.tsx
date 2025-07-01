import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/src/utils/cn';

const inputVariants = cva(
  // Base styles
  "flex w-full rounded-lg border transition-all duration-200 ease-smooth file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-neutral-300 bg-white text-neutral-900 focus-visible:ring-brown-400 focus-visible:border-brown-400 hover:border-neutral-400",
        error: "border-error-500 bg-white text-neutral-900 focus-visible:ring-error-500 focus-visible:border-error-500",
        success: "border-success-500 bg-white text-neutral-900 focus-visible:ring-success-500 focus-visible:border-success-500",
        warning: "border-warning-500 bg-white text-neutral-900 focus-visible:ring-warning-500 focus-visible:border-warning-500",
        ghost: "border-transparent bg-neutral-50 text-neutral-900 focus-visible:ring-brown-400 focus-visible:border-brown-400 hover:bg-neutral-100",
      },
      size: {
        sm: "h-8 px-3 py-1 text-body-sm",
        default: "h-10 px-3 py-2 text-body",
        lg: "h-11 px-4 py-2 text-body-lg",
        xl: "h-12 px-4 py-3 text-body-xl",
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
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
  success?: string;
  warning?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      type = "text",
      label,
      helperText,
      leftIcon,
      rightIcon,
      error,
      success,
      warning,
      id,
      ...props
    },
    ref
  ) => {
    // Determine variant based on validation states
    const currentVariant = error ? "error" : success ? "success" : warning ? "warning" : variant;
    
    // Generate unique ID if not provided
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    
    // Determine helper text based on validation states
    const currentHelperText = error || success || warning || helperText;

    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className={cn(labelVariants({ variant: currentVariant }), "mb-2 block")}
          >
            {label}
          </label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">
              {leftIcon}
            </div>
          )}

          {/* Input */}
          <input
            type={type}
            className={cn(
              inputVariants({ variant: currentVariant, size, className }),
              leftIcon && "pl-10",
              rightIcon && "pr-10"
            )}
            ref={ref}
            id={inputId}
            {...props}
          />

          {/* Right Icon */}
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500">
              {rightIcon}
            </div>
          )}

          {/* Focus Ring Enhancement */}
          <div className="absolute inset-0 rounded-lg pointer-events-none transition-all duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-brown-400/20" />
        </div>

        {/* Helper Text */}
        {currentHelperText && (
          <p className={cn(helperTextVariants({ variant: currentVariant }))}>
            {currentHelperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input, inputVariants };