import { useEffect } from 'react';
import Header from './navigation/Header';
import Footer from './navigation/Footer';

const Layout = ({ children }) => {
  // Add padding to account for fixed header but ensure it's visible
  useEffect(() => {
    // Apply padding for fixed header without additional stylings that could hide it
    document.body.style.paddingTop = '64px';
    return () => {
      document.body.style.paddingTop = '0';
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full bg-white dark:bg-black">
      <Header />
      <main className="flex-1 w-full mt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;