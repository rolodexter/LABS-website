import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import KnowledgeCard from '@/components/KnowledgeCard';
import { getAllContent, ContentItem } from '@/lib/content';
import { motion } from 'framer-motion';

interface SearchProps {
  allContent: ContentItem[];
}

// Get static props to load content at build time
export const getStaticProps: GetStaticProps = async () => {
  try {
    const content = await getAllContent('knowledge');
    console.log(`Loaded ${content.length} content items for search page`);
    
    return {
      props: {
        allContent: content || [],
      },
      // Revalidate every hour
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error loading content for search page:', error);
    return {
      props: {
        allContent: [],
      },
      revalidate: 3600,
    };
  }
};

export default function Search({ allContent }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    
    setIsLoading(true);
    
    // Simple search implementation
    const query = searchQuery.toLowerCase();
    const results = allContent.filter(item => {
      try {
        const title = (item.meta?.title || '').toLowerCase();
        const content = (item.content || '').toLowerCase();
        const summary = (item.meta?.summary || '').toLowerCase();
        const tags = (item.meta?.tags || []).join(' ').toLowerCase();
        
        return (
          title.includes(query) || 
          content.includes(query) || 
          summary.includes(query) || 
          tags.includes(query)
        );
      } catch (error) {
        console.error('Error processing item:', error);
        return false;
      }
    });
    
    setSearchResults(results);
    setIsLoading(false);
  };


  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Head>
        <title>Search | rolodexterLABS</title>
        <meta name="description" content="Search the rolodexterLABS knowledge base" />
      </Head>

      <Header />

      <main className="flex-grow container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8">Search</h1>
          
          <form onSubmit={handleSearch} className="mb-12">
            <div className="flex border-b border-black">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for knowledge, products, services..."
                className="w-full py-3 px-4 focus:outline-none text-lg"
                aria-label="Search query"
              />
              <button 
                type="submit" 
                className="px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors"
                aria-label="Search"
              >
                Search
              </button>
            </div>
          </form>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-xl">Searching...</p>
            </div>
          ) : searchQuery && searchResults.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl mb-4">No results found for "{searchQuery}"</p>
              <p className="text-gray-600">Try different keywords or browse our knowledge base</p>
              <Link href="/knowledge" className="mt-6 inline-block px-6 py-3 border border-black text-black hover:bg-black hover:text-white transition-colors">
                Browse Knowledge
              </Link>
            </div>
          ) : searchResults.length > 0 ? (
            <div>
              <p className="mb-6 text-lg">{searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found for "{searchQuery}"</p>
              <div className="grid grid-cols-1 gap-8">
                {searchResults.map((item) => (
                  <KnowledgeCard 
                    key={item.meta.slug}
                    title={item.meta.title}
                    slug={item.meta.slug}
                    category={item.meta.category}
                    summary={item.meta.summary}
                    excerpt={item.excerpt || ''}
                    lastUpdated={item.meta.last_updated}
                    readingTime={item.readingTime}
                    tags={item.meta.tags || []}
                    complexity={item.meta.complexity}
                    agent_author={item.meta.agent_author}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
