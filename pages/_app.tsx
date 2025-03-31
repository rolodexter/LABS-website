import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import Layout from '../components/Layout';
import 'flowbite/dist/flowbite.min.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  // Check user preference for dark mode
  useEffect(() => {
    // Check localStorage or system preference for dark mode
    if (localStorage.theme === 'dark' || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
