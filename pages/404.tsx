import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Footer from '@/components/navigation/Footer';
import servicesData from '@/data/services.json';
import productsData from '@/data/products.json';
import type { ReactElement } from 'react';

function Custom404() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  
  // Popular routes to suggest
  const popularRoutes = [
    { name: 'Workflow as a Service', path: '/service/waas' },
    { name: 'Model Development', path: '/service/model-development' },
    { name: 'Metascience', path: '/service/metascience' },
    { name: 'All Services', path: '/services' },
    { name: 'All Products', path: '/products' }
  ];
  
  // Filter suggestions based on search query
  const getSearchSuggestions = () => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    
    // Search in services and products
    const serviceResults = servicesData
      .filter(service => {
        return service.title.toLowerCase().includes(query) || 
               service.category.toLowerCase().includes(query);
      })
      .slice(0, 3)
      .map(service => ({
        title: service.title,
        path: service.path,
        type: 'Service'
      }));
      
    const productResults = productsData
      .filter(product => {
        return product.title?.toLowerCase().includes(query) || 
               product.category?.toLowerCase().includes(query);
      })
      .slice(0, 3)
      .map(product => ({
        title: product.title,
        path: product.path,
        type: 'Product'
      }));
      
    return [...serviceResults, ...productResults].slice(0, 6);
  };
  
  const suggestions = getSearchSuggestions();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Head>
        <title>404 - Path Not Found | rolodexterLABS</title>
        <meta name="description" content="We build systems, not dead ends. Let's get you back on track." />
      </Head>

      {/* Header is rendered by Layout in _app.tsx */}

      <main className="flex-grow container mx-auto px-4 py-12">
        <motion.div 
          className="flex flex-col items-center justify-center text-center py-14 md:py-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-6xl font-bold mb-6">404</h1>
          
          <h2 className="text-2xl font-semibold mb-8">
            We build systems, not dead ends.<br />
            Let's get you back on track.
          </h2>
          
          <div className="w-16 h-1 bg-gray-200 mb-10 mx-auto"></div>
          
          {/* Search */}
          <div className="w-full max-w-md mb-12">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for services, products..."
                className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:ring-1 focus:ring-black transition-colors rounded-none"
              />
              <button 
                type="submit"
                className="absolute right-0 top-0 h-full px-4 flex items-center justify-center"
                aria-label="Search"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width={18} 
                  height={18} 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth={2} 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <circle cx={11} cy={11} r={8}></circle>
                  <line x1={21} y1={21} x2={16.65} y2={16.65}></line>
                </svg>
              </button>
            </form>
            
            {/* Search suggestions */}
            {suggestions.length > 0 && (
              <div className="mt-2 border border-gray-200 bg-white absolute z-10 w-full max-w-md text-left shadow-md">
                {suggestions.map((suggestion, index) => (
                  <Link 
                    key={index}
                    href={suggestion.path}
                    className="block px-4 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                  >
                    <span className="font-medium">{suggestion.title}</span>
                    <span className="text-xs text-gray-500 ml-2">{suggestion.type}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          {/* Navigation options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full max-w-2xl">
            <Link 
              href="/services" 
              className="flex flex-col items-center p-4 border border-gray-200 hover:border-black transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="mb-2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
              <span>Services</span>
            </Link>
            <Link 
              href="/products" 
              className="flex flex-col items-center p-4 border border-gray-200 hover:border-black transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="mb-2"><rect x={2} y={7} width={20} height={14} rx={2} ry={2}></rect><path d="M16 2v4"></path><path d="M8 2v4"></path><path d="M3 10h18"></path></svg>
              <span>Products</span>
            </Link>
            <Link 
              href="/" 
              className="flex flex-col items-center p-4 border border-gray-200 hover:border-black transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="mb-2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
              <span>Home</span>
            </Link>
          </div>
          
          {/* Popular destinations */}
          <div className="w-full max-w-md">
            <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-4">Popular Destinations</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {popularRoutes.map((route, index) => (
                <Link 
                  key={index}
                  href={route.path}
                  className="px-3 py-1 border border-gray-200 text-sm hover:border-black transition-colors"
                >
                  {route.name}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}

Custom404.getLayout = function getLayout(page: ReactElement) {
  return page;
};

export default Custom404;
