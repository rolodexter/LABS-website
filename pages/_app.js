import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Layout from '../components/Layout';
import { ThemeProvider } from '../components/ThemeProvider';
import '../css/style.css';

// Add Tailwind CSS
import '../styles/globals.css';

// Dynamically import PrivyAuth with no SSR
const PrivyAuth = dynamic(
  () => import('../components/PrivyAuth'),
  { ssr: false }
);

function MyApp({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Only show the application after mounting to prevent hydration errors
  if (!mounted) {
    return (
      <ThemeProvider>
        <div style={{ visibility: 'hidden' }}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <PrivyAuth>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PrivyAuth>
    </ThemeProvider>
  );
}

export default MyApp;