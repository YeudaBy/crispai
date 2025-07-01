import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Card, 
  CardContent, 
  CardImage, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from './Card';
import { Button } from './Button';
import { cn } from '@/src/utils/cn';
import { RecipePreview } from '@/src/model/Recipe';
import { 
  RiHeartLine, 
  RiHeartFill, 
  RiTimeLine, 
  RiUserLine,
  RiShareLine,
  RiBookmarkLine,
  RiBookmarkFill
} from '@remixicon/react';

interface RecipeCardProps {
  recipe: RecipePreview;
  variant?: 'default' | 'large' | 'compact';
  showAuthor?: boolean;
  showActions?: boolean;
  isLiked?: boolean;
  isSaved?: boolean;
  onLike?: () => void;
  onSave?: () => void;
  onShare?: () => void;
  className?: string;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  variant = 'default',
  showAuthor = true,
  showActions = true,
  isLiked = false,
  isSaved = false,
  onLike,
  onSave,
  onShare,
  className
}) => {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('he-IL', {
      day: 'numeric',
      month: 'short',
    });
  };

  const cardSizes = {
    compact: 'max-w-sm',
    default: 'max-w-md',
    large: 'max-w-lg'
  };

  return (
    <Card 
      variant="default" 
      size="default" 
      interactive={true}
      className={cn(
        "group overflow-hidden transition-all duration-300 hover:shadow-elevation-3",
        cardSizes[variant],
        className
      )}
    >
      {/* Recipe Image */}
      <Link href={`/recipe/${recipe.id}`}>
        <CardImage
          src={recipe.image || '/default-recipe.jpg'}
          alt={recipe.title}
          aspectRatio={variant === 'compact' ? 'square' : 'video'}
          overlay={true}
          overlayContent={
            <div className="w-full">
              {/* Quick Actions Overlay */}
              {showActions && (
                <div className="flex justify-between items-start mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30"
                      onClick={(e: React.MouseEvent) => {
                        e.preventDefault();
                        onShare?.();
                      }}
                    >
                      <RiShareLine size={16} />
                    </Button>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30"
                    onClick={(e) => {
                      e.preventDefault();
                      onSave?.();
                    }}
                  >
                    {isSaved ? <RiBookmarkFill size={16} /> : <RiBookmarkLine size={16} />}
                  </Button>
                </div>
              )}
              
              {/* Recipe Info Overlay */}
              <div className="space-y-1">
                <h3 className="text-h4 font-semibold text-white line-clamp-2 leading-tight">
                  {recipe.title}
                </h3>
                
                {recipe.description && variant !== 'compact' && (
                  <p className="text-body-sm text-white/90 line-clamp-2 leading-relaxed">
                    {recipe.description}
                  </p>
                )}
              </div>
            </div>
          }
        />
      </Link>

      {/* Card Content */}
      <CardContent size={variant === 'compact' ? 'sm' : 'default'} className="space-y-3">
        {/* Author & Date */}
        {showAuthor && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-brown-400 to-blue-mint-300 flex items-center justify-center overflow-hidden">
                {recipe.account.image ? (
                  <Image 
                    src={recipe.account.image} 
                    alt={recipe.account.name}
                    width={24}
                    height={24}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <RiUserLine size={12} className="text-white" />
                )}
              </div>
              <span className="text-caption font-medium text-neutral-700 truncate">
                {recipe.account.name}
              </span>
            </div>
            
            <span className="text-caption text-neutral-500">
              {formatDate(recipe.date)}
            </span>
          </div>
        )}

        {/* Actions Bar */}
        {showActions && (
          <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
            <div className="flex items-center gap-4">
              {/* Like Button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onLike?.();
                }}
                className={cn(
                  "flex items-center gap-1.5 transition-all duration-200 ease-smooth group/like",
                  isLiked 
                    ? "text-error-500" 
                    : "text-neutral-500 hover:text-error-500"
                )}
              >
                {isLiked ? (
                  <RiHeartFill size={16} className="group-hover/like:scale-110 transition-transform" />
                ) : (
                  <RiHeartLine size={16} className="group-hover/like:scale-110 transition-transform" />
                )}
                <span className="text-caption font-medium">
                  {recipe.likes}
                </span>
              </button>

              {/* Cook Time (if available) */}
              <div className="flex items-center gap-1 text-neutral-500">
                <RiTimeLine size={14} />
                <span className="text-caption">
                  15 דק׳
                </span>
              </div>
            </div>

            {/* View Recipe Link */}
            <Link href={`/recipe/${recipe.id}`}>
              <Button 
                variant="outline" 
                size="sm"
                className="text-brown-600 border-brown-200 hover:bg-brown-50 hover:border-brown-300"
              >
                צפה במתכון
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Large Recipe Card for featured content
export const RecipeCardLarge: React.FC<Omit<RecipeCardProps, 'variant'>> = (props) => {
  return <RecipeCard {...props} variant="large" />;
};

// Compact Recipe Card for lists
export const RecipeCardCompact: React.FC<Omit<RecipeCardProps, 'variant'>> = (props) => {
  return <RecipeCard {...props} variant="compact" />;
};

export default RecipeCard;