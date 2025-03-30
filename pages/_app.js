import React from 'react';
import PrivyAuth from '../components/PrivyAuth';
import '../css/style.css';

function MyApp({ Component, pageProps }) {
  return (
    <PrivyAuth>
      <Component {...pageProps} />
    </PrivyAuth>
  );
}

export default MyApp;