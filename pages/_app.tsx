// Import Tailwind first to ensure base layer is available
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';

export default function MyApp({ Component, pageProps }: AppProps) {
  // Check user preference for dark mode
  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}
