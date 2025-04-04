import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import { getAllContent, ContentItem } from '@/lib/content';

interface DocsPageProps {
  categories: {
    [key: string]: ContentItem[];
  };
  recentModules: ContentItem[];
}

export default function DocsPage({ categories, recentModules }: DocsPageProps): ReactElement {
  return (
    <>
      <Head>
        <title>Documentation | rolodexterLABS</title>
        <meta name="description" content="Browse knowledge modules and documentation for the rolodexterLABS ecosystem" />
      </Head>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Knowledge Documentation</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Browse our collection of knowledge modules, research findings, and documentation
            covering the entire rolodexterLABS ecosystem and related technologies.
          </p>
        </header>

        {/* Recent Modules */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 border-b border-gray-200 pb-2">Recent Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentModules.map((module) => (
              <Link 
                key={module.meta.slug}
                href={`/knowledge/${module.meta.slug.replace(/^\/knowledge\//, '').replace(/^knowledge\//, '').replace(/^\//, '')}`}
                className="bg-white border border-gray-200 p-6 rounded-lg hover:border-black transition-colors"
              >
                <h3 className="text-xl font-bold mb-2 line-clamp-2">{module.meta.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{module.meta.summary}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {new Date(module.meta.last_updated).toLocaleDateString()}
                  </span>
                  {module.meta.agent_author && (
                    <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                      {module.meta.agent_author}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Knowledge Categories */}
        <section>
          <h2 className="text-2xl font-bold mb-6 border-b border-gray-200 pb-2">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(categories).map(([category, modules]) => (
              <div key={category} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="border-b border-gray-200 p-6">
                  <h3 className="text-xl font-bold capitalize mb-2">{category.replace(/-/g, ' ')}</h3>
                  <p className="text-gray-600">
                    {modules.length} module{modules.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <ul className="divide-y divide-gray-100">
                  {modules.slice(0, 5).map((module) => (
                    <li key={module.meta.slug}>
                      <Link 
                        href={`/knowledge/${module.meta.slug.replace(/^\/knowledge\//, '').replace(/^knowledge\//, '').replace(/^\//, '')}`}
                        className="block p-4 hover:bg-gray-50"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{module.meta.title}</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
                {modules.length > 5 && (
                  <div className="p-4 border-t border-gray-100">
                    <Link 
                      href={`/knowledge?category=${category}`}
                      className="text-sm text-black font-medium hover:underline"
                    >
                      View all {modules.length} modules &rarr;
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Advanced search callout */}
        <section className="mt-12 bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Can't find what you're looking for?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Use our advanced search to find specific knowledge modules, research papers,
            and documentation across the entire rolodexterLABS ecosystem.
          </p>
          <Link href="/search" className="px-6 py-3 bg-white border border-black text-black font-medium rounded-md hover:bg-black hover:text-white transition-colors duration-200">
            Advanced Search
          </Link>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allContent = await getAllContent('knowledge');
  
  // Sort by last_updated in descending order
  const sortedContent = [...allContent].sort((a, b) => 
    new Date(b.meta.last_updated).getTime() - new Date(a.meta.last_updated).getTime()
  );
  
  // Get recent modules
  const recentModules = sortedContent.slice(0, 6);
  
  // Group by category
  const categories: { [key: string]: ContentItem[] } = {};
  
  allContent.forEach((item) => {
    const category = item.meta.category || 'uncategorized';
    
    if (!categories[category]) {
      categories[category] = [];
    }
    
    categories[category].push(item);
  });
  
  // Sort each category by last_updated
  Object.keys(categories).forEach((category) => {
    categories[category].sort((a, b) => 
      new Date(b.meta.last_updated).getTime() - new Date(a.meta.last_updated).getTime()
    );
  });
  
  return {
    props: {
      categories,
      recentModules,
    },
    revalidate: 60, // Revalidate every minute
  };
};