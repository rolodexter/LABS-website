import { ReactElement, useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import type { NextPageWithLayout } from '@/types/next';
import researchIndex from '@/data/research-index.json';

// Group research by category
type ResearchItem = {
  slug: string;
  title: string;
  category: string;
  topic: string;
  date: string;
  status: string;
  summary: string;
};

interface GroupedResearch {
  [key: string]: ResearchItem[];
}

const Research: NextPageWithLayout = () => {
  const router = useRouter();
  const { topic, category } = router.query;
  const [filteredResearch, setFilteredResearch] = useState<ResearchItem[]>([]);
  const [activeFilter, setActiveFilter] = useState<{ type: string; value: string } | null>(null);

  useEffect(() => {
    // Apply filters based on URL params
    let filtered = [...researchIndex];
    
    if (topic && typeof topic === 'string') {
      filtered = filtered.filter(item => item.topic === decodeURIComponent(topic));
      setActiveFilter({ type: 'topic', value: decodeURIComponent(topic) });
    } else if (category && typeof category === 'string') {
      filtered = filtered.filter(item => item.category === decodeURIComponent(category));
      setActiveFilter({ type: 'category', value: decodeURIComponent(category) });
    } else {
      setActiveFilter(null);
    }
    
    setFilteredResearch(filtered);
  }, [topic, category, router.query]);
  
  // Group research by category
  const researchByCategory: GroupedResearch = filteredResearch.reduce((acc: GroupedResearch, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  // Sort categories alphabetically
  const categories = Object.keys(researchByCategory).sort();
  
  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <Head>
        <title>{activeFilter ? `${activeFilter.value} Research | rolodexterLABS` : 'Research | rolodexterLABS'}</title>
        <meta name="description" content="Scientific research in networked intelligence systems, computational biology, and knowledge manufacturing." />
      </Head>
      
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Research at rolodexterLABS</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
          Scientific explorations in networked intelligence, computational biology, and knowledge systems
        </p>
      </div>

      <div className="mb-12">
        <p className="text-lg text-gray-800 dark:text-gray-200 max-w-3xl mx-auto text-center">
          Our research initiatives focus on executive-functioning intelligence tools, manufacturing knowledge at scale, and 
          the strategic use of frontier AI for scientific discovery.
        </p>
      </div>

      {/* Active filter indicator */}
      {activeFilter && (
        <div className="mb-12">
          <div className="flex items-center justify-center gap-4">
            <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg flex items-center">
              <span className="text-sm font-medium mr-2">
                Filtering by {activeFilter.type}:
              </span>
              <span className="text-sm font-bold">
                {activeFilter.value}
              </span>
              <button 
                onClick={() => router.push('/research')} 
                className="ml-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label="Clear filter"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {categories.map((category) => (
        <div key={category} className="mb-16">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">{category}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {researchByCategory[category].map((item) => (
              <div key={item.slug} className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">
                    <Link href={`/research/${item.slug}`} className="hover:underline">
                      {item.title}
                    </Link>
                  </h3>
                  <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-1 px-2 rounded">
                    {item.topic}
                  </span>
                </div>
                
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {new Date(item.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {item.summary || 'No summary available.'}
                </p>
                
                <Link 
                  href={`/research/${item.slug}`}
                  className="text-sm font-medium hover:underline inline-flex items-center"
                >
                  Read more
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// Add custom layout function for the research page to prevent duplicate footer
Research.getLayout = function getLayout(page: ReactElement) {
  return page;
};

export default Research;
