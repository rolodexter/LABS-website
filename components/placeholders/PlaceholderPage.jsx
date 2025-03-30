import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const PlaceholderPage = ({ title, description }) => {
  const router = useRouter();
  const path = router.asPath;
  
  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-16">
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white/5 rounded-lg p-8 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">{title || 'Page Coming Soon'}</h1>
          
          <div className="mb-8 text-lg text-gray-300">
            <p className="mb-4">{description || 'This page is under construction. Check back soon for updates.'}</p>
            <p>Current path: <code className="bg-black/50 px-2 py-1 rounded">{path}</code></p>
          </div>
          
          <div className="border-t border-white/10 pt-8 mt-8">
            <h2 className="text-xl font-semibold mb-4">rolodexterLABS Navigation</h2>
            <p className="mb-4 text-gray-400">This is a placeholder page as part of the rolodexterLABS website navigation structure.</p>
            <Link href="/" className="px-4 py-2 bg-white text-black rounded hover:bg-white/90 transition-colors">
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderPage;