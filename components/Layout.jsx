import { useEffect } from 'react';
import Header from './navigation/Header';
import Footer from './navigation/Footer';

const Layout = ({ children }) => {
  // Add padding and basic styles for layout
  useEffect(() => {
    document.body.style.paddingTop = '64px'; // Adjust if needed based on header height
    document.body.style.margin = '0';
    document.body.style.minHeight = '100vh';
    document.body.style.display = 'flex';
    document.body.style.flexDirection = 'column';
    document.documentElement.style.backgroundColor = 'black';
    
    return () => {
      document.body.style.paddingTop = '0';
      document.body.style.margin = '';
      document.body.style.minHeight = '';
      document.body.style.display = '';
      document.body.style.flexDirection = '';
      document.documentElement.style.backgroundColor = '';
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full bg-black text-white">
      <Header />
      <div className="flex-grow w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;