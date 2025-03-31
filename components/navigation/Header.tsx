import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Navbar } from 'flowbite-react';

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
    label: 'Companies',
    submenu: [
      { label: 'Partners', href: '/companies/partners' },
      { label: 'Case Studies', href: '/companies/case-studies' },
    ],
  },
];

const CustomLink = ({ children, href, ...props }: any) => {
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
};

export default function Header() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Navbar fluid className="bg-black text-white flex items-center justify-between px-6 py-3">
      <div className="container mx-auto flex items-center justify-between">
        <Navbar.Brand as={CustomLink} href="/">
          <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
            rolodexterLABS
          </span>
        </Navbar.Brand>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {menuItems.map((item, index) => (
            <div key={index} className="relative group">
              <button 
                className="flex items-center px-4 py-2 font-medium text-white hover:text-gray-300 transition"
              >
                {item.label}
                <svg 
                  className="w-4 h-4 ml-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 9l-7 7-7-7" 
                  />
                </svg>
              </button>

              <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                {item.submenu.map((subitem, subindex) => (
                  <Link
                    key={subindex}
                    href={subitem.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {subitem.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Link 
            href="/login" 
            className="px-4 py-2 font-medium text-white hover:text-gray-300 transition">
            Log In
          </Link>
          <Link 
            href="/signup"
            className="bg-white text-black border border-black hover:bg-black hover:text-white rounded-md px-4 py-2 transition">
            Sign Up
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {mobileMenuOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-black border-t border-gray-800 z-50">
          <div className="px-4 py-2">
            {menuItems.map((item, index) => (
              <div key={index} className="py-2">
                <div className="font-medium text-white mb-2">{item.label}</div>
                <div className="pl-4">
                  {item.submenu.map((subitem, subindex) => (
                    <Link
                      key={subindex}
                      href={subitem.href}
                      className="block py-2 text-sm text-gray-300 hover:text-white"
                    >
                      {subitem.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-700 flex flex-col space-y-3">
              <Link 
                href="/login" 
                className="py-2 text-white hover:text-gray-300">
                Log In
              </Link>
              <Link 
                href="/signup"
                className="bg-white text-black border border-black hover:bg-black hover:text-white rounded-md px-4 py-2 inline-block w-full text-center">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </Navbar>
  );
}
