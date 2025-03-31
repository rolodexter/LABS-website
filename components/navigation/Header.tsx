import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Products', href: '/products' },
    { label: 'Services', href: '/services' },
    { label: 'Research', href: '/research' },
    { label: 'Companies', href: '/companies' },
    { label: 'Community', href: '/community' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <Image 
                src="/logos/inline-black.png" 
                alt="rolodexterLABS" 
                width={180} 
                height={32} 
                className="h-8 w-auto" 
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center">
            <div className="flex space-x-6">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-gray-700 hover:text-black px-2 py-2 text-sm font-medium transition-colors duration-200 border-b-2 border-transparent hover:border-black"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="ml-8">
              <Link 
                href="/login" 
                className="inline-flex items-center justify-center px-4 py-2 border border-black text-sm font-medium rounded-md text-black bg-white hover:bg-gray-100 transition-colors duration-200"
              >
                Login
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-black p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
        aria-expanded={isMenuOpen}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block text-gray-700 hover:bg-gray-50 hover:text-black px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/login"
            className="block w-full text-center mt-3 px-3 py-2 rounded-md text-base font-medium text-white bg-black hover:bg-gray-800"
            onClick={() => setIsMenuOpen(false)}
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
