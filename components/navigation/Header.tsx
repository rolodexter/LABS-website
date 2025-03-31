import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const menuItems = [
  {
    label: 'Products',
    submenu: [
      { label: 'rolodexterVS', href: '/products/rolodexter-vs' },
      { label: 'rolodexterGPT', href: '/products/rolodexter-gpt' },
    ],
  },
  {
    label: 'Services',
    submenu: [
      { label: 'Implementation', href: '/services/implementation' },
      { label: 'Consulting', href: '/services/consulting' },
      { label: 'Training', href: '/services/training' },
    ],
  },
  {
    label: 'Company',
    submenu: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

function CustomLink({ children, href, ...props }: any) {
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}

export default function Header() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  return (
    <header className="fixed w-full bg-white border-b border-gray-100 z-50">
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <CustomLink href="/" className="text-xl font-bold">
            rolodexterLABS
          </CustomLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div key={item.label} className="relative group">
                <button 
                  className="flex items-center py-2 font-medium text-black hover:text-gray-600 transition-colors"
                  onMouseEnter={() => setActiveSubmenu(item.label)}
                  onMouseLeave={() => setActiveSubmenu(null)}
                >
                  {item.label}
                  <svg 
                    className={`w-4 h-4 ml-1 transform transition-transform ${
                      activeSubmenu === item.label ? 'rotate-180' : ''
                    }`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 9l-7 7-7-7" 
                    />
                  </svg>
                </button>

                <div 
                  className={`absolute left-0 mt-2 w-48 bg-white border border-gray-100 rounded-md shadow-lg transition-all duration-200 ${
                    activeSubmenu === item.label 
                      ? 'opacity-100 visible translate-y-0' 
                      : 'opacity-0 invisible -translate-y-2'
                  }`}
                  onMouseEnter={() => setActiveSubmenu(item.label)}
                  onMouseLeave={() => setActiveSubmenu(null)}
                >
                  {item.submenu.map((subitem) => (
                    <Link
                      key={subitem.label}
                      href={subitem.href}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 transition-colors"
                    >
                      {subitem.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <Link
              href="/login"
              className="px-4 py-2 text-black border border-black rounded-md hover:bg-black hover:text-white transition-colors"
            >
              Log In
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden transition-all duration-200 ${
            mobileMenuOpen 
              ? 'max-h-screen opacity-100 visible' 
              : 'max-h-0 opacity-0 invisible'
          }`}
        >
          <div className="pt-4 pb-3 space-y-4">
            {menuItems.map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="font-medium">{item.label}</div>
                <div className="pl-4 space-y-2">
                  {item.submenu.map((subitem) => (
                    <Link
                      key={subitem.label}
                      href={subitem.href}
                      className="block py-2 text-sm text-gray-600 hover:text-black"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {subitem.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <Link
              href="/login"
              className="block px-4 py-2 text-center border border-black rounded-md hover:bg-black hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Log In
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
