import React from 'react';
import { ThemeProvider } from '../components/ThemeProvider';
import '../styles/globals.css';
import '../css/style.css';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;