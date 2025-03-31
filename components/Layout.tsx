import { ReactNode } from 'react';
import Header from './navigation/Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <Header />
      <main className="flex-grow mt-16 pt-4">
        {children}
      </main>
      <footer className="py-6 border-t border-gray-200 dark:border-gray-800 text-center">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          © {new Date().getFullYear()} rolodexterLABS. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Layout;
