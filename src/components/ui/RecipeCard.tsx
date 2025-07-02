import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from './Card';
import { Button } from './Button';
import { cn } from '@/src/lib/utils';
import { RecipePreview } from '@/src/model/Recipe';
import { 
  RiHeartLine, 
  RiHeartFill, 
  RiTimeLine, 
  RiUserLine,
  RiShareLine,
  RiBookmarkLine,
  RiBookmarkFill,
  RiStarFill,
  RiEyeLine
} from '@remixicon/react';

interface RecipeCardProps {
  recipe: RecipePreview;
  variant?: 'default' | 'large' | 'compact' | 'featured';
  showAuthor?: boolean;
  showActions?: boolean;
  isLiked?: boolean;
  isSaved?: boolean;
  onLike?: () => void;
  onSave?: () => void;
  onShare?: () => void;
  className?: string;
  priority?: boolean;
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
  className,
  priority = false
}) => {
  const [isImageLoading, setIsImageLoading] = React.useState(true);
  const [likeAnimation, setLikeAnimation] = React.useState(false);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('he-IL', {
      day: 'numeric',
      month: 'short',
    });
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLikeAnimation(true);
    setTimeout(() => setLikeAnimation(false), 600);
    onLike?.();
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSave?.();
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onShare?.();
  };

  const getCardSize = () => {
    switch (variant) {
      case 'compact': return 'max-w-xs';
      case 'large': return 'max-w-lg';
      case 'featured': return 'max-w-2xl';
      default: return 'max-w-sm';
    }
  };

  const getImageAspect = () => {
    switch (variant) {
      case 'compact': return 'aspect-square';
      case 'featured': return 'aspect-[21/9]';
      default: return 'aspect-video';
    }
  };

  return (
    <Card 
      variant="recipe"
      className={cn(
        "group overflow-hidden bg-white",
        getCardSize(),
        variant === 'featured' && "lg:flex lg:flex-row",
        className
      )}
    >
      {/* Recipe Image */}
      <Link href={`/recipe/${recipe.id}`} className="block relative">
        <div className={cn(
          "relative overflow-hidden bg-neutral-100",
          getImageAspect(),
          variant === 'featured' && "lg:w-96 lg:aspect-auto lg:h-full"
        )}>
          {/* Loading Skeleton */}
          {isImageLoading && (
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 animate-shimmer" />
          )}
          
          <Image
            src={recipe.image || '/default-recipe.jpg'}
            alt={recipe.title}
            fill
            priority={priority}
            className={cn(
              "object-cover transition-all duration-500 group-hover:scale-105",
              isImageLoading ? "opacity-0" : "opacity-100"
            )}
            onLoad={() => setIsImageLoading(false)}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Quick Actions Overlay */}
          {showActions && (
            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <Button
                variant="ghost"
                size="icon-sm"
                className="bg-white/90 backdrop-blur-sm hover:bg-white text-neutral-700 shadow-elevation-2"
                onClick={handleShare}
              >
                <RiShareLine size={16} />
              </Button>
              
              <Button
                variant="ghost"
                size="icon-sm"
                className={cn(
                  "backdrop-blur-sm shadow-elevation-2 transition-colors",
                  isSaved 
                    ? "bg-brown-500 hover:bg-brown-600 text-white" 
                    : "bg-white/90 hover:bg-white text-neutral-700"
                )}
                onClick={handleSave}
              >
                {isSaved ? <RiBookmarkFill size={16} /> : <RiBookmarkLine size={16} />}
              </Button>
            </div>
          )}

          {/* Recipe Stats Overlay */}
          <div className="absolute bottom-3 left-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            {/* Difficulty Badge */}
            <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
              <RiStarFill size={12} className="text-warning-500" />
              <span className="text-caption font-medium text-neutral-700">קל</span>
            </div>
            
            {/* Cook Time */}
            <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
              <RiTimeLine size={12} className="text-blue-mint-600" />
              <span className="text-caption font-medium text-neutral-700">15 דק׳</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Card Content */}
      <div className={cn(
        "flex-1",
        variant === 'featured' ? "p-6" : "p-4"
      )}>
        {/* Header */}
        <div className="space-y-2 mb-4">
          <Link href={`/recipe/${recipe.id}`}>
            <h3 className={cn(
              "font-semibold text-neutral-900 line-clamp-2 hover:text-brown-600 transition-colors",
              variant === 'featured' ? "text-h2" : variant === 'compact' ? "text-body" : "text-h4"
            )}>
              {recipe.title}
            </h3>
          </Link>
          
          {recipe.description && variant !== 'compact' && (
            <p className={cn(
              "text-neutral-600 line-clamp-2",
              variant === 'featured' ? "text-body-lg" : "text-body-sm"
            )}>
              {recipe.description}
            </p>
          )}
        </div>

        {/* Author Info */}
        {showAuthor && (
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brown-400 to-blue-mint-300 flex items-center justify-center overflow-hidden">
                  {recipe.account.image ? (
                    <Image 
                      src={recipe.account.image} 
                      alt={recipe.account.name}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <RiUserLine size={16} className="text-white" />
                  )}
                </div>
                {/* Online indicator */}
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success-500 border-2 border-white rounded-full" />
              </div>
              
              <div className="flex flex-col">
                <span className="text-body-sm font-medium text-neutral-700 truncate">
                  {recipe.account.name}
                </span>
                <span className="text-caption text-neutral-500">
                  {formatDate(recipe.date)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Actions Bar */}
        {showActions && (
          <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
            <div className="flex items-center gap-4">
              {/* Like Button */}
              <button
                onClick={handleLike}
                className={cn(
                  "flex items-center gap-1.5 transition-all duration-200 group/like",
                  isLiked 
                    ? "text-error-500" 
                    : "text-neutral-500 hover:text-error-500"
                )}
              >
                <div className={cn(
                  "transition-transform duration-200",
                  likeAnimation && "animate-recipe-like"
                )}>
                  {isLiked ? (
                    <RiHeartFill size={18} className="group-hover/like:scale-110 transition-transform" />
                  ) : (
                    <RiHeartLine size={18} className="group-hover/like:scale-110 transition-transform" />
                  )}
                </div>
                <span className="text-body-sm font-medium">
                  {recipe.likes}
                </span>
              </button>

              {/* Views */}
              <div className="flex items-center gap-1 text-neutral-500">
                <RiEyeLine size={16} />
                <span className="text-body-sm">
                  {Math.floor(Math.random() * 1000) + 100}
                </span>
              </div>
            </div>

            {/* View Recipe Button */}
            <Link href={`/recipe/${recipe.id}`}>
              <Button 
                variant="outline" 
                size={variant === 'featured' ? 'default' : 'sm'}
                className="text-brown-600 border-brown-200 hover:bg-brown-50 hover:border-brown-300"
              >
                צפה במתכון
              </Button>
            </Link>
          </div>
        )}
      </div>
    </Card>
  );
};

// Specialized variants
export const RecipeCardLarge: React.FC<Omit<RecipeCardProps, 'variant'>> = (props) => {
  return <RecipeCard {...props} variant="large" />;
};

export const RecipeCardCompact: React.FC<Omit<RecipeCardProps, 'variant'>> = (props) => {
  return <RecipeCard {...props} variant="compact" />;
};

export const RecipeCardFeatured: React.FC<Omit<RecipeCardProps, 'variant'>> = (props) => {
  return <RecipeCard {...props} variant="featured" />;
};

export default RecipeCard;