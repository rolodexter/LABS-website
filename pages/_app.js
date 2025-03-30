import React, { useEffect, useState } from 'react';
import PrivyAuth from '../components/PrivyAuth';
import Layout from '../components/Layout';
import { ThemeProvider } from '../components/ThemeProvider';
import '../css/style.css';

// Add Tailwind CSS
import '../styles/globals.css';

// Config to disable static optimization
export const config = {
  unstable_runtimeJS: true
};

function MyApp({ Component, pageProps }) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  return (
    <ThemeProvider>
      {isBrowser ? (
        <PrivyAuth>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PrivyAuth>
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </ThemeProvider>
  );
}

export default MyApp;