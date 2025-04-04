import React, { ReactNode } from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  hideHeader?: boolean;
  hideFooter?: boolean;
  headerProps?: any;
  footerProps?: any;
  className?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title = 'rolodexterLABS',
  description = 'Exploring breakthrough research and technologies in the rolodexter ecosystem',
  keywords = 'rolodexter, AI, machine learning, knowledge management',
  ogImage = '/images/og-image.jpg',
  hideHeader = false,
  hideFooter = false,
  headerProps = {},
  footerProps = {},
  className = '',
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col min-h-screen bg-white text-black">
        {!hideHeader && <Header {...headerProps} />}
        
        <main className={`flex-grow ${className}`}>
          {children}
        </main>
        
        {!hideFooter && <Footer {...footerProps} />}
      </div>
    </>
  );
};

export default MainLayout;
