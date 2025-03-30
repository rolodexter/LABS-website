import React from 'react';
import PrivyAuth from '../components/PrivyAuth';
import Layout from '../components/Layout';
import { ThemeProvider } from '../components/ThemeProvider';
import '../css/style.css';

// Add Tailwind CSS
import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }) {
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