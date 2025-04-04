import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-black">
          rolodexter
        </Link>
        
        <nav className="hidden md:flex space-x-8">
          <Link href="/knowledge" className="text-gray-700 hover:text-black transition-colors">
            Knowledge
          </Link>
          <Link href="/products" className="text-gray-700 hover:text-black transition-colors">
            Products
          </Link>
          <Link href="/services" className="text-gray-700 hover:text-black transition-colors">
            Services
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-black transition-colors">
            About
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Link href="/search" className="text-gray-700 hover:text-black">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
          </Link>
          
          <button className="md:hidden text-gray-700 hover:text-black" aria-label="Menu">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
