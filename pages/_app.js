import React from 'react';
import Layout from '../components/Layout';
import { ThemeProvider } from '../components/ThemeProvider';

// Add Tailwind CSS
import '../styles/globals.css';

// Temporarily disable Privy to get the site working
function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;