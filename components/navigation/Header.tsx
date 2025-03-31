import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const menuItems = [
  {
    label: 'Companies',
    submenu: [
      { label: 'Partners', href: '/companies/partners' },
      { label: 'Case Studies', href: '/companies/case-studies' },
    ],
  },
  {
    label: 'Products',
    submenu: [
      { label: 'rolodexterVS', href: '/products/rolodexter-vs' },
      { label: 'rolodexterGPT', href: '/products/rolodexter-gpt' },
    ],
  },
];

export default function Header() {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const handleMouseEnter = (label: string) => {
    setOpenMenu(label);
  };

  const handleMouseLeave = () => {
    setOpenMenu(null);
  };

  return (
    <nav className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-semibold text-black dark:text-white">
            rolodexterLABS
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                <button className="text-black dark:text-white hover:text-gray-900 dark:hover:text-gray-100">
                  {item.label}
                </button>
                {openMenu === item.label && (
                  <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className="block px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="flex items-center space-x-4">
              <Link
                href="/auth/login"
                className="text-black dark:text-white hover:text-gray-900 dark:hover:text-gray-100"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>

          <button
            className="md:hidden text-black dark:text-white"
            onClick={() => setOpenMenu(openMenu ? null : 'mobile')}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {openMenu === 'mobile' && (
          <div className="md:hidden py-4">
            {menuItems.map((item) => (
              <div key={item.label} className="mb-4">
                <button
                  onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
                  className="w-full text-left text-black dark:text-white py-2"
                >
                  {item.label}
                </button>
                {openMenu === item.label && (
                  <div className="pl-4 mt-2 space-y-2">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className="block text-sm text-black dark:text-white hover:text-gray-900 dark:hover:text-gray-100"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="space-y-4 mt-6">
              <Link
                href="/auth/login"
                className="block text-black dark:text-white hover:text-gray-900 dark:hover:text-gray-100"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="block bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors text-center"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
