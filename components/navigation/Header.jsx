import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from '../ThemeProvider';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Get the current theme icon based on the theme state
  const getThemeIcon = () => {
    if (theme === 'dark') {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>
      );
    } else {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
        </svg>
      );
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/90 shadow-lg' : 'bg-black'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-white text-xl font-bold">rolodexterLABS</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-gray-300">
              Home
            </Link>
            <Link href="/about" className="text-white hover:text-gray-300">
              About
            </Link>
            <Link href="/services" className="text-white hover:text-gray-300">
              Services
            </Link>
            <Link href="/contact" className="text-white hover:text-gray-300">
              Contact
            </Link>
          </nav>

          {/* Auth & Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full text-white hover:bg-white/10"
              aria-label="Toggle theme"
            >
              {getThemeIcon()}
            </button>
            <Link 
              href="/login" 
              className="px-4 py-2 border border-white text-white rounded-md hover:bg-white hover:text-black transition-colors"
            >
              Sign In
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full text-white hover:bg-white/10"
              aria-label="Toggle theme"
            >
              {getThemeIcon()}
            </button>
            <button 
              className="text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'} bg-black`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link href="/" className="block px-3 py-2 text-white hover:bg-white/10 rounded-md">
            Home
          </Link>
          <Link href="/about" className="block px-3 py-2 text-white hover:bg-white/10 rounded-md">
            About
          </Link>
          <Link href="/services" className="block px-3 py-2 text-white hover:bg-white/10 rounded-md">
            Services
          </Link>
          <Link href="/contact" className="block px-3 py-2 text-white hover:bg-white/10 rounded-md">
            Contact
          </Link>
          <Link href="/login" className="block px-3 py-2 text-white hover:bg-white/10 rounded-md">
            Sign In
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;