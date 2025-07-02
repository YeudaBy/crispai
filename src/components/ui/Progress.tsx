import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/src/lib/utils';

// Linear Progress Component
const progressVariants = cva(
  "w-full bg-neutral-200 rounded-full overflow-hidden",
  {
    variants: {
      size: {
        xs: "h-1",
        sm: "h-2",
        default: "h-3",
        lg: "h-4",
        xl: "h-6",
      },
      variant: {
        default: "",
        gradient: "",
        striped: "",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
);

const progressBarVariants = cva(
  "h-full transition-all duration-500 ease-out",
  {
    variants: {
      variant: {
        default: "bg-brown-500",
        gradient: "bg-gradient-to-r from-brown-400 to-blue-mint-400",
        striped: "bg-brown-500 bg-[length:1rem_1rem] bg-gradient-to-r from-brown-500 via-brown-400 to-brown-500 animate-pulse",
      },
      animated: {
        true: "animate-pulse",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      animated: false,
    },
  }
);

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  value: number;
  max?: number;
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ 
    className, 
    value, 
    max = 100, 
    size, 
    variant, 
    showLabel = false, 
    label, 
    animated = false,
    ...props 
  }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    
    return (
      <div className={cn("space-y-2", className)} ref={ref} {...props}>
        {(showLabel || label) && (
          <div className="flex justify-between items-center">
            <span className="text-body-sm font-medium text-neutral-700">
              {label || 'התקדמות'}
            </span>
            <span className="text-body-sm text-neutral-500">
              {Math.round(percentage)}%
            </span>
          </div>
        )}
        
        <div className={cn(progressVariants({ size, variant }))}>
          <div
            className={cn(progressBarVariants({ variant, animated }))}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);

Progress.displayName = "Progress";

// Circular Progress Component
export interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
  label?: string;
  variant?: 'default' | 'gradient';
  className?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  max = 100,
  size = 80,
  strokeWidth = 8,
  showLabel = true,
  label,
  variant = 'default',
  className
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getStrokeColor = () => {
    if (variant === 'gradient') {
      return 'url(#progress-gradient)';
    }
    return '#D4A574'; // brown-400
  };

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {variant === 'gradient' && (
          <defs>
            <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D4A574" /> {/* brown-400 */}
              <stop offset="100%" stopColor="#8DB8AE" /> {/* blue-mint-300 */}
            </linearGradient>
          </defs>
        )}
        
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E5E5"
          strokeWidth={strokeWidth}
          fill="none"
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getStrokeColor()}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-500 ease-out"
        />
      </svg>
      
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-h4 font-bold text-neutral-900">
            {Math.round(percentage)}%
          </span>
          {label && (
            <span className="text-caption text-neutral-600 mt-1">
              {label}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

// Step Progress Component
export interface StepProgressProps {
  steps: Array<{
    id: string;
    title: string;
    description?: string;
    completed?: boolean;
    current?: boolean;
  }>;
  className?: string;
}

export const StepProgress: React.FC<StepProgressProps> = ({
  steps,
  className
}) => {
  return (
    <div className={cn("space-y-4", className)}>
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-start gap-4">
          {/* Step indicator */}
          <div className="flex flex-col items-center">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-body-sm font-medium transition-all duration-300",
              step.completed 
                ? "bg-success-500 text-white" 
                : step.current 
                  ? "bg-brown-500 text-white animate-pulse" 
                  : "bg-neutral-200 text-neutral-500"
            )}>
              {step.completed ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            
            {/* Connector line */}
            {index < steps.length - 1 && (
              <div className={cn(
                "w-0.5 h-8 mt-2 transition-colors duration-300",
                step.completed ? "bg-success-300" : "bg-neutral-200"
              )} />
            )}
          </div>
          
          {/* Step content */}
          <div className="flex-1 pb-8">
            <h3 className={cn(
              "text-body font-medium transition-colors duration-300",
              step.completed 
                ? "text-success-700" 
                : step.current 
                  ? "text-brown-700" 
                  : "text-neutral-500"
            )}>
              {step.title}
            </h3>
            {step.description && (
              <p className="text-body-sm text-neutral-600 mt-1">
                {step.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

// Recipe Progress Component (for cooking steps)
export interface RecipeProgressProps {
  currentStep: number;
  totalSteps: number;
  stepTitle?: string;
  timeRemaining?: string;
  className?: string;
}

export const RecipeProgress: React.FC<RecipeProgressProps> = ({
  currentStep,
  totalSteps,
  stepTitle,
  timeRemaining,
  className
}) => {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className={cn("bg-white rounded-2xl p-6 shadow-elevation-2 border border-neutral-200", className)}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-h4 font-semibold text-neutral-900">
            שלב {currentStep} מתוך {totalSteps}
          </h3>
          {stepTitle && (
            <p className="text-body-sm text-neutral-600 mt-1">
              {stepTitle}
            </p>
          )}
        </div>
        
        {timeRemaining && (
          <div className="text-left">
            <p className="text-caption text-neutral-500">זמן נותר</p>
            <p className="text-body font-medium text-brown-600">
              {timeRemaining}
            </p>
          </div>
        )}
      </div>
      
      <Progress
        value={percentage}
        variant="gradient"
        size="lg"
        animated={currentStep < totalSteps}
      />
      
      <div className="flex justify-between text-caption text-neutral-500 mt-2">
        <span>התחלה</span>
        <span>סיום</span>
      </div>
    </div>
  );
};

export { progressVariants, progressBarVariants };