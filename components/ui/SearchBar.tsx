import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  slug: string;
}

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Mock search function - would be replaced with actual API call
  const performSearch = async (term: string) => {
    if (!term.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Mock results - would be replaced with actual search results
    const mockResults: SearchResult[] = [
      {
        id: '1',
        title: 'Introduction to rolodexterGPT',
        excerpt: 'Learn about the key features and capabilities of rolodexterGPT, our knowledge strategist AI.',
        category: 'products',
        slug: '/products/rolodextergpt/introduction'
      },
      {
        id: '2',
        title: 'Knowledge Graph Implementation',
        excerpt: 'Technical details on how we implemented the knowledge graph visualization system.',
        category: 'research',
        slug: '/research/knowledge-graph-implementation'
      },
      {
        id: '3',
        title: 'Collaborative Governance Model',
        excerpt: 'Understanding the collaborative governance approach in the rolodexter ecosystem.',
        category: 'documentation',
        slug: '/documentation/governance-model'
      }
    ].filter(item => 
      item.title.toLowerCase().includes(term.toLowerCase()) || 
      item.excerpt.toLowerCase().includes(term.toLowerCase())
    );
    
    setResults(mockResults);
    setIsSearching(false);
  };

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.trim()) {
      performSearch(value);
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
      setShowResults(false);
    }
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg 
            className="w-5 h-5 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </form>

      {/* Search Results Dropdown */}
      {showResults && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-md shadow-lg max-h-96 overflow-y-auto">
          {isSearching ? (
            <div className="p-4 text-center text-gray-500">
              <div className="animate-spin inline-block w-5 h-5 border-2 border-gray-300 border-t-black rounded-full mr-2"></div>
              Searching...
            </div>
          ) : results.length > 0 ? (
            <ul>
              {results.map((result) => (
                <li key={result.id} className="border-b border-gray-100 last:border-b-0">
                  <Link 
                    href={result.slug}
                    className="block p-4 hover:bg-gray-50"
                    onClick={() => setShowResults(false)}
                  >
                    <div className="flex items-start">
                      <div className="flex-1">
                        <h4 className="font-medium text-black">{result.title}</h4>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{result.excerpt}</p>
                        <span className="inline-block mt-2 text-xs uppercase tracking-wider text-gray-500">
                          {result.category}
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
              <li className="p-2 text-center border-t border-gray-100">
                <Link 
                  href={`/search?q=${encodeURIComponent(searchTerm)}`}
                  className="text-sm text-gray-600 hover:text-black hover:underline"
                  onClick={() => setShowResults(false)}
                >
                  View all results
                </Link>
              </li>
            </ul>
          ) : searchTerm.trim() ? (
            <div className="p-4 text-center text-gray-500">
              No results found for "{searchTerm}"
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
