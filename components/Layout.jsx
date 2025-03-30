import { useEffect } from 'react';
import Header from './navigation/Header';
import Footer from './navigation/Footer';

const Layout = ({ children }) => {
  // Add padding to account for fixed header
  useEffect(() => {
    document.body.style.paddingTop = '64px'; // Adjust if needed based on header height
    return () => {
      document.body.style.paddingTop = '0';
    };
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black text-white">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;