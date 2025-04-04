import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button, Card } from '@/components/ui';

interface KnowledgeModulePreview {
  title: string;
  slug: string;
  category: string;
  subcategory?: string;
  summary?: string;
  image?: string;
  estimatedReadTime?: string;
  last_updated: string;
  tags?: string[];
  status?: string;
  complexity?: string;
  agent_author?: string;
}

interface KnowledgeGridProps {
  modules: KnowledgeModulePreview[];
  initialLimit?: number;
  loadMoreIncrement?: number;
  theme?: 'default' | 'dark';
  showFilters?: boolean;
  featuredTags?: string[];
  title?: string;
  subtitle?: string;
}

const KnowledgeGrid: React.FC<KnowledgeGridProps> = ({
  modules,
  initialLimit = 12,
  loadMoreIncrement = 6,
  theme = 'default',
  showFilters = true,
  featuredTags = [],
  title,
  subtitle
}) => {
  // State
  const [visibleModules, setVisibleModules] = useState<number>(initialLimit);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'alphabetical'>('newest');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Refs
  const observerTarget = useRef<HTMLDivElement>(null);
  
  // Extract unique categories and tags
  const categories = Array.from(new Set(modules.map(module => module.category)));
  const allTags = Array.from(new Set(modules.flatMap(module => module.tags || [])));
  
  // Sort featured tags to the beginning
  const sortedTags = [
    ...featuredTags.filter(tag => allTags.includes(tag)),
    ...allTags.filter(tag => !featuredTags.includes(tag))
  ];
  
  // Filter modules based on selected filters
  const filteredModules = modules.filter(module => {
    // Filter by search term
    if (searchTerm && !module.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !module.summary?.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !(module.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))))
      return false;
    
    // Filter by category
    if (selectedCategory && module.category !== selectedCategory)
      return false;
    
    // Filter by tag
    if (selectedTag && !module.tags?.includes(selectedTag))
      return false;
    
    return true;
  });
  
  // Sort filtered modules
  const sortedModules = [...filteredModules].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.last_updated).getTime() - new Date(a.last_updated).getTime();
    } else if (sortBy === 'oldest') {
      return new Date(a.last_updated).getTime() - new Date(b.last_updated).getTime();
    } else { // alphabetical
      return a.title.localeCompare(b.title);
    }
  });
  
  // Set up intersection observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && visibleModules < sortedModules.length && !isLoading) {
          setIsLoading(true);
          // Simulate loading delay (remove in production)
          setTimeout(() => {
            setVisibleModules(prev => Math.min(prev + loadMoreIncrement, sortedModules.length));
            setIsLoading(false);
          }, 300);
        }
      },
      { threshold: 0.1 }
    );
    
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
    
    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [visibleModules, sortedModules.length, loadMoreIncrement, isLoading]);
  
  // Reset visible modules when filters change
  useEffect(() => {
    setVisibleModules(initialLimit);
  }, [selectedCategory, selectedTag, sortBy, searchTerm, initialLimit]);
  
  // Text and background styles based on theme
  const getTextColor = () => theme === 'dark' ? 'text-white' : 'text-black';
  const getBgColor = () => theme === 'dark' ? 'bg-gray-900' : 'bg-white';
  const getCardBgColor = () => theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  
  return (
    <div className={`${getBgColor()} py-12`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {(title || subtitle) && (
          <div className="mb-12 text-center">
            {title && <h2 className={`text-3xl font-bold mb-3 ${getTextColor()}`}>{title}</h2>}
            {subtitle && <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{subtitle}</p>}
          </div>
        )}
        
        {showFilters && (
          <div className="mb-8 space-y-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search knowledge modules..."
                className={`w-full px-4 py-2 border rounded-lg ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200'}`}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <svg 
                className={`absolute right-3 top-2.5 h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between gap-4">
              {/* Categories filter */}
              <div className="flex overflow-x-auto pb-1 scrollbar-hide space-x-2">
                <button
                  className={`px-3 py-1.5 rounded-full whitespace-nowrap text-sm ${
                    selectedCategory === null
                      ? theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-black text-white'
                      : theme === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-800'
                  }`}
                  onClick={() => setSelectedCategory(null)}
                >
                  All Categories
                </button>
                {categories.map(category => (
                  <button
                    key={category}
                    className={`px-3 py-1.5 rounded-full whitespace-nowrap text-sm ${
                      selectedCategory === category
                        ? theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-black text-white'
                        : theme === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-800'
                    }`}
                    onClick={() => setSelectedCategory(prev => prev === category ? null : category)}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
              
              {/* Sort options */}
              <div className="flex">
                <select
                  className={`px-3 py-1.5 rounded-lg text-sm ${
                    theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-800 border-gray-200'
                  } border`}
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as 'newest' | 'oldest' | 'alphabetical')}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="alphabetical">Alphabetical</option>
                </select>
              </div>
            </div>
            
            {/* Tags filter */}
            {sortedTags.length > 0 && (
              <div className="flex overflow-x-auto pb-1 scrollbar-hide space-x-2">
                {sortedTags.slice(0, 15).map(tag => (
                  <button
                    key={tag}
                    className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${
                      selectedTag === tag
                        ? theme === 'dark' ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white'
                        : theme === 'dark' ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-white border border-gray-200 text-gray-700'
                    }`}
                    onClick={() => setSelectedTag(prev => prev === tag ? null : tag)}
                  >
                    #{tag}
                  </button>
                ))}
                {sortedTags.length > 15 && (
                  <button
                    className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${
                      theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'
                    } border border-gray-300`}
                  >
                    +{sortedTags.length - 15} more
                  </button>
                )}
              </div>
            )}
          </div>
        )}
        
        {/* Results summary */}
        <div className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          <p className="text-sm">
            Showing {Math.min(visibleModules, sortedModules.length)} of {sortedModules.length} results
            {selectedCategory && ` in ${selectedCategory}`}
            {selectedTag && ` tagged with #${selectedTag}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>
        
        {/* Knowledge modules grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedModules.slice(0, visibleModules).map((module, index) => (
            <Link key={`${module.slug}-${index}`} href={`/${module.slug}`}>
              <Card className={`h-full group transition-all duration-300 ${getCardBgColor()} hover:shadow-md`}>
                {module.image && (
                  <div className="aspect-[16/9] relative overflow-hidden">
                    <Image 
                      src={module.image} 
                      alt={module.title} 
                      fill 
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`px-2 py-0.5 text-xs rounded ${
                      theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {module.category}
                    </span>
                    {module.complexity && (
                      <span className={`px-2 py-0.5 text-xs rounded ${
                        module.complexity === 'beginner'
                          ? theme === 'dark' ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
                          : module.complexity === 'intermediate'
                          ? theme === 'dark' ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'
                          : theme === 'dark' ? 'bg-purple-900 text-purple-300' : 'bg-purple-100 text-purple-800'
                      }`}>
                        {module.complexity}
                      </span>
                    )}
                    {module.status && module.status !== 'active' && (
                      <span className={`px-2 py-0.5 text-xs rounded ${
                        module.status === 'draft'
                          ? theme === 'dark' ? 'bg-orange-900 text-orange-300' : 'bg-orange-100 text-orange-800'
                          : theme === 'dark' ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800'
                      }`}>
                        {module.status}
                      </span>
                    )}
                  </div>
                  
                  <h3 className={`text-lg font-semibold mb-2 group-hover:text-blue-500 transition-colors ${getTextColor()}`}>
                    {module.title}
                  </h3>
                  
                  {module.summary && (
                    <p className={`mb-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {module.summary.length > 120 ? `${module.summary.substring(0, 120)}...` : module.summary}
                    </p>
                  )}
                  
                  <div className="flex justify-between mt-4">
                    <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {new Date(module.last_updated).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                    
                    {module.estimatedReadTime && (
                      <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {module.estimatedReadTime}
                      </div>
                    )}
                  </div>
                  
                  {module.agent_author && (
                    <div className={`mt-3 text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                      Author: {module.agent_author}
                    </div>
                  )}
                </div>
              </Card>
            </Link>
          ))}
        </div>
        
        {/* Loading indicator / Load more */}
        {visibleModules < sortedModules.length && (
          <div ref={observerTarget} className="mt-8 flex justify-center">
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <svg className={`animate-spin h-5 w-5 ${theme === 'dark' ? 'text-white' : 'text-black'}`} viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Loading...</span>
              </div>
            ) : (
              <Button
                variant={theme === 'dark' ? 'outline' : 'secondary'}
                onClick={() => setVisibleModules(prev => Math.min(prev + loadMoreIncrement, sortedModules.length))}
              >
                Load More
              </Button>
            )}
          </div>
        )}
        
        {/* No results message */}
        {sortedModules.length === 0 && (
          <div className={`text-center py-12 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            <svg
              className="w-16 h-16 mx-auto mb-4 opacity-20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            <h3 className={`text-lg font-semibold mb-2 ${getTextColor()}`}>No matching knowledge modules found</h3>
            <p>Try adjusting your search or filters</p>
            
            <Button
              variant="primary"
              className="mt-4"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory(null);
                setSelectedTag(null);
                setSortBy('newest');
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default KnowledgeGrid;