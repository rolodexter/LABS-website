import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { LoginButton } from '@/components/auth/LoginButton';

// Import product and service data
import productsData from '@/data/products.json';
import servicesData from '@/data/services.json';

// Define menu item types for better TypeScript support
type SubMenuItem = {
  label: string;
  href: string;
};

type MenuItem = {
  label: string;
  href?: string;
  submenu?: SubMenuItem[];
};

// Filter only stable products and services for the navigation
const stableProducts = productsData.filter(p => p.status === 'Stable');
const stableServices = servicesData.filter(s => s.status === 'Stable');

// Convert products data to submenu format
const productSubmenu: SubMenuItem[] = [
  ...stableProducts.map(product => ({ 
    label: product.title, 
    href: product.path 
  })),
  { label: 'All Products', href: '/products' },
];

// Convert services data to submenu format
const serviceSubmenu: SubMenuItem[] = [
  ...stableServices.map(service => ({ 
    label: service.title, 
    href: service.path 
  })),
  { label: 'All Services', href: '/services' },
];

const menuItems: MenuItem[] = [
  {
    label: 'Products',
    submenu: productSubmenu,
  },
  {
    label: 'Services',
    submenu: serviceSubmenu,
  },
  {
    label: 'Agents',
    href: '/agents',
  },
  {
    label: 'Company',
    submenu: [
      { label: 'About', href: '/about' },
      { label: 'Research', href: '/research' },
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveSubmenu(item.label)}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                {item.href ? (
                  <CustomLink href={item.href} className="text-gray-600 hover:text-black">
                    {item.label}
                  </CustomLink>
                ) : (
                  <button className="text-gray-600 hover:text-black">
                    {item.label}
                  </button>
                )}
                {activeSubmenu === item.label && item.submenu && (
                  <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-lg py-2">
                    {item.submenu.map((subItem) => (
                      <CustomLink
                        key={subItem.label}
                        href={subItem.href}
                        className="block px-4 py-2 text-gray-600 hover:text-black hover:bg-gray-50"
                      >
                        {subItem.label}
                      </CustomLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <LoginButton />
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-black"
            >
              <span className="sr-only">Open menu</span>
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
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4">
            {menuItems.map((item) => (
              <div key={item.label} className="py-2">
                {item.href ? (
                  <CustomLink 
                    href={item.href} 
                    className="text-gray-600 hover:text-black block w-full text-left"
                  >
                    {item.label}
                  </CustomLink>
                ) : (
                  <button
                    onClick={() => setActiveSubmenu(activeSubmenu === item.label ? null : item.label)}
                    className="text-gray-600 hover:text-black w-full text-left"
                  >
                    {item.label}
                  </button>
                )}
                {activeSubmenu === item.label && item.submenu && (
                  <div className="mt-2 pl-4">
                    {item.submenu.map((subItem) => (
                      <CustomLink
                        key={subItem.label}
                        href={subItem.href}
                        className="block py-2 text-gray-600 hover:text-black"
                      >
                        {subItem.label}
                      </CustomLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="py-2">
              <LoginButton />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
