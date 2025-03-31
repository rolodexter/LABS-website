import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { LoginButton } from '@/components/auth/LoginButton';

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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveSubmenu(item.label)}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <button className="text-gray-600 hover:text-black">
                  {item.label}
                </button>
                {activeSubmenu === item.label && (
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
                <button
                  onClick={() => setActiveSubmenu(activeSubmenu === item.label ? null : item.label)}
                  className="text-gray-600 hover:text-black w-full text-left"
                >
                  {item.label}
                </button>
                {activeSubmenu === item.label && (
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
