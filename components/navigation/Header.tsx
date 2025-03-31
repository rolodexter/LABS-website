import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Navbar as FlowbiteNavbar, Dropdown as FlowbiteDropdown, Button } from 'flowbite-react';
import Link from 'next/link';

// Custom theme for Flowbite components to enforce black-and-white scheme
const customTheme = {
  navbar: {
    root: {
      base: "bg-white dark:bg-black px-2 py-2.5 border-b border-gray-200 dark:border-gray-800"
    },
    collapse: {
      base: "w-full md:block md:w-auto",
      list: "mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium"
    },
    link: {
      base: "block py-2 pr-4 pl-3 md:p-0 text-black dark:text-white",
      active: {
        on: "bg-black text-white dark:bg-white dark:text-black md:bg-transparent md:text-black dark:md:text-white md:border-b-2 md:border-black dark:md:border-white",
        off: "border-b border-transparent hover:border-black dark:hover:border-white"
      }
    },
    toggle: {
      base: "inline-flex items-center p-2 text-black dark:text-white rounded-lg md:hidden focus:outline-none",
      icon: "h-6 w-6 shrink-0"
    }
  },
  dropdown: {
    floating: {
      base: "z-10 w-fit rounded bg-white dark:bg-black divide-y divide-gray-200 dark:divide-gray-700 shadow-md",
      item: {
        base: "block px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800",
        icon: "mr-2 h-4 w-4"
      }
    }
  },
  button: {
    base: "inline-flex items-center justify-center font-medium text-center text-black dark:text-white focus:ring-2 focus:outline-none",
    color: {
      dark: "bg-black text-white dark:bg-white dark:text-black hover:bg-gray-900 dark:hover:bg-gray-100",
      light: "bg-white text-black dark:bg-black dark:text-white border border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-900"
    }
  }
};

// Create properly typed components with all their subcomponents
const Navbar = FlowbiteNavbar as typeof FlowbiteNavbar & {
  Brand: React.FC<any>;
  Collapse: React.FC<any>;
  Link: React.FC<any>;
  Toggle: React.FC<any>;
};

const Dropdown = FlowbiteDropdown as typeof FlowbiteDropdown & {
  Item: React.FC<any>;
};

// Theme toggle component
const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDarkMode(true);
    }
  };

  return (
    <button
      className="p-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path>
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
        </svg>
      )}
    </button>
  );
};

const Header = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (path: string) => {
    return router.asPath === path || router.asPath.startsWith(`${path}/`);
  };

  // Menu structure
  const menuItems = [
    { 
      label: 'Products', 
      href: '/products',
      subMenu: [
        { label: 'Models', href: '/products/models', description: 'AI and Machine Learning Models' },
        { label: 'Applications', href: '/products/applications', description: 'Enterprise Software Solutions' },
        { label: 'rolodexterVS', href: '/products/rolodexter-vs', description: 'Intelligent Development Environment' },
        { label: 'rolodexterGPT', href: '/products/rolodexter-gpt', description: 'Advanced Language Model' }
      ] 
    },
    { 
      label: 'Services', 
      href: '/services',
      subMenu: [
        { label: 'Model Development', href: '/services/model-development', description: 'Custom AI model development services' },
        { label: 'Model Training', href: '/services/model-training', description: 'Specialized model training and optimization' },
        { label: 'Workforce Development', href: '/services/workforce-development', description: 'Team upskilling and capability building' },
        { label: 'Workforce by Scale', href: '/services/workforce-scale', description: 'Scalable team augmentation services' },
        { label: 'Workforce by Complexity', href: '/services/workforce-complexity', description: 'Expert teams for complex projects' },
        { label: 'Scale × Complexity', href: '/services/scale-complexity', description: 'Combined scale and complexity solutions' }
      ]
    },
    { 
      label: 'Companies', 
      href: '/companies',
      subMenu: [
        { label: 'rolodexterLABS', href: '/companies/rolodexter-labs', description: 'AI Research and Development' },
        { label: 'rolodexterLARP', href: '/companies/rolodexter-larp', description: 'Live Action Role-Playing Solutions' },
        { label: 'Partners', href: '/companies/partners', description: 'Strategic Technology Partners' }
      ]
    },
    { 
      label: 'Community', 
      href: '/community'
    },
    { 
      label: 'Login', 
      href: '/login'
    }
  ];

  // Custom link component to work with Next.js Link and Flowbite
  const CustomLink = ({ href, children, ...props }: any) => {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  };

  return (
    <Navbar
      fluid
      rounded
      className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800"
    >
      <Navbar.Brand href="/" as={CustomLink}>
        <span className="self-center whitespace-nowrap text-xl font-semibold text-black dark:text-white">
          rolodexterLABS
        </span>
      </Navbar.Brand>
      
      <div className="flex md:order-2">
        <Button 
          as={CustomLink} 
          href="/signup" 
          className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-900 dark:hover:bg-gray-100"
        >
          Sign Up
        </Button>
        <Navbar.Toggle className="ml-2 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900" />
      </div>
      
      <Navbar.Collapse>
        {menuItems.map((item) => {
          // If item has submenu, create a dropdown
          if (item.subMenu && item.subMenu.length > 0) {
            return (
              <Navbar.Link 
                key={item.label}
                href={item.href}
                as={CustomLink}
                active={isActive(item.href)}
                className="text-black dark:text-white hover:text-gray-900 dark:hover:text-gray-100"
              >
                <Dropdown
                  inline
                  label={item.label}
                  placement="bottom"
                  arrowIcon={true}
                  className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800"
                >
                  {item.subMenu.map((subItem) => (
                    <Dropdown.Item 
                      key={subItem.label} 
                      href={subItem.href} 
                      as={CustomLink}
                      active={isActive(subItem.href)}
                      className="hover:bg-gray-50 dark:hover:bg-gray-900"
                    >
                      <div>
                        <p className="font-medium text-black dark:text-white">{subItem.label}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{subItem.description}</p>
                      </div>
                    </Dropdown.Item>
                  ))}
                </Dropdown>
              </Navbar.Link>
            );
          }
          
          // If item doesn't have submenu, create a regular nav link
          return (
            <Navbar.Link 
              key={item.label}
              href={item.href}
              as={CustomLink}
              active={isActive(item.href)}
              className="text-black dark:text-white hover:text-gray-900 dark:hover:text-gray-100"
            >
              {item.label}
            </Navbar.Link>
          );
        })}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
