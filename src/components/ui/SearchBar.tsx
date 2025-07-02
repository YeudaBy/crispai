import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/src/lib/utils';
import { Input } from './Input';
import { Button } from './Button';
import {
  RiSearchLine,
  RiCloseLine,
  RiFilterLine,
  RiTimeLine,
  RiStarLine,
  RiUserLine,
  RiFireLine
} from '@remixicon/react';

interface SearchSuggestion {
  id: string;
  text: string;
  type: 'recipe' | 'ingredient' | 'author' | 'category';
  icon?: React.ReactNode;
}

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onFilter?: () => void;
  showFilters?: boolean;
  suggestions?: SearchSuggestion[];
  isLoading?: boolean;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "חפש מתכונים, מרכיבים או שפים...",
  onSearch,
  onFilter,
  showFilters = true,
  suggestions = [],
  isLoading = false,
  className
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Mock suggestions for demo
  const mockSuggestions: SearchSuggestion[] = [
    { id: '1', text: 'פסטה ברוטב עגבניות', type: 'recipe', icon: <RiFireLine size={16} className="text-error-500" /> },
    { id: '2', text: 'עגבניות שרי', type: 'ingredient' },
    { id: '3', text: 'שף דנה', type: 'author', icon: <RiUserLine size={16} className="text-blue-mint-500" /> },
    { id: '4', text: 'מתכונים איטלקיים', type: 'category' },
    { id: '5', text: 'עוגת שוקולד', type: 'recipe', icon: <RiStarLine size={16} className="text-warning-500" /> },
  ];

  const filteredSuggestions = query.length > 0 
    ? mockSuggestions.filter(s => s.text.includes(query))
    : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setSelectedSuggestion(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(value.length > 0);
    setSelectedSuggestion(-1);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    if (query.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestion(prev => 
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestion(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestion >= 0) {
          handleSuggestionClick(filteredSuggestions[selectedSuggestion]);
        } else {
          handleSearch();
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestion(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.text);
    setShowSuggestions(false);
    setSelectedSuggestion(-1);
    onSearch?.(suggestion.text);
  };

  const handleSearch = () => {
    if (query.trim()) {
      onSearch?.(query.trim());
      setShowSuggestions(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    setShowSuggestions(false);
    setSelectedSuggestion(-1);
    inputRef.current?.focus();
  };

  const getSuggestionTypeColor = (type: SearchSuggestion['type']) => {
    switch (type) {
      case 'recipe': return 'text-brown-600 bg-brown-50';
      case 'ingredient': return 'text-success-600 bg-success-50';
      case 'author': return 'text-blue-mint-600 bg-blue-mint-50';
      case 'category': return 'text-warning-600 bg-warning-50';
      default: return 'text-neutral-600 bg-neutral-50';
    }
  };

  const getSuggestionTypeLabel = (type: SearchSuggestion['type']) => {
    switch (type) {
      case 'recipe': return 'מתכון';
      case 'ingredient': return 'מרכיב';
      case 'author': return 'שף';
      case 'category': return 'קטגוריה';
      default: return '';
    }
  };

  return (
    <div className={cn("relative w-full max-w-2xl", className)} ref={suggestionsRef}>
      <div className={cn(
        "relative flex items-center transition-all duration-300",
        isFocused && "transform scale-[1.02]"
      )}>
        <div className="relative flex-1">
          <Input
            ref={inputRef}
            value={query}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={cn(
              "pr-12 pl-12 h-12 text-body rounded-2xl border-2 transition-all duration-300",
              isFocused 
                ? "border-brown-400 shadow-elevation-2 bg-white" 
                : "border-neutral-300 hover:border-neutral-400 bg-neutral-50/50"
            )}
            leftIcon={
              <RiSearchLine 
                size={20} 
                className={cn(
                  "transition-colors duration-300",
                  isFocused ? "text-brown-500" : "text-neutral-400"
                )} 
              />
            }
            rightIcon={
              query.length > 0 ? (
                <button
                  onClick={handleClear}
                  className="p-1 rounded-full hover:bg-neutral-100 transition-colors"
                >
                  <RiCloseLine size={16} className="text-neutral-500" />
                </button>
              ) : isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-brown-400 border-t-transparent" />
              ) : null
            }
            isLoading={isLoading}
          />
        </div>

        {showFilters && (
          <Button
            variant="outline"
            size="icon-lg"
            className="ml-3 rounded-2xl border-2 hover:border-brown-400 hover:bg-brown-50"
            onClick={onFilter}
          >
            <RiFilterLine size={20} />
          </Button>
        )}
      </div>

      {/* Search Suggestions */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-neutral-200 rounded-2xl shadow-elevation-3 z-50 overflow-hidden animate-slide-in-down">
          <div className="py-2">
            {filteredSuggestions.map((suggestion, index) => (
              <button
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
                className={cn(
                  "w-full px-4 py-3 text-right flex items-center justify-between hover:bg-neutral-50 transition-colors duration-200",
                  selectedSuggestion === index && "bg-brown-50 border-r-2 border-brown-400"
                )}
              >
                <div className="flex items-center gap-3">
                  {suggestion.icon}
                  <span className="text-body text-neutral-900">
                    {suggestion.text}
                  </span>
                </div>
                
                <span className={cn(
                  "text-caption px-2 py-1 rounded-full font-medium",
                  getSuggestionTypeColor(suggestion.type)
                )}>
                  {getSuggestionTypeLabel(suggestion.type)}
                </span>
              </button>
            ))}
          </div>
          
          {/* Quick Filters */}
          <div className="border-t border-neutral-100 p-3 bg-neutral-50/50">
            <div className="flex gap-2 flex-wrap">
              <button className="px-3 py-1 bg-white border border-neutral-200 rounded-full text-caption hover:border-brown-300 hover:bg-brown-50 transition-colors">
                <RiTimeLine size={12} className="inline ml-1" />
                מהיר להכנה
              </button>
              <button className="px-3 py-1 bg-white border border-neutral-200 rounded-full text-caption hover:border-brown-300 hover:bg-brown-50 transition-colors">
                <RiStarLine size={12} className="inline ml-1" />
                מתכונים מובילים
              </button>
              <button className="px-3 py-1 bg-white border border-neutral-200 rounded-full text-caption hover:border-brown-300 hover:bg-brown-50 transition-colors">
                <RiFireLine size={12} className="inline ml-1" />
                פופולריים השבוע
              </button>
            </div>
          </div>
        </div>
      )}

      {/* No Results */}
      {showSuggestions && query.length > 0 && filteredSuggestions.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-neutral-200 rounded-2xl shadow-elevation-3 z-50 p-6 text-center animate-slide-in-down">
          <div className="text-neutral-500">
            <RiSearchLine size={24} className="mx-auto mb-2 opacity-50" />
            <p className="text-body mb-1">לא נמצאו תוצאות עבור "{query}"</p>
            <p className="text-body-sm">נסה מילות חיפוש אחרות או עיין בקטגוריות</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;