import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SearchBar from '../ui/SearchBar';

interface NavItem {
  label: string;
  href: string;
  subitems?: NavItem[];
}

const navItems: NavItem[] = [
  { label: 'Knowledge', href: '/knowledge' },
  { 
    label: 'Products', 
    href: '/products',
    subitems: [
      { label: 'rolodexterGPT', href: '/products/rolodextergpt' },
      { label: 'rolodexterVS', href: '/products/rolodextervs' },
      { label: 'rolodexterGIT', href: '/products/rolodextergit' },
      { label: 'rolodexterAPI', href: '/products/rolodexterapi' },
      { label: 'rolodexterINT', href: '/products/rolodexterint' },
    ]
  },
  { label: 'Research', href: '/research' },
  { label: 'About', href: '/about' },
];

const Header: React.FC = () => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="font-serif text-2xl font-bold">
            rolodexterLABS
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                {item.subitems ? (
                  <>
                    <button 
                      className={`flex items-center font-medium ${
                        router.pathname.startsWith(item.href) ? 'text-black' : 'text-gray-600 hover:text-black'
                      }`}
                      onClick={() => toggleDropdown(item.label)}
                    >
                      {item.label}
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4 ml-1" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md overflow-hidden z-10 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-150">
                      {item.subitems.map((subitem) => (
                        <Link 
                          key={subitem.label} 
                          href={subitem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {subitem.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link 
                    href={item.href}
                    className={`font-medium ${
                      router.pathname.startsWith(item.href) ? 'text-black' : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:block w-64">
            <SearchBar />
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="container mx-auto px-4 py-3">
            <div className="mb-4">
              <SearchBar />
            </div>
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.subitems ? (
                    <>
                      <button 
                        className="flex items-center justify-between w-full font-medium text-gray-600"
                        onClick={() => toggleDropdown(item.label)}
                      >
                        {item.label}
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`h-4 w-4 transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`}
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {activeDropdown === item.label && (
                        <div className="mt-2 ml-4 flex flex-col space-y-2">
                          {item.subitems.map((subitem) => (
                            <Link 
                              key={subitem.label} 
                              href={subitem.href}
                              className="text-sm text-gray-600 hover:text-black"
                            >
                              {subitem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link 
                      href={item.href}
                      className={`font-medium ${
                        router.pathname.startsWith(item.href) ? 'text-black' : 'text-gray-600 hover:text-black'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
