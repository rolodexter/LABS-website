import { useState, useEffect } from 'react';
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
const productsByFamily = productsData.reduce<Record<string, typeof productsData>>(
  (acc, product) => {
    const { family } = product;
    if (!acc[family]) {
      acc[family] = [];
    }
    acc[family].push(product);
    return acc;
  },
  {}
);

// Group services by category
const servicesByCategory = servicesData.reduce<Record<string, typeof servicesData>>(
  (acc, service) => {
    const { category } = service;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(service);
    return acc;
  },
  {}
);

// Create product submenu with specified categories
const productSubmenu: SubMenuItem[] = [
  // Executive Tools
  {
    label: 'Executive Tools',
    href: '/products#executive-tools',
    className: 'text-sm font-medium',
  },
  // Data Agents
  {
    label: 'Data Agents',
    href: '/products#data-agents',
    className: 'text-sm font-medium',
  },
  // Model Interfaces
  {
    label: 'Model Interfaces',
    href: '/products#model-interfaces',
    className: 'text-sm font-medium',
  },
  // Intelligence Mesh
  {
    label: 'Intelligence Mesh',
    href: '/products#intelligence-mesh',
    className: 'text-sm font-medium',
  },
  // All Products link
  { label: 'All Products', href: '/products', className: 'mt-2 font-semibold' },
];

// Create service submenu with specified categories
const serviceSubmenu: SubMenuItem[] = [
  // Deployment & Integration
  {
    label: 'Deployment & Integration',
    href: '/services#deployment-integration',
    className: 'text-sm font-medium',
  },
  // Custom Research
  {
    label: 'Custom Research',
    href: '/services#custom-research',
    className: 'text-sm font-medium',
  },
  // Data Assetization Strategy
  {
    label: 'Data Assetization Strategy',
    href: '/services#data-assetization',
    className: 'text-sm font-medium',
  },
  // All Services link
  { label: 'All Services', href: '/services', className: 'mt-2 font-semibold' },
];

// Tooltip microcopy for menu items
type MenuTooltip = {
  [key: string]: string;
};

const menuTooltips: MenuTooltip = {
  Products: 'Explore our intelligent executive tools',
  Services: 'Transform infrastructure with agentic design',
  Login: 'Access your rolodexter console',
};

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
];

interface CustomLinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
  onClick?: () => void;
  [key: string]: unknown;
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
    onClick: handleClick,
  };

  return (
    <Link href={href || '#'} {...allProps}>
      {children}
    </Link>
  );
}

// Login icon component
function LoginIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" y1="12" x2="3" y2="12" />
    </svg>
  );
}

// Simple tooltip component
function Tooltip({ content, children }: { content: string; children: React.ReactNode }) {
  return (
    <div className="group relative">
      {children}
      <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 px-3 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
        {content}
      </div>
    </div>
  );
}

export default function Header() {
  // Router not used in this simplified version
  useRouter(); // Keep the import used
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Add scroll listener for sticky header effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 w-full bg-white z-50 transition-all duration-200 ${hasScrolled ? 'shadow-sm' : 'border-b border-gray-100'}`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <CustomLink href="/" className="text-xl font-bold">
            rolodexterLABS
          </CustomLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map(item => (
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
                <Tooltip content={menuTooltips[item.label]}>
                  <CustomLink
                    href={item.href || '#'}
                    className="text-gray-600 hover:text-black pb-2 border-b-2 border-transparent hover:border-gray-200 transition-all duration-200"
                  >
                    {item.label}
                    {item.submenu && (
                      <span className="ml-1 inline-block">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={12}
                          height={12}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="inline-block"
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </span>
                    )}
                  </CustomLink>
                </Tooltip>

                {item.submenu && (
                  <div
                    className={`absolute left-0 mt-2 w-56 bg-white border border-gray-100 rounded-lg shadow-lg py-2 transition-all duration-300 ${activeSubmenu === item.label ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
                  >
                    {item.submenu.map(subItem => (
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

            <Tooltip content={menuTooltips['Login']}>
              <div className="flex items-center space-x-1 bg-black text-white px-3 py-1.5 rounded-full hover:bg-gray-800 transition-colors duration-200">
                <LoginIcon className="w-4 h-4" />
                <LoginButton />
              </div>
            </Tooltip>
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4">
            {menuItems.map(item => (
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
                    onClick={() =>
                      setActiveSubmenu(activeSubmenu === item.label ? null : item.label)
                    }
                    className="text-gray-600 hover:text-black w-full text-left"
                  >
                    {item.label}
                  </button>
                )}
                {activeSubmenu === item.label && item.submenu && (
                  <div className="mt-2 pl-4">
                    {item.submenu.map(subItem => (
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
            <div className="py-2 flex items-center space-x-1">
              <LoginIcon className="w-4 h-4" />
              <LoginButton />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
