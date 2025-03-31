import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Navbar, Dropdown, Button } from 'flowbite-react';

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

  const isActive = (path: string) => {
    return router.pathname === path;
  };

  return (
    <Navbar fluid className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6 flex flex-wrap items-center justify-between">
        <Navbar.Brand as={CustomLink} href="/">
          <span className="self-center text-xl font-semibold whitespace-nowrap text-black dark:text-white">
            rolodexterLABS
          </span>
        </Navbar.Brand>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <Dropdown
                key={item.label}
                label={item.label}
                inline
                dismissOnClick={true}
                className="!bg-white dark:!bg-black"
                theme={{
                  floating: {
                    target: "w-fit !bg-transparent hover:!bg-transparent focus:!ring-0 !border-none",
                    base: "w-48 !bg-white dark:!bg-black !border !border-gray-200 dark:!border-gray-800 !shadow-lg !rounded-lg",
                    item: {
                      base: "!text-black dark:!text-white hover:!bg-gray-100 dark:hover:!bg-gray-800 !rounded-none"
                    }
                  }
                }}
              >
                {item.submenu.map((subItem) => (
                  <Dropdown.Item
                    key={subItem.href}
                    as={CustomLink}
                    href={subItem.href}
                  >
                    {subItem.label}
                  </Dropdown.Item>
                ))}
              </Dropdown>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
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

          <Navbar.Toggle />
        </div>

        <Navbar.Collapse>
          {menuItems.map((item) => (
            <Dropdown
              key={item.label}
              label={item.label}
              inline
              dismissOnClick={true}
              className="w-full md:hidden !bg-white dark:!bg-black"
              theme={{
                floating: {
                  target: "w-full !bg-transparent hover:!bg-transparent focus:!ring-0 !border-none text-left",
                  base: "w-full !bg-white dark:!bg-black !border !border-gray-200 dark:!border-gray-800 !shadow-lg !rounded-lg",
                  item: {
                    base: "!text-black dark:!text-white hover:!bg-gray-100 dark:hover:!bg-gray-800 !rounded-none"
                  }
                }
              }}
            >
              {item.submenu.map((subItem) => (
                <Dropdown.Item key={subItem.href} as={CustomLink} href={subItem.href}>
                  {subItem.label}
                </Dropdown.Item>
              ))}
            </Dropdown>
          ))}
          <div className="flex flex-col gap-4 mt-4 md:hidden">
            <Link
              href="/auth/login"
              className="text-black dark:text-white hover:text-gray-900 dark:hover:text-gray-100"
            >
              Login
            </Link>
            <Link
              href="/auth/signup"
              className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors text-center"
            >
              Sign Up
            </Link>
          </div>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}
