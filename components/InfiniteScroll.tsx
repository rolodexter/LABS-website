import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface InfiniteScrollProps {
  loadMore: () => Promise<boolean>; // Function to load more items, returns true if more items are available
  loading: boolean;
  hasMore: boolean;
  threshold?: number;
  children: React.ReactNode;
  className?: string;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  loadMore,
  loading,
  hasMore,
  threshold = 0.5,
  children,
  className = '',
}) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const currentLoaderRef = loaderRef.current;
    
    if (!currentLoaderRef || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !loading && !initialLoad) {
          loadMore();
        }
      },
      { threshold }
    );

    observer.observe(currentLoaderRef);
    
    // After component mounts, set initialLoad to false
    setInitialLoad(false);

    return () => {
      if (currentLoaderRef) {
        observer.unobserve(currentLoaderRef);
      }
    };
  }, [loadMore, loading, hasMore, threshold, initialLoad]);

  return (
    <div className={className}>
      {children}
      
      {hasMore && (
        <div ref={loaderRef} className="py-8 flex justify-center">
          {loading ? (
            <motion.div 
              className="w-6 h-6 border-2 border-black rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          ) : (
            <button 
              onClick={() => loadMore()} 
              className="px-4 py-2 border border-black text-sm hover:bg-black hover:text-white transition-colors"
            >
              Load More
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default InfiniteScroll;
