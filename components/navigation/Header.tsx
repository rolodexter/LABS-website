import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle scroll for header appearance changes
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    // Set mounted state to enable client-side effects
    setMounted(true);
    window.addEventListener('scroll', handleScroll);
    // Initial check for page loaded with scroll position
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    if (isMenuOpen) setIsMenuOpen(false);
  }, [router.asPath, isMenuOpen]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, []);

  // Anthropic-style menu structure
  const menuItems = [
    { 
      label: 'Products', 
      href: '/products',
      subMenu: [
        { label: 'Data Processing', href: '/products/data-processing', description: 'Advanced ETL solutions for enterprise data' },
        { label: 'AI Solutions', href: '/products/ai-solutions', description: 'Custom machine learning models and tools' },
        { label: 'Analytics Tools', href: '/products/analytics', description: 'Business intelligence and data visualization' }
      ] 
    },
    { 
      label: 'Services', 
      href: '/services',
      subMenu: [
        { label: 'Consulting', href: '/services/consulting', description: 'Strategic AI implementation advice' },
        { label: 'Implementation', href: '/services/implementation', description: 'Full-service rollout and integration' },
        { label: 'Training', href: '/services/training', description: 'Team development and upskilling programs' }
      ]
    },
    { 
      label: 'Research', 
      href: '/research',
      subMenu: [
        { label: 'Publications', href: '/research/publications', description: 'Academic and industry papers' },
        { label: 'Projects', href: '/research/projects', description: 'Ongoing research initiatives' },
        { label: 'Collaborations', href: '/research/collaborations', description: 'Academic and industry partnerships' }
      ]
    },
    { 
      label: 'Companies', 
      href: '/companies',
      subMenu: [
        { label: 'Portfolio', href: '/companies/portfolio', description: 'Companies in our ecosystem' },
        { label: 'Partners', href: '/companies/partners', description: 'Strategic business partners' },
        { label: 'Join Us', href: '/companies/join', description: 'Become part of our network' }
      ]
    },
    { 
      label: 'Community', 
      href: '/community',
      subMenu: [
        { label: 'Events', href: '/community/events', description: 'Conferences and meetups' },
        { label: 'Forums', href: '/community/forums', description: 'Discussion and support communities' },
        { label: 'Resources', href: '/community/resources', description: 'Education materials and tools' }
      ]
    },
  ];

  const isActive = useCallback((path: string) => {
    return router.asPath === path || router.asPath.startsWith(`${path}/`);
  }, [router.asPath]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-sm' : 'bg-white/95 backdrop-blur-sm'
    }`}>
      <div 
        aria-hidden="true" 
        className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent transition-opacity duration-300 ${
          scrolled ? 'opacity-0' : 'opacity-100'
        }`}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 rounded-md" aria-label="rolodexterLABS - Home">
              <Image 
                src={mounted ? "/logos/inline_black.png" : "/logos/inline_black.png"} 
                alt="rolodexterLABS" 
                width={180} 
                height={32} 
                className="h-8 w-auto transition-all duration-300" 
                priority
              />
            </Link>
          </div>

          {/* Desktop Menu - Anthropic Style */}
          <nav className="hidden md:flex md:items-center">
            <ul className="flex space-x-1 lg:space-x-6 items-center">
              {menuItems.map((item) => (
                <li 
                  key={item.label} 
                  className={`group relative px-1 py-2 ${
                    isActive(item.href) ? 'text-black' : 'text-gray-700 hover:text-black'
                  }`}
                >
                  {/* Main Navigation Item */}
                  <Link 
                    href={item.href}
                    className="text-sm font-medium px-2 py-1 rounded-md hover:bg-gray-50 transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                  >
                    {item.label}
                  </Link>

                  {/* Anthropic-style submenu */}
                  {item.subMenu && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 pt-2 w-60 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
                      <div className="bg-white rounded-lg shadow-lg ring-1 ring-black/5 overflow-hidden">
                        <div className="py-2">
                          {item.subMenu.map((subItem) => (
                            <Link
                              key={subItem.label}
                              href={subItem.href}
                              className={`block px-4 py-3 hover:bg-gray-50 transition-colors duration-150 ${
                                isActive(subItem.href) ? 'bg-gray-50 text-black' : 'text-gray-800'
                              }`}
                            >
                              <div className="flex flex-col">
                                <span className="text-sm font-medium">
                                  {subItem.label}
                                </span>
                                {subItem.description && (
                                  <span className="text-xs text-gray-500 mt-0.5 font-normal">
                                    {subItem.description}
                                  </span>
                                )}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                      {/* Caret/arrow pointer - Anthropic style */}
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 rotate-45 bg-white border-t border-l border-black/5"></div>
                    </div>
                  )}
                </li>
              ))}

              {/* Authentication items */}
              <li className="ml-3">
                <div className="h-4 w-px bg-gray-200"></div>
              </li>
              <li className="ml-4">
                <Link 
                  href="/dashboard" 
                  className="text-sm font-medium px-3 py-2 text-gray-700 hover:text-black transition-colors duration-150"
                >
                  Dashboard
                </Link>
              </li>
              <li className="ml-3">
                <Link 
                  href="/login" 
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md text-black bg-transparent hover:bg-gray-50 border border-gray-300 hover:border-black transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black"
                >
                  Login
                </Link>
              </li>
              <li className="ml-3">
                <Link 
                  href="/signup" 
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-black hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 transition-colors duration-200"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">{isMenuOpen ? 'Close main menu' : 'Open main menu'}</span>
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
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
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="px-3 pt-3 pb-4 bg-white border-t border-gray-200 shadow-lg space-y-1">
          {menuItems.map((item) => (
            <div key={item.label} className="rounded-md overflow-hidden">
              {/* Main menu item link */}
              <Link
                href={item.href}
                className={`block px-3 py-2.5 rounded-md text-base font-medium transition-colors duration-150 ${
                  isActive(item.href) ? 'bg-gray-50 text-black' : 'text-gray-700 hover:bg-gray-50 hover:text-black'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
              
              {/* Sub-menu items */}
              {item.subMenu && (
                <div className="mt-1 ml-3 border-l-2 border-gray-200 pl-3 space-y-1 py-1">
                  {item.subMenu.map((subItem) => (
                    <Link
                      key={subItem.label}
                      href={subItem.href}
                      className={`block px-3 py-2 rounded-md text-sm transition-colors duration-150 ${
                        isActive(subItem.href) ? 'bg-gray-50 text-black' : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="block font-medium">{subItem.label}</span>
                      {subItem.description && (
                        <span className="block text-xs mt-0.5 text-gray-500">
                          {subItem.description}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
            <Link
              href="/dashboard"
              className="block px-3 py-2.5 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-black transition-colors duration-150"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <div className="px-3 py-3 space-y-2">
              <Link
                href="/login"
                className="block w-full text-center px-3 py-2.5 rounded-md text-base font-medium text-black border border-gray-300 hover:border-black hover:bg-gray-50 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="block w-full text-center px-3 py-2.5 rounded-md text-base font-medium text-white bg-black hover:bg-gray-800 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
