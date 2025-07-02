import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/src/lib/utils';
import {
  RiAddLine,
  RiCloseLine,
  RiStickyNoteAddLine,
  RiCameraLine,
  RiMicLine,
  RiImageLine,
  RiBookLine
} from '@remixicon/react';

interface FloatingActionButtonProps {
  className?: string;
  onMainAction?: () => void;
  showQuickActions?: boolean;
}

interface QuickAction {
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
  color: string;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  className,
  onMainAction,
  showQuickActions = true
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const quickActions: QuickAction[] = [
    {
      icon: <RiStickyNoteAddLine size={20} />,
      label: 'מתכון חדש',
      href: '/recipe/add',
      color: 'bg-brown-500 hover:bg-brown-600'
    },
    {
      icon: <RiCameraLine size={20} />,
      label: 'צלם מתכון',
      onClick: () => console.log('Camera action'),
      color: 'bg-blue-mint-500 hover:bg-blue-mint-600'
    },
    {
      icon: <RiMicLine size={20} />,
      label: 'הקלט מתכון',
      onClick: () => console.log('Voice action'),
      color: 'bg-accent-orange hover:bg-accent-terracotta'
    },
    {
      icon: <RiBookLine size={20} />,
      label: 'מתוך ספר',
      onClick: () => console.log('Book action'),
      color: 'bg-success-500 hover:bg-success-600'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsExpanded(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('[data-fab-container]')) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isExpanded]);

  const handleMainClick = () => {
    if (showQuickActions) {
      setIsExpanded(!isExpanded);
    } else {
      onMainAction?.();
    }
  };

  const handleQuickAction = (action: QuickAction) => {
    setIsExpanded(false);
    action.onClick?.();
  };

  return (
    <div 
      className={cn(
        "fixed bottom-24 left-6 z-40 transition-all duration-300",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0",
        className
      )}
      data-fab-container
    >
      {/* Quick Actions */}
      {showQuickActions && isExpanded && (
        <div className="absolute bottom-16 left-0 space-y-3 animate-slide-in-up">
          {quickActions.map((action, index) => (
            <div
              key={index}
              className="flex items-center gap-3 animate-slide-in-left"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Action Label */}
              <div className="bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-elevation-2 border border-neutral-200">
                <span className="text-body-sm font-medium text-neutral-700 whitespace-nowrap">
                  {action.label}
                </span>
              </div>
              
              {/* Action Button */}
              {action.href ? (
                <Link href={action.href}>
                  <button
                    className={cn(
                      "w-12 h-12 rounded-full text-white shadow-elevation-3 transition-all duration-200 transform hover:scale-110 active:scale-95",
                      action.color
                    )}
                  >
                    {action.icon}
                  </button>
                </Link>
              ) : (
                <button
                  onClick={() => handleQuickAction(action)}
                  className={cn(
                    "w-12 h-12 rounded-full text-white shadow-elevation-3 transition-all duration-200 transform hover:scale-110 active:scale-95",
                    action.color
                  )}
                >
                  {action.icon}
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Backdrop */}
      {isExpanded && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10 animate-fade-in" />
      )}

      {/* Main FAB */}
      <button
        onClick={handleMainClick}
        className={cn(
          "w-14 h-14 bg-gradient-to-br from-brown-400 to-brown-500 hover:from-brown-500 hover:to-brown-600 text-white rounded-full shadow-elevation-4 transition-all duration-300 transform hover:scale-110 active:scale-95 flex items-center justify-center group",
          isExpanded && "rotate-45 bg-gradient-to-br from-error-500 to-error-600 hover:from-error-600 hover:to-error-700"
        )}
      >
        {isExpanded ? (
          <RiCloseLine size={24} className="transition-transform duration-300" />
        ) : (
          <RiAddLine size={24} className="transition-transform duration-300 group-hover:rotate-90" />
        )}
      </button>

      {/* Ripple Effect */}
      <div className={cn(
        "absolute inset-0 rounded-full transition-all duration-500",
        isExpanded 
          ? "bg-brown-400/20 scale-150 opacity-0" 
          : "bg-brown-400/0 scale-100 opacity-100"
      )} />
    </div>
  );
};

// Quick Add Menu Component
interface QuickAddMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onAction: (action: string) => void;
}

export const QuickAddMenu: React.FC<QuickAddMenuProps> = ({
  isOpen,
  onClose,
  onAction
}) => {
  if (!isOpen) return null;

  const menuItems = [
    { id: 'recipe', label: 'מתכון חדש', icon: <RiStickyNoteAddLine size={20} />, href: '/recipe/add' },
    { id: 'camera', label: 'צלם מתכון', icon: <RiCameraLine size={20} /> },
    { id: 'voice', label: 'הקלט מתכון', icon: <RiMicLine size={20} /> },
    { id: 'import', label: 'ייבא מתמונה', icon: <RiImageLine size={20} /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Menu */}
      <div className="relative bg-white rounded-2xl shadow-elevation-5 p-6 m-4 max-w-sm w-full animate-scale-in">
        <div className="text-center mb-6">
          <h3 className="text-h3 font-semibold text-neutral-900 mb-2">
            מה תרצה ליצור?
          </h3>
          <p className="text-body-sm text-neutral-600">
            בחר את הדרך הנוחה לך להוסיף מתכון חדש
          </p>
        </div>
        
        <div className="space-y-3">
          {menuItems.map((item, index) => (
            <div key={item.id} style={{ animationDelay: `${index * 50}ms` }}>
              {item.href ? (
                <Link href={item.href}>
                  <button className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-neutral-50 transition-colors duration-200 group">
                    <div className="w-10 h-10 bg-brown-100 rounded-full flex items-center justify-center group-hover:bg-brown-200 transition-colors">
                      {item.icon}
                    </div>
                    <span className="text-body font-medium text-neutral-900">
                      {item.label}
                    </span>
                  </button>
                </Link>
              ) : (
                <button 
                  onClick={() => onAction(item.id)}
                  className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-neutral-50 transition-colors duration-200 group"
                >
                  <div className="w-10 h-10 bg-brown-100 rounded-full flex items-center justify-center group-hover:bg-brown-200 transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-body font-medium text-neutral-900">
                    {item.label}
                  </span>
                </button>
              )}
            </div>
          ))}
        </div>
        
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-full hover:bg-neutral-100 transition-colors"
        >
          <RiCloseLine size={20} className="text-neutral-500" />
        </button>
      </div>
    </div>
  );
};

export default FloatingActionButton;