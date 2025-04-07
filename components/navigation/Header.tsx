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
  className?: string;
};

type MenuItem = {
  label: string;
  href?: string;
  submenu?: SubMenuItem[];
};

// Group products by family for better organization
const productsByFamily = productsData.reduce<Record<string, typeof productsData>>((acc, product) => {
  const { family } = product;
  if (!acc[family]) {
    acc[family] = [];
  }
  acc[family].push(product);
  return acc;
}, {});

// Group services by category
const servicesByCategory = servicesData.reduce<Record<string, typeof servicesData>>((acc, service) => {
  const { category } = service;
  if (!acc[category]) {
    acc[category] = [];
  }
  acc[category].push(service);
  return acc;
}, {});

// Create product submenu with only Operating Systems and Workers categories
const productSubmenu: SubMenuItem[] = [
  // Header for Products section
  { label: 'Products', href: '', className: 'font-bold text-xs uppercase tracking-wide opacity-70 cursor-default' },
  
  // Only show top-level categories: Operating Systems and Workers
  ...Object.entries(productsByFamily)
    .filter(([family]) => family === 'Operating Systems' || family === 'Workers')
    .sort((a, b) => {
      // Sort by priority
      const priorityA = a[1][0]?.priority || 999;
      const priorityB = b[1][0]?.priority || 999;
      return priorityA - priorityB;
    })
    .flatMap(([family, products]) => {
      // Get icon for this family
      const icon = products[0]?.icon || '';
      // Check if any products in this family are in development
      const hasInDevelopment = products.some(product => product.status === 'development');
      
      return [
        // Family header without icon
        { 
          label: `${family}`, 
          href: `/products#${family.toLowerCase().replace(/ /g, '-')}`,
          className: `text-sm font-medium ${hasInDevelopment ? 'flex items-center' : ''}`
        }
      ];
    }),
  { label: 'All Products', href: '/products', className: 'mt-2 font-semibold' }
];

// Create service submenu with the four specified categories and appropriate icons
const serviceSubmenu: SubMenuItem[] = [
  // Header for Services section
  { label: 'Services', href: '', className: 'font-bold text-xs uppercase tracking-wide opacity-70 cursor-default' },
  
  // Show only the four specified categories with icons, ordered by priority
  ...Object.entries(servicesByCategory)
    .filter(([category]) => ['Blockchains', 'Models', 'Science', 'Work'].includes(category))
    .sort((a, b) => {
      // Get the first service from each category to check priority
      const priorityA = a[1][0]?.priority || 999;
      const priorityB = b[1][0]?.priority || 999;
      return priorityA - priorityB;
    })
    .flatMap(([category, services]) => {
      // Get the icon from the first service in this category
      const icon = services[0]?.icon || '';
      // Check if any services in this category are in development
      const hasInDevelopment = services.some(service => service.status === 'development');
      // Get badge if any service has one
      const badge = services.find(service => service.badge)?.badge;
      
      return [
        // Category header without icon
        { 
          label: `${category}`, 
          href: `/services#${category.toLowerCase()}`,
          className: `text-sm ${badge ? 'flex items-center' : 'font-medium'}`,
          // If this category has services in development or with badges, show it
          ...(badge && {
            rightElement: <span className="ml-2 px-1.5 py-0.5 text-xs bg-gray-100 text-gray-700 rounded-full">{badge}</span>
          }),
          // Optional styling for in-development categories
          style: hasInDevelopment && !badge ? { opacity: 0.8 } : {}
        }
      ];
    }),
  { label: 'All Services', href: '/services', className: 'mt-2 font-semibold' }
];

const menuItems: MenuItem[] = [
  {
    label: 'Products',
    href: '/products',
    submenu: productSubmenu,
  },
  {
    label: 'Services',
    href: '/services',
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

interface CustomLinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
  onClick?: () => void;
  [key: string]: any;
}

function CustomLink({ children, href, className, ...props }: CustomLinkProps) {
  // Don't navigate if the href is empty (used for category headers)
  const handleClick = (e: React.MouseEvent) => {
    if (!href) {
      e.preventDefault();
      return;
    }
    if (props.onClick) props.onClick();
  };

  // Combine classNames into a single prop
  const allProps = {
    ...props,
    className,
    onClick: handleClick
  };

  return (
    <Link href={href || '#'} {...allProps}>
      {children}
    </Link>
  );
}

export default function Header() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  return (
    <header className="fixed w-full bg-white border-b border-gray-100 z-50 transition-all duration-200">
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
                className="relative group"
                onMouseEnter={() => setActiveSubmenu(item.label)}
                onMouseLeave={() => {
                  // Add a small delay before closing the menu
                  setTimeout(() => {
                    setActiveSubmenu(null);
                  }, 100);
                }}
              >
                <CustomLink 
                  href={item.href || '#'} 
                  className="text-gray-600 hover:text-black pb-2 border-b-2 border-transparent hover:border-gray-200 transition-all duration-200"
                >
                  {item.label}
                  {item.submenu && (
                    <span className="ml-1 inline-block">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </span>
                  )}
                </CustomLink>
                {item.submenu && (
                  <div 
                    className={`absolute left-0 mt-2 w-56 bg-white border border-gray-100 rounded-lg shadow-lg py-2 transition-all duration-200 ${activeSubmenu === item.label ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
                  >
                    {item.submenu.map((subItem) => (
                      <CustomLink
                        key={subItem.label}
                        href={subItem.href}
                        className={`block px-4 py-2 text-gray-600 hover:text-black hover:bg-gray-50 transition-colors duration-150 ${subItem.className || ''}`}
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
