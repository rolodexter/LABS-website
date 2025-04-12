import React from 'react';
import Link from 'next/link';

const MinimalFooter: React.FC = () => {
  return (
    <footer className="py-8 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-mono text-lg mb-4">rolodexterLA BS</h3>
            <p className="text-sm text-gray-600 mb-4">
              A minimalist platform for high-volume content publishing and knowledge management.
            </p>
          </div>
          
          <div>
            <h3 className="font-mono text-lg mb-4">Ecosystem</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/ecosystem/gpt" className="hover:underline">rolodexterGPT</Link></li>
              <li><Link href="/ecosystem/vs" className="hover:underline">rolodexterVS</Link></li>
              <li><Link href="/ecosystem/git" className="hover:underline">rolodexterGIT</Link></li>
              <li><Link href="/ecosystem/api" className="hover:underline">rolodexterAPI</Link></li>
              <li><Link href="/ecosystem/int" className="hover:underline">rolodexterINT</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-mono text-lg mb-4">Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/articles" className="hover:underline">Articles</Link></li>
              <li><Link href="/knowledge" className="hover:underline">Knowledge</Link></li>
              <li><Link href="/about" className="hover:underline">About</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-100 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} rolodexterLA BS</p>
        </div>
      </div>
    </footer>
  );
};

export default MinimalFooter;
