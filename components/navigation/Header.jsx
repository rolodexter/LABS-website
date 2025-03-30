import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/router';
import { useTheme } from '../ThemeProvider';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const { authenticated, user, logout } = usePrivy();
  const router = useRouter();
  const { theme, toggleTheme, mounted } = useTheme();

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

  // Handle dropdown toggling
  const toggleDropdown = (menu) => {
    if (activeDropdown === menu) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(menu);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    await logout();
    router.push('/');
  };
  
  // Get theme icon based on current theme
  const getThemeIcon = () => {
    if (theme === 'dark') {
      // Sun icon for dark mode (switch to light)
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>
      );
    } else {
      // Moon icon for light mode (switch to dark)
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
        </svg>
      );
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 dark:bg-black/90 shadow-lg' : 'bg-white dark:bg-black'
      }`}
      style={{ display: 'block' }} // Explicitly ensure display is set
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-black dark:text-white text-xl font-bold">rolodexterLABS</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {/* Services Dropdown */}
            <div className="relative group">
              <button 
                className="text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 py-2 flex items-center"
                onClick={() => toggleDropdown('services')}
              >
                Services
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              {/* Services Dropdown Menu */}
              <div className={`absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-white dark:bg-black p-2 transition-all duration-200 ${activeDropdown === 'services' ? 'block' : 'hidden'} group-hover:block`}>
                <div className="py-1 grid gap-2">
                  <div>
                    <h3 className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 font-medium">Intelligence</h3>
                    <Link href="/services/intelligence/executive" className="block px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md">Executive Intelligence</Link>
                    <Link href="/services/intelligence/distributed" className="block px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md">Distributed Intelligence</Link>
                  </div>
                  <div>
                    <h3 className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 font-medium">Workforces</h3>
                    <Link href="/services/workforces/scale" className="block px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md">Workforce by Scale</Link>
                    <Link href="/services/workforces/complexity" className="block px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md">Workforce by Complexity</Link>
                    <Link href="/services/workforces/scale-complexity" className="block px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md">Scale × Complexity</Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Dropdown */}
            <div className="relative group">
              <button 
                className="text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 py-2 flex items-center"
                onClick={() => toggleDropdown('products')}
              >
                Products
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              {/* Products Dropdown Menu */}
              <div className={`absolute left-0 mt-2 w-72 rounded-md shadow-lg bg-white dark:bg-black p-2 transition-all duration-200 ${activeDropdown === 'products' ? 'block' : 'hidden'} group-hover:block`}>
                <div className="py-1 grid gap-2">
                  <Link href="/products/models" className="block px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md">Models</Link>
                  
                  <div>
                    <h3 className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 font-medium">Applications</h3>
                    <Link href="/products/applications/rolodextervs" className="block px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md">rolodexterVS</Link>
                    <Link href="/products/applications/rolodextergpt" className="block px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md">rolodexterGPT</Link>
                    
                    <div className="px-4 py-1">
                      <h4 className="text-sm text-gray-600 dark:text-gray-400 mb-1">Economics</h4>
                      <Link href="/products/applications/economics/kernels" className="block px-4 py-1 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md">Economic Kernels</Link>
                      <Link href="/products/applications/economics/treasury" className="block px-4 py-1 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md">Treasury Operations</Link>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 font-medium">LARPs</h3>
                    <div className="px-4 py-1">
                      <h4 className="text-sm text-gray-600 dark:text-gray-400 mb-1">rolodexterLARP</h4>
                      <Link href="/products/larps/rolodexterlarp/social" className="block px-4 py-1 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md">Social Media</Link>
                      <Link href="/products/larps/rolodexterlarp/args" className="block px-4 py-1 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md">ARGs</Link>
                      <Link href="/products/larps/rolodexterlarp/xr" className="block px-4 py-1 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md">XR Environments</Link>
                      <Link href="/products/larps/rolodexterlarp/protagonists" className="block px-4 py-1 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md">Protagonists</Link>
                    </div>
                    <div className="px-4 py-1">
                      <h4 className="text-sm text-gray-600 dark:text-gray-400 mb-1">Literary Works</h4>
                      <Link href="/products/larps/literary/fiction" className="block px-4 py-1 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md">Novels and Fiction</Link>
                      <Link href="/products/larps/literary/textbooks" className="block px-4 py-1 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md">Textbooks and References</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Research Dropdown */}
            <div className="relative group">
              <button 
                className="text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 py-2 flex items-center"
                onClick={() => toggleDropdown('research')}
              >
                Research
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              {/* Research Dropdown Menu */}
              <div className={`absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-black p-2 transition-all duration-200 ${activeDropdown === 'research' ? 'block' : 'hidden'} group-hover:block`}>
                <div className="py-1">
                  <div>
                    <h3 className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 font-medium">Discoveries</h3>
                    <Link href="/research/discoveries/mining" className="block px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md">Mining Discoveries</Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Companies Dropdown */}
            <div className="relative group">
              <button 
                className="text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 py-2 flex items-center"
                onClick={() => toggleDropdown('companies')}
              >
                Companies
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              {/* Companies Dropdown Menu */}
              <div className={`absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-black p-2 transition-all duration-200 ${activeDropdown === 'companies' ? 'block' : 'hidden'} group-hover:block`}>
                <div className="py-1">
                  <Link href="/companies/rolodexterlarp" className="block px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md">rolodexterLARP</Link>
                  <Link href="/companies/rolodexterlabs" className="block px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md">rolodexterLABS</Link>
                  <Link href="/companies/rolodexter" className="block px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md">rolodexter</Link>
                </div>
              </div>
            </div>

            <Link href="/community" className="text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 py-2">
              Community
            </Link>
          </nav>

          {/* Theme Toggle & Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Theme Toggle Button */}
            {mounted && (
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {getThemeIcon()}
              </button>
            )}
            
            {/* Auth Button */}
            {authenticated ? (
              <div className="flex items-center">
                <Link href="/dashboard" className="text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 mr-4">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-white dark:text-black bg-black dark:bg-white rounded-md hover:bg-gray-900 dark:hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                href="/login" 
                className="px-4 py-2 text-sm font-medium text-white dark:text-black bg-black dark:bg-white rounded-md hover:bg-gray-900 dark:hover:bg-gray-100"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4">
            {/* Theme Toggle Button (Mobile) */}
            {mounted && (
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {getThemeIcon()}
              </button>
            )}
            
            <button 
              className="text-black dark:text-white p-2 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
      <div className={`lg:hidden ${mobileMenuOpen ? 'block' : 'hidden'} bg-white dark:bg-black`}>
        <div className="px-2 pt-2 pb-3 space-y-1 divide-y divide-gray-200 dark:divide-gray-800">
          {/* Mobile Dropdowns */}
          {/* Services */}
          <div>
            <button
              className="w-full flex justify-between items-center px-4 py-2 text-black dark:text-white"
              onClick={() => toggleDropdown('mobile-services')}
            >
              Services
              <svg className={`h-4 w-4 transition-transform ${activeDropdown === 'mobile-services' ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            {activeDropdown === 'mobile-services' && (
              <div className="px-4 py-2 space-y-2">
                <div className="mb-2">
                  <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-1">Intelligence</h3>
                  <Link href="/services/intelligence/executive" className="block px-4 py-1 text-sm text-black dark:text-white">Executive Intelligence</Link>
                  <Link href="/services/intelligence/distributed" className="block px-4 py-1 text-sm text-black dark:text-white">Distributed Intelligence</Link>
                </div>
                <div>
                  <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-1">Workforces</h3>
                  <Link href="/services/workforces/scale" className="block px-4 py-1 text-sm text-black dark:text-white">Workforce by Scale</Link>
                  <Link href="/services/workforces/complexity" className="block px-4 py-1 text-sm text-black dark:text-white">Workforce by Complexity</Link>
                  <Link href="/services/workforces/scale-complexity" className="block px-4 py-1 text-sm text-black dark:text-white">Scale × Complexity</Link>
                </div>
              </div>
            )}
          </div>

          {/* Products */}
          <div>
            <button
              className="w-full flex justify-between items-center px-4 py-2 text-black dark:text-white"
              onClick={() => toggleDropdown('mobile-products')}
            >
              Products
              <svg className={`h-4 w-4 transition-transform ${activeDropdown === 'mobile-products' ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            {activeDropdown === 'mobile-products' && (
              <div className="px-4 py-2 space-y-2">
                <Link href="/products/models" className="block px-4 py-1 text-sm text-black dark:text-white">Models</Link>
                
                <div className="mb-2">
                  <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-1">Applications</h3>
                  <Link href="/products/applications/rolodextervs" className="block px-4 py-1 text-sm text-black dark:text-white">rolodexterVS</Link>
                  <Link href="/products/applications/rolodextergpt" className="block px-4 py-1 text-sm text-black dark:text-white">rolodexterGPT</Link>
                  
                  <div className="pl-4 mt-1">
                    <h4 className="text-sm text-gray-600 dark:text-gray-400">Economics</h4>
                    <Link href="/products/applications/economics/kernels" className="block px-4 py-1 text-sm text-black dark:text-white">Economic Kernels</Link>
                    <Link href="/products/applications/economics/treasury" className="block px-4 py-1 text-sm text-black dark:text-white">Treasury Operations</Link>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-1">LARPs</h3>
                  <div className="pl-4 mt-1">
                    <h4 className="text-sm text-gray-600 dark:text-gray-400">rolodexterLARP</h4>
                    <Link href="/products/larps/rolodexterlarp/social" className="block px-4 py-1 text-sm text-black dark:text-white">Social Media</Link>
                    <Link href="/products/larps/rolodexterlarp/args" className="block px-4 py-1 text-sm text-black dark:text-white">ARGs</Link>
                    <Link href="/products/larps/rolodexterlarp/xr" className="block px-4 py-1 text-sm text-black dark:text-white">XR Environments</Link>
                    <Link href="/products/larps/rolodexterlarp/protagonists" className="block px-4 py-1 text-sm text-black dark:text-white">Protagonists</Link>
                  </div>
                  <div className="pl-4 mt-1">
                    <h4 className="text-sm text-gray-600 dark:text-gray-400">Literary Works</h4>
                    <Link href="/products/larps/literary/fiction" className="block px-4 py-1 text-sm text-black dark:text-white">Novels and Fiction</Link>
                    <Link href="/products/larps/literary/textbooks" className="block px-4 py-1 text-sm text-black dark:text-white">Textbooks and References</Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Research */}
          <div>
            <button
              className="w-full flex justify-between items-center px-4 py-2 text-black dark:text-white"
              onClick={() => toggleDropdown('mobile-research')}
            >
              Research
              <svg className={`h-4 w-4 transition-transform ${activeDropdown === 'mobile-research' ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            {activeDropdown === 'mobile-research' && (
              <div className="px-4 py-2">
                <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-1">Discoveries</h3>
                <Link href="/research/discoveries/mining" className="block px-4 py-1 text-sm text-black dark:text-white">Mining Discoveries</Link>
              </div>
            )}
          </div>

          {/* Companies */}
          <div>
            <button
              className="w-full flex justify-between items-center px-4 py-2 text-black dark:text-white"
              onClick={() => toggleDropdown('mobile-companies')}
            >
              Companies
              <svg className={`h-4 w-4 transition-transform ${activeDropdown === 'mobile-companies' ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            {activeDropdown === 'mobile-companies' && (
              <div className="px-4 py-2">
                <Link href="/companies/rolodexterlarp" className="block px-4 py-1 text-sm text-black dark:text-white">rolodexterLARP</Link>
                <Link href="/companies/rolodexterlabs" className="block px-4 py-1 text-sm text-black dark:text-white">rolodexterLABS</Link>
                <Link href="/companies/rolodexter" className="block px-4 py-1 text-sm text-black dark:text-white">rolodexter</Link>
              </div>
            )}
          </div>

          <div className="pt-2">
            <Link href="/community" className="block px-4 py-2 text-black dark:text-white">
              Community
            </Link>
          </div>

          {/* Mobile Auth */}
          <div className="pt-2">
            {authenticated ? (
              <div className="space-y-2 pt-2">
                <Link href="/dashboard" className="block px-4 py-2 text-black dark:text-white">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-black dark:text-white"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login" className="block px-4 py-2 text-black dark:text-white">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;