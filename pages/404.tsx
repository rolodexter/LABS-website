import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';

export default function Custom404() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Head>
        <title>404 - Page Not Found | rolodexterLA BS</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
      </Head>

      <Header />

      <main className="flex-grow container mx-auto px-4 py-12">
        <motion.div 
          className="flex flex-col items-center justify-center text-center py-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-6xl font-bold mb-6">404</h1>
          <h2 className="text-3xl font-semibold mb-8">Page Not Found</h2>
          <p className="text-xl text-gray-600 max-w-2xl mb-10">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="space-y-4">
            <Link 
              href="/" 
              className="inline-block px-8 py-3 border border-black text-black hover:bg-black hover:text-white transition-colors duration-300"
            >
              Return to Home
            </Link>
            
            <div className="pt-4">
              <Link 
                href="/knowledge" 
                className="text-black underline hover:no-underline"
              >
                Browse Knowledge
              </Link>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
