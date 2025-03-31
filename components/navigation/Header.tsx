import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const menuItems = [
  {
    label: 'Companies',
    href: '#',
    submenu: [
      { label: 'Partners', href: '/companies/partners' },
      { label: 'Case Studies', href: '/companies/case-studies' },
    ],
  },
  {
    label: 'Products',
    href: '#',
    submenu: [
      { label: 'rolodexterVS', href: '/products/rolodexter-vs' },
      { label: 'rolodexterGPT', href: '/products/rolodexter-gpt' },
    ],
  },
  {
    label: 'Services',
    href: '#',
    submenu: [
      { label: 'Model Development', href: '/services/model-development' },
      { label: 'Model Training', href: '/services/model-training' },
      { label: 'Workforce Development', href: '/services/workforce-development' },
      { label: 'Workforce by Scale', href: '/services/workforce-scale' },
      { label: 'Workforce by Complexity', href: '/services/workforce-complexity' },
      { label: 'Scale × Complexity', href: '/services/scale-complexity' }
    ],
  },
  {
    label: 'Companies',
    href: '#',
    submenu: [
      { label: 'rolodexterAI', href: '/companies/rolodexter-ai' },
      { label: 'rolodexterEDU', href: '/companies/rolodexter-edu' },
      { label: 'rolodexterLARP', href: '/companies/rolodexter-larp' },
      { label: 'Partners', href: '/companies/partners' }
    ]
  }
];

export default function Header() {
  const router = useRouter();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [clickedItem, setClickedItem] = useState<string | null>(null);

  const isActive = (path: string) => {
    return router.pathname === path;
  };

  const handleMouseEnter = (label: string) => {
    setHoveredItem(label);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const handleClick = (label: string) => {
    if (clickedItem === label) {
      setClickedItem(null);
    } else {
      setClickedItem(label);
    }
  };

  const isMenuOpen = (label: string) => hoveredItem === label || clickedItem === label;

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
                <button
                  onClick={() => handleClick(item.label)}
                  className={`text-black dark:text-white hover:text-gray-900 dark:hover:text-gray-100 py-2 ${
                    isMenuOpen(item.label) ? 'text-gray-900 dark:text-gray-100' : ''
                  }`}
                >
                  {item.label}
                </button>
                {isMenuOpen(item.label) && (
                  <div className="absolute left-0 mt-1 w-48 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg py-2">
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
                href="/login"
                className="text-black dark:text-white hover:text-gray-900 dark:hover:text-gray-100"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>

          <button
            className="md:hidden text-black dark:text-white"
            onClick={() => setClickedItem(clickedItem ? null : 'mobile')}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {clickedItem === 'mobile' && (
          <div className="md:hidden py-4">
            {menuItems.map((item) => (
              <div key={item.label} className="mb-4">
                <button
                  onClick={() => handleClick(item.label)}
                  className="w-full text-left text-black dark:text-white py-2"
                >
                  {item.label}
                </button>
                {clickedItem === item.label && (
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
                href="/login"
                className="block text-black dark:text-white hover:text-gray-900 dark:hover:text-gray-100"
              >
                Login
              </Link>
              <Link
                href="/signup"
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
