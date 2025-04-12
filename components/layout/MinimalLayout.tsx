import React from 'react';
import Head from 'next/head';
import MinimalHeader from './MinimalHeader';

interface MinimalLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const MinimalLayout: React.FC<MinimalLayoutProps> = ({ 
  children, 
  title = 'rolodexterLABS', 
  description = 'Minimalist knowledge platform'
}) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {children}
      </main>
    </div>
  );
};

export default MinimalLayout;
