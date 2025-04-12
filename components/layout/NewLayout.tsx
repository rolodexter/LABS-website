import React from 'react';
import Head from 'next/head';
import NewHeader from './NewHeader';
import NewFooter from './NewFooter';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const NewLayout: React.FC<LayoutProps> = ({ 
  children, 
  title = 'rolodexterLA BS', 
  description = 'Minimalist knowledge platform for high-volume content publishing'
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-lab-white text-lab-black">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <NewHeader />
      
      <main className="flex-grow">
        {children}
      </main>
      
      <NewFooter />
    </div>
  );
};

export default NewLayout;
