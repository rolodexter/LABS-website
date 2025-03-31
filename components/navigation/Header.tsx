import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Track page scroll for transparent/solid header transition
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [router.asPath]);

  const menuItems = [
    { 
      label: 'Products', 
      href: '/products',
      dropdown: [
        { label: 'Data Processing', href: '/products/data-processing' },
        { label: 'AI Solutions', href: '/products/ai-solutions' },
        { label: 'Analytics Tools', href: '/products/analytics' }
      ] 
    },
    { label: 'Services', href: '/services' },
    { label: 'Research', href: '/research' },
    { label: 'Companies', href: '/companies' },
    { label: 'Community', href: '/community' },
  ];

  const isActive = (path: string) => {
    return router.asPath === path || router.asPath.startsWith(`${path}/`);
  };

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
    } border-b border-gray-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <Image 
                src={scrolled ? "/logos/inline-black.png" : "/logos/inline-black.png"} 
                alt="rolodexterLABS" 
                width={180} 
                height={32} 
                className="h-8 w-auto transition-opacity duration-300" 
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center">
            <div className="flex space-x-1 lg:space-x-4">
              {menuItems.map((item) => (
                <div key={item.label} className="relative group">
                  {item.dropdown ? (
                    <button 
                      onClick={() => toggleDropdown(item.label)}
                      className={`flex items-center text-sm font-medium px-3 py-2 transition-colors duration-200 ${
                        isActive(item.href) 
                          ? 'text-black border-b-2 border-black' 
                          : 'text-gray-700 hover:text-black border-b-2 border-transparent hover:border-gray-300'
                      }`}
                    >
                      {item.label}
                      <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`block text-sm font-medium px-3 py-2 transition-colors duration-200 ${
                        isActive(item.href) 
                          ? 'text-black border-b-2 border-black' 
                          : 'text-gray-700 hover:text-black border-b-2 border-transparent hover:border-gray-300'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                  
                  {/* Dropdown menu */}
                  {item.dropdown && (
                    <div 
                      className={`absolute left-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 z-10 ${
                        activeDropdown === item.label ? 'opacity-100 translate-y-0' : 'opacity-0 invisible translate-y-1 pointer-events-none'
                      } md:group-hover:opacity-100 md:group-hover:visible md:group-hover:translate-y-0 md:group-hover:pointer-events-auto`}
                    >
                      <div className="py-1" role="menu" aria-orientation="vertical">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            className={`block px-4 py-2 text-sm ${
                              isActive(subItem.href)
                                ? 'bg-gray-100 text-black'
                                : 'text-gray-700 hover:bg-gray-50 hover:text-black'
                            }`}
                            role="menuitem"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="ml-6 lg:ml-8 flex items-center space-x-3">
              <Link 
                href="/dashboard" 
                className="text-gray-700 hover:text-black px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Dashboard
              </Link>
              <Link 
                href="/login" 
                className="inline-flex items-center justify-center px-4 py-2 border border-black text-sm font-medium rounded-md text-black bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                Login
              </Link>
              <Link 
                href="/signup" 
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 transition-colors duration-200"
              >
                Sign Up
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
        className={`md:hidden transition-all duration-300 ease-in-out transform ${
          isMenuOpen ? 'opacity-100 scale-y-100 origin-top' : 'opacity-0 scale-y-95 origin-top h-0 overflow-hidden'
        }`}
        aria-expanded={isMenuOpen}
      >
        <div className="px-2 pt-2 pb-3 bg-white border-t border-gray-200 shadow-lg">
          {menuItems.map((item) => (
            <div key={item.label}>
              {item.dropdown ? (
                <div>
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    className={`w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium ${
                      isActive(item.href) ? 'bg-gray-50 text-black' : 'text-gray-700 hover:bg-gray-50 hover:text-black'
                    }`}
                  >
                    {item.label}
                    <svg 
                      className={`ml-1 h-5 w-5 transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  <div className={`mt-1 ml-4 border-l-2 border-gray-200 pl-4 space-y-1 ${activeDropdown === item.label ? 'block' : 'hidden'}`}>
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        className={`block px-3 py-2 rounded-md text-sm font-medium ${
                          isActive(subItem.href) ? 'bg-gray-50 text-black' : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive(item.href) ? 'bg-gray-50 text-black' : 'text-gray-700 hover:bg-gray-50 hover:text-black'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
          <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
            <Link
              href="/dashboard"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-black"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/login"
              className="block w-full text-center px-3 py-2 rounded-md text-base font-medium text-black border border-black hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="block w-full text-center mt-2 px-3 py-2 rounded-md text-base font-medium text-white bg-black hover:bg-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
