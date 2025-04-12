import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { LoginButton } from '@/components/auth/LoginButton';
import Image from 'next/image';

const menuItems = [
  {
    label: 'Knowledge',
    href: '/knowledge',
  },
  {
    label: 'Research',
    href: '/research',
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Products',
    href: '/products',
  },
];

export default function Header() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Format today's date in a newspaper style
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    setCurrentDate(today.toLocaleDateString('en-US', options));

    // Add scroll event listener
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`w-full bg-lab-white transition-all duration-300 z-50 ${scrolled ? 'border-b border-lab-black sticky top-0' : ''}`}>
      {/* Top bar with date and meta info */}
      <div className="border-b border-lab-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-2">
          <div className="flex justify-between items-center">
            <div className="article-meta">{currentDate}</div>
            <div className="article-meta">rolodexterLABS Daily</div>
          </div>
        </div>
      </div>
      
      {/* Main header with logo and navigation */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col items-center mb-6">
          <Link href="/" className="text-center mb-1">
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-black tracking-tight mb-0">
              rolodexter<span className="font-normal italic">LABS</span>
            </h1>
          </Link>
          <p className="font-mono text-xs text-lab-gray-600 tracking-widest uppercase">Knowledge Management & Intelligence</p>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:block border-t border-b border-lab-black py-4">
          <ul className="flex justify-center space-x-12">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link 
                  href={item.href} 
                  className={`nav-link ${router.pathname.includes(item.href) ? 'font-bold' : ''}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/search" className="nav-link" aria-label="Search">
                Search
              </Link>
            </li>
          </ul>
        </nav>
        
        {/* Mobile Navigation */}
        <nav className="md:hidden border-t border-b border-lab-black py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center text-lab-black"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <span className="font-mono text-xs uppercase tracking-wide mr-2">Menu</span>
              {mobileMenuOpen ? (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
            <LoginButton className="btn-secondary text-xs py-1 px-3" />
          </div>
          
          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="pt-4 pb-2 border-t border-lab-gray-200 mt-4">
              <ul className="space-y-4">
                {menuItems.map((item) => (
                  <li key={item.label}>
                    <Link 
                      href={item.href} 
                      className={`block nav-link ${router.pathname.includes(item.href) ? 'font-bold' : ''}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link 
                    href="/search" 
                    className="block nav-link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Search
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
