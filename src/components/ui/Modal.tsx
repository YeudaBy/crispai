import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/src/lib/utils';

const modalVariants = cva(
  "relative w-full bg-white rounded-xl shadow-elevation-5 transition-all duration-300",
  {
    variants: {
      size: {
        sm: "max-w-sm",
        default: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        "2xl": "max-w-2xl",
        "3xl": "max-w-3xl",
        "4xl": "max-w-4xl",
        full: "max-w-full m-4",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface ModalProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof modalVariants> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}

export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ 
    className, 
    size, 
    isOpen, 
    onClose, 
    title, 
    description, 
    showCloseButton = true, 
    closeOnOverlayClick = true, 
    closeOnEscape = true,
    children,
    ...props 
  }, ref) => {
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
      if (isOpen) {
        setIsVisible(true);
        document.body.style.overflow = 'hidden';
      } else {
        const timer = setTimeout(() => {
          setIsVisible(false);
          document.body.style.overflow = 'unset';
        }, 300);
        return () => clearTimeout(timer);
      }

      return () => {
        document.body.style.overflow = 'unset';
      };
    }, [isOpen]);

    React.useEffect(() => {
      const handleEscape = (event: KeyboardEvent) => {
        if (closeOnEscape && event.key === 'Escape') {
          onClose();
        }
      };

      if (isOpen) {
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
      }
    }, [isOpen, closeOnEscape, onClose]);

    if (!isVisible) {
      return null;
    }

    const handleOverlayClick = (event: React.MouseEvent) => {
      if (closeOnOverlayClick && event.target === event.currentTarget) {
        onClose();
      }
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Overlay */}
        <div 
          className={cn(
            "absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
            isOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={handleOverlayClick}
        />

        {/* Modal */}
        <div
          ref={ref}
          className={cn(
            modalVariants({ size }),
            "relative z-10 m-4 transform transition-all duration-300",
            isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0",
            className
          )}
          {...props}
        >
          {/* Close Button */}
          {showCloseButton && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1 rounded-md hover:bg-neutral-100 transition-colors z-10"
            >
              <svg className="h-5 w-5 text-neutral-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          )}

          {/* Header */}
          {(title || description) && (
            <div className="px-6 py-4 border-b border-neutral-200">
              {title && (
                <h2 className="text-h2 font-semibold text-neutral-900">
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-body-sm text-neutral-600 mt-1">
                  {description}
                </p>
              )}
            </div>
          )}

          {/* Content */}
          <div className="px-6 py-4">
            {children}
          </div>
        </div>
      </div>
    );
  }
);

const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("px-6 py-4 border-b border-neutral-200", className)}
      {...props}
    />
  )
);

const ModalBody = React.forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("px-6 py-4", className)}
      {...props}
    />
  )
);

const ModalFooter = React.forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("px-6 py-4 border-t border-neutral-200 flex items-center justify-end space-x-3", className)}
      {...props}
    />
  )
);

Modal.displayName = "Modal";
ModalHeader.displayName = "ModalHeader";
ModalBody.displayName = "ModalBody";
ModalFooter.displayName = "ModalFooter";

export { Modal, ModalHeader, ModalBody, ModalFooter };